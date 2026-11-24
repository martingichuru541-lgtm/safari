/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SAFARI_PACKAGES } from '../data/safaris';
import { SafariPackage } from '../types/travel';
import {
  Compass,
  Calendar,
  Users,
  ShieldCheck,
  Star,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  Check,
} from 'lucide-react';

interface SafariMarketplaceProps {
  onBookSafari: (safari: SafariPackage) => void;
}

export const SafariMarketplace: React.FC<SafariMarketplaceProps> = ({ onBookSafari }) => {
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [activeItinerarySafari, setActiveItinerarySafari] = useState<SafariPackage | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const filteredSafaris = SAFARI_PACKAGES.filter((safari) => {
    const matchesTier = selectedTier === 'all' || safari.tier === selectedTier;
    const matchesDuration =
      selectedDuration === 'all' ||
      (selectedDuration === 'short' && safari.durationDays <= 5) ||
      (selectedDuration === 'medium' && safari.durationDays >= 6 && safari.durationDays <= 8) ||
      (selectedDuration === 'long' && safari.durationDays >= 9);

    const matchesKeyword =
      safari.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      safari.destinationsCovered.some((d) => d.toLowerCase().includes(searchKeyword.toLowerCase()));

    return matchesTier && matchesDuration && matchesKeyword;
  });

  return (
    <section id="safaris" className="py-16 bg-stone-950 text-stone-100 px-4 sm:px-6 lg:px-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-stone-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Curated Expeditions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
              Signature Kenya Safari Packages
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-2xl font-light">
              Expertly escorted wildlife journeys across the Maasai Mara, Amboseli, and pristine national conservancies with guaranteed window seats and luxury tented accommodations.
            </p>
          </div>

          {/* Quick Filters */}
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="bg-stone-900 border border-stone-800 text-stone-300 text-xs rounded-lg px-3 py-2 focus:ring-1 focus:ring-amber-500 outline-none"
            >
              <option value="all">All Safari Tiers</option>
              <option value="Signature Luxury">Signature Luxury</option>
              <option value="Bush & Beach">Bush &amp; Beach</option>
              <option value="Photographic Expedition">Photographic Expedition</option>
            </select>

            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="bg-stone-900 border border-stone-800 text-stone-300 text-xs rounded-lg px-3 py-2 focus:ring-1 focus:ring-amber-500 outline-none"
            >
              <option value="all">All Durations</option>
              <option value="short">1 - 5 Days</option>
              <option value="medium">6 - 8 Days</option>
              <option value="long">9+ Days</option>
            </select>
          </div>
        </div>

        {/* Safari Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredSafaris.map((safari) => (
            <div
              key={safari.id}
              className="bg-stone-900/90 rounded-2xl border border-stone-800 overflow-hidden shadow-xl hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              <div className="p-6 sm:p-7 space-y-4">
                {/* Meta badges */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
                      {safari.tier}
                    </span>
                    <span className="text-stone-400 text-xs flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-stone-400" /> {safari.durationDays} Days /{' '}
                      {safari.durationDays - 1} Nights
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{safari.rating}</span>
                    <span className="text-stone-500">({safari.reviewCount})</span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-serif tracking-tight">
                    {safari.title}
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-sm mt-1.5 font-light leading-relaxed">
                    {safari.subtitle}
                  </p>
                </div>

                {/* Destinations Covered */}
                <div>
                  <span className="text-[11px] font-semibold uppercase text-stone-400 tracking-wider block mb-1.5">
                    Circuit &amp; National Reserves:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {safari.destinationsCovered.map((dest) => (
                      <span
                        key={dest}
                        className="px-2.5 py-1 rounded-md bg-stone-950 text-stone-300 border border-stone-800/80 text-xs"
                      >
                        {dest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Inclusions Preview */}
                <div className="pt-2 border-t border-stone-800/70 space-y-1.5">
                  {safari.included.slice(0, 3).map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-stone-300 font-light">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action Footer */}
              <div className="p-6 bg-stone-950/70 border-t border-stone-800 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 block font-semibold">
                    Starting Price:
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                      ${safari.basePriceUSD}
                    </span>
                    <span className="text-xs text-stone-400 font-light">/ traveler</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveItinerarySafari(safari)}
                    className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors"
                  >
                    View Itinerary
                  </button>
                  <button
                    type="button"
                    onClick={() => onBookSafari(safari)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs tracking-wide shadow transition-all uppercase flex items-center gap-1.5"
                  >
                    <span>Inquire Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Day-by-Day Itinerary Viewer */}
        {activeItinerarySafari && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-3xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative text-stone-100">
              <button
                type="button"
                onClick={() => setActiveItinerarySafari(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-stone-800 text-stone-400 hover:text-white transition-colors"
              >
                ✕
              </button>

              <div className="mb-6">
                <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
                  {activeItinerarySafari.durationDays} Days Itinerary
                </span>
                <h3 className="text-2xl font-bold text-white font-serif mt-1">
                  {activeItinerarySafari.title}
                </h3>
                <p className="text-stone-400 text-xs sm:text-sm mt-1">
                  {activeItinerarySafari.subtitle}
                </p>
              </div>

              {/* Day-by-day timeline */}
              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-stone-800">
                {activeItinerarySafari.itineraryDays.map((day) => (
                  <div key={day.day} className="relative flex items-start gap-4">
                    <div className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 font-extrabold text-xs flex items-center justify-center shrink-0 z-10 shadow">
                      {day.day}
                    </div>
                    <div className="bg-stone-950/80 border border-stone-800/80 rounded-xl p-4 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <h4 className="text-sm font-bold text-white">{day.title}</h4>
                        <span className="text-xs text-amber-400 font-mono font-medium">
                          {day.location}
                        </span>
                      </div>
                      <ul className="space-y-1 mb-3">
                        {day.activities.map((act, idx) => (
                          <li key={idx} className="text-xs text-stone-300 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-800/60">
                        <span>Stay: <strong className="text-stone-200">{day.accommodation}</strong></span>
                        <span>Meals: <strong className="text-stone-200">{day.meals}</strong></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal footer CTA */}
              <div className="mt-8 pt-6 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-400 block">From</span>
                  <span className="text-2xl font-bold text-amber-400">
                    ${activeItinerarySafari.basePriceUSD}
                  </span>
                  <span className="text-xs text-stone-400"> / person</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveItinerarySafari(null)}
                    className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs font-semibold"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const s = activeItinerarySafari;
                      setActiveItinerarySafari(null);
                      onBookSafari(s);
                    }}
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wide"
                  >
                    Request Custom Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
