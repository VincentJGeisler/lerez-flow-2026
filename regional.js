/* Official regional forecast snapshot. Raw responses retained for audit. */
(() => {
  const legacySnapshot = {
  "provider": "MeteoGalicia MOHID Vigo/Pontevedra",
  "run": "2026-09-23T00:00:00Z",
  "retrievedOn": "2026-09-23",
  "date": "2026-09-24",
  "resolutionMetres": 300,
  "depth": "Not specified in the retrieved current-variable metadata",
  "metadata": "https://thredds-meteo.cesga.es/thredds/ncss/grid/MyCoast/MOHID/vigo/MyCOAST_V1_MeteoGalicia_MOHID_vigo_01hr_2026092300_PR.ncml/dataset.xml",
  "cells": [
    {
      "name": "start",
      "requested": {
        "lat": 42.43455,
        "lon": -8.63615
      },
      "reported": {
        "lat": 42.434,
        "lon": -8.637
      },
      "url": "https://thredds-meteo.cesga.es/thredds/ncss/grid/MyCoast/MOHID/vigo/MyCOAST_V1_MeteoGalicia_MOHID_vigo_01hr_2026092300_PR.ncml?var=uo&var=vo&var=water_level&latitude=42.43455&longitude=-8.63615&time_start=2026-09-24T10%3A00%3A00Z&time_end=2026-09-24T17%3A00%3A00Z&accept=csv",
      "rows": [
        {
          "utc": "2026-09-24T10:00:00Z",
          "minute": 720,
          "u": -0.08950075,
          "v": 0,
          "waterLevel": -0.31236365
        },
        {
          "utc": "2026-09-24T11:00:00Z",
          "minute": 780,
          "u": -0.08113504,
          "v": 0,
          "waterLevel": -0.28422427
        },
        {
          "utc": "2026-09-24T12:00:00Z",
          "minute": 840,
          "u": 0.027164882,
          "v": 0,
          "waterLevel": 0.08344073
        },
        {
          "utc": "2026-09-24T13:00:00Z",
          "minute": 900,
          "u": 0.08398898,
          "v": 0,
          "waterLevel": 0.74188066
        },
        {
          "utc": "2026-09-24T14:00:00Z",
          "minute": 960,
          "u": -0.072401576,
          "v": 0,
          "waterLevel": 0.8832065
        },
        {
          "utc": "2026-09-24T15:00:00Z",
          "minute": 1020,
          "u": -0.09407237,
          "v": 0,
          "waterLevel": 0.5878491
        },
        {
          "utc": "2026-09-24T16:00:00Z",
          "minute": 1080,
          "u": -0.12244268,
          "v": 0,
          "waterLevel": 0.28428772
        },
        {
          "utc": "2026-09-24T17:00:00Z",
          "minute": 1140,
          "u": -0.11224899,
          "v": 0,
          "waterLevel": 0.060264267
        }
      ],
      "rawCsv": "time,station,latitude[unit=\"degrees_north\"],longitude[unit=\"degrees_east\"],uo[unit=\"m/s\"],vo[unit=\"m/s\"],water_level[unit=\"m\"]\n2026-09-24T10:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.08950075,0.0,-0.31236365\n2026-09-24T11:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.08113504,0.0,-0.28422427\n2026-09-24T12:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,0.027164882,0.0,0.08344073\n2026-09-24T13:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,0.08398898,0.0,0.74188066\n2026-09-24T14:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.072401576,0.0,0.8832065\n2026-09-24T15:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.09407237,0.0,0.5878491\n2026-09-24T16:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.12244268,0.0,0.28428772\n2026-09-24T17:00:00Z,GridPointRequestedAt[42,435N_8,636W],42.434,-8.637,-0.11224899,0.0,0.060264267"
    },
    {
      "name": "center",
      "requested": {
        "lat": 42.4357,
        "lon": -8.634
      },
      "reported": {
        "lat": 42.434,
        "lon": -8.633
      },
      "url": "https://thredds-meteo.cesga.es/thredds/ncss/grid/MyCoast/MOHID/vigo/MyCOAST_V1_MeteoGalicia_MOHID_vigo_01hr_2026092300_PR.ncml?var=uo&var=vo&var=water_level&latitude=42.4357&longitude=-8.634&time_start=2026-09-24T10%3A00%3A00Z&time_end=2026-09-24T17%3A00%3A00Z&accept=csv",
      "rows": [
        {
          "utc": "2026-09-24T10:00:00Z",
          "minute": 720,
          "u": -0.04109601,
          "v": -0.040143833,
          "waterLevel": -0.31220454
        },
        {
          "utc": "2026-09-24T11:00:00Z",
          "minute": 780,
          "u": -0.038290918,
          "v": 0.0036676826,
          "waterLevel": -0.2844818
        },
        {
          "utc": "2026-09-24T12:00:00Z",
          "minute": 840,
          "u": 0.0038080795,
          "v": 0.080932155,
          "waterLevel": 0.084154695
        },
        {
          "utc": "2026-09-24T13:00:00Z",
          "minute": 900,
          "u": 0.03714887,
          "v": 0.082870066,
          "waterLevel": 0.7438528
        },
        {
          "utc": "2026-09-24T14:00:00Z",
          "minute": 960,
          "u": -0.024136748,
          "v": -0.0072745844,
          "waterLevel": 0.88433707
        },
        {
          "utc": "2026-09-24T15:00:00Z",
          "minute": 1020,
          "u": -0.03955867,
          "v": -0.043909896,
          "waterLevel": 0.5886302
        },
        {
          "utc": "2026-09-24T16:00:00Z",
          "minute": 1080,
          "u": -0.05065228,
          "v": -0.07997325,
          "waterLevel": 0.28510135
        },
        {
          "utc": "2026-09-24T17:00:00Z",
          "minute": 1140,
          "u": -0.04699146,
          "v": -0.09897407,
          "waterLevel": 0.060858496
        }
      ],
      "rawCsv": "time,station,latitude[unit=\"degrees_north\"],longitude[unit=\"degrees_east\"],uo[unit=\"m/s\"],vo[unit=\"m/s\"],water_level[unit=\"m\"]\n2026-09-24T10:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.04109601,-0.040143833,-0.31220454\n2026-09-24T11:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.038290918,0.0036676826,-0.2844818\n2026-09-24T12:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,0.0038080795,0.080932155,0.084154695\n2026-09-24T13:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,0.03714887,0.082870066,0.7438528\n2026-09-24T14:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.024136748,-0.0072745844,0.88433707\n2026-09-24T15:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.03955867,-0.043909896,0.5886302\n2026-09-24T16:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.05065228,-0.07997325,0.28510135\n2026-09-24T17:00:00Z,GridPointRequestedAt[42,436N_8,634W],42.434,-8.633,-0.04699146,-0.09897407,0.060858496"
    },
    {
      "name": "turn",
      "requested": {
        "lat": 42.43693,
        "lon": -8.63273
      },
      "reported": {
        "lat": 42.437,
        "lon": -8.633
      },
      "url": "https://thredds-meteo.cesga.es/thredds/ncss/grid/MyCoast/MOHID/vigo/MyCOAST_V1_MeteoGalicia_MOHID_vigo_01hr_2026092300_PR.ncml?var=uo&var=vo&var=water_level&latitude=42.43693&longitude=-8.63273&time_start=2026-09-24T10%3A00%3A00Z&time_end=2026-09-24T17%3A00%3A00Z&accept=csv",
      "rows": [
        {
          "utc": "2026-09-24T10:00:00Z",
          "minute": 720,
          "u": -3.571815e-18,
          "v": -0.058332164,
          "waterLevel": -0.30543834
        },
        {
          "utc": "2026-09-24T11:00:00Z",
          "minute": 780,
          "u": 5.6862417e-19,
          "v": 0.009286338,
          "waterLevel": -0.277991
        },
        {
          "utc": "2026-09-24T12:00:00Z",
          "minute": 840,
          "u": 3.6875807e-18,
          "v": 0.14486805,
          "waterLevel": 0.089567155
        },
        {
          "utc": "2026-09-24T13:00:00Z",
          "minute": 900,
          "u": 5.2013866e-18,
          "v": 0.15140481,
          "waterLevel": 0.7509373
        },
        {
          "utc": "2026-09-24T14:00:00Z",
          "minute": 960,
          "u": -3.6324255e-18,
          "v": -0.024898473,
          "waterLevel": 0.8932582
        },
        {
          "utc": "2026-09-24T15:00:00Z",
          "minute": 1020,
          "u": -5.3759684e-18,
          "v": -0.06934012,
          "waterLevel": 0.5981403
        },
        {
          "utc": "2026-09-24T16:00:00Z",
          "minute": 1080,
          "u": -7.848018e-18,
          "v": -0.12777252,
          "waterLevel": 0.29435736
        },
        {
          "utc": "2026-09-24T17:00:00Z",
          "minute": 1140,
          "u": -8.815916e-18,
          "v": -0.15979443,
          "waterLevel": 0.06908709
        }
      ],
      "rawCsv": "time,station,latitude[unit=\"degrees_north\"],longitude[unit=\"degrees_east\"],uo[unit=\"m/s\"],vo[unit=\"m/s\"],water_level[unit=\"m\"]\n2026-09-24T10:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-3.571815E-18,-0.058332164,-0.30543834\n2026-09-24T11:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,5.6862417E-19,0.009286338,-0.277991\n2026-09-24T12:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,3.6875807E-18,0.14486805,0.089567155\n2026-09-24T13:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,5.2013866E-18,0.15140481,0.7509373\n2026-09-24T14:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-3.6324255E-18,-0.024898473,0.8932582\n2026-09-24T15:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-5.3759684E-18,-0.06934012,0.5981403\n2026-09-24T16:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-7.848018E-18,-0.12777252,0.29435736\n2026-09-24T17:00:00Z,GridPointRequestedAt[42,437N_8,633W],42.437,-8.633,-8.815916E-18,-0.15979443,0.06908709"
    }
  ]
};
  const snapshot = {
    schemaVersion: 2,
    courseCells: [
      { name: 'start', requested: { lat: 42.43455, lon: -8.63615 } },
      { name: 'center', requested: { lat: 42.4357, lon: -8.634 } },
      { name: 'turn', requested: { lat: 42.43693, lon: -8.63273 } }
    ],
    retrievedAt: null,
    forecastByDate: { [legacySnapshot.date]: legacySnapshot }
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = snapshot;
  else globalThis.LerezRegional = snapshot;
})();
