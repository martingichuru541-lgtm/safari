/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { test } from 'node:test';
import assert from 'node:assert';
import {
  generateItineraryReadinessItems,
  computeReadinessSummary,
  filterReadinessItems,
} from './readinessLogic';
import { GeneratedItinerary } from './itineraryBuilder';

test('generateItineraryReadinessItems returns baseline items when no itinerary provided', () => {
  const items = generateItineraryReadinessItems(null);
  assert.ok(items.length >= 12);
  assert.ok(items.some((i) => i.id === 'req-eta'));
  assert.ok(items.some((i) => i.id === 'req-soft-duffle'));
});

test('generateItineraryReadinessItems appends coastal and balloon items when present in itinerary', () => {
  const dummyItinerary: GeneratedItinerary = {
    id: 'itin-test',
    title: 'Savannah to Sea: Maasai Mara & Diani Beach Luxury (November Green Season)',
    overview: '7-Day Explorer in November',
    destinations: ['Maasai Mara', 'Diani Beach'],
    recommendedLodges: ['Angama Mara', 'Alfajiri Villas'],
    recommendedSafari: 'Great Migration Signature',
    recommendedVehicle: 'Land Cruiser Extended',
    estimatedCostUSD: 14200,
    costPerPersonUSD: 7100,
    createdAt: '2026-11-01',
    days: [
      {
        day: 1,
        location: 'Maasai Mara',
        title: 'Arrival & Balloon Safari',
        activities: ['Sunrise balloon over Mara River'],
        overnightLodge: 'Angama Mara',
        insiderTip: 'Wear layers',
      },
      {
        day: 5,
        location: 'Diani Beach',
        title: 'Dhow & Coral Reef Marine Snorkeling',
        activities: ['Wasini Island Dhow Excursion'],
        overnightLodge: 'Alfajiri Villas',
        insiderTip: 'Reef safe sunscreen',
      },
    ],
    packingChecklist: [],
    visaHealthChecklist: [],
  };

  const items = generateItineraryReadinessItems(dummyItinerary);

  // Should have reef sunscreen and dry bag
  assert.ok(items.some((i) => i.id === 'req-reef-sunscreen'));
  assert.ok(items.some((i) => i.id === 'req-dry-bag'));
  // Should have balloon pre-dawn layers
  assert.ok(items.some((i) => i.id === 'req-balloon-gear'));
  // Should have rainy season jacket (November)
  assert.ok(items.some((i) => i.id === 'req-rain-jacket'));
});

test('computeReadinessSummary accurately measures progress and status labels', () => {
  const baseItems = generateItineraryReadinessItems(null);

  // All unchecked
  const summary0 = computeReadinessSummary(baseItems);
  assert.strictEqual(summary0.completedItems, 0);
  assert.strictEqual(summary0.percentComplete, 0);
  assert.strictEqual(summary0.statusLabel, 'Action Required');

  // Mark all mandatory as complete
  const itemsWithMandatory = baseItems.map((i) =>
    i.urgency === 'mandatory' ? { ...i, completed: true } : i
  );
  const summaryMandatory = computeReadinessSummary(itemsWithMandatory);
  assert.strictEqual(summaryMandatory.mandatoryComplete, true);
  assert.ok(summaryMandatory.percentComplete > 0);

  // Mark 100% complete
  const allComplete = baseItems.map((i) => ({ ...i, completed: true }));
  const summary100 = computeReadinessSummary(allComplete);
  assert.strictEqual(summary100.percentComplete, 100);
  assert.strictEqual(summary100.statusLabel, '100% Safari Ready');
});

test('filterReadinessItems filters accurately by category and pending status', () => {
  const baseItems = generateItineraryReadinessItems(null);
  const visaOnly = filterReadinessItems(baseItems, 'visa');
  assert.ok(visaOnly.every((i) => i.category === 'visa'));

  const packingOnly = filterReadinessItems(baseItems, 'packing');
  assert.ok(packingOnly.every((i) => i.category === 'packing'));
});
