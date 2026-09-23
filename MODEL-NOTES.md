# Model audit — 23 September 2026

This release combines course-specific organizer guidance with a dated regional
hydrodynamic forecast. It does **not** provide validated swimmer-depth velocities
in the Lérez course, a calibrated local hydraulic simulation, or a safety decision.

## Organizer evidence

[Official race page](https://triathlon.org/events/2026-wtcf-pontevedra/race-info)
links the [tide/current sheet](https://cms.triathlon.org/assets/57367f1b-8492-4ed5-9eaa-fda26bdfd3a0.jpg).
Reviewed on 23 September 2026. All following times are CEST, UTC+2.

| Day | Low water | High water | Low water | Organizer AG window | Current wording |
| --- | --- | --- | --- | --- | --- |
| Sprint, 24 Sep | 09:30 | 15:40 | 21:56 | 15:45–18:55 | LOW CURRENT AT THE END |
| Standard, 26 Sep | 10:37 | 16:46 | 22:59 | 10:30–15:00 | NO CURRENT |
| Relay, 27 Sep | 11:10 | 17:20 | 23:31 | 13:00–16:00 | NO CURRENT |

These are the sheet's event windows, not inferred individual wave times. The
wording is quoted qualitative guidance, not an observation of zero velocity.
The sheet lists inconsistent absolute water heights (e.g. Sprint high water
2.8 m versus race water 3.1 m); we do not use those heights. Daytime tide timings
replace the earlier commercial prediction; this is source prioritization, not
proof of the exact local high-water minute. No preceding morning high is given
for Standard, so interpolation before its first low-water entry is unavailable.

## Regional forecast actually retrieved

Provider: MeteoGalicia MOHID Vigo/Pontevedra. Run 2026-09-23 00:00 UTC.
Dataset: `MyCOAST_V1_MeteoGalicia_MOHID_vigo_01hr_2026092300_PR.ncml`.
Retrieved 23 September. Forecast metadata covers 23 Sep 00:00 to 25 Sep 00:00 UTC.
The app embeds 24 Sep 10:00–17:00 UTC (12:00–19:00 CEST).

[Dataset metadata](https://thredds-meteo.cesga.es/thredds/ncss/grid/MyCoast/MOHID/vigo/MyCOAST_V1_MeteoGalicia_MOHID_vigo_01hr_2026092300_PR.ncml/dataset.xml)
specifies hourly `uo`, `vo` (eastward/northward velocity, m/s) and `water_level`.
Grid spacing is approximately 0.0027° latitude × 0.0036° longitude, about 300 m
in both directions here. No current-depth definition was supplied by the retrieved
variable metadata; these values must not be called verified surface velocities.

| Query near | Requested latitude, longitude | Returned coordinate labels |
| --- | --- | --- |
| Start | 42.43455, -8.63615 | 42.434, -8.637 |
| Center | 42.43570, -8.63400 | 42.434, -8.633 |
| Turn | 42.43693, -8.63273 | 42.437, -8.633 |

Returned labels are the server's rounded coordinates. A fourth, farther-upstream
query selected the same cell as the turn and was excluded to avoid duplication.
The requested points are **not** three independently resolved course locations.
Regional shorelines and bends can be poorly represented at this grid spacing.

`regional.js` retains every raw CSV response, query URL, requested and returned
coordinates, run timestamp, and parsed hourly vector. Speed is `hypot(uo, vo)`.
At an exact hour we display the min/max over the three cells. Between hours we
display the min/max over both bracketing hours and all three cells. We avoid
interpolating opposing hourly vectors into a precise unsupported slack time.
“Mixed / turning” means signs differ among those cells/hours. Regional tendency
uses the NE/SW sign of `uo + vo`, an approximate direction classification for this
reach, not a lane velocity projection. Neither the range nor this classification
accounts for unknown local surface effects or model error.

| Local time | Nearby hourly cell speed spread |
| --- | --- |
| 15:00 | 0.08–0.15 m/s |
| 16:00 | 0.02–0.07 m/s |
| 17:00 | 0.06–0.09 m/s |
| 18:00 | 0.09–0.13 m/s |
| 19:00 | 0.11–0.16 m/s |

The 16:00–19:00 vectors have a downstream tendency. This is consistent with a
weakening/reversing flood followed by modest regional ebb, but does not establish
the course's reversal time, surface speed, or best lane. The spread is **not a
confidence interval, uncertainty bound, or guaranteed upper limit**. The model
and organizer can disagree locally. The snapshot is fixed, not automatically
refreshed, and never reused for the other race dates.

## Changes from the previous implementation

- Removed the uncalibrated 0.8 m/s sine-wave current and fixed bank/core multipliers.
- Removed forced slack at tide extrema and definitive assist/pacing advice.
- Removed assumed 16.5–18.5°C course temperatures and the misleading thermal map.
  The earlier marine-temperature request was regional, and its cache never expired.
  Course temperature now remains unknown without a suitable measurement.
- Kept a cosine interpolation only for schematic tidal stage; it is not used to
  calculate current velocity. Optional arrows are uniformly animated, disabled
  by default, and illustrate tide tendency, not actual water motion.
- Sprint is the default, opens at 15:45, and covers 12:00–19:00. Other race windows
  come from the same organizer sheet. The map trace is still approximate.

## What a calibrated local model would require

Upstream discharge, downstream water levels, surveyed channel geometry/depths,
roughness, wind forcing and validation of current timing and speed at swimmer
depth. Density layering may require a 3D treatment. Those data were not available
for this update. A simple mass-balance calculation or a more elaborate solver
cannot establish a defensible numerical course speed from tide times alone.

[NOAA explains why local tide and slack times cannot be equated](https://tidesandcurrents.noaa.gov/faq.html).

Verification: `node --test model.test.js`; browser checks cover date selection,
time entry, late Sprint times, optional arrows and mobile layout.
