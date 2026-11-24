/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getBestParkForCurrentSeason,
  filterWeatherByRegion,
  calculateAverageNationalTemp,
} from './climateLogic';
import { INITIAL_PARK_WEATHER_DATA } from '../data/climateData';

test('getBestParkForCurrentSeason identifies top suitability park', () => {
  const top = getBestParkForCurrentSeason(INITIAL_PARK_WEATHER_DATA);
  assert.ok(top !== null);
  assert.ok(top.safariSuitabilityScore >= 9.5);
  assert.equal(top.parkId, 'maasai-mara'); // Mara has 9.8 score
});

test('filterWeatherByRegion searches by name or region query', () => {
  const amboseli = filterWeatherByRegion(INITIAL_PARK_WEATHER_DATA, 'Amboseli');
  assert.equal(amboseli.length, 1);
  assert.equal(amboseli[0].parkId, 'amboseli');

  const coast = filterWeatherByRegion(INITIAL_PARK_WEATHER_DATA, 'coast');
  assert.ok(coast.length >= 1);
});

test('calculateAverageNationalTemp computes realistic Kenyan savannah average', () => {
  const avg = calculateAverageNationalTemp(INITIAL_PARK_WEATHER_DATA);
  assert.ok(avg >= 20 && avg <= 30);
});
