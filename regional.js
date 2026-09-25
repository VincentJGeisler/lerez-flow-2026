/* Automatically refreshed official regional forecast snapshots. */
(() => {
  const snapshot = {
  "schemaVersion": 2,
  "provider": "MeteoGalicia MOHID Vigo/Pontevedra",
  "metadata": "https://thredds-meteo.cesga.es/thredds/ncss/grid/MyCoast/MOHID/vigo/latest.ncml/dataset.xml",
  "retrievedAt": "2026-09-25T16:57:56.270Z",
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
      "run": "2026-09-25T00:00:00.000Z",
      "retrievedAt": "2026-09-25T16:57:56.270Z",
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
              "u": -0.08346994,
              "v": 0,
              "waterLevel": -0.10724515
            },
            {
              "utc": "2026-09-26T09:00:00.000Z",
              "minute": 660,
              "u": -0.07385585,
              "v": 0,
              "waterLevel": -0.1803906
            },
            {
              "utc": "2026-09-26T10:00:00.000Z",
              "minute": 720,
              "u": -0.07677904,
              "v": 0,
              "waterLevel": -0.23282522
            },
            {
              "utc": "2026-09-26T11:00:00.000Z",
              "minute": 780,
              "u": -0.07442089,
              "v": 0,
              "waterLevel": -0.2738213
            },
            {
              "utc": "2026-09-26T12:00:00.000Z",
              "minute": 840,
              "u": -0.07555473,
              "v": 0,
              "waterLevel": -0.30582887
            },
            {
              "utc": "2026-09-26T13:00:00.000Z",
              "minute": 900,
              "u": 0.015164907,
              "v": 0,
              "waterLevel": -0.2668117
            },
            {
              "utc": "2026-09-26T14:00:00.000Z",
              "minute": 960,
              "u": 0.16543856,
              "v": 0,
              "waterLevel": 0.2921806
            },
            {
              "utc": "2026-09-26T15:00:00.000Z",
              "minute": 1020,
              "u": 0.11943565,
              "v": 0,
              "waterLevel": 1.1511157
            },
            {
              "utc": "2026-09-26T16:00:00.000Z",
              "minute": 1080,
              "u": -0.09262607,
              "v": 0,
              "waterLevel": 1.0858377
            },
            {
              "utc": "2026-09-26T17:00:00.000Z",
              "minute": 1140,
              "u": -0.117737696,
              "v": 0,
              "waterLevel": 0.7684281
            }
          ],
          "name": "start",
          "url": "https://thredds-meteo.cesga.es/thredds/ncss/grid/MyCoast/MOHID/vigo/latest.ncml?var=uo&var=vo&var=water_level&latitude=42.43455&longitude=-8.63615&time_start=2026-09-26T08%3A00%3A00.000Z&time_end=2026-09-26T17%3A00%3A00.000Z&accept=csv",
          "rawCsv": "time,station,latitude[unit=\"degrees_north\"],longitude[unit=\"degrees_east\"],uo[unit=\"m/s\"],vo[unit=\"m/s\"],water_level[unit=\"m\"]\n2026-09-26T08:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.08346994,0.0,-0.10724515\n2026-09-26T09:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.07385585,0.0,-0.1803906\n2026-09-26T10:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.07677904,0.0,-0.23282522\n2026-09-26T11:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.07442089,0.0,-0.2738213\n2026-09-26T12:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.07555473,0.0,-0.30582887\n2026-09-26T13:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,0.015164907,0.0,-0.2668117\n2026-09-26T14:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,0.16543856,0.0,0.2921806\n2026-09-26T15:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,0.11943565,0.0,1.1511157\n2026-09-26T16:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.09262607,0.0,1.0858377\n2026-09-26T17:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.117737696,0.0,0.7684281"
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
              "u": -0.038942896,
              "v": -0.08166079,
              "waterLevel": -0.10692447
            },
            {
              "utc": "2026-09-26T09:00:00.000Z",
              "minute": 660,
              "u": -0.0335608,
              "v": -0.078843296,
              "waterLevel": -0.18017195
            },
            {
              "utc": "2026-09-26T10:00:00.000Z",
              "minute": 720,
              "u": -0.03598289,
              "v": -0.068186186,
              "waterLevel": -0.23251076
            },
            {
              "utc": "2026-09-26T11:00:00.000Z",
              "minute": 780,
              "u": -0.034793116,
              "v": -0.058009975,
              "waterLevel": -0.27351853
            },
            {
              "utc": "2026-09-26T12:00:00.000Z",
              "minute": 840,
              "u": -0.036098473,
              "v": -0.057139304,
              "waterLevel": -0.30562472
            },
            {
              "utc": "2026-09-26T13:00:00.000Z",
              "minute": 900,
              "u": 0.008769423,
              "v": -0.04627346,
              "waterLevel": -0.2674632
            },
            {
              "utc": "2026-09-26T14:00:00.000Z",
              "minute": 960,
              "u": 0.060418643,
              "v": 0.050981108,
              "waterLevel": 0.29512206
            },
            {
              "utc": "2026-09-26T15:00:00.000Z",
              "minute": 1020,
              "u": 0.06926612,
              "v": 0.018471349,
              "waterLevel": 1.1551532
            },
            {
              "utc": "2026-09-26T16:00:00.000Z",
              "minute": 1080,
              "u": -0.039504927,
              "v": -0.079381615,
              "waterLevel": 1.0862836
            },
            {
              "utc": "2026-09-26T17:00:00.000Z",
              "minute": 1140,
              "u": -0.04686995,
              "v": -0.115057,
              "waterLevel": 0.77026474
            }
          ],
          "name": "center",
          "url": "https://thredds-meteo.cesga.es/thredds/ncss/grid/MyCoast/MOHID/vigo/latest.ncml?var=uo&var=vo&var=water_level&latitude=42.4357&longitude=-8.634&time_start=2026-09-26T08%3A00%3A00.000Z&time_end=2026-09-26T17%3A00%3A00.000Z&accept=csv",
          "rawCsv": "time,station,latitude[unit=\"degrees_north\"],longitude[unit=\"degrees_east\"],uo[unit=\"m/s\"],vo[unit=\"m/s\"],water_level[unit=\"m\"]\n2026-09-26T08:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.038942896,-0.08166079,-0.10692447\n2026-09-26T09:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.0335608,-0.078843296,-0.18017195\n2026-09-26T10:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.03598289,-0.068186186,-0.23251076\n2026-09-26T11:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.034793116,-0.058009975,-0.27351853\n2026-09-26T12:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.036098473,-0.057139304,-0.30562472\n2026-09-26T13:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,0.008769423,-0.04627346,-0.2674632\n2026-09-26T14:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,0.060418643,0.050981108,0.29512206\n2026-09-26T15:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,0.06926612,0.018471349,1.1551532\n2026-09-26T16:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.039504927,-0.079381615,1.0862836\n2026-09-26T17:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.04686995,-0.115057,0.77026474"
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
              "u": -7.114127e-18,
              "v": -0.116274,
              "waterLevel": -0.101813756
            },
            {
              "utc": "2026-09-26T09:00:00.000Z",
              "minute": 660,
              "u": -6.541327e-18,
              "v": -0.10682796,
              "waterLevel": -0.17471121
            },
            {
              "utc": "2026-09-26T10:00:00.000Z",
              "minute": 720,
              "u": -5.293817e-18,
              "v": -0.086454585,
              "waterLevel": -0.22677258
            },
            {
              "utc": "2026-09-26T11:00:00.000Z",
              "minute": 780,
              "u": -4.560461e-18,
              "v": -0.07447798,
              "waterLevel": -0.26650682
            },
            {
              "utc": "2026-09-26T12:00:00.000Z",
              "minute": 840,
              "u": -5.586471e-18,
              "v": -0.09123398,
              "waterLevel": -0.29730347
            },
            {
              "utc": "2026-09-26T13:00:00.000Z",
              "minute": 900,
              "u": -4.8623058e-18,
              "v": -0.07940747,
              "waterLevel": -0.26183125
            },
            {
              "utc": "2026-09-26T14:00:00.000Z",
              "minute": 960,
              "u": 5.4494684e-18,
              "v": 0.048443004,
              "waterLevel": 0.2976697
            },
            {
              "utc": "2026-09-26T15:00:00.000Z",
              "minute": 1020,
              "u": 5.1461656e-18,
              "v": 0.009252447,
              "waterLevel": 1.1649506
            },
            {
              "utc": "2026-09-26T16:00:00.000Z",
              "minute": 1080,
              "u": -3.859072e-18,
              "v": -0.13486044,
              "waterLevel": 1.0946066
            },
            {
              "utc": "2026-09-26T17:00:00.000Z",
              "minute": 1140,
              "u": -6.4847684e-18,
              "v": -0.18248,
              "waterLevel": 0.77939457
            }
          ],
          "name": "turn",
          "url": "https://thredds-meteo.cesga.es/thredds/ncss/grid/MyCoast/MOHID/vigo/latest.ncml?var=uo&var=vo&var=water_level&latitude=42.43693&longitude=-8.63273&time_start=2026-09-26T08%3A00%3A00.000Z&time_end=2026-09-26T17%3A00%3A00.000Z&accept=csv",
          "rawCsv": "time,station,latitude[unit=\"degrees_north\"],longitude[unit=\"degrees_east\"],uo[unit=\"m/s\"],vo[unit=\"m/s\"],water_level[unit=\"m\"]\n2026-09-26T08:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-7.114127E-18,-0.116274,-0.101813756\n2026-09-26T09:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-6.541327E-18,-0.10682796,-0.17471121\n2026-09-26T10:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-5.293817E-18,-0.086454585,-0.22677258\n2026-09-26T11:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-4.560461E-18,-0.07447798,-0.26650682\n2026-09-26T12:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-5.586471E-18,-0.09123398,-0.29730347\n2026-09-26T13:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-4.8623058E-18,-0.07940747,-0.26183125\n2026-09-26T14:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,5.4494684E-18,0.048443004,0.2976697\n2026-09-26T15:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,5.1461656E-18,0.009252447,1.1649506\n2026-09-26T16:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-3.859072E-18,-0.13486044,1.0946066\n2026-09-26T17:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-6.4847684E-18,-0.18248,0.77939457"
        }
      ]
    }
  }
};
  if (typeof module !== 'undefined' && module.exports) module.exports = snapshot;
  else globalThis.LerezRegional = snapshot;
})();
