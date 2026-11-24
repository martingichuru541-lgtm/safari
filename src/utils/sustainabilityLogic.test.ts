/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTotalTreesPlanted,
  filterActiveTravelAlerts,
  calculateTotalWildlifeGrowth,
} from './sustainabilityLogic';
import { REFORESTATION_PROJECTS, WILDLIFE_CENSUS_DATA } from '../data/sustainability';
import { INITIAL_TRAVEL_ALERTS } from '../data/travelAlerts';

test('calculateTotalTreesPlanted computes accurate sum and percentage', () => {
  const result = calculateTotalTreesPlanted(REFORESTATION_PROJECTS);
  assert.equal(result.totalPlanted, 142500 + 86400 + 68900); // 297,800
  assert.equal(result.totalTarget, 250000 + 120000 + 100000); // 470,000
  assert.equal(result.overallProgressPercent, Math.round((297800 / 470000) * 100)); // 63%
});

test('filterActiveTravelAlerts filters by active status, type, and keyword', () => {
  const allActive = filterActiveTravelAlerts(INITIAL_TRAVEL_ALERTS);
  assert.equal(allActive.length, INITIAL_TRAVEL_ALERTS.length);

  const migrationAlerts = filterActiveTravelAlerts(INITIAL_TRAVEL_ALERTS, { type: 'migration_timing' });
  assert.equal(migrationAlerts.length, 1);
  assert.equal(migrationAlerts[0].type, 'migration_timing');

  const lamuAlerts = filterActiveTravelAlerts(INITIAL_TRAVEL_ALERTS, { regionQuery: 'lamu' });
  assert.equal(lamuAlerts.length, 1);
  assert.ok(lamuAlerts[0].title.includes('Lamu'));
});

test('calculateTotalWildlifeGrowth computes average growth rate and total counts', () => {
  const result = calculateTotalWildlifeGrowth(WILDLIFE_CENSUS_DATA);
  assert.ok(result.totalYear2026Individuals > 40000);
  assert.ok(result.averageGrowthRate > 0);
});
