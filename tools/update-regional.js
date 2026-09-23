#!/usr/bin/env node
// Refresh every race-day window the current MeteoGalicia MOHID run covers.
// Incomplete days are left as-is so a partial forecast never replaces good data.
'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');
const previous = require('../regional.js');
const { RACE_DAYS } = require('../model.js');

const BASE = 'https://thredds-meteo.cesga.es/thredds/ncss/grid/MyCoast/MOHID/vigo/latest.ncml';
const METADATA_URL = `${BASE}/dataset.xml`;
const OUTPUT = path.join(__dirname, '..', 'regional.js');
const COURSE_CELLS = previous.courseCells || [
  { name: 'start', requested: { lat: 42.43455, lon: -8.63615 } },
  { name: 'center', requested: { lat: 42.4357, lon: -8.634 } },
  { name: 'turn', requested: { lat: 42.43693, lon: -8.63273 } }
];
const UTC_OFFSET_MINUTES = 120;
const HOUR_MS = 60 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 45_000;

async function fetchText(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  if (!response.ok) throw new Error(`MeteoGalicia returned HTTP ${response.status} for ${url}`);
  return response.text();
}

function parseRun(xml) {
  const units = xml.match(/<attribute[^>]+name="units"[^>]+value="seconds since ([^"]+)"/);
  const begin = xml.match(/<begin>([^<]+)<\/begin>/);
  const end = xml.match(/<end>([^<]+)<\/end>/);
  if (!units || !begin || !end) throw new Error('Forecast metadata has no usable time axis.');
  const run = new Date(`${units[1].replace(' ', 'T')}Z`);
  const start = new Date(begin[1]);
  const finish = new Date(end[1]);
  if (![run, start, finish].every(date => Number.isFinite(date.getTime())) || finish <= start) {
    throw new Error('Forecast metadata contains an invalid time range.');
  }
  return { run: run.toISOString(), start: start.getTime(), end: finish.getTime() };
}

function parseCsv(csv, requested, expectedTimes) {
  const rows = [];
  for (const line of csv.trim().split(/\r?\n/).slice(1)) {
    // The station field contains a comma, so anchor against its closing bracket
    // and parse the five numeric/time columns that follow it.
    const match = line.match(/^([^,]+),GridPointRequestedAt\[[^\]]+\],([^,]+),([^,]+),([^,]+),([^,]+),([^,]+)$/);
    if (!match) throw new Error(`Malformed or missing grid-cell data: ${line.slice(0, 100)}`);
    const [, utc, lat, lon, u, v, waterLevel] = match;
    const time = Date.parse(utc);
    const values = [Number(lat), Number(lon), Number(u), Number(v), Number(waterLevel)];
    if (!Number.isFinite(time) || values.some(value => !Number.isFinite(value)) ||
        Math.abs(values[2]) > 5 || Math.abs(values[3]) > 5 || Math.abs(values[4]) > 10) {
      throw new Error(`Invalid forecast value at ${utc || 'unknown time'}.`);
    }
    const expectedMinute = (new Date(time).getUTCHours() * 60 + UTC_OFFSET_MINUTES) % 1440;
    rows.push({
      utc: new Date(time).toISOString(), minute: expectedMinute,
      u: values[2], v: values[3], waterLevel: values[4]
    });
  }
  const byTime = new Map(rows.map(row => [Date.parse(row.utc), row]));
  if (rows.length !== expectedTimes.length || expectedTimes.some(time => !byTime.has(time))) {
    throw new Error(`Grid cell ${requested.lat},${requested.lon} does not cover every required hourly timestamp.`);
  }
  return { requested, reported: null, rows: expectedTimes.map(time => byTime.get(time)) };
}

function courseWindow(day) {
  const [year, month, date] = day.date.split('-').map(Number);
  const midnightUtc = Date.UTC(year, month - 1, date);
  const localStart = midnightUtc + day.startMinute * 60_000;
  const localEnd = midnightUtc + day.endMinute * 60_000;
  const utcStart = localStart - UTC_OFFSET_MINUTES * 60_000;
  const utcEnd = localEnd - UTC_OFFSET_MINUTES * 60_000;
  return {
    first: Math.floor(utcStart / HOUR_MS) * HOUR_MS,
    last: Math.ceil(utcEnd / HOUR_MS) * HOUR_MS
  };
}

function csvUrl(run, cell, first, last) {
  const query = new URLSearchParams();
  for (const variable of ['uo', 'vo', 'water_level']) query.append('var', variable);
  query.set('latitude', String(cell.requested.lat));
  query.set('longitude', String(cell.requested.lon));
  query.set('time_start', new Date(first).toISOString());
  query.set('time_end', new Date(last).toISOString());
  query.set('accept', 'csv');
  return `${BASE}?${query}`;
}

