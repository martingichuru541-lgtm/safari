/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  calculateTripPrice,
  validateInquiryForm,
} from '../utils/marketplaceRules';
import { BookingInquiry } from '../types/travel';
import {
  CheckCircle2,
  Calendar,
  Users,
  ShieldCheck,
  X,
  CreditCard,
  Check,
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingTarget: {
    type: 'safari' | 'hotel' | 'vehicle' | 'custom_itinerary';
    id: string;
    title: string;
    basePrice: number;
    destinationName?: string;
  } | null;
  onSuccessBooking: (inquiry: BookingInquiry) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  bookingTarget,
  onSuccessBooking,
}) => {
  if (!isOpen || !bookingTarget) return null;

  const [fullName, setFullName] = useState('Martin Kiprono');
  const [email, setEmail] = useState('martin@kenyaone-safaris.com');
  const [phone, setPhone] = useState('+254 722 000 111');
  const [travelDate, setTravelDate] = useState('2026-08-10');
  const [durationDays, setDurationDays] = useState(bookingTarget.type === 'safari' ? 7 : 3);
  const [travelers, setTravelers] = useState(2);
  const [season, setSeason] = useState<'low' | 'regular' | 'peak'>('peak');
  const [vehicleTier, setVehicleTier] = useState<'standard_cruiser' | 'luxury_vip_cruiser'>('standard_cruiser');
  const [privateSafari, setPrivateSafari] = useState(true);
  const [specialRequests, setSpecialRequests] = useState('Request window seats and dietary preferences (vegetarian).');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmedCode, setConfirmedCode] = useState('');

  // Calculate live dynamic price breakdown
  const priceCalc = calculateTripPrice({
    basePricePerPerson: bookingTarget.basePrice,
    travelers,
    durationDays,
    season,
    vehicleTier,
    privateSafari,
    parkFeesIncluded: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateInquiryForm({
      fullName,
      email,
      phone,
      travelDate,
      travelers,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const referenceCode = `KY1-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedCode(referenceCode);
    setIsSubmitted(true);

    const inquiry: BookingInquiry = {
      id: referenceCode,
      itemType: bookingTarget.type,
      itemId: bookingTarget.id,
      itemName: bookingTarget.title,
      customerName: fullName,
      customerEmail: email,
      customerPhone: phone,
      travelDate,
      durationDays,
      travelers,
      specialRequests,
      estimatedTotalUSD: priceCalc.estimatedTotal,
      status: 'Pending Review',
      createdAt: new Date().toISOString(),
      isDemo: true,
    };

    onSuccessBooking(inquiry);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[95vh] overflow-y-auto shadow-2xl relative text-stone-100">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-800 text-stone-400 hover:text-white transition-colors"
          aria-label="Close Booking Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
                Direct Booking &amp; Quote Request
              </span>
              <h3 className="text-2xl font-bold text-white font-serif mt-1">
                {bookingTarget.title}
              </h3>
              <p className="text-stone-400 text-xs mt-1">
                Transparent Kenyan booking quotation. Receive instant live price breakdown and confirmation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-xs text-white focus:ring-1 focus:ring-amber-500 outline-none"
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-xs text-white focus:ring-1 focus:ring-amber-500 outline-none"
                  />
                  {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                    Travel Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white focus:ring-1 focus:ring-amber-500 outline-none"
                  />
                  {errors.travelDate && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.travelDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                    Travelers *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white focus:ring-1 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                    Duration (Days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white focus:ring-1 focus:ring-amber-500 outline-none"
                  />
                </div>
              </div>

              {/* Season & Vehicle Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-stone-950 p-3 rounded-xl border border-stone-800">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-400 uppercase mb-1">
                    Season Tier
                  </label>
                  <select
                    value={season}
                    onChange={(e) => setSeason(e.target.value as 'low' | 'regular' | 'peak')}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-xs text-white"
                  >
                    <option value="peak">Peak Season (Migration &amp; Dec)</option>
                    <option value="regular">Regular Season</option>
                    <option value="low">Green Season (Discounted)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-400 uppercase mb-1">
                    Dedicated Vehicle
                  </label>
                  <select
                    value={vehicleTier}
                    onChange={(e) =>
                      setVehicleTier(e.target.value as 'standard_cruiser' | 'luxury_vip_cruiser')
                    }
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-xs text-white"
                  >
                    <option value="standard_cruiser">Standard 4x4 Cruiser ($190/d)</option>
                    <option value="luxury_vip_cruiser">VIP Photo Cruiser ($280/d)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                  Special Notes &amp; Dietary Requests
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-white focus:ring-1 focus:ring-amber-500 outline-none"
                  placeholder="Tell our concierge about anniversary celebrations, camera gear, or kids..."
                />
              </div>

              {/* Dynamic Live Price Breakdown */}
              <div className="bg-stone-950/80 rounded-xl p-4 border border-stone-800 space-y-2 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>Base Rate ({travelers} travelers × {durationDays} days):</span>
                  <span>${priceCalc.discountedTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Vehicle &amp; Chauffeur Surcharge:</span>
                  <span>${priceCalc.vehicleSurcharge.toLocaleString()}</span>
                </div>
                {priceCalc.groupDiscountPercent > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Group Discount ({priceCalc.groupDiscountPercent}%):</span>
                    <span>Applied to Base</span>
                  </div>
                )}
                <div className="pt-2 border-t border-stone-800 flex justify-between items-baseline font-bold text-sm">
                  <span className="text-white">Estimated Package Total:</span>
                  <span className="text-xl text-amber-400 font-extrabold">
                    ${priceCalc.estimatedTotal.toLocaleString()} USD
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 italic">
                  Approx. ${priceCalc.pricePerPerson.toLocaleString()} per person. Includes 24/7 AMREF Flying Doctors coverage and all park fees.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer"
              >
                Submit Booking Inquiry
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <Check className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white font-serif">Inquiry Confirmed</h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto">
              Your inquiry reference is <strong className="text-amber-400 font-mono text-base">{confirmedCode}</strong>. A KenyaOne Senior Safari Specialist has received your request and will contact you within 2 hours.
            </p>

            <div className="bg-stone-950 rounded-xl p-4 border border-stone-800 max-w-md mx-auto text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-stone-400">Package:</span>
                <span className="text-stone-200 font-semibold">{bookingTarget.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Estimated Total:</span>
                <span className="text-amber-400 font-bold">${priceCalc.estimatedTotal.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Travel Date:</span>
                <span className="text-stone-200">{travelDate}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors"
            >
              Back to Marketplace
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
