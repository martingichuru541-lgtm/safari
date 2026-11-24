/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTripPrice,
  calculateCommission,
  validateInquiryForm,
} from './marketplaceRules';

test('calculateTripPrice computes regular season price correctly', () => {
  const result = calculateTripPrice({
    basePricePerPerson: 1000,
    travelers: 2,
    durationDays: 3,
    season: 'regular',
    vehicleTier: 'standard_cruiser',
    privateSafari: false,
    parkFeesIncluded: true,
  });

  // Base: 2000. Group discount (2 travelers) = 5% -> 1900.
  // Vehicle: 190 * 3 = 570.
  // Total = 1900 + 570 = 2470.
  assert.equal(result.discountedTotal, 1900);
  assert.equal(result.vehicleSurcharge, 570);
  assert.equal(result.estimatedTotal, 2470);
  assert.equal(result.pricePerPerson, 1235);
});

test('calculateTripPrice handles peak season multiplier and group discount for 6 travelers', () => {
  const result = calculateTripPrice({
    basePricePerPerson: 1000,
    travelers: 6,
    durationDays: 4,
    season: 'peak',
    vehicleTier: 'luxury_vip_cruiser',
    privateSafari: true,
    parkFeesIncluded: false,
    parkFeesPerDayPerAdult: 100,
  });

  // Base: 6000 * 1.35 = 8100.
  // Discount (6 travelers) = 15% -> 8100 * 0.85 = 6885.
  // Vehicle: 280 * 4 = 1120.
  // Private fee: 150 * 4 = 600.
  // Park fees: 100 * 6 * 4 = 2400.
  // Total = 6885 + 1120 + 600 + 2400 = 11005.
  assert.equal(result.seasonAdjustedBase, 8100);
  assert.equal(result.groupDiscountPercent, 15);
  assert.equal(result.discountedTotal, 6885);
  assert.equal(result.vehicleSurcharge, 1120);
  assert.equal(result.privateFee, 600);
  assert.equal(result.parkFeesTotal, 2400);
  assert.equal(result.estimatedTotal, 11005);
});

test('calculateCommission computes correct partner rev share', () => {
  const lodgeBooking = calculateCommission({
    bookingAmount: 5000,
    partnerType: 'direct_lodge',
  });
  // 15% of 5000 = 750
  assert.equal(lodgeBooking.commissionEarned, 750);
  assert.equal(lodgeBooking.kenyaOneNetShare, 750);
  assert.equal(lodgeBooking.partnerNetShare, 4250);

  const customRate = calculateCommission({
    bookingAmount: 3000,
    partnerType: 'tour_operator',
    customRatePercent: 8,
  });
  // 8% of 3000 = 240
  assert.equal(customRate.commissionEarned, 240);
  assert.equal(customRate.partnerNetShare, 2760);
});

test('validateInquiryForm correctly flags missing or invalid fields', () => {
  const invalid = validateInquiryForm({
    fullName: '',
    email: 'invalid-email',
    travelDate: '',
    travelers: 0,
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.travelDate);
  assert.ok(invalid.errors.travelers);

  const valid = validateInquiryForm({
    fullName: 'Juma Kiprono',
    email: 'juma@safari.com',
    travelDate: '2026-08-15',
    travelers: 4,
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});
