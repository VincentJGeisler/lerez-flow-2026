# Lérez Flow — Pontevedra 2026

A zero-build, standalone map visualization of race-morning tidal-current and
water-temperature conditions for the Río Lérez during the 2026 World Triathlon
Championships in Pontevedra.

**Live site:** https://vincentjgeisler.github.io/lerez-flow-2026/

## Run locally

```sh
python3 -m http.server 3000 --bind 127.0.0.1
```

Open http://127.0.0.1:3000 and use the playback dock or slider to move from
05:00 to 14:00. The page loads Leaflet, Tailwind, direct OpenStreetMap tiles,
and Google Fonts from CDNs. Playback begins at 0.5×; its speed control cycles
through 0.25×, 0.5×, 1×, 2×, and 5×.

## Map and course

- Direct OpenStreetMap tiles provide the API-key-free basemap.
- The cyan dashed line is the clockwise outbound swim leg; violet is the return
  to the exit. The two legs are constrained to the same water mask used by the
  visual overlays so they remain inside the channel across map zoom levels.
- The visible course is a planning trace aligned to the published athlete-guide
  diagram. It is not organizer-supplied GPS geometry and must not be used for
  navigation or safety decisions.
- The legend shows water temperature, the two course legs, and tidal flow.

## Data source behavior

| Data | Source | How this app uses it |
| --- | --- | --- |
| Race-day baseline | Supplied event-planning keyframes | Deterministic fallback outside the live-model window. |
| Astronomical tide | [Instituto Hidrográfico de la Marina — 2026 Marín table](https://armada.defensa.gob.es/ihm/Documentacion/Mareas/2026/Marin1.pdf) | Official reference for checking high/low tide times; it is not queried by the browser. |
| Short-range Spanish coastal forecast | [Puertos del Estado Oceanography](https://www.puertos.es/en/services/oceanography) | Official operational reference for sea level, currents, and temperature. |
| Browser-loaded model | [Open-Meteo Marine](https://open-meteo.com/en/docs/marine-weather-api) | Requested only when race day is inside its eight-day forecast horizon. |

The supplied race-day values are the deterministic planning fallback and are
kept exactly at their specified timestamps. The 12:00–14:00 values are an
explicit post-high-tide scenario extension for late starts; they are not an
official river-current forecast.

When 26 September 2026 is within Open-Meteo Marine’s current eight-day forecast
horizon, the browser requests its regional model for sea-surface temperature,
current velocity/direction, and sea-level height, then caches a valid result.
The HUD identifies this data area as **Hydrographic data prediction** and its
tooltip identifies whether the input is a current model or the planning scenario.

Open-Meteo’s marine grid is coarse relative to the Río Lérez and must be treated as planning context, never a navigation, safety, or official race decision source. See [Open-Meteo Marine Weather API](https://open-meteo.com/en/docs/marine-weather-api) for model details and attribution.

The thermal and particle masks use a water-only raster mask generated at load time from the public [IGN PNOA orthophoto WMS](https://www.ign.es/wms-inspire/pnoa-ma). It is a visual planning trace, not a survey-grade shoreline or tidal inundation model.
