/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { filterFlights, calculateConnectionFeasibility } from './flightLogic';
import { INITIAL_FLIGHTS } from '../data/flightData';

test('filterFlights filters by airport accurately', () => {
  const jkiaOnly = filterFlights(INITIAL_FLIGHTS, { airport: 'JKIA' });
  assert.ok(jkiaOnly.length > 0);
  assert.ok(jkiaOnly.every((f) => f.airport === 'JKIA'));

  const wilsonOnly = filterFlights(INITIAL_FLIGHTS, { airport: 'Wilson' });
  assert.ok(wilsonOnly.length > 0);
  assert.ok(wilsonOnly.every((f) => f.airport === 'Wilson'));
});

test('filterFlights filters by direction and query', () => {
  const arrivals = filterFlights(INITIAL_FLIGHTS, { direction: 'arrival' });
  assert.ok(arrivals.length > 0);
  assert.ok(arrivals.every((f) => f.direction === 'arrival'));

  const maraFlights = filterFlights(INITIAL_FLIGHTS, { query: 'Maasai Mara' });
  assert.ok(maraFlights.length > 0);
  assert.ok(maraFlights.some((f) => f.flightNumber === 'SAF 012'));
});

test('calculateConnectionFeasibility accurately assesses connection windows', () => {
  // Case 1: KQ 101 lands at 06:15, SAF 012 departs at 08:15 (120 min window)
  const result1 = calculateConnectionFeasibility('06:15', '08:15', 25);
  assert.strictEqual(result1.isFeasible, true);
  assert.strictEqual(result1.bufferMinutes, 120);
  assert.strictEqual(result1.status, 'Tight');

  // Case 2: Lands 06:15, departs 07:15 (60 min window -> Impossible)
  const result2 = calculateConnectionFeasibility('06:15', '07:15', 25);
  assert.strictEqual(result2.isFeasible, false);
  assert.strictEqual(result2.status, 'Critical / Impossible');

  // Case 3: Lands 06:15, departs 10:00 (225 min window -> Comfortable)
  const result3 = calculateConnectionFeasibility('06:15', '10:00', 25);
  assert.strictEqual(result3.isFeasible, true);
  assert.strictEqual(result3.status, 'Comfortable');
});
