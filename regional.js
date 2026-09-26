/* Automatically refreshed official regional forecast snapshots. */
(() => {
  const snapshot = {
  "schemaVersion": 2,
  "provider": "MeteoGalicia MOHID Vigo/Pontevedra",
  "metadata": "https://thredds-meteo.cesga.es/thredds/ncss/grid/MyCoast/MOHID/vigo/latest.ncml/dataset.xml",
  "retrievedAt": "2026-09-26T16:09:37.959Z",
  "forecastByDate": {
    "2026-09-24": {
      "provider": "MeteoGalicia MOHID Vigo/Pontevedra",
      "run": "2026-09-24T00:00:00.000Z",
      "retrievedAt": "2026-09-24T16:54:45.216Z",
      "date": "2026-09-24",
      "resolutionMetres": 300,
      "depth": "Not specified in the retrieved current-variable metadata",
      "metadata": "https://thredds-meteo.cesga.es/thredds/ncss/grid/MyCoast/MOHID/vigo/latest.ncml/dataset.xml",
      "coverage": {
        "startUtc": "2026-09-24T10:00:00.000Z",
        "endUtc": "2026-09-24T17:00:00.000Z"
      },
      "cells": [
        {
          "requested": {
            "lat": 42.43455,
            "lon": -8.63615
          },
          "reported": {
            "lat": 42.434,
            "lon": -8.637
          },
          "rows": [
            {
              "utc": "2026-09-24T10:00:00.000Z",
              "minute": 720,
              "u": -0.08065391,
              "v": 0,
              "waterLevel": -0.29070267
            },
            {
              "utc": "2026-09-24T11:00:00.000Z",
              "minute": 780,
              "u": -0.076139845,
              "v": 0,
              "waterLevel": -0.31832662
            },
            {
              "utc": "2026-09-24T12:00:00.000Z",
              "minute": 840,
              "u": -0.006410068,
              "v": 0,
              "waterLevel": -0.19197994
            },
            {
              "utc": "2026-09-24T13:00:00.000Z",
              "minute": 900,
              "u": 0.11129718,
              "v": 0,
              "waterLevel": 0.42633957
            },
            {
              "utc": "2026-09-24T14:00:00.000Z",
              "minute": 960,
              "u": 0.05872261,
              "v": 0,
              "waterLevel": 1.0715526
            },
            {
              "utc": "2026-09-24T15:00:00.000Z",
              "minute": 1020,
              "u": -0.064072035,
              "v": 0,
              "waterLevel": 0.8865393
            },
            {
              "utc": "2026-09-24T16:00:00.000Z",
              "minute": 1080,
              "u": -0.085634634,
              "v": 0,
              "waterLevel": 0.55353594
            },
            {
              "utc": "2026-09-24T17:00:00.000Z",
              "minute": 1140,
              "u": -0.07777087,
              "v": 0,
              "waterLevel": 0.23322423
            }
          ],
          "name": "start",
          "url": "https://thredds-meteo.cesga.es/thredds/ncss/grid/MyCoast/MOHID/vigo/latest.ncml?var=uo&var=vo&var=water_level&latitude=42.43455&longitude=-8.63615&time_start=2026-09-24T10%3A00%3A00.000Z&time_end=2026-09-24T17%3A00%3A00.000Z&accept=csv",
          "rawCsv": "time,station,latitude[unit=\"degrees_north\"],longitude[unit=\"degrees_east\"],uo[unit=\"m/s\"],vo[unit=\"m/s\"],water_level[unit=\"m\"]\n2026-09-24T10:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.08065391,0.0,-0.29070267\n2026-09-24T11:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.076139845,0.0,-0.31832662\n2026-09-24T12:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.006410068,0.0,-0.19197994\n2026-09-24T13:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,0.11129718,0.0,0.42633957\n2026-09-24T14:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,0.05872261,0.0,1.0715526\n2026-09-24T15:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.064072035,0.0,0.8865393\n2026-09-24T16:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.085634634,0.0,0.55353594\n2026-09-24T17:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.07777087,0.0,0.23322423"
        },
        {
          "requested": {
            "lat": 42.4357,
            "lon": -8.634
          },
          "reported": {
            "lat": 42.434,
            "lon": -8.633
          },
          "rows": [
            {
              "utc": "2026-09-24T10:00:00.000Z",
              "minute": 720,
              "u": -0.037491933,
              "v": -0.090087265,
              "waterLevel": -0.29038784
            },
            {
              "utc": "2026-09-24T11:00:00.000Z",
              "minute": 780,
              "u": -0.035158627,
              "v": -0.09055165,
              "waterLevel": -0.31813496
            },
            {
              "utc": "2026-09-24T12:00:00.000Z",
              "minute": 840,
              "u": -0.008751359,
              "v": -0.026924187,
              "waterLevel": -0.19253957
            },
            {
              "utc": "2026-09-24T13:00:00.000Z",
              "minute": 900,
              "u": 0.023927381,
              "v": 0.060800444,
              "waterLevel": 0.42836082
            },
            {
              "utc": "2026-09-24T14:00:00.000Z",
              "minute": 960,
              "u": 0.035160888,
              "v": -0.0009239855,
              "waterLevel": 1.0738288
            },
            {
              "utc": "2026-09-24T15:00:00.000Z",
              "minute": 1020,
              "u": -0.025057461,
              "v": -0.07493788,
              "waterLevel": 0.88729113
            },
            {
              "utc": "2026-09-24T16:00:00.000Z",
              "minute": 1080,
              "u": -0.03323388,
              "v": -0.103732795,
              "waterLevel": 0.55433047
            },
            {
              "utc": "2026-09-24T17:00:00.000Z",
              "minute": 1140,
              "u": -0.029480372,
              "v": -0.09920202,
              "waterLevel": 0.23376547
            }
          ],
          "name": "center",
          "url": "https://thredds-meteo.cesga.es/thredds/ncss/grid/MyCoast/MOHID/vigo/latest.ncml?var=uo&var=vo&var=water_level&latitude=42.4357&longitude=-8.634&time_start=2026-09-24T10%3A00%3A00.000Z&time_end=2026-09-24T17%3A00%3A00.000Z&accept=csv",
          "rawCsv": "time,station,latitude[unit=\"degrees_north\"],longitude[unit=\"degrees_east\"],uo[unit=\"m/s\"],vo[unit=\"m/s\"],water_level[unit=\"m\"]\n2026-09-24T10:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.037491933,-0.090087265,-0.29038784\n2026-09-24T11:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.035158627,-0.09055165,-0.31813496\n2026-09-24T12:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.008751359,-0.026924187,-0.19253957\n2026-09-24T13:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,0.023927381,0.060800444,0.42836082\n2026-09-24T14:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,0.035160888,-9.239855E-4,1.0738288\n2026-09-24T15:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.025057461,-0.07493788,0.88729113\n2026-09-24T16:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.03323388,-0.103732795,0.55433047\n2026-09-24T17:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.029480372,-0.09920202,0.23376547"
        },
        {
          "requested": {
            "lat": 42.43693,
            "lon": -8.63273
          },
          "reported": {
            "lat": 42.437,
            "lon": -8.633
          },
          "rows": [
            {
              "utc": "2026-09-24T10:00:00.000Z",
              "minute": 720,
              "u": -8.088005e-18,
              "v": -0.13208714,
              "waterLevel": -0.28747883
            },
            {
              "utc": "2026-09-24T11:00:00.000Z",
              "minute": 780,
              "u": -7.479391e-18,
              "v": -0.12214773,
              "waterLevel": -0.3146601
            },
            {
              "utc": "2026-09-24T12:00:00.000Z",
              "minute": 840,
              "u": -2.7558864e-18,
              "v": -0.04500704,
              "waterLevel": -0.18921818
            },
            {
              "utc": "2026-09-24T13:00:00.000Z",
              "minute": 900,
              "u": 8.324e-18,
              "v": 0.058420803,
              "waterLevel": 0.4329095
            },
            {
              "utc": "2026-09-24T14:00:00.000Z",
              "minute": 960,
              "u": 4.140023e-18,
              "v": -0.020776773,
              "waterLevel": 1.0822297
            },
            {
              "utc": "2026-09-24T15:00:00.000Z",
              "minute": 1020,
              "u": -2.6746548e-18,
              "v": -0.120743036,
              "waterLevel": 0.8950905
            },
            {
              "utc": "2026-09-24T16:00:00.000Z",
              "minute": 1080,
              "u": -6.7560696e-18,
              "v": -0.15582505,
              "waterLevel": 0.5624689
            },
            {
              "utc": "2026-09-24T17:00:00.000Z",
              "minute": 1140,
              "u": -8.150944e-18,
              "v": -0.1458279,
              "waterLevel": 0.24082449
            }
          ],
          "name": "turn",
          "url": "https://thredds-meteo.cesga.es/thredds/ncss/grid/MyCoast/MOHID/vigo/latest.ncml?var=uo&var=vo&var=water_level&latitude=42.43693&longitude=-8.63273&time_start=2026-09-24T10%3A00%3A00.000Z&time_end=2026-09-24T17%3A00%3A00.000Z&accept=csv",
          "rawCsv": "time,station,latitude[unit=\"degrees_north\"],longitude[unit=\"degrees_east\"],uo[unit=\"m/s\"],vo[unit=\"m/s\"],water_level[unit=\"m\"]\n2026-09-24T10:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-8.088005E-18,-0.13208714,-0.28747883\n2026-09-24T11:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-7.479391E-18,-0.12214773,-0.3146601\n2026-09-24T12:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-2.7558864E-18,-0.04500704,-0.18921818\n2026-09-24T13:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,8.324E-18,0.058420803,0.4329095\n2026-09-24T14:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,4.140023E-18,-0.020776773,1.0822297\n2026-09-24T15:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-2.6746548E-18,-0.120743036,0.8950905\n2026-09-24T16:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-6.7560696E-18,-0.15582505,0.5624689\n2026-09-24T17:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-8.150944E-18,-0.1458279,0.24082449"
        }
      ]
    },
    "2026-09-26": {
      "provider": "MeteoGalicia MOHID Vigo/Pontevedra",
      "run": "2026-09-26T00:00:00.000Z",
      "retrievedAt": "2026-09-26T16:09:37.959Z",
      "date": "2026-09-26",
      "resolutionMetres": 300,
      "depth": "Not specified in the retrieved current-variable metadata",
      "metadata": "https://thredds-meteo.cesga.es/thredds/ncss/grid/MyCoast/MOHID/vigo/latest.ncml/dataset.xml",
      "coverage": {
        "startUtc": "2026-09-26T08:00:00.000Z",
        "endUtc": "2026-09-26T17:00:00.000Z"
      },
      "cells": [
        {
          "requested": {
            "lat": 42.43455,
            "lon": -8.63615
          },
          "reported": {
            "lat": 42.434,
            "lon": -8.637
          },
          "rows": [
            {
              "utc": "2026-09-26T08:00:00.000Z",
              "minute": 600,
              "u": -0.080422275,
              "v": 0,
              "waterLevel": -0.10718193
            },
            {
              "utc": "2026-09-26T09:00:00.000Z",
              "minute": 660,
              "u": -0.07317363,
              "v": 0,
              "waterLevel": -0.18050185
            },
            {
              "utc": "2026-09-26T10:00:00.000Z",
              "minute": 720,
              "u": -0.07946922,
              "v": 0,
              "waterLevel": -0.2327804
            },
            {
              "utc": "2026-09-26T11:00:00.000Z",
              "minute": 780,
              "u": -0.07794187,
              "v": 0,
              "waterLevel": -0.2738291
            },
            {
              "utc": "2026-09-26T12:00:00.000Z",
              "minute": 840,
              "u": -0.040168952,
              "v": 0,
              "waterLevel": -0.30517572
            },
            {
              "utc": "2026-09-26T13:00:00.000Z",
              "minute": 900,
              "u": 0.041303635,
              "v": 0,
              "waterLevel": -0.26366705
            },
            {
              "utc": "2026-09-26T14:00:00.000Z",
              "minute": 960,
              "u": 0.1954086,
              "v": 0,
              "waterLevel": 0.30022097
            },
            {
              "utc": "2026-09-26T15:00:00.000Z",
              "minute": 1020,
              "u": 0.10265564,
              "v": 0,
              "waterLevel": 1.172157
            },
            {
              "utc": "2026-09-26T16:00:00.000Z",
              "minute": 1080,
              "u": -0.11116893,
              "v": 0,
              "waterLevel": 1.0862942
            },
            {
              "utc": "2026-09-26T17:00:00.000Z",
              "minute": 1140,
              "u": -0.12983462,
              "v": 0,
              "waterLevel": 0.7647745
            }
          ],
          "name": "start",
          "url": "https://thredds-meteo.cesga.es/thredds/ncss/grid/MyCoast/MOHID/vigo/latest.ncml?var=uo&var=vo&var=water_level&latitude=42.43455&longitude=-8.63615&time_start=2026-09-26T08%3A00%3A00.000Z&time_end=2026-09-26T17%3A00%3A00.000Z&accept=csv",
          "rawCsv": "time,station,latitude[unit=\"degrees_north\"],longitude[unit=\"degrees_east\"],uo[unit=\"m/s\"],vo[unit=\"m/s\"],water_level[unit=\"m\"]\n2026-09-26T08:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.080422275,0.0,-0.10718193\n2026-09-26T09:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.07317363,0.0,-0.18050185\n2026-09-26T10:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.07946922,0.0,-0.2327804\n2026-09-26T11:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.07794187,0.0,-0.2738291\n2026-09-26T12:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.040168952,0.0,-0.30517572\n2026-09-26T13:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,0.041303635,0.0,-0.26366705\n2026-09-26T14:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,0.1954086,0.0,0.30022097\n2026-09-26T15:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,0.10265564,0.0,1.172157\n2026-09-26T16:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.11116893,0.0,1.0862942\n2026-09-26T17:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.12983462,0.0,0.7647745"
        },
        {
          "requested": {
            "lat": 42.4357,
            "lon": -8.634
          },
          "reported": {
            "lat": 42.434,
            "lon": -8.633
          },
          "rows": [
            {
              "utc": "2026-09-26T08:00:00.000Z",
              "minute": 600,
              "u": -0.037417196,
              "v": -0.098777235,
              "waterLevel": -0.106835976
            },
            {
              "utc": "2026-09-26T09:00:00.000Z",
              "minute": 660,
              "u": -0.03370127,
              "v": -0.0898469,
              "waterLevel": -0.18022563
            },
            {
              "utc": "2026-09-26T10:00:00.000Z",
              "minute": 720,
              "u": -0.037409488,
              "v": -0.07465356,
              "waterLevel": -0.23248033
            },
            {
              "utc": "2026-09-26T11:00:00.000Z",
              "minute": 780,
              "u": -0.036765274,
              "v": -0.05533248,
              "waterLevel": -0.27354962
            },
            {
              "utc": "2026-09-26T12:00:00.000Z",
              "minute": 840,
              "u": -0.017715167,
              "v": -0.038615152,
              "waterLevel": -0.304917
            },
            {
              "utc": "2026-09-26T13:00:00.000Z",
              "minute": 900,
              "u": 0.0209088,
              "v": -0.0127218785,
              "waterLevel": -0.26414204
            },
            {
              "utc": "2026-09-26T14:00:00.000Z",
              "minute": 960,
              "u": 0.08677889,
              "v": 0.050562687,
              "waterLevel": 0.30301034
            },
            {
              "utc": "2026-09-26T15:00:00.000Z",
              "minute": 1020,
              "u": 0.052417815,
              "v": 0.024793632,
              "waterLevel": 1.1763515
            },
            {
              "utc": "2026-09-26T16:00:00.000Z",
              "minute": 1080,
              "u": -0.047927227,
              "v": -0.09400095,
              "waterLevel": 1.0860289
            },
            {
              "utc": "2026-09-26T17:00:00.000Z",
              "minute": 1140,
              "u": -0.05213935,
              "v": -0.11627256,
              "waterLevel": 0.76605195
            }
          ],
          "name": "center",
          "url": "https://thredds-meteo.cesga.es/thredds/ncss/grid/MyCoast/MOHID/vigo/latest.ncml?var=uo&var=vo&var=water_level&latitude=42.4357&longitude=-8.634&time_start=2026-09-26T08%3A00%3A00.000Z&time_end=2026-09-26T17%3A00%3A00.000Z&accept=csv",
          "rawCsv": "time,station,latitude[unit=\"degrees_north\"],longitude[unit=\"degrees_east\"],uo[unit=\"m/s\"],vo[unit=\"m/s\"],water_level[unit=\"m\"]\n2026-09-26T08:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.037417196,-0.098777235,-0.106835976\n2026-09-26T09:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.03370127,-0.0898469,-0.18022563\n2026-09-26T10:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.037409488,-0.07465356,-0.23248033\n2026-09-26T11:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.036765274,-0.05533248,-0.27354962\n2026-09-26T12:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.017715167,-0.038615152,-0.304917\n2026-09-26T13:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,0.0209088,-0.0127218785,-0.26414204\n2026-09-26T14:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,0.08677889,0.050562687,0.30301034\n2026-09-26T15:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,0.052417815,0.024793632,1.1763515\n2026-09-26T16:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.047927227,-0.09400095,1.0860289\n2026-09-26T17:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.05213935,-0.11627256,0.76605195"
        },
        {
          "requested": {
            "lat": 42.43693,
            "lon": -8.63273
          },
          "reported": {
            "lat": 42.437,
            "lon": -8.633
          },
          "rows": [
            {
              "utc": "2026-09-26T08:00:00.000Z",
              "minute": 600,
              "u": -7.44803e-18,
              "v": -0.121931046,
              "waterLevel": -0.1033133
            },
            {
              "utc": "2026-09-26T09:00:00.000Z",
              "minute": 660,
              "u": -6.7118754e-18,
              "v": -0.10961324,
              "waterLevel": -0.17618771
            },
            {
              "utc": "2026-09-26T10:00:00.000Z",
              "minute": 720,
              "u": -5.4209066e-18,
              "v": -0.08853012,
              "waterLevel": -0.22783233
            },
            {
              "utc": "2026-09-26T11:00:00.000Z",
              "minute": 780,
              "u": -4.0801354e-18,
              "v": -0.06663367,
              "waterLevel": -0.26782107
            },
            {
              "utc": "2026-09-26T12:00:00.000Z",
              "minute": 840,
              "u": -3.6242447e-18,
              "v": -0.059188403,
              "waterLevel": -0.29762673
            },
            {
              "utc": "2026-09-26T13:00:00.000Z",
              "minute": 900,
              "u": -1.9075074e-18,
              "v": -0.031151963,
              "waterLevel": -0.25691897
            },
            {
              "utc": "2026-09-26T14:00:00.000Z",
              "minute": 960,
              "u": 5.9564312e-18,
              "v": 0.034274828,
              "waterLevel": 0.30860096
            },
            {
              "utc": "2026-09-26T15:00:00.000Z",
              "minute": 1020,
              "u": 4.535149e-18,
              "v": 0.021285253,
              "waterLevel": 1.1866673
            },
            {
              "utc": "2026-09-26T16:00:00.000Z",
              "minute": 1080,
              "u": -4.887245e-18,
              "v": -0.15717821,
              "waterLevel": 1.0932504
            },
            {
              "utc": "2026-09-26T17:00:00.000Z",
              "minute": 1140,
              "u": -6.8912466e-18,
              "v": -0.17818376,
              "waterLevel": 0.7745616
            }
          ],
          "name": "turn",
          "url": "https://thredds-meteo.cesga.es/thredds/ncss/grid/MyCoast/MOHID/vigo/latest.ncml?var=uo&var=vo&var=water_level&latitude=42.43693&longitude=-8.63273&time_start=2026-09-26T08%3A00%3A00.000Z&time_end=2026-09-26T17%3A00%3A00.000Z&accept=csv",
          "rawCsv": "time,station,latitude[unit=\"degrees_north\"],longitude[unit=\"degrees_east\"],uo[unit=\"m/s\"],vo[unit=\"m/s\"],water_level[unit=\"m\"]\n2026-09-26T08:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-7.44803E-18,-0.121931046,-0.1033133\n2026-09-26T09:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-6.7118754E-18,-0.10961324,-0.17618771\n2026-09-26T10:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-5.4209066E-18,-0.08853012,-0.22783233\n2026-09-26T11:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-4.0801354E-18,-0.06663367,-0.26782107\n2026-09-26T12:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-3.6242447E-18,-0.059188403,-0.29762673\n2026-09-26T13:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-1.9075074E-18,-0.031151963,-0.25691897\n2026-09-26T14:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,5.9564312E-18,0.034274828,0.30860096\n2026-09-26T15:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,4.535149E-18,0.021285253,1.1866673\n2026-09-26T16:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-4.887245E-18,-0.15717821,1.0932504\n2026-09-26T17:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-6.8912466E-18,-0.17818376,0.7745616"
        }
      ]
    },
    "2026-09-27": {
      "provider": "MeteoGalicia MOHID Vigo/Pontevedra",
      "run": "2026-09-26T00:00:00.000Z",
      "retrievedAt": "2026-09-26T16:09:37.959Z",
      "date": "2026-09-27",
      "resolutionMetres": 300,
      "depth": "Not specified in the retrieved current-variable metadata",
      "metadata": "https://thredds-meteo.cesga.es/thredds/ncss/grid/MyCoast/MOHID/vigo/latest.ncml/dataset.xml",
      "coverage": {
        "startUtc": "2026-09-27T10:00:00.000Z",
        "endUtc": "2026-09-27T16:00:00.000Z"
      },
      "cells": [
        {
          "requested": {
            "lat": 42.43455,
            "lon": -8.63615
          },
          "reported": {
            "lat": 42.434,
            "lon": -8.637
          },
          "rows": [
            {
              "utc": "2026-09-27T10:00:00.000Z",
              "minute": 720,
              "u": -0.1315003,
              "v": 0,
              "waterLevel": -0.1458458
            },
            {
              "utc": "2026-09-27T11:00:00.000Z",
              "minute": 780,
              "u": -0.1480011,
              "v": 0,
              "waterLevel": -0.18233158
            },
            {
              "utc": "2026-09-27T12:00:00.000Z",
              "minute": 840,
              "u": -0.13343526,
              "v": 0,
              "waterLevel": -0.20651679
            },
            {
              "utc": "2026-09-27T13:00:00.000Z",
              "minute": 900,
              "u": -0.06066849,
              "v": 0,
              "waterLevel": -0.22498423
            },
            {
              "utc": "2026-09-27T14:00:00.000Z",
              "minute": 960,
              "u": 0.19153377,
              "v": 0,
              "waterLevel": -0.04822221
            },
            {
              "utc": "2026-09-27T15:00:00.000Z",
              "minute": 1020,
              "u": 0.15748678,
              "v": 0,
              "waterLevel": 0.6960089
            },
            {
              "utc": "2026-09-27T16:00:00.000Z",
              "minute": 1080,
              "u": -0.03594791,
              "v": 0,
              "waterLevel": 1.2787774
            }
          ],
          "name": "start",
          "url": "https://thredds-meteo.cesga.es/thredds/ncss/grid/MyCoast/MOHID/vigo/latest.ncml?var=uo&var=vo&var=water_level&latitude=42.43455&longitude=-8.63615&time_start=2026-09-27T10%3A00%3A00.000Z&time_end=2026-09-27T16%3A00%3A00.000Z&accept=csv",
          "rawCsv": "time,station,latitude[unit=\"degrees_north\"],longitude[unit=\"degrees_east\"],uo[unit=\"m/s\"],vo[unit=\"m/s\"],water_level[unit=\"m\"]\n2026-09-27T10:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.1315003,0.0,-0.1458458\n2026-09-27T11:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.1480011,0.0,-0.18233158\n2026-09-27T12:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.13343526,0.0,-0.20651679\n2026-09-27T13:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.06066849,0.0,-0.22498423\n2026-09-27T14:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,0.19153377,0.0,-0.04822221\n2026-09-27T15:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,0.15748678,0.0,0.6960089\n2026-09-27T16:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.03594791,0.0,1.2787774"
        },
        {
          "requested": {
            "lat": 42.4357,
            "lon": -8.634
          },
          "reported": {
            "lat": 42.434,
            "lon": -8.633
          },
          "rows": [
            {
              "utc": "2026-09-27T10:00:00.000Z",
              "minute": 720,
              "u": -0.058944847,
              "v": -0.052994587,
              "waterLevel": -0.14480205
            },
            {
              "utc": "2026-09-27T11:00:00.000Z",
              "minute": 780,
              "u": -0.067007326,
              "v": -0.01639244,
              "waterLevel": -0.18107767
            },
            {
              "utc": "2026-09-27T12:00:00.000Z",
              "minute": 840,
              "u": -0.05973654,
              "v": -0.0039080167,
              "waterLevel": -0.2054462
            },
            {
              "utc": "2026-09-27T13:00:00.000Z",
              "minute": 900,
              "u": -0.027639026,
              "v": 0.01504742,
              "waterLevel": -0.2242517
            },
            {
              "utc": "2026-09-27T14:00:00.000Z",
              "minute": 960,
              "u": 0.11074445,
              "v": 0.05836906,
              "waterLevel": -0.04689327
            },
            {
              "utc": "2026-09-27T15:00:00.000Z",
              "minute": 1020,
              "u": 0.08058394,
              "v": 0.05936578,
              "waterLevel": 0.70268667
            },
            {
              "utc": "2026-09-27T16:00:00.000Z",
              "minute": 1080,
              "u": -0.029694388,
              "v": -0.00008849504,
              "waterLevel": 1.2830306
            }
          ],
          "name": "center",
          "url": "https://thredds-meteo.cesga.es/thredds/ncss/grid/MyCoast/MOHID/vigo/latest.ncml?var=uo&var=vo&var=water_level&latitude=42.4357&longitude=-8.634&time_start=2026-09-27T10%3A00%3A00.000Z&time_end=2026-09-27T16%3A00%3A00.000Z&accept=csv",
          "rawCsv": "time,station,latitude[unit=\"degrees_north\"],longitude[unit=\"degrees_east\"],uo[unit=\"m/s\"],vo[unit=\"m/s\"],water_level[unit=\"m\"]\n2026-09-27T10:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.058944847,-0.052994587,-0.14480205\n2026-09-27T11:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.067007326,-0.01639244,-0.18107767\n2026-09-27T12:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.05973654,-0.0039080167,-0.2054462\n2026-09-27T13:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.027639026,0.01504742,-0.2242517\n2026-09-27T14:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,0.11074445,0.05836906,-0.04689327\n2026-09-27T15:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,0.08058394,0.05936578,0.70268667\n2026-09-27T16:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.029694388,-8.849504E-5,1.2830306"
        },
        {
          "requested": {
            "lat": 42.43693,
            "lon": -8.63273
          },
          "reported": {
            "lat": 42.437,
            "lon": -8.633
          },
          "rows": [
            {
              "utc": "2026-09-27T10:00:00.000Z",
              "minute": 720,
              "u": -5.0405607e-18,
              "v": -0.0823186,
              "waterLevel": -0.13978352
            },
            {
              "utc": "2026-09-27T11:00:00.000Z",
              "minute": 780,
              "u": -2.5821731e-18,
              "v": -0.042170085,
              "waterLevel": -0.17644286
            },
            {
              "utc": "2026-09-27T12:00:00.000Z",
              "minute": 840,
              "u": -1.4726842e-18,
              "v": -0.02405076,
              "waterLevel": -0.19944668
            },
            {
              "utc": "2026-09-27T13:00:00.000Z",
              "minute": 900,
              "u": 4.7974537e-19,
              "v": 0.007834838,
              "waterLevel": -0.21575609
            },
            {
              "utc": "2026-09-27T14:00:00.000Z",
              "minute": 960,
              "u": 6.7739177e-18,
              "v": 0.11747788,
              "waterLevel": -0.04021868
            },
            {
              "utc": "2026-09-27T15:00:00.000Z",
              "minute": 1020,
              "u": 7.284322e-18,
              "v": 0.14748737,
              "waterLevel": 0.70867807
            },
            {
              "utc": "2026-09-27T16:00:00.000Z",
              "minute": 1080,
              "u": 5.1149495e-18,
              "v": -0.041178126,
              "waterLevel": 1.2944016
            }
          ],
          "name": "turn",
          "url": "https://thredds-meteo.cesga.es/thredds/ncss/grid/MyCoast/MOHID/vigo/latest.ncml?var=uo&var=vo&var=water_level&latitude=42.43693&longitude=-8.63273&time_start=2026-09-27T10%3A00%3A00.000Z&time_end=2026-09-27T16%3A00%3A00.000Z&accept=csv",
          "rawCsv": "time,station,latitude[unit=\"degrees_north\"],longitude[unit=\"degrees_east\"],uo[unit=\"m/s\"],vo[unit=\"m/s\"],water_level[unit=\"m\"]\n2026-09-27T10:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-5.0405607E-18,-0.0823186,-0.13978352\n2026-09-27T11:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-2.5821731E-18,-0.042170085,-0.17644286\n2026-09-27T12:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-1.4726842E-18,-0.02405076,-0.19944668\n2026-09-27T13:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,4.7974537E-19,0.007834838,-0.21575609\n2026-09-27T14:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,6.7739177E-18,0.11747788,-0.04021868\n2026-09-27T15:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,7.284322E-18,0.14748737,0.70867807\n2026-09-27T16:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,5.1149495E-18,-0.041178126,1.2944016"
        }
      ]
    }
  }
};
  if (typeof module !== 'undefined' && module.exports) module.exports = snapshot;
  else globalThis.LerezRegional = snapshot;
})();
