# Lérez Flow — Pontevedra 2026

A static race-planning map of the Río Lérez. Updated for the evidence available
on 23 September 2026, with Sprint (24 September) as the default view.

## Run

Serve this directory with a static HTTP server, for example:

```sh
python3 -m http.server 3000 --bind 127.0.0.1
```

Open http://127.0.0.1:3000. Use the date switch, timeline, or 24-hour CEST time
entry. Sprint opens at 15:45 and extends to 19:00. Query parameters
`?day=standard`, `?day=sprint`, and `?day=mtr` select a day.

## Evidence and limitations

- Organizer tide/current guidance, reviewed 23 September, supplies daytime tide
  times and race windows. Sprint high water is listed at 15:40 and current as
  “LOW CURRENT AT THE END” for the 15:45–18:55 window.
- A saved official MeteoGalicia MOHID forecast, run 23 September 00:00 UTC,
  supplies nearby regional current vectors for 24 September 12:00–19:00 CEST.
  A GitHub Actions workflow checks the official feed every six hours and adds
  each race-day snapshot once its entire displayed timeline is covered. The
  displayed spread covers three roughly 300 m cells and bracketing hours.
  It is not a swim-course speed range or confidence interval. Current depth is
  unspecified in the retrieved metadata. Raw responses are in regional.js.
- Course speed, bank/core differences, local slack timing and water temperature
  remain unknown. The old uncalibrated velocity and temperature scenarios are
  removed. No temperature cache or online temperature request remains.
- Optional arrows illustrate tidal tendency at uniform animation speed. They
  default to off. Course geometry is an approximate planning trace; the IGN
  PNOA image mask is not bathymetry or a tidal-inundation model.

Read [MODEL-NOTES.md](MODEL-NOTES.md) for source links, exact query provenance,
methodology and limitations. Nothing is an official race-safety clearance.

## Files and checks

- model.js: tide stage, organizer windows and regional hourly aggregation.
- regional.js: dated regional forecast snapshots and raw CSV evidence.
- app.js: map and user interface.
- model.test.js: data, date, time and uncertainty regression checks.
- tools/update-regional.js and `.github/workflows/update-regional-forecast.yml`:
  validated feed refresh and publishing schedule. Trigger manually to check early.

```sh
node --test model.test.js
node --check app.js
```

No build step. Leaflet, Tailwind, OpenStreetMap, Google Fonts and the IGN water
mask require network access. The organizer and forecast snapshot are bundled.

Hosted site: https://vincentjgeisler.github.io/lerez-flow-2026/
Local edits are not live until deployed.
