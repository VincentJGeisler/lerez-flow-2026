# Lérez Flow — Pontevedra 2026

A zero-build, standalone map visualization of tidal-current and water-temperature
planning conditions for the Río Lérez during the 2026 World Triathlon
Championships in Pontevedra.

**Live site:** https://vincentjgeisler.github.io/lerez-flow-2026/

## Run locally

```sh
python3 -m http.server 3000 --bind 127.0.0.1
```

Open http://127.0.0.1:3000 and use the race-day switch to select Standard or
Sprint. The Standard timeline runs 06:00–18:00; the Sprint timeline focuses on
the afternoon race window, 12:00–18:00. The page loads Leaflet, Tailwind,
direct OpenStreetMap tiles, and Google Fonts from CDNs. Playback begins at
0.5×; its speed control cycles through 0.25×, 0.5×, 1×, 2×, and 5×.

## Race-day views

- **Standard distance — Saturday, 26 September:** 1,500 m, one-lap course.
- **Sprint distance — Thursday, 24 September:** 750 m, one-lap clockwise
  lower-reach loop with a 12:00–18:00 timeline. The visual trace is derived from the published
  [2026 Age Group Athletes Guide](https://cms.triathlon.org/assets/4863c99b-602d-4874-9340-5dcdab4531f6.pdf), which schedules the first AG Sprint wave at 15:45. The guide lists further waves through 18:25; the application window intentionally ends at 18:00.

Append `?day=sprint` to the local URL to open the Sprint view directly.

The compact **River safety guidance** link in the telemetry panel opens a local
reference page with the current-specific caveats and links to World Triathlon,
RNLI, GOV.UK, and Met Office / RLSS guidance.

## Map and course

- Direct OpenStreetMap tiles provide the API-key-free basemap.
- The cyan dashed line is the clockwise outbound swim leg; violet is the return
  to the exit. The two legs are constrained to the same water mask used by the
  visual overlays so they remain inside the channel across map zoom levels.
- The visible courses are planning traces aligned to the published athlete-guide
  diagrams. They are not organizer-supplied GPS geometry and must not be used
  for navigation or safety decisions.
- The Sprint guide specifies a **750 m, one-lap clockwise** swim with orange
  buoys to the left and yellow buoys to the right. It does not assign a formal
  bridge name to the turn, so the map calls it the **Buoy turn**.
- The legend shows water temperature, the two course legs, and tidal flow.

## Data source behavior

| Data | Source | How this app uses it |
| --- | --- | --- |
| Race-day baseline | Supplied event-planning keyframes | Deterministic fallback outside the live-model window. |
| Astronomical tide | [Instituto Hidrográfico de la Marina — 2026 Marín table](https://armada.defensa.gob.es/ihm/Documentacion/Mareas/2026/Marin1.pdf) | Official reference for checking high/low tide times; it is not queried by the browser. |
| Short-range Spanish coastal forecast | [Puertos del Estado Oceanography](https://www.puertos.es/en/services/oceanography) | Official operational reference for sea level, currents, and temperature. |
| Browser-loaded model | [Open-Meteo Marine](https://open-meteo.com/en/docs/marine-weather-api) | Requested only when race day is inside its eight-day forecast horizon. |

The supplied Standard-distance keyframes are the deterministic planning fallback
and are kept exactly at their specified timestamps. The remaining Standard and
all Sprint values extend the visualisation to 18:00 as explicit planning
scenarios; they are not an official river-current forecast.

When that scenario passes high water, its temperature uses a simple two-endmember
tidal-mixing estimate: cooler marine water enters quickly during flood; after the
ebb starts, the estimate retains that cold-water mass initially and warms only as
the freshwater fraction increases. It uses 16.5°C for the marine endmember and
18.5°C for the river endmember, matching the supplied planning endpoints. This
is intentionally a best-guess visualisation, not a temperature observation.
When a current Open-Meteo response is available, its sea-surface-temperature
values are shown directly and this fallback mixing estimate is not applied.

When either selected race day is within Open-Meteo Marine’s current eight-day
forecast horizon, the browser requests its regional model for sea-surface
temperature, current velocity/direction, and sea-level height, then caches a
valid result separately for that date. The HUD identifies this data area as
**Hydrographic data prediction** and its tooltip identifies whether the input
is a current model or the planning scenario.

Open-Meteo’s marine grid is coarse relative to the Río Lérez and must be treated as planning context, never a navigation, safety, or official race decision source. See [Open-Meteo Marine Weather API](https://open-meteo.com/en/docs/marine-weather-api) for model details and attribution.

The thermal and particle masks use a water-only raster mask generated at load time from the public [IGN PNOA orthophoto WMS](https://www.ign.es/wms-inspire/pnoa-ma). It is a visual planning trace, not a survey-grade shoreline or tidal inundation model.
