/* Lérez Flow — static, browser-only planning visualization. */
(() => {
  'use strict';

  const START_MINUTE = 360;
  const END_MINUTE = 1080;
  // Río Lérez thalweg: used for tidal particles only, never as the swim route.
  const FLOW_AXIS = [
    [42.4344, -8.6366], [42.43455, -8.63595], [42.43505, -8.63490],
    [42.43565, -8.63407], [42.43642, -8.63352], [42.43682, -8.63324],
    [42.43786, -8.63261], [42.43858, -8.63251], [42.43993, -8.63284]
  ];
  // Approximate clockwise trace digitised from the organiser's 2026 guide map
  // (p. 52) against PNOA imagery. It is not organiser-supplied GPS geometry.
  // Water-aligned trace digitised against the imagery.  The map labels identify
  // the organiser's pontoon and exit, but the line itself must stay in-channel.
  // Start on the north-east (course) side of Ponte dos Tirantes, centred in the
  // navigable channel rather than below the bridge approach.
  const SWIM_START = [42.43455, -8.63615];
  const SWIM_EXIT = [42.43422, -8.63572];
  const SWIM_ROUTE = [
    SWIM_START, [42.43462, -8.63570], [42.43485, -8.63485], [42.43545, -8.63395],
    [42.43612, -8.63340], [42.43680, -8.63295], [42.43765, -8.63245],
    [42.43858, -8.63230], [42.43950, -8.63248], [42.43970, -8.63205],
    [42.43955, -8.63195],
    [42.43862, -8.63188], [42.43768, -8.63205], [42.43678, -8.63242],
    [42.43592, -8.63304], [42.43516, -8.63382], [42.43462, -8.63478],
    [42.43431, -8.63552], SWIM_EXIT
  ];
  const ROUTE_TURN_INDEX = 9;
  // The Sprint map in the official athlete guide shows a compact 750 m clockwise
  // loop in the lower reach. This is a visual trace only; its final position is
  // re-measured against the same water mask as the standard-distance course.
  const SPRINT_TURN_AXIS_INDEX = 5;
  const SPRINT_ROUTE = [
    SWIM_START, [42.43462, -8.63570], [42.43485, -8.63485], [42.43545, -8.63395],
    [42.43612, -8.63340], [42.43680, -8.63295], [42.43693, -8.63273],
    [42.43650, -8.63295], [42.43592, -8.63345], [42.43520, -8.63425],
    [42.43462, -8.63520], SWIM_EXIT
  ];
  const SPRINT_ROUTE_TURN_INDEX = 6;
  // Compact 250 m relay loop digitised from the organiser's Mixed Team Relay
  // course map (athlete guide p. 68). It uses the same pontoon/exit precinct
  // but is not a shortened Sprint route.
  const MTR_ROUTE = [
    SWIM_START, [42.435055, -8.63511], [42.43527, -8.63481],
    [42.43465, -8.63530], [42.43434, -8.63550], SWIM_EXIT
  ];
  const MTR_TURN_INDEX = 2;
  // Used only to distribute the visual flow lanes; the orthophoto-derived mask is
  // the authoritative visible-water boundary.
  const CHANNEL_HALF_WIDTHS = [42, 50, 58, 64, 68, 70, 68, 62, 70];
  const WATER_MASK_BOUNDS = { south: 42.431, west: -8.640, north: 42.443, east: -8.630 };
  const STANDARD_EVENTS = [
    { minute: 624, label: 'Low water · 10:24' },
    { minute: 420, label: 'AG start windows · 07:00' },
    { minute: 540, label: 'Elite women start · 09:00' },
    { minute: 995, label: 'High water · 16:35' }
  ];
  const SPRINT_EVENTS = [
    { minute: 929, label: 'High water · 15:29' },
    { minute: 945, label: 'AG Sprint wave 1 · 15:45' },
    { minute: 1020, label: 'AG Sprint waves · 17:00' },
    { minute: 1080, label: 'AG Sprint wave · 18:00' }
  ];
  const MTR_EVENTS = [
    { minute: 780, label: 'MTR wave 1 · 13:00' },
    { minute: 783, label: 'MTR wave 2 · 13:03' },
    { minute: 786, label: 'MTR wave 3 · 13:06' },
    { minute: 795, label: 'MTR wave 4 · 13:15' },
    { minute: 801, label: 'MTR wave 5 · 13:21' },
    { minute: 1029, label: 'High water · 17:09' }
  ];
  // Published Pontevedra tide extrema, CEST (UTC+2).  Tide height is anchored
  // to these events. Velocity is deliberately a separately labelled planning
  // scenario: no public, course-reach current gauge/model was found.
  const TIDE_PREDICTIONS = {
    standard: [
      { minute: 263, percent: 100 }, // 04:23 high water
      { minute: 624, percent: 0 },   // 10:24 low water
      { minute: 995, percent: 100 }, // 16:35 high water
      { minute: 1366, percent: 0 }   // 22:46 low water
    ],
    sprint: [
      { minute: 199, percent: 100 }, // 03:19 high water
      { minute: 557, percent: 0 },   // 09:17 low water
      { minute: 929, percent: 100 }, // 15:29 high water
      { minute: 1303, percent: 0 }   // 21:43 low water
    ],
    mtr: [
      { minute: 296, percent: 100 },  // 04:56 high water
      { minute: 658, percent: 0 },    // 10:58 low water
      { minute: 1029, percent: 100 }, // 17:09 high water
      { minute: 1399, percent: 0 }    // 23:19 low water
    ]
  };
  const RACE_DAYS = {
    standard: {
      id: 'standard', date: '2026-09-26', title: 'Standard distance',
      dateLabel: 'Saturday, 26 September', courseLabel: '1,500 m · 1 lap',
      routeType: 'standard', startMinute: 360, endMinute: 1080,
      thermal: { riverTempC: 18.5, marineTempC: 16.5, exactUntilMinute: 0 },
      tideEvents: TIDE_PREDICTIONS.standard, scenarioPeakSpeed: .8, events: STANDARD_EVENTS
    },
    sprint: {
      id: 'sprint', date: '2026-09-24', title: 'Sprint distance',
      dateLabel: 'Thursday, 24 September', courseLabel: '750 m · 1 lap',
      routeType: 'sprint', startMinute: 720, endMinute: 1080,
      thermal: { riverTempC: 18.5, marineTempC: 16.5, exactUntilMinute: 0 },
      tideEvents: TIDE_PREDICTIONS.sprint, scenarioPeakSpeed: .8, events: SPRINT_EVENTS
    },
    mtr: {
      id: 'mtr', date: '2026-09-27', title: 'Mixed Team Relay',
      dateLabel: 'Sunday, 27 September', courseLabel: '250 m · 1 lap',
      routeType: 'mtr', startMinute: 720, endMinute: 1080,
      thermal: { riverTempC: 18.5, marineTempC: 16.5, exactUntilMinute: 0 },
      tideEvents: TIDE_PREDICTIONS.mtr, scenarioPeakSpeed: .8, events: MTR_EVENTS
    }
  };

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const lerp = (from, to, amount) => from + (to - from) * amount;

  function timeLabel(minute) {
    const hour = Math.floor(minute / 60);
    const min = Math.round(minute % 60);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const h = hour % 12 || 12;
    return `${h}:${String(min).padStart(2, '0')} ${suffix}`;
  }

  /**
   * Creates a smooth, tide-height-led planning timeline from the published
   * Pontevedra high/low-water times.  It does not claim to measure velocity:
   * the speed is only a visual current scenario that reaches its maximum at
   * mid-phase and is zero at the published turning points.
   */
  function buildTideScenarioFrames(day) {
    const extrema = day.tideEvents;
    const minutes = new Set([day.startMinute, day.endMinute, ...extrema.map(event => event.minute)]);
    for (let minute = day.startMinute; minute <= day.endMinute; minute += 5) minutes.add(minute);
    return [...minutes].sort((a, b) => a - b).map(minute => {
      const afterIndex = extrema.findIndex(event => event.minute >= minute);
      const after = extrema[afterIndex < 0 ? extrema.length - 1 : afterIndex];
      const before = extrema[Math.max(0, afterIndex - 1)];
      const span = Math.max(1, after.minute - before.minute);
      const phase = clamp((minute - before.minute) / span, 0, 1);
      const eased = .5 - .5 * Math.cos(Math.PI * phase);
      const rising = after.percent > before.percent;
      const speed = day.scenarioPeakSpeed * Math.sin(Math.PI * phase);
      return {
        minute,
        tempC: day.thermal.marineTempC,
        // Avoid presenting a directional current at the predicted turning point.
        speed: speed < .025 ? 0 : speed,
        direction: speed < .025 ? 'slack' : rising ? 'upstream' : 'downstream',
        tidePercent: lerp(before.percent, after.percent, eased)
      };
    });
  }

  Object.values(RACE_DAYS).forEach(day => { day.frames = buildTideScenarioFrames(day); });

  /** Finds values between source points while retaining exact supplied values. */
  class TimelineModel {
    constructor(frames, day, useThermalScenario = false) {
      this.frames = frames.slice().sort((a, b) => a.minute - b.minute);
      this.startMinute = day?.startMinute ?? START_MINUTE; this.endMinute = day?.endMinute ?? END_MINUTE;
      this.day = day; this.useThermalScenario = useThermalScenario;
    }
    scenarioTemperature(sample) {
      if (!this.useThermalScenario || !this.day?.thermal || sample.minute <= this.day.thermal.exactUntilMinute) return sample.tempC;
      const { riverTempC, marineTempC } = this.day.thermal;
      const tide = clamp(sample.tidePercent / 100, 0, 1);
      // Flood brings the cooler marine endmember upriver quickly. On ebb the
      // water mass retains a cold-water memory, then progressively warms as the
      // river fraction replaces it. This is a conservative mixing estimate—not
      // a measured river-temperature forecast.
      const riverFraction = sample.direction === 'downstream'
        ? .02 + .96 * Math.pow(1 - tide, .72)
        : sample.direction === 'slack'
          ? (tide < .05 ? 1 : 0)
          : .10 + .80 * (1 - tide);
      return marineTempC + (riverTempC - marineTempC) * clamp(riverFraction, 0, 1);
    }
    sample(minute) {
      const safeMinute = clamp(minute, this.startMinute, this.endMinute);
      const nextIndex = this.frames.findIndex(frame => frame.minute >= safeMinute);
      if (nextIndex <= 0) return { ...this.frames[0] };
      const after = this.frames[nextIndex] || this.frames[this.frames.length - 1];
      const before = this.frames[nextIndex - 1];
      const progress = after.minute === before.minute ? 0 : (safeMinute - before.minute) / (after.minute - before.minute);
      const direction = before.direction === after.direction ? before.direction : (progress < .5 ? before.direction : after.direction);
      const sample = {
        minute: safeMinute,
        tempC: lerp(before.tempC, after.tempC, progress),
        speed: lerp(before.speed, after.speed, progress),
        tidePercent: lerp(before.tidePercent, after.tidePercent, progress),
        direction
      };
      sample.tempC = this.scenarioTemperature(sample);
      return sample;
    }
    tideStage(sample) {
      if (sample.speed < .05) return sample.tidePercent > 95 ? 'High water' : 'Low water';
      return sample.direction === 'upstream' ? 'Flood tide' : 'Ebb tide';
    }
  }

  /**
   * Supplements the pinned tide timeline with temperature only when a regional
   * marine model is available. Its coarse ocean-current field must never
   * overwrite the published Pontevedra high/low-water times or masquerade as a
   * measurement in this constricted river reach.
   */
  class MarineDataProvider {
    constructor(day) { this.day = day; this.cacheKey = `lerez-flow-temperature-v2-${day.date}`; }
    inForecastWindow() {
      const localDate = new Date(`${this.day.date}T${String(Math.floor(this.day.endMinute / 60)).padStart(2, '0')}:00:00+02:00`);
      const daysAway = (localDate - new Date()) / 86400000;
      return daysAway >= -1 && daysAway <= 8;
    }
    cache() {
      try {
        const saved = JSON.parse(localStorage.getItem(this.cacheKey));
        const requiredRows = Math.floor((this.day.endMinute - this.day.startMinute) / 60) + 1;
        return saved && Array.isArray(saved.temperatures) && saved.temperatures.length >= requiredRows ? saved : null;
      } catch { return null; }
    }
    async load() {
      const cached = this.cache();
      if (cached) return { frames: this.withTemperatures(cached.temperatures), mode: 'temperature-model', updated: cached.updated };
      if (!this.inForecastWindow()) return { frames: this.day.frames, mode: 'published-tide' };
      try {
        const controller = new AbortController();
        const timer = window.setTimeout(() => controller.abort(), 8000);
        const query = new URLSearchParams({
          latitude: '42.4367', longitude: '-8.6304',
          hourly: 'sea_surface_temperature',
          timezone: 'Europe/Madrid', temperature_unit: 'celsius', wind_speed_unit: 'ms',
          cell_selection: 'sea', start_date: this.day.date, end_date: this.day.date
        });
        const response = await fetch(`https://marine-api.open-meteo.com/v1/marine?${query}`, { signal: controller.signal });
        window.clearTimeout(timer);
        if (!response.ok) throw new Error(`Marine API returned ${response.status}`);
        const temperatures = this.parseTemperatures(await response.json());
        const saved = { temperatures, updated: new Date().toISOString() };
        localStorage.setItem(this.cacheKey, JSON.stringify(saved));
        return { frames: this.withTemperatures(temperatures), mode: 'temperature-model', updated: saved.updated };
      } catch (error) {
        console.info('Regional marine temperature model unavailable; using tide-led planning scenario.', error.message);
        return { frames: this.day.frames, mode: 'published-tide' };
      }
    }
    parseTemperatures(payload) {
      const hourly = payload && payload.hourly;
      const fields = ['time', 'sea_surface_temperature'];
      if (!hourly || fields.some(field => !Array.isArray(hourly[field]))) throw new Error('Incomplete model response');
      if (fields.some(field => hourly[field].length !== hourly.time.length)) throw new Error('Mismatched model response');
      const rows = hourly.time.map((time, index) => ({ time, index })).filter(row => {
        const minute = Number(row.time.slice(11, 13)) * 60 + Number(row.time.slice(14, 16));
        return row.time.startsWith(this.day.date) && minute >= this.day.startMinute && minute <= this.day.endMinute;
      });
      const requiredRows = Math.floor((this.day.endMinute - this.day.startMinute) / 60) + 1;
      if (rows.length < requiredRows) throw new Error('Model does not cover the requested race-day window');
      return rows.map(row => {
        const tempC = hourly.sea_surface_temperature[row.index];
        if (!Number.isFinite(tempC)) throw new Error('Invalid marine temperature data');
        return {
          minute: Number(row.time.slice(11, 13)) * 60 + Number(row.time.slice(14, 16)),
          tempC
        };
      });
    }
    withTemperatures(temperatures) {
      return this.day.frames.map(frame => {
        const nextIndex = temperatures.findIndex(row => row.minute >= frame.minute);
        if (nextIndex <= 0) return { ...frame, tempC: temperatures[0].tempC };
        const after = temperatures[nextIndex] || temperatures[temperatures.length - 1];
        const before = temperatures[nextIndex - 1];
        const amount = (frame.minute - before.minute) / Math.max(1, after.minute - before.minute);
        return { ...frame, tempC: lerp(before.tempC, after.tempC, amount) };
      });
    }
  }

  /**
   * Builds a true water-only raster mask from IGN's public orthophoto. Starting at
   * the course's known water pixels avoids masking similarly coloured roads/shadows;
   * flood fill naturally follows changing banks and leaves islands transparent.
   */
  class RiverWaterMask {
    constructor(map, onReady) {
      this.map = map; this.onReady = onReady; this.ready = false;
      this.canvas = document.createElement('canvas'); this.canvas.width = 1600; this.canvas.height = 1920;
      const bounds = WATER_MASK_BOUNDS;
      const query = new URLSearchParams({ SERVICE: 'WMS', VERSION: '1.3.0', REQUEST: 'GetMap', LAYERS: 'OI.OrthoimageCoverage', STYLES: '', CRS: 'EPSG:4326', BBOX: `${bounds.south},${bounds.west},${bounds.north},${bounds.east}`, WIDTH: this.canvas.width, HEIGHT: this.canvas.height, FORMAT: 'image/png', TRANSPARENT: 'TRUE' });
      this.image = new Image(); this.image.crossOrigin = 'anonymous';
      this.image.onload = () => this.build();
      this.image.onerror = () => console.warn('IGN water mask could not be loaded.');
      this.image.src = `https://www.ign.es/wms-inspire/pnoa-ma?${query}`;
    }
    pixelForLatLng(lat, lng) {
      const bounds = WATER_MASK_BOUNDS;
      return { x: Math.round((lng - bounds.west) / (bounds.east - bounds.west) * (this.canvas.width - 1)), y: Math.round((bounds.north - lat) / (bounds.north - bounds.south) * (this.canvas.height - 1)) };
    }
    build() {
      const ctx = this.canvas.getContext('2d', { willReadFrequently: true }); ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
      const source = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height); const { data } = source;
      const width = this.canvas.width; const height = this.canvas.height; const total = width * height;
      const sample = (x, y) => { const index = (y * width + x) * 4; return [data[index], data[index + 1], data[index + 2]]; };
      const seedColours = FLOW_AXIS.map(([lat, lng]) => {
        const point = this.pixelForLatLng(lat, lng); const colours = [];
        for (let y = -5; y <= 5; y++) for (let x = -5; x <= 5; x++) {
          const sx = clamp(point.x + x, 0, width - 1); const sy = clamp(point.y + y, 0, height - 1); colours.push(sample(sx, sy));
        }
        return colours.reduce((sum, rgb) => sum.map((value, index) => value + rgb[index]), [0, 0, 0]).map(value => value / colours.length);
      });
      const isWaterTone = index => {
        const r = data[index * 4]; const g = data[index * 4 + 1]; const b = data[index * 4 + 2];
        // Compare against several course samples: water varies through shade and depth.
        let nearest = Infinity;
        for (let sampleIndex = 0; sampleIndex < seedColours.length; sampleIndex++) {
          const [sr, sg, sb] = seedColours[sampleIndex];
          const distance = Math.hypot((r - sr) * .75, (g - sg) * .9, (b - sb) * 1.15);
          if (distance < nearest) nearest = distance;
        }
        // Water in this orthophoto is dark blue; requiring blue/green separation
        // prevents grey roads, roofs, and bridge decks joining the water component.
        return nearest < 48 && (b - r) > 16 && (g - r) > 6 && (r + g + b) < 185;
      };
      const visited = new Uint8Array(total); const queue = new Int32Array(total); let head = 0; let tail = 0;
      const enqueue = (x, y) => { const index = y * width + x; if (!visited[index] && isWaterTone(index)) { visited[index] = 1; queue[tail++] = index; } };
      FLOW_AXIS.forEach(([lat, lng]) => {
        const point = this.pixelForLatLng(lat, lng);
        // Locate the nearest valid water seed so a bridge or buoy coordinate never starts on land.
        let best = null;
        for (let radius = 0; radius <= 28 && !best; radius += 2) for (let y = -radius; y <= radius && !best; y += 2) for (let x = -radius; x <= radius; x += 2) {
          const sx = point.x + x; const sy = point.y + y; if (sx >= 0 && sx < width && sy >= 0 && sy < height && isWaterTone(sy * width + sx)) best = [sx, sy];
        }
        if (best) enqueue(best[0], best[1]);
      });
      while (head < tail) {
        const index = queue[head++]; const x = index % width; const y = Math.floor(index / width);
        if (x) enqueue(x - 1, y); if (x < width - 1) enqueue(x + 1, y); if (y) enqueue(x, y - 1); if (y < height - 1) enqueue(x, y + 1);
      }
      const covered = visited.reduce((count, value) => count + value, 0);
      // Never render a mask that has escaped into the surrounding city. A failed
      // validation leaves the overlays hidden instead of showing false inundation.
      if (covered < total * .002 || covered > total * .18) { console.warn('IGN water mask rejected by coverage validation.'); return; }
      const mask = ctx.createImageData(width, height);
      for (let index = 0; index < total; index++) if (visited[index]) { const i = index * 4; mask.data[i] = 255; mask.data[i + 1] = 255; mask.data[i + 2] = 255; mask.data[i + 3] = 255; }
      ctx.putImageData(mask, 0, 0); this.alpha = visited; this.ready = true; this.onReady();
    }
    apply(ctx) {
      if (!this.ready) return false;
      const bounds = WATER_MASK_BOUNDS; const northWest = this.map.latLngToContainerPoint([bounds.north, bounds.west]); const southEast = this.map.latLngToContainerPoint([bounds.south, bounds.east]);
      ctx.save(); ctx.globalCompositeOperation = 'destination-in'; ctx.drawImage(this.canvas, northWest.x, northWest.y, southEast.x - northWest.x, southEast.y - northWest.y); ctx.restore();
      return true;
    }
    containsContainerPoint(point) {
      if (!this.ready) return false;
      const latLng = this.map.containerPointToLatLng(point); const pixel = this.pixelForLatLng(latLng.lat, latLng.lng);
      if (pixel.x < 0 || pixel.x >= this.canvas.width || pixel.y < 0 || pixel.y >= this.canvas.height) return false;
      return this.alpha[pixel.y * this.canvas.width + pixel.x] === 1;
    }
  }

  /** A DPI-aware Leaflet canvas base layer. */
  class CanvasLayer extends L.Layer {
    constructor(options = {}, waterMask) { super(options); this.canvas = null; this.waterMask = waterMask; }
    onAdd(map) {
      this.map = map; this.canvas = L.DomUtil.create('canvas', 'leaflet-layer');
      this.canvas.style.pointerEvents = 'none'; this.map.getPane(this.options.pane).appendChild(this.canvas);
      this._boundSync = () => this.sync();
      map.on('move zoom resize', this._boundSync); this.sync();
    }
    onRemove(map) { map.off('move zoom resize', this._boundSync); this.canvas.remove(); }
    sync() {
      if (!this.canvas) return;
      const size = this.map.getSize(); const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = Math.round(size.x * dpr); this.canvas.height = Math.round(size.y * dpr);
      this.canvas.style.width = `${size.x}px`; this.canvas.style.height = `${size.y}px`;
      // The pane itself moves during a Leaflet pan. Offset this fixed-viewport
      // canvas by the inverse pane position so screen-projected pixels stay locked
      // to the map geometry instead of being translated a second time.
      L.DomUtil.setPosition(this.canvas, this.map.containerPointToLayerPoint([0, 0]));
      this.ctx = this.canvas.getContext('2d'); this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.width = size.x; this.height = size.y;
      this.coursePoints = this.points(FLOW_AXIS); this.channel = this.buildChannel();
      this.draw();
    }
    points(coords) { return coords.map(point => this.map.latLngToContainerPoint(point)); }
    buildChannel() {
      const center = this.coursePoints;
      const left = []; const right = []; const leftWidths = []; const rightWidths = []; const halfWidths = [];
      center.forEach((point, index) => {
        const previous = center[Math.max(0, index - 1)]; const next = center[Math.min(center.length - 1, index + 1)];
        const dx = next.x - previous.x; const dy = next.y - previous.y; const length = Math.hypot(dx, dy) || 1;
        const [lat, lng] = FLOW_AXIS[index];
        const metresReference = this.map.latLngToContainerPoint([lat + .0001, lng]).distanceTo(point) / 11.1;
        const fallback = CHANNEL_HALF_WIDTHS[index] * metresReference;
        const scan = sign => {
          if (!this.waterMask.ready) return fallback;
          let distance = 0;
          for (let candidate = 2; candidate <= 360; candidate += 2) {
            const sample = { x: point.x + (-dy / length) * candidate * sign, y: point.y + (dx / length) * candidate * sign };
            if (!this.waterMask.containsContainerPoint(sample)) break;
            distance = candidate;
          }
          return distance || fallback;
        };
        const leftWidth = scan(-1); const rightWidth = scan(1);
        leftWidths.push(leftWidth); rightWidths.push(rightWidth); halfWidths.push((leftWidth + rightWidth) / 2);
        left.push({ x: point.x + (dy / length) * leftWidth, y: point.y - (dx / length) * leftWidth });
        right.push({ x: point.x - (dy / length) * rightWidth, y: point.y + (dx / length) * rightWidth });
      });
      return { left, right, leftWidths, rightWidths, halfWidths };
    }
    clipRiver() {
      // Don't display a guessed fallback while the source imagery is loading.
      if (!this.waterMask.ready) { this.ctx.beginPath(); this.ctx.rect(0, 0, 0, 0); this.ctx.clip(); }
    }
    applyWaterMask() { this.waterMask.apply(this.ctx); }
  }

  /** Renders a smoothly changing thermal surface within the channel boundary. */
  class TemperatureLayer extends CanvasLayer {
    constructor(waterMask) { super({ pane: 'temperaturePane' }, waterMask); this.currentTemp = 18.5; this.targetTemp = 18.5; }
    setSample(sample) { this.targetTemp = sample.tempC; this.draw(); }
    color(temp, light = 0) {
      const t = clamp((18.5 - temp) / 2, 0, 1);
      const warm = [216, 137, 69]; const cold = [18, 74, 116];
      return warm.map((value, index) => Math.round(clamp(lerp(value, cold[index], t) + light, 0, 255)));
    }
    draw() {
      if (!this.ctx || !this.map) return;
      this.currentTemp = lerp(this.currentTemp, this.targetTemp, .22);
      const ctx = this.ctx; ctx.clearRect(0, 0, this.width, this.height); ctx.save(); this.clipRiver();
      const start = this.map.latLngToContainerPoint(FLOW_AXIS[0]); const finish = this.map.latLngToContainerPoint(FLOW_AXIS.at(-1));
      const [r, g, b] = this.color(this.currentTemp); const [r2, g2, b2] = this.color(this.currentTemp, 24);
      const gradient = ctx.createLinearGradient(start.x, start.y, finish.x, finish.y);
      gradient.addColorStop(0, `rgba(${r2},${g2},${b2},.62)`); gradient.addColorStop(.55, `rgba(${r},${g},${b},.70)`); gradient.addColorStop(1, `rgba(${r},${g},${b},.46)`);
      ctx.fillStyle = gradient; ctx.fillRect(0, 0, this.width, this.height);
      // A subtle central band makes the faster thalweg legible without changing the
      // temperature reading; speed itself is communicated by the particle lanes.
      ctx.strokeStyle = 'rgba(125, 232, 248, .10)'; ctx.lineCap = 'round';
      for (let index = 1; index < this.coursePoints.length; index++) {
        ctx.beginPath(); ctx.moveTo(this.coursePoints[index - 1].x, this.coursePoints[index - 1].y); ctx.lineTo(this.coursePoints[index].x, this.coursePoints[index].y);
        ctx.lineWidth = (this.channel.halfWidths[index - 1] + this.channel.halfWidths[index]) * .55; ctx.stroke();
      }
      ctx.globalCompositeOperation = 'screen';
      const sheen = ctx.createLinearGradient(0, 0, this.width, this.height);
      sheen.addColorStop(0, 'rgba(255,255,255,.12)'); sheen.addColorStop(.55, 'rgba(255,255,255,0)'); sheen.addColorStop(1, 'rgba(6,182,212,.13)');
      ctx.fillStyle = sheen; ctx.fillRect(0, 0, this.width, this.height); ctx.restore(); this.applyWaterMask();
    }
  }

  /** Particle field runs along local river tangents and adjusts count/velocity in real time. */
  class CurrentParticleLayer extends CanvasLayer {
    constructor(waterMask) {
      super({ pane: 'particlePane' }, waterMask); this.particles = []; this.sample = { speed: 0, direction: 'slack' };
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.lastFrame = performance.now(); this.animation = requestAnimationFrame(time => this.animate(time));
    }
    onAdd(map) { super.onAdd(map); }
    onRemove(map) { cancelAnimationFrame(this.animation); super.onRemove(map); }
    setSample(sample) { this.sample = sample; this.ensureParticles(); }
    ensureParticles() {
      const target = this.reducedMotion ? 18 : Math.round(18 + clamp(this.sample.speed / .8, 0, 1) * 132);
      while (this.particles.length < target) {
        const laneRoll = Math.random();
        const lane = laneRoll < .56 ? 'core' : laneRoll < .78 ? 'left-edge' : 'right-edge';
        const offset = lane === 'core' ? (Math.random() - .5) * .48 : lane === 'left-edge' ? -.52 - Math.random() * .34 : .52 + Math.random() * .34;
        this.particles.push({ progress: Math.random(), offset, lane, age: Math.random() });
      }
      this.particles.length = target;
    }
    pointOnPath(progress, offset) {
      const points = this.coursePoints; const lengths = []; let total = 0;
      for (let i = 1; i < points.length; i++) { total += points[i].distanceTo(points[i - 1]); lengths.push(total); }
      const target = clamp(progress, 0, 1) * total; let index = lengths.findIndex(length => length >= target); index = index < 0 ? lengths.length - 1 : index;
      const prevLength = index === 0 ? 0 : lengths[index - 1]; const segment = points[index + 1].distanceTo(points[index]);
      const amount = segment ? (target - prevLength) / segment : 0;
      const a = points[index]; const b = points[index + 1]; const x = lerp(a.x, b.x, amount); const y = lerp(a.y, b.y, amount);
      const dx = b.x - a.x; const dy = b.y - a.y; const length = Math.hypot(dx, dy) || 1;
      const widths = offset < 0 ? this.channel.leftWidths : this.channel.rightWidths;
      const bankDistance = lerp(widths[index], widths[Math.min(index + 1, widths.length - 1)], amount);
      return { x: x + (-dy / length) * offset * bankDistance, y: y + (dx / length) * offset * bankDistance, dx: dx / length, dy: dy / length };
    }
    animate(now) {
      const delta = Math.min((now - this.lastFrame) / 1000, .05); this.lastFrame = now;
      if (this.ctx && this.map) {
        this.ensureParticles(); const ctx = this.ctx; ctx.clearRect(0, 0, this.width, this.height); ctx.save(); this.clipRiver();
        const speedFactor = clamp(this.sample.speed / .8, 0, 1); const sign = this.sample.direction === 'downstream' ? -1 : 1;
        this.particles.forEach((particle, index) => {
          const laneRatio = particle.lane === 'core' ? 1.18 : particle.lane === 'left-edge' ? .52 : .62;
          if (!this.reducedMotion) particle.progress = (particle.progress + sign * (speedFactor * .13 * laneRatio + .001 * laneRatio) * delta + 1) % 1;
          const point = this.pointOnPath(particle.progress, particle.offset); const tail = (8 + speedFactor * 22) * laneRatio;
          const alpha = (.18 + speedFactor * .67 + Math.sin(now / 700 + index) * .08) * laneRatio;
          ctx.beginPath(); ctx.moveTo(point.x - point.dx * tail * sign, point.y - point.dy * tail * sign); ctx.lineTo(point.x, point.y);
          const color = particle.lane === 'core' ? '191,247,255' : '196,181,253';
          ctx.strokeStyle = `rgba(${color},${alpha})`; ctx.lineWidth = (1 + speedFactor * 1.4) * laneRatio; ctx.shadowBlur = particle.lane === 'core' ? 7 : 3; ctx.shadowColor = particle.lane === 'core' ? 'rgba(34,211,238,.8)' : 'rgba(167,139,250,.5)'; ctx.stroke();
        });
        ctx.restore(); this.applyWaterMask();
      }
      this.animation = requestAnimationFrame(time => this.animate(time));
    }
    draw() { /* The animation loop owns drawing; sync only updates the backing canvas. */ }
  }

  class MapView {
    constructor(day) {
      this.day = day;
      this.map = L.map('map', { zoomControl: false, preferCanvas: true, minZoom: 14, maxZoom: 18, maxBounds: [[42.428, -8.65], [42.448, -8.61]] });
      this.map.createPane('temperaturePane').style.zIndex = 320;
      this.map.createPane('coursePane').style.zIndex = 430;
      this.map.createPane('particlePane').style.zIndex = 460;
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        subdomains: 'abc', maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
      this.drawCourse(); // Temporary route while the orthophoto mask loads.
      this.waterMask = new RiverWaterMask(this.map, () => {
        // The course uses this exact same water test as the thermal and flow layers.
        // Wait for Leaflet's completed layout before measuring screen-space banks.
        this.scheduleConstrainedCourse();
        this.temperature.sync(); this.particles.sync();
      });
      this.temperature = new TemperatureLayer(this.waterMask).addTo(this.map);
      this.particles = new CurrentParticleLayer(this.waterMask).addTo(this.map);
      this.recenter();
      // Re-measure after a viewport transform. Without this, the first render can
      // use Leaflet's pre-layout pixel origin until the user manually pans/zooms.
      this.map.on('moveend zoomend resize', () => this.scheduleConstrainedCourse());
      window.addEventListener('resize', () => this.map.invalidateSize({ pan: false }));
      requestAnimationFrame(() => requestAnimationFrame(() => this.scheduleConstrainedCourse()));
    }
    referenceRoute() {
      if (this.day.routeType === 'sprint') return SPRINT_ROUTE;
      if (this.day.routeType === 'mtr') return MTR_ROUTE;
      return SWIM_ROUTE;
    }
    setDay(day) {
      this.day = day;
      this.drawCourse();
      this.recenter();
      this.scheduleConstrainedCourse();
    }
    scheduleConstrainedCourse() {
      if (!this.waterMask?.ready) return;
      cancelAnimationFrame(this.courseLayoutFrame);
      // Two frames lets Leaflet commit its pixel origin and pane transform first.
      this.courseLayoutFrame = requestAnimationFrame(() => requestAnimationFrame(() => {
        this.drawCourse(this.waterConstrainedRoute());
      }));
    }
    waterConstrainedRoute() {
      // The relay is a compact multi-buoy loop digitised independently from the
      // longer thalweg traces; do not distort it into the standard two-lane route.
      if (this.day.routeType === 'mtr') return null;
      const channelPoint = (index, side) => {
        const center = this.map.latLngToContainerPoint(FLOW_AXIS[index]);
        const previous = this.map.latLngToContainerPoint(FLOW_AXIS[Math.max(0, index - 1)]);
        const next = this.map.latLngToContainerPoint(FLOW_AXIS[Math.min(FLOW_AXIS.length - 1, index + 1)]);
        const dx = next.x - previous.x; const dy = next.y - previous.y; const length = Math.hypot(dx, dy) || 1;
        // side -1 is the west/island lane; +1 is the east/Avenida de Bos Aires lane.
        const normal = { x: (-dy / length) * side, y: (dx / length) * side };
        let bank = 0;
        for (let distance = 2; distance <= 360; distance += 2) {
          const test = { x: center.x + normal.x * distance, y: center.y + normal.y * distance };
          if (!this.waterMask.containsContainerPoint(test)) break;
          bank = distance;
        }
        // Keep each leg near the channel centre; the east return is deliberately
        // more conservative because that bank is the narrow, curved side.
        // Never use a fixed screen-pixel floor here: at low zoom an 8 px offset
        // becomes an exaggerated real-world lane separation. Keep a five-metre
        // minimum instead, converted to the current map scale.
        const [lat, lng] = FLOW_AXIS[index];
        const pixelsPerMetre = this.map.latLngToContainerPoint([lat + .0001, lng]).distanceTo(center) / 11.1;
        const inset = Math.max(pixelsPerMetre * 5, bank * (side < 0 ? .31 : .20));
        return this.map.containerPointToLatLng({ x: center.x + normal.x * inset, y: center.y + normal.y * inset });
      };
      const turnIndex = this.day.routeType === 'sprint' ? SPRINT_TURN_AXIS_INDEX : FLOW_AXIS.length - 1;
      const routeIndices = Array.from({ length: turnIndex }, (_, index) => index + 1);
      const outbound = [SWIM_START, ...routeIndices.map(index => channelPoint(index, -1))];
      const turn = L.latLng(FLOW_AXIS[turnIndex]);
      const returnLeg = [...routeIndices.map(index => channelPoint(index, 1)).reverse(), SWIM_EXIT];
      return { outbound, turn, returnLeg };
    }
    drawCourse(constrained = null) {
      this.courseLayers?.forEach(layer => this.map.removeLayer(layer));
      if (this.day.routeType === 'mtr') {
        const route = MTR_ROUTE;
        const turn = route[MTR_TURN_INDEX];
        this.courseLayers = [
          L.polyline(route, { pane: 'coursePane', color: '#1687a0', opacity: .42, weight: 12, lineCap: 'round', lineJoin: 'round' }).addTo(this.map),
          L.polyline(route, { pane: 'coursePane', color: '#74f0f1', opacity: .94, weight: 3.5, lineCap: 'round', lineJoin: 'round', dashArray: '10 8' }).addTo(this.map),
        ];
        this.courseLayers.push(
          ...this.marker(SWIM_START, 'Relay swim start · pontoon', 'course-dot', [42.43479, -8.63634]),
          ...this.marker(turn, 'Relay buoy turn', 'course-dot turn-dot', [42.43545, -8.63575]),
          ...this.marker(SWIM_EXIT, 'Relay swim exit', 'course-dot turn-dot', [42.43400, -8.63560])
        );
        return;
      }
      const fallback = this.referenceRoute();
      const fallbackTurnIndex = this.day.routeType === 'sprint' ? SPRINT_ROUTE_TURN_INDEX : ROUTE_TURN_INDEX;
      const outbound = constrained?.outbound ?? fallback.slice(0, fallbackTurnIndex + 1);
      const turn = constrained?.turn ?? fallback[fallbackTurnIndex];
      const returnLeg = constrained?.returnLeg ?? fallback.slice(fallbackTurnIndex);
      const route = [...outbound, ...returnLeg];
      this.courseLayers = [
        L.polyline(route, { pane: 'coursePane', color: '#553da1', opacity: .44, weight: 12, lineCap: 'round', lineJoin: 'round' }).addTo(this.map),
        L.polyline(outbound, { pane: 'coursePane', color: '#74f0f1', opacity: .94, weight: 3.5, lineCap: 'round', lineJoin: 'round', dashArray: '10 8' }).addTo(this.map),
        L.polyline(returnLeg, { pane: 'coursePane', color: '#c4b5fd', opacity: .88, weight: 3, lineCap: 'round', lineJoin: 'round', dashArray: '4 8' }).addTo(this.map),
      ];
      this.courseLayers.push(
        ...this.marker(SWIM_START, 'Swim start · pontoon', 'course-dot', [42.43479, -8.63634]),
        ...this.marker(turn, this.day.routeType === 'sprint' ? 'Buoy turn' : 'Clockwise turn', 'course-dot turn-dot'),
        ...this.marker(SWIM_EXIT, 'Swim exit · stairs', 'course-dot turn-dot', [42.43400, -8.63560])
      );
    }
    marker(point, label, dotClass, labelPoint = null) {
      const latLng = L.latLng(point); const labelLatLng = labelPoint ?? [latLng.lat + .00027, latLng.lng];
      const marker = L.marker(latLng, { pane: 'coursePane', interactive: false, icon: L.divIcon({ className: '', iconSize: [12, 12], iconAnchor: [6, 6], html: `<div class="${dotClass}"></div>` }) }).addTo(this.map);
      const labelMarker = L.marker(labelLatLng, { pane: 'coursePane', interactive: false, icon: L.divIcon({ className: 'course-label', iconAnchor: [0, 0], html: label }) }).addTo(this.map);
      return [marker, labelMarker];
    }
    update(sample) { this.temperature.setSample(sample); this.particles.setSample(sample); }
    recenter() { this.map.fitBounds(L.latLngBounds(this.referenceRoute()).pad(.18), { paddingTopLeft: [20, 105], paddingBottomRight: [20, 160] }); }
    zoomIn() { this.map.zoomIn(); }
    zoomOut() { this.map.zoomOut(); }
  }

  class TelemetryView {
    constructor(day) {
      this.day = day;
      this.el = Object.fromEntries(['hud-time', 'tide-stage', 'tide-detail', 'water-temp', 'water-temp-f', 'current-speed', 'current-direction', 'core-flow', 'edge-flow', 'strategy-text', 'data-badge', 'event-label', 'live-region'].map(id => [id, document.getElementById(id)]));
      this.ticks = document.getElementById('event-ticks'); this.setDay(day);
    }
    setDay(day) {
      this.day = day;
      this.ticks.replaceChildren();
      day.events.filter(event => event.minute >= day.startMinute && event.minute <= day.endMinute).forEach(event => {
        const tick = document.createElement('i'); tick.className = 'event-tick'; tick.dataset.minute = event.minute;
        tick.style.left = `${((event.minute - day.startMinute) / (day.endMinute - day.startMinute)) * 100}%`; this.ticks.appendChild(tick);
      });
    }
    source(result) {
      const badge = this.el['data-badge'];
      badge.className = `data-badge ${result.mode === 'temperature-model' ? 'live' : ''}`;
      badge.textContent = result.mode === 'temperature-model' ? 'Published tide · temp model' : 'Published tide timing';
      badge.title = result.updated
        ? `Pontevedra tide timing remains pinned to published extrema. Open-Meteo regional sea-surface-temperature model updated ${new Date(result.updated).toLocaleString()}. Current velocity remains a clearly labelled planning scenario.`
        : 'Tide height and phase are pinned to published Pontevedra high/low-water times. Current velocity and temperature are planning scenarios, not measurements or an official river-current forecast.';
    }
    strategy(sample) {
      if (sample.speed >= .55) return 'High-flow caution — not a race-safety clearance. River flow can vary sharply across the channel and around structures. Use only the clear, buoyed course line; do not chase the bank near bridges, shallow water, obstacles, or eddies. Where the buoyed line is clear and officials permit it, slower near-bank water may reduce exposure to the faster mid-channel current.';
      let advice;
      if (sample.speed < .05) advice = sample.tidePercent > 95 ? 'High water and slack. Reset your pacing expectations, choose a clean sight line, and prepare for changing conditions.' : 'Slack water. Use the cleanest line and settle into rhythm before the flood builds.';
      else if (sample.direction === 'downstream') advice = 'Ebb tide is underway. Expect the current to favour the downstream leg and adjust sighting and pacing for the return.';
      else if (sample.minute < 420) advice = 'The flood is building. The upstream leg gains an assist; save enough to stay composed against the head-current return.';
      else if (sample.minute < 510) advice = 'High buoyancy advantage. Upstream leg will feel fast. Prepare for a hard head-current fight on the downstream return leg.';
      else if (sample.minute < 555) advice = 'Peak flood: the course has its strongest split. Do not overpace with the upstream assist; control effort for the return.';
      else advice = 'Flood is easing. The upstream assist is fading, but keep your exit line deliberate as the channel approaches slack.';
      return advice;
    }
    update(sample, model) {
      const tide = model.tideStage(sample); const tempF = sample.tempC * 9 / 5 + 32;
      const direction = sample.speed < .05 ? 'Slack water' : sample.direction === 'upstream' ? 'Upstream assist' : 'Downstream assist';
      this.el['hud-time'].textContent = timeLabel(sample.minute); this.el['tide-stage'].textContent = tide;
      this.el['tide-detail'].textContent = `${Math.round(sample.tidePercent)}% full`;
      this.el['water-temp'].textContent = `${sample.tempC.toFixed(1)}°C`; this.el['water-temp-f'].textContent = `${tempF.toFixed(1)}°F`;
      this.el['current-speed'].innerHTML = `${sample.speed.toFixed(1)} <span class="font-sans text-sm font-normal text-cyan-100/70">m/s</span>`;
      this.el['current-direction'].textContent = direction; this.el['strategy-text'].textContent = this.strategy(sample);
      this.el['core-flow'].textContent = `${(sample.speed * 1.18).toFixed(1)} m/s`;
      this.el['edge-flow'].textContent = `${(sample.speed * .57).toFixed(1)} m/s`;
      const closest = this.day.events.find(event => Math.abs(event.minute - sample.minute) <= 5);
      this.el['event-label'].textContent = closest ? closest.label : `${tide} · ${Math.round(sample.tidePercent)}% tide`;
      this.ticks.querySelectorAll('.event-tick').forEach(tick => tick.classList.toggle('active', Math.abs(Number(tick.dataset.minute) - sample.minute) <= 5));
    }
    announce(sample) { this.el['live-region'].textContent = `${timeLabel(sample.minute)}, ${sample.speed.toFixed(1)} metres per second, ${sample.direction}`; }
  }

  class PlaybackController {
    constructor(onChange) {
      this.startMinute = START_MINUTE; this.endMinute = END_MINUTE;
      this.minute = this.startMinute; this.speed = .5; this.playing = false; this.onChange = onChange; this.last = 0; this.frame = 0;
      this.slider = document.getElementById('timeline'); this.speedButton = document.getElementById('speed-button');
      document.getElementById('play-button').addEventListener('click', () => this.play());
      document.getElementById('pause-button').addEventListener('click', () => this.pause());
      document.getElementById('reset-button').addEventListener('click', () => this.reset());
      this.speedButton.addEventListener('click', () => this.cycleSpeed());
      this.slider.addEventListener('input', () => { this.minute = Number(this.slider.value); this.emit(); });
    }
    setDay(day) {
      this.startMinute = day.startMinute; this.endMinute = day.endMinute;
      this.slider.min = this.startMinute; this.slider.max = this.endMinute;
      this.slider.setAttribute('aria-label', `Race-day timeline from ${timeLabel(this.startMinute)} to ${timeLabel(this.endMinute)}`);
      document.getElementById('timeline-start').textContent = timeLabel(this.startMinute).replace(' AM', '').replace(' PM', '');
      document.getElementById('timeline-end').textContent = timeLabel(this.endMinute).replace(' AM', '').replace(' PM', '');
    }
    emit(announce = false) { this.slider.value = this.minute; this.onChange(this.minute, announce); }
    play() { if (this.minute >= this.endMinute) this.minute = this.startMinute; this.playing = true; this.last = performance.now(); this.frame = requestAnimationFrame(time => this.tick(time)); }
    pause() { this.playing = false; cancelAnimationFrame(this.frame); }
    reset() { this.pause(); this.minute = this.startMinute; this.emit(true); }
    cycleSpeed() {
      const speeds = [.25, .5, 1, 2, 5]; const current = speeds.indexOf(this.speed);
      this.speed = speeds[(current + 1) % speeds.length];
      this.speedButton.textContent = `${this.speed}×`; this.speedButton.setAttribute('aria-label', `Playback speed ${this.speed} times`);
    }
    tick(now) {
      if (!this.playing) return;
      const seconds = Math.min((now - this.last) / 1000, .2); this.last = now;
      this.minute = Math.min(this.endMinute, this.minute + seconds * 10 * this.speed); this.emit();
      if (this.minute < this.endMinute) this.frame = requestAnimationFrame(time => this.tick(time)); else this.pause();
    }
  }

  class App {
    async init() {
      const requestedDay = new URLSearchParams(window.location.search).get('day');
      this.day = RACE_DAYS[requestedDay] || RACE_DAYS.standard;
      this.model = new TimelineModel(this.day.frames, this.day, true); this.map = new MapView(this.day); this.hud = new TelemetryView(this.day);
      this.playback = new PlaybackController((minute, announce) => this.render(minute, announce));
      document.getElementById('recenter-button').addEventListener('click', () => this.map.recenter());
      document.getElementById('zoom-in-button').addEventListener('click', () => this.map.zoomIn());
      document.getElementById('zoom-out-button').addEventListener('click', () => this.map.zoomOut());
      document.querySelectorAll('[data-race-day]').forEach(button => button.addEventListener('click', () => this.selectDay(button.dataset.raceDay)));
      await this.selectDay(this.day.id);
    }
    async selectDay(dayId) {
      const day = RACE_DAYS[dayId];
      if (!day) return;
      const request = (this.requestId || 0) + 1; this.requestId = request;
      this.playback?.pause(); this.day = day; this.model = new TimelineModel(day.frames, day, true);
      this.map?.setDay(day); this.hud?.setDay(day);
      document.getElementById('event-date').textContent = `World Triathlon Championships · ${day.dateLabel}`;
      document.getElementById('event-context').textContent = `${day.title} · ${day.courseLabel}`;
      const relay = day.routeType === 'mtr';
      document.getElementById('outbound-legend-text').textContent = relay ? 'Relay swim loop' : 'Outbound · clockwise';
      document.getElementById('return-legend').style.display = relay ? 'none' : 'flex';
      document.querySelectorAll('[data-race-day]').forEach(button => {
        const selected = button.dataset.raceDay === day.id;
        button.classList.toggle('active', selected); button.setAttribute('aria-pressed', String(selected));
      });
      this.playback.setDay(day); this.playback.reset();
      const result = await new MarineDataProvider(day).load();
      if (request !== this.requestId) return;
      this.model = new TimelineModel(result.frames, day, result.mode !== 'temperature-model'); this.hud.source(result); this.render(this.playback.minute);
    }
    render(minute, announce = false) { const sample = this.model.sample(minute); this.map.update(sample); this.hud.update(sample, this.model); if (announce) this.hud.announce(sample); }
  }

  window.addEventListener('DOMContentLoaded', () => new App().init());
})();
