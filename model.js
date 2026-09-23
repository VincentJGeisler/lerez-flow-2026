/* Evidence available on 23 September 2026. Times are Europe/Madrid (UTC+2).
 * This models tidal stage and a conditional direction, NOT current velocity.
 * No local discharge, bathymetry, surface-current calibration or phase lag is
 * available. Do not turn the tide derivative into m/s or a slack-water time.
 */
(() => {
  'use strict';
  const REGIONAL = typeof module !== 'undefined' && module.exports ? require('./regional.js') : globalThis.LerezRegional;
  const SOURCE = {
    reviewed: '2026-09-23',
    url: 'https://cms.triathlon.org/assets/57367f1b-8492-4ed5-9eaa-fda26bdfd3a0.jpg',
    page: 'https://triathlon.org/events/2026-wtcf-pontevedra/race-info',
    name: 'Organizer tide and current sheet'
  };
  const RACE_DAYS = {
    sprint: {
      id: 'sprint', date: '2026-09-24', title: 'Sprint distance',
      dateLabel: 'Thursday, 24 September', courseLabel: '750 m · 1 lap', routeType: 'sprint',
      startMinute: 720, endMinute: 1140, initialMinute: 945,
      raceStart: 945, raceEnd: 1135, guidance: 'LOW CURRENT AT THE END',
      tideEvents: [{ minute: 570, percent: 0 }, { minute: 940, percent: 100 }, { minute: 1316, percent: 0 }]
    },
    standard: {
      id: 'standard', date: '2026-09-26', title: 'Standard distance',
      dateLabel: 'Saturday, 26 September', courseLabel: '1,500 m · 1 lap', routeType: 'standard',
      startMinute: 600, endMinute: 1140, initialMinute: 630,
      raceStart: 630, raceEnd: 900, guidance: 'NO CURRENT',
      // The sheet supplies no preceding morning high. Before 10:37, stage
      // interpolation is deliberately unavailable rather than extrapolated.
      tideEvents: [{ minute: 637, percent: 0 }, { minute: 1006, percent: 100 }, { minute: 1379, percent: 0 }]
    },
    mtr: {
      id: 'mtr', date: '2026-09-27', title: 'Mixed Team Relay',
      dateLabel: 'Sunday, 27 September', courseLabel: '250 m · 1 lap', routeType: 'mtr',
      startMinute: 720, endMinute: 1080, initialMinute: 780,
      raceStart: 780, raceEnd: 960, guidance: 'NO CURRENT',
      tideEvents: [{ minute: 670, percent: 0 }, { minute: 1040, percent: 100 }, { minute: 1411, percent: 0 }]
    }
  };
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const timeLabel = minute => {
    const rounded = Math.round(minute);
    return `${String(Math.floor(rounded / 60)).padStart(2, '0')}:${String(rounded % 60).padStart(2, '0')}`;
  };
  Object.values(RACE_DAYS).forEach(day => {
    day.events = [
      ...day.tideEvents.map(event => ({ minute: event.minute, label: `${event.percent ? 'High' : 'Low'} water · ${timeLabel(event.minute)}` })),
      { minute: day.raceStart, label: `Organizer race window starts · ${timeLabel(day.raceStart)}` },
      { minute: day.raceEnd, label: `Organizer race window ends · ${timeLabel(day.raceEnd)}` }
    ].sort((a, b) => a.minute - b.minute);
  });

  class TimelineModel {
    constructor(day) { this.day = day; }
    sample(minute) {
      const day = this.day;
      minute = clamp(minute, day.startMinute, day.endMinute);
      const sample = { minute, speed: null, direction: 'unknown', tidePercent: null,
        stage: 'Not available', inRaceWindow: minute >= day.raceStart && minute <= day.raceEnd };
      const exact = day.tideEvents.find(event => event.minute === minute);
      if (exact) return { ...sample, tidePercent: exact.percent, stage: exact.percent ? 'High water' : 'Low water' };
      const index = day.tideEvents.findIndex(event => event.minute > minute);
      if (index <= 0) return sample;
      const before = day.tideEvents[index - 1], after = day.tideEvents[index];
      const phase = (minute - before.minute) / (after.minute - before.minute);
      const rising = after.percent > before.percent;
      // Schematic height interpolation, not a water-volume percentage.
      sample.tidePercent = before.percent + (after.percent - before.percent) * (.5 - .5 * Math.cos(Math.PI * phase));
      sample.stage = rising ? 'Rising water' : 'Falling water';
      // Conditional tidal tendency only. Surface flow may differ, especially
      // around a turning tide, and is never asserted to reverse at this time.
      sample.direction = rising ? 'upstream' : 'downstream';
      return sample;
    }
    tideStage(sample) { return sample.stage; }
    regional(minute) {
      if (!REGIONAL || this.day.date !== REGIONAL.date) return null;
      const lower = Math.floor(minute / 60) * 60, upper = Math.ceil(minute / 60) * 60;
      const rows = REGIONAL.cells.flatMap(cell => cell.rows.filter(row => row.minute === lower || row.minute === upper));
      if (rows.length !== REGIONAL.cells.length * (lower === upper ? 1 : 2)) return null;
      const speeds = rows.map(row => Math.hypot(row.u, row.v));
      // Coarse vectors are generally NE/SW here. This describes regional
      // tendency only; no swimmer-depth or lane-specific projection is claimed.
      const signs = rows.map(row => Math.sign(row.u + row.v));
      return { min: Math.min(...speeds), max: Math.max(...speeds), lower, upper,
        direction: signs.every(sign => sign > 0) ? 'Upstream tendency' : signs.every(sign => sign < 0) ? 'Downstream tendency' : 'Mixed / turning tendency' };
    }
    interpretation(sample) {
      if (sample.direction === 'unknown') return 'Local current direction and slack timing are unresolved. High or low water does not establish zero current.';
      if (sample.direction === 'downstream') return 'Falling water supports a downstream tendency toward the sea. If it develops on the course, it opposes the outbound leg and assists the return. Its onset and strength are unverified.';
      return 'Rising water supports an upstream tidal tendency. Freshwater outflow can oppose it, so an upstream assist is not established at swimmer depth.';
    }
  }
  const api = { SOURCE, REGIONAL, RACE_DAYS, TimelineModel, timeLabel };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else globalThis.LerezModel = api;
})();
