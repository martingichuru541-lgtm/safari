/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PricingOptions {
  basePricePerPerson: number;
  travelers: number;
  durationDays: number;
  season: 'low' | 'regular' | 'peak'; // Peak: July-Oct Great Migration & Dec-Jan
  vehicleTier?: 'standard_cruiser' | 'luxury_vip_cruiser' | 'safari_van';
  privateSafari?: boolean;
  parkFeesIncluded?: boolean;
  parkFeesPerDayPerAdult?: number;
}

export interface PriceBreakdown {
  baseTotal: number;
  seasonalMultiplier: number;
  seasonAdjustedBase: number;
  groupDiscountPercent: number;
  discountedTotal: number;
  vehicleSurcharge: number;
  privateFee: number;
  parkFeesTotal: number;
  estimatedTotal: number;
  pricePerPerson: number;
  currency: string;
}

export interface CommissionInput {
  bookingAmount: number;
  partnerType: 'direct_lodge' | 'tour_operator' | 'vehicle_fleet' | 'affiliate_ota';
  customRatePercent?: number;
}

export interface CommissionResult extends CommissionInput {
  commissionEarned: number;
  kenyaOneNetShare: number;
  partnerNetShare: number;
}

/**
 * Calculates pricing for safaris and accommodations with seasonal rates,
 * group discounts, park conservancy fees, and vehicle surcharges.
 */
export function calculateTripPrice(options: PricingOptions): PriceBreakdown {
  const {
    basePricePerPerson,
    travelers,
    durationDays,
    season,
    vehicleTier = 'standard_cruiser',
    privateSafari = false,
    parkFeesIncluded = true,
    parkFeesPerDayPerAdult = 80, // Default adult conservation fee per day
  } = options;

  const validTravelers = Math.max(1, travelers);
  const validDays = Math.max(1, durationDays);

  // Seasonal multipliers
  let seasonalMultiplier = 1.0;
  if (season === 'peak') seasonalMultiplier = 1.35; // Great Migration / Festive
  else if (season === 'low') seasonalMultiplier = 0.82; // Green season discount

  const baseTotal = basePricePerPerson * validTravelers;
  const seasonAdjustedBase = Math.round(baseTotal * seasonalMultiplier);

  // Group discounts for 4+ travelers (safaris share vehicle and guide)
  let groupDiscountPercent = 0;
  if (validTravelers >= 6) {
    groupDiscountPercent = 15;
  } else if (validTravelers >= 4) {
    groupDiscountPercent = 10;
  } else if (validTravelers >= 2) {
    groupDiscountPercent = 5;
  }

  const discountedTotal = Math.round(seasonAdjustedBase * (1 - groupDiscountPercent / 100));

  // Vehicle surcharge per day
  let vehicleDayRate = 0;
  if (vehicleTier === 'luxury_vip_cruiser') {
    vehicleDayRate = 280;
  } else if (vehicleTier === 'standard_cruiser') {
    vehicleDayRate = 190;
  } else if (vehicleTier === 'safari_van') {
    vehicleDayRate = 120;
  }
  const vehicleSurcharge = vehicleDayRate * validDays;

  // Private safari exclusive guide fee
  const privateFee = privateSafari ? 150 * validDays : 0;

  // Park conservancy fees
  const parkFeesTotal = parkFeesIncluded ? 0 : parkFeesPerDayPerAdult * validTravelers * validDays;

  const estimatedTotal = discountedTotal + vehicleSurcharge + privateFee + parkFeesTotal;
  const pricePerPerson = Math.round(estimatedTotal / validTravelers);

  return {
    baseTotal,
    seasonalMultiplier,
    seasonAdjustedBase,
    groupDiscountPercent,
    discountedTotal,
    vehicleSurcharge,
    privateFee,
    parkFeesTotal,
    estimatedTotal,
    pricePerPerson,
    currency: 'USD',
  };
}

/**
 * Calculates marketplace commissions for KenyaOne and partner payouts.
 */
export function calculateCommission(calc: CommissionInput): CommissionResult {
  const standardRates: Record<CommissionInput['partnerType'], number> = {
    direct_lodge: 15,     // 15% standard hotel/lodge net commission
    tour_operator: 12,    // 12% standard tour operator commission
    vehicle_fleet: 10,    // 10% vehicle rental commission
    affiliate_ota: 6.5,   // 6.5% average OTA referral rev-share
  };

  const rate = calc.customRatePercent !== undefined ? calc.customRatePercent : standardRates[calc.partnerType];
  const commissionEarned = Math.round((calc.bookingAmount * rate) / 100 * 100) / 100;
  const kenyaOneNetShare = commissionEarned;
  const partnerNetShare = Math.round((calc.bookingAmount - commissionEarned) * 100) / 100;

  return {
    ...calc,
    commissionEarned,
    kenyaOneNetShare,
    partnerNetShare,
  };
}

/**
 * Validates travel inquiry forms ensuring complete data before quote submission.
 */
export function validateInquiryForm(formData: {
  fullName: string;
  email: string;
  phone?: string;
  travelDate: string;
  travelers: number;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!formData.fullName || formData.fullName.trim().length < 2) {
    errors.fullName = 'Full name is required (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email.trim())) {
    errors.email = 'Valid email address is required.';
  }

  if (!formData.travelDate) {
    errors.travelDate = 'Target travel date is required.';
  }

  if (!formData.travelers || formData.travelers < 1 || formData.travelers > 30) {
    errors.travelers = 'Number of travelers must be between 1 and 30.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
