# Route-overlay handoff — 2 September 2026

## Current status: **not accepted**

The application runs at `http://127.0.0.1:3000`, and its tide, temperature,
playback, OpenStreetMap base layer, water mask, and current-particle layers are
present. The swim-course overlay is **not reliable** and must be replaced before
the app is presented as matching the official course.

The current static route is in `app.js` as `SWIM_ROUTE`; its course endpoints
are `SWIM_START` and `SWIM_EXIT`. Do not treat any of these coordinates as
official GPS coordinates.

## What was requested

- A one-lap, clockwise, approximately 1,500 m swim course for the 2026 World
  Triathlon Championships in Pontevedra.
- It must follow the Río Lérez water channel between the official pontoon start
  and the separate swim exit/stairs; no segment may draw on land or cross itself.
- The course needs two clearly labelled legs matching its legend:
  cyan = clockwise outbound, violet = return to exit.
- Start and exit labels must not overlap.
- The existing animated current/temperature layer must follow the river only;
  its flow axis is separate from the athlete route and must not be converted into
  a loop.
- Basemap must use public OpenStreetMap tiles with no API key.

## Official reference evidence

Source supplied by the user:

- [2026 Pontevedra Athlete Guide (PDF)](https://cms.triathlon.org/assets/4863c99b-602d-4874-9340-5dcdab4531f6.pdf), printed p. 52 / PDF p. 53.

The guide explicitly states:

- “Swim 1.500m – 1 lap swim course”.
- “Orange buoys on the left hand and yellow buoys right hand (clockwise).”
- Swim aid is on the main road, 20 m from the exit.

Its map shows a white start pontoon immediately beyond the bridge and a distinct
exit point near the south bank. The diagram is the visual authority for the
route geometry, but it does **not** publish coordinates. Any coordinate solution
must therefore be independently georeferenced and checked against imagery.

## What changed successfully

- Replaced a key-requiring basemap with direct OpenStreetMap tiles.
- Added a public IGN PNOA orthophoto-derived water mask for the temperature and
  particle canvases, including a coverage safeguard so the city cannot be filled
  when the mask fails.
- Fixed canvas-map pan alignment so current/temperature overlays do not drift
  during pan or zoom.
- Added an explicit legend for cyan outbound and violet return.
- Set up local rendering with headless Chrome for screenshot-based comparison.

## Why the course work failed

1. **I inferred coordinates from a cropped guide image without a proper image
   registration.** I estimated the white-pontoon position by manually comparing
   crops of the guide and orthophoto. The coordinate transform was wrong, moving
   both course legs onto the east bank.
2. **I treated static latitude/longitude offsets as a substitute for measured
   banks.** The river narrows, bends, and changes sides; a fixed offset is not a
   valid way to hold a two-leg route inside it.
3. **I validated route length but not route containment.** The faulty revision
   measured about 1,553 m, which was close to 1,500 m, but passed through land
   and visually crossed/overlapped around the lower course. Length alone was the
   wrong acceptance test.
4. **I used the same imagery-derived mask only for the canvas overlays, not as a
   constraint for the Leaflet polylines.** This allowed the course overlay to
   contradict the visible water overlay.

## Required next implementation approach

Do not make further coordinate guesses. Use this sequence instead:

1. Open the official PDF map and an orthophoto of the identical area side by
   side. Register the guide image using at least four fixed, non-collinear
   landmarks visible in both (bridge corners, footbridge/island crossings, and
   road/shore intersections). Record the transformation and residual error.
2. Digitise the official loop after registration: start pontoon, outbound leg,
   northern turn, return leg, and exit. Retain the official clockwise direction.
3. Produce a **water polygon or water mask test for every route vertex and every
   interpolated segment**. Reject any point that is not water. Do not merely
   test the route endpoints.
4. Use the same verified water geometry for both the visual temperature/current
   mask and the Leaflet course. If the route is offset to distinguish outbound
   and return, compute each offset from local bank normals and clamp it inside a
   safety inset of the water mask.
5. Render at the actual application viewport and compare it to the guide before
   accepting. Acceptance is: no land crossings, no self-crossing, distinct
   labels, correct clockwise direction, and route length reasonably close to
   1,500 m (not artificially forced to hit it).
6. Only then replace `SWIM_ROUTE`, `SWIM_START`, `SWIM_EXIT`, and
   `ROUTE_TURN_INDEX` in `app.js`.

## Current files

- `app.js` — application logic, including the unverified route constants.
- `index.html` — UI, Leaflet/Tailwind CDN loading, and legend.
- `styles.css` — map/pane and legend styling.
- `README.md` — launch and model-data behaviour.

## Verification already available

```sh
python3 -m http.server 3000 --bind 127.0.0.1
'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' \
  --headless=new --disable-gpu --window-size=1200,900 \
  --screenshot=/private/tmp/raceday-review.png http://127.0.0.1:3000/
```

The earlier local screenshot captures were written outside the repository under
`/private/tmp/`; they are diagnostic artefacts, not source assets.
