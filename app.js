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
  const { RACE_DAYS, TimelineModel, timeLabel } = window.LerezModel;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const lerp = (from, to, amount) => from + (to - from) * amount;

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


  /** Optional tide-direction illustration. Motion never encodes water speed. */
  class CurrentParticleLayer extends CanvasLayer {
    constructor(waterMask) {
      super({ pane: 'particlePane' }, waterMask); this.particles = []; this.sample = { direction: 'unknown' }; this.enabled = false;
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.lastFrame = performance.now(); this.animation = requestAnimationFrame(time => this.animate(time));
    }
    onAdd(map) { super.onAdd(map); }
    onRemove(map) { cancelAnimationFrame(this.animation); super.onRemove(map); }
    setSample(sample) { this.sample = sample; this.ensureParticles(); }
    ensureParticles() {
      const target = this.enabled && this.sample.direction !== 'unknown' ? 32 : 0;
      while (this.particles.length < target) {
        this.particles.push({ progress: Math.random(), offset: (Math.random() - .5) * 1.2 });
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
        const sign = this.sample.direction === 'downstream' ? -1 : 1;
        this.particles.forEach(particle => {
          if (!this.reducedMotion) particle.progress = (particle.progress + sign * .025 * delta + 1) % 1;
          const point = this.pointOnPath(particle.progress, particle.offset); const tail = 14;
          ctx.beginPath(); ctx.moveTo(point.x - point.dx * tail * sign, point.y - point.dy * tail * sign); ctx.lineTo(point.x, point.y);
          ctx.strokeStyle = 'rgba(191,247,255,.6)'; ctx.lineWidth = 2; ctx.stroke();
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
        this.particles.sync();
      });
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
    update(sample) { this.particles.setSample(sample); }
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
    update(sample, model) {
      const tide = model.tideStage(sample);
      this.el['hud-time'].textContent = timeLabel(sample.minute);
      this.el['tide-stage'].textContent = tide;
      const high = this.day.tideEvents.find(event => event.percent === 100);
      this.el['tide-detail'].textContent = 'High water ' + timeLabel(high.minute) + ' CEST';
      this.el['water-temp'].textContent = 'Unknown';
      this.el['water-temp-f'].textContent = 'No course measurement';
      this.el['current-speed'].textContent = sample.inRaceWindow ? (this.day.id === 'sprint' ? 'Low current late in race' : 'Organizer: “NO CURRENT”') : 'Outside organizer race window';
      this.el['current-direction'].textContent = 'Course speed and slack timing unverified';
      this.el['strategy-text'].textContent = model.interpretation(sample);
      this.el['core-flow'].textContent = 'Unknown';
      this.el['edge-flow'].textContent = 'Unknown';
      this.el['data-badge'].textContent = 'Reviewed 23 Sep';
      document.getElementById('organizer-guidance').textContent = 'Organizer: “' + this.day.guidance + '” · ' + timeLabel(this.day.raceStart) + '–' + timeLabel(this.day.raceEnd) + ' CEST. Qualitative guidance; no measured speeds supplied.';
      const regional = model.regional(sample.minute);
      document.getElementById('regional-speed').textContent = regional ? regional.min.toFixed(2) + '–' + regional.max.toFixed(2) + ' m/s' : 'No snapshot for this date/time';
      document.getElementById('regional-detail').textContent = regional ? regional.direction + ' · ' + timeLabel(regional.lower) + (regional.upper === regional.lower ? '' : '–' + timeLabel(regional.upper)) + ' CEST hourly cells' : 'The saved regional forecast covers 24 September, 12:00–19:00 CEST only.';
      const closest = this.day.events.filter(event => Math.abs(event.minute - sample.minute) <= 5).sort((a,b) => Math.abs(a.minute - sample.minute) - Math.abs(b.minute - sample.minute))[0];
      this.el['event-label'].textContent = closest ? closest.label : tide + ' · CEST (UTC+2)';
      this.ticks.querySelectorAll('.event-tick').forEach(tick => tick.classList.toggle('active', Math.abs(Number(tick.dataset.minute) - sample.minute) <= 5));
      document.getElementById('selected-time').value = timeLabel(sample.minute);
    }
    announce(sample) { this.el['live-region'].textContent = timeLabel(sample.minute) + ' CEST, ' + sample.stage + ', course current speed unknown'; }
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
    play() { this.pause(); if (this.minute >= this.endMinute) this.minute = this.startMinute; this.playing = true; this.last = performance.now(); this.frame = requestAnimationFrame(time => this.tick(time)); }
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
    init() {
      const requestedDay = new URLSearchParams(window.location.search).get('day');
      this.day = RACE_DAYS[requestedDay] || RACE_DAYS.sprint;
      this.model = new TimelineModel(this.day); this.map = new MapView(this.day); this.hud = new TelemetryView(this.day);
      this.playback = new PlaybackController((minute, announce) => this.render(minute, announce));
      document.getElementById('recenter-button').addEventListener('click', () => this.map.recenter());
      document.getElementById('zoom-in-button').addEventListener('click', () => this.map.zoomIn());
      document.getElementById('zoom-out-button').addEventListener('click', () => this.map.zoomOut());
      document.querySelectorAll('[data-race-day]').forEach(button => button.addEventListener('click', () => this.selectDay(button.dataset.raceDay)));
      document.getElementById('show-tide-arrows').addEventListener('change', event => { this.map.particles.enabled = event.target.checked; this.render(this.playback.minute); });
      document.getElementById('selected-time').addEventListener('change', event => {
        if (!event.target.value) return;
        const [hour, minute] = event.target.value.split(':').map(Number);
        this.playback.pause(); this.playback.minute = clamp(hour * 60 + minute, this.day.startMinute, this.day.endMinute); this.playback.emit(true);
      });
      this.selectDay(this.day.id);
    }
    selectDay(dayId) {
      const day = RACE_DAYS[dayId];
      if (!day) return;
      this.playback?.pause(); this.day = day; this.model = new TimelineModel(day);
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
      this.playback.setDay(day); this.playback.minute = day.initialMinute; this.playback.emit();
      const timeInput = document.getElementById('selected-time');
      timeInput.min = timeLabel(day.startMinute); timeInput.max = timeLabel(day.endMinute);
    }
    render(minute, announce = false) { const sample = this.model.sample(minute); this.map.update(sample); this.hud.update(sample, this.model); if (announce) this.hud.announce(sample); }
  }

  window.addEventListener('DOMContentLoaded', () => new App().init());
})();