function failIfInvalidCells(cells, times) {
  const coordinates = new Set(cells.map(cell => `${cell.reported.lat},${cell.reported.lon}`));
  if (coordinates.size !== COURSE_CELLS.length) throw new Error('Requested course locations resolve to duplicate model cells.');
  for (const cell of cells) {
    if (Math.abs(cell.reported.lat - cell.requested.lat) > 0.02 || Math.abs(cell.reported.lon - cell.requested.lon) > 0.02) {
      throw new Error(`The ${cell.name} query resolved outside the expected nearby grid cell.`);
    }
    if (cell.rows.length !== times.length || cell.rows.some((row, index) => Date.parse(row.utc) !== times[index])) {
      throw new Error(`Forecast coverage does not align at the ${cell.name} cell.`);
    }
  }
}

async function loadCell(definition, first, last, expectedTimes) {
  const url = csvUrl(null, definition, first, last);
  const rawCsv = (await fetchText(url)).trim();
  const cell = parseCsv(rawCsv, definition.requested, expectedTimes);
  const firstDataLine = rawCsv.split(/\r?\n/)[1];
  const match = firstDataLine?.match(/^[^,]+,GridPointRequestedAt\[[^\]]+\],([^,]+),([^,]+)/);
  if (!match) throw new Error(`Could not identify the grid cell used for ${definition.name}.`);
  cell.name = definition.name;
  cell.reported = { lat: Number(match[1]), lon: Number(match[2]) };
  cell.url = url;
  cell.rawCsv = rawCsv;
  return cell;
}

async function refreshForecast(date, day, run, retrievedAt) {
  const window = courseWindow(day);
  if (window.first < run.start || window.last > run.end) return null;
  const expectedTimes = [];
  for (let time = window.first; time <= window.last; time += HOUR_MS) expectedTimes.push(time);
  const cells = await Promise.all(COURSE_CELLS.map(cell => loadCell(cell, window.first, window.last, expectedTimes)));
  failIfInvalidCells(cells, expectedTimes);
  return {
    provider: 'MeteoGalicia MOHID Vigo/Pontevedra',
    run: run.run,
    retrievedAt,
    date,
    resolutionMetres: 300,
    depth: 'Not specified in the retrieved current-variable metadata',
    metadata: METADATA_URL,
    coverage: { startUtc: new Date(window.first).toISOString(), endUtc: new Date(window.last).toISOString() },
    cells
  };
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const xml = await fetchText(METADATA_URL);
  const run = parseRun(xml);
  const retrievedAt = new Date().toISOString();
  const forecasts = { ...(previous.forecastByDate || {}) };
  const refreshed = [], skipped = [];

  for (const day of Object.values(RACE_DAYS)) {
    try {
      if (Date.parse(forecasts[day.date]?.run) === Date.parse(run.run)) {
        skipped.push(`${day.id}: current model run ${run.run} is already saved`);
        continue;
      }
      const forecast = await refreshForecast(day.date, day, run, retrievedAt);
      if (!forecast) {
        skipped.push(`${day.id}: latest forecast does not cover its full timeline`);
        continue;
      }
      forecasts[day.date] = forecast;
      refreshed.push(`${day.id}: ${forecast.cells.length} cells, ${forecast.cells[0].rows.length} hourly samples`);
    } catch (error) {
      // Keep an older valid day snapshot if only this day fails to download.
      skipped.push(`${day.id}: ${error.message}`);
    }
  }

  if (refreshed.length === 0) {
    console.log(`No race window was fully covered by MOHID run ${run.run}.`);
    skipped.forEach(message => console.log(`Preserved existing data; ${message}`));
    return;
  }

  const snapshot = {
    schemaVersion: 2,
    provider: 'MeteoGalicia MOHID Vigo/Pontevedra',
    metadata: METADATA_URL,
    retrievedAt,
    forecastByDate: forecasts
  };
  const output = `/* Automatically refreshed official regional forecast snapshots. */\n(() => {\n  const snapshot = ${JSON.stringify(snapshot, null, 2)};\n  if (typeof module !== 'undefined' && module.exports) module.exports = snapshot;\n  else globalThis.LerezRegional = snapshot;\n})();\n`;
  if (!dryRun) {
    const temporary = `${OUTPUT}.tmp`;
    await fs.writeFile(temporary, output, { encoding: 'utf8', mode: 0o644 });
    await fs.rename(temporary, OUTPUT);
  }
  console.log(`${dryRun ? 'Validated' : 'Updated'} regional forecast snapshots from ${run.run}:`);
  refreshed.forEach(message => console.log(`  ${message}`));
  skipped.forEach(message => console.log(`  Preserved existing data; ${message}`));
}

if (require.main === module) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}

module.exports = { parseRun, parseCsv, courseWindow, csvUrl, refreshForecast };
