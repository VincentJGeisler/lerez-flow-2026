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
- **Mixed Team Relay (MTR) — Sunday, 27 September:** 250 m, one-lap
  lower-reach relay swim with a 12:00–18:00 timeline. The guide schedules MTR
  waves at 13:00, 13:03, 13:06, 13:15, and 13:21. The compact multi-buoy
  course trace is digitised from the guide’s relay swim map (p. 68), not
  derived from the Sprint course.

Append `?day=sprint` or `?day=mtr` to the local URL to open those views directly.

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
| Pontevedra tide timing | [Published Pontevedra tide prediction](https://www.tide-forecast.com/tide/Pontevedra/tide-times) | Pinned high/low-water extrema for each race day; drives stage, flood/ebb phase, and the thermal-mixing scenario. |
| Regional official check | [Instituto Hidrográfico de la Marina — 2026 Marín table](https://armada.defensa.gob.es/ihm/Documentacion/Mareas/2026/Marin3.pdf) | The nearest official reference station. Its timings differ from Pontevedra because it is farther down the ría; it is not substituted for the race-reach prediction. |
| Short-range Spanish coastal forecast | [Puertos del Estado Oceanography](https://www.puertos.es/en/services/oceanography) | Official operational reference for sea level, currents, and temperature. |
| Browser-loaded temperature model | [Open-Meteo Marine](https://open-meteo.com/en/docs/marine-weather-api) | Requested only when race day is inside its eight-day forecast horizon; it can supplement temperature, never replace the tide schedule. |

The application pins its tide timing to the following published **Pontevedra**
predictions (CEST), rather than the original illustrative keyframes:

| Race day | High water | Low water | High water | Low water |
| --- | --- | --- | --- | --- |
| Sprint — Thu 24 Sep | 03:19 | 09:17 | **15:29** | 21:43 |
| Standard — Sat 26 Sep | 04:23 | 10:24 | **16:35** | 22:46 |
| Mixed Team Relay — Sun 27 Sep | 04:56 | 10:58 | **17:09** | 23:19 |

That means the Sprint 15:45 wave is only 16 minutes after predicted high water,
so the visual current starts close to slack rather than showing a 0.5 m/s ebb.
Tide height/phase is the data-led part of the display. There is currently no
publicly verified, course-reach current gauge or validated hydraulic model for
the Río Lérez swim channel, so every numeric current speed is deliberately
labelled **Current scenario**. It is a smooth visual estimate that peaks
mid-phase and reaches zero at the published high/low-water turning points; it
is not observed current data, an official forecast, or a race-safety clearance.

When that scenario passes high water, its temperature uses a simple two-endmember
tidal-mixing estimate: cooler marine water enters quickly during flood; after the
ebb starts, the estimate retains that cold-water mass initially and warms only as
the freshwater fraction increases. It uses 16.5°C for the marine endmember and
18.5°C for the river endmember, matching the supplied planning endpoints. This
is intentionally a best-guess visualisation, not a temperature observation.
When a current Open-Meteo response is available, its sea-surface-temperature
values are shown directly and this fallback mixing estimate is not applied.

When either selected race day is within Open-Meteo Marine’s current eight-day
forecast horizon, the browser requests and caches its regional
sea-surface-temperature field only. The coarser ocean current and sea-level
fields are intentionally not used to overwrite the pinned Pontevedra tide
schedule or represent current in the narrow river reach. The HUD identifies
whether that temperature model is active.

Open-Meteo’s marine grid is coarse relative to the Río Lérez and must be treated as planning context, never a navigation, safety, or official race decision source. See [Open-Meteo Marine Weather API](https://open-meteo.com/en/docs/marine-weather-api) for model details and attribution.

The thermal and particle masks use a water-only raster mask generated at load time from the public [IGN PNOA orthophoto WMS](https://www.ign.es/wms-inspire/pnoa-ma). It is a visual planning trace, not a survey-grade shoreline or tidal inundation model.
