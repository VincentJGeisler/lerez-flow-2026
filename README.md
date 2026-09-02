# Lérez Flow — Pontevedra 2026

A zero-build, standalone map visualization of a simulated race-morning tide and temperature scenario for the Río Lérez.

The current swim-course trace is unverified and is not ready for presentation as
the official course. See [the route-overlay handoff](CHANGELOG.md) for the
failure analysis, official-reference evidence, and the required replacement
method.

Open `index.html` from a static server (for example `npx serve .`) and use the playback dock or slider to move from 05:00 to 12:00. The page loads Leaflet, Tailwind, direct OpenStreetMap tiles, and Google Fonts from CDNs.

## Data source behavior

The supplied race-day values are the deterministic fallback and are kept exactly at their specified timestamps. When 26 September 2026 is within Open-Meteo Marine’s available forecast horizon, the browser attempts to request a current regional model (sea-surface temperature, current velocity/direction, and sea level), caches a valid result, and marks it as live or cached in the HUD. Otherwise it remains visibly labelled **SIMULATED SCENARIO**.

Open-Meteo’s marine grid is coarse relative to the Río Lérez and must be treated as planning context, never a navigation, safety, or official race decision source. See [Open-Meteo Marine Weather API](https://open-meteo.com/en/docs/marine-weather-api) for model details and attribution.

The thermal and particle masks use a water-only raster mask generated at load time from the public [IGN PNOA orthophoto WMS](https://www.ign.es/wms-inspire/pnoa-ma). It is a visual planning trace, not a survey-grade shoreline or tidal inundation model.
