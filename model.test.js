const test = require('node:test');
const assert = require('node:assert/strict');
const { RACE_DAYS, REGIONAL, TimelineModel, timeLabel } = require('./model.js');

test('tomorrow uses organizer timing and includes the full race window', () => {
  const day = RACE_DAYS.sprint, model = new TimelineModel(day);
  assert.equal(day.date, '2026-09-24');
  assert.equal(day.raceStart, 945);
  assert.equal(day.raceEnd, 1135);
  assert.ok(day.endMinute >= day.raceEnd);
  assert.equal(model.sample(940).stage, 'High water');
  assert.equal(model.sample(939).stage, 'Rising water');
  assert.equal(model.sample(941).stage, 'Falling water');
  assert.equal(model.sample(1135).minute, 1135);
});

test('high and low water never become measured zero speed or slack', () => {
  for (const day of Object.values(RACE_DAYS)) {
    const model = new TimelineModel(day);
    for (let minute = day.startMinute; minute <= day.endMinute; minute++) {
      const sample = model.sample(minute);
      assert.equal(sample.speed, null);
      assert.notEqual(sample.direction, 'slack');
      if (sample.tidePercent !== null) assert.ok(sample.tidePercent >= 0 && sample.tidePercent <= 100);
    }
  }
});

test('missing earlier tide boundary is not extrapolated', () => {
  const sample = new TimelineModel(RACE_DAYS.standard).sample(630);
  assert.equal(sample.tidePercent, null);
  assert.equal(sample.direction, 'unknown');
});

test('snapshot contains distinct cells, UTC+2 conversion, and valid vectors', () => {
  assert.equal(new Set(REGIONAL.cells.map(cell => JSON.stringify(cell.reported))).size, 3);
  for (const cell of REGIONAL.cells) {
    assert.equal(cell.rows.length, 8);
    for (const row of cell.rows) {
      assert.equal(row.utc.slice(0,10), REGIONAL.date);
      assert.equal(Number(row.utc.slice(11,13)) * 60 + 120, row.minute);
      assert.ok(Number.isFinite(row.u) && Math.abs(row.u) <= 5);
      assert.ok(Number.isFinite(row.v) && Math.abs(row.v) <= 5);
    }
  }
});

test('16:00 and 19:00 reproduce the regional data, not the old 0.8 m/s scenario', () => {
  const model = new TimelineModel(RACE_DAYS.sprint);
  const at16 = model.regional(960), at19 = model.regional(1140);
  assert.ok(Math.abs(at16.min - .024898473) < 1e-8);
  assert.ok(Math.abs(at16.max - .072401576) < 1e-8);
  assert.ok(Math.abs(at19.max - .15979443) < 1e-8);
  assert.equal(at19.direction, 'Downstream tendency');
});

test('between-hour turning current is bracketed, not interpolated into false slack', () => {
  const region = new TimelineModel(RACE_DAYS.sprint).regional(945);
  assert.equal(region.lower, 900);
  assert.equal(region.upper, 960);
  assert.equal(region.direction, 'Mixed / turning tendency');
  assert.ok(region.min > 0);
  assert.ok(region.max > .15);
});

test('no borrowing the sprint snapshot for other dates or missing hours', () => {
  assert.equal(new TimelineModel(RACE_DAYS.standard).regional(960), null);
  assert.equal(new TimelineModel(RACE_DAYS.mtr).regional(960), null);
  assert.equal(new TimelineModel(RACE_DAYS.sprint).regional(1141), null);
  assert.equal(new TimelineModel(RACE_DAYS.sprint).regional(719), null);
});

test('guidance is confined to the organizer race window and labels use 24-hour time', () => {
  const model = new TimelineModel(RACE_DAYS.sprint);
  assert.equal(model.sample(944).inRaceWindow, false);
  assert.equal(model.sample(945).inRaceWindow, true);
  assert.equal(model.sample(1135).inRaceWindow, true);
  assert.equal(model.sample(1136).inRaceWindow, false);
  assert.equal(timeLabel(959.9), '16:00');
});
