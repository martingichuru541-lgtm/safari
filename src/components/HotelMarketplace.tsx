/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ACCOMMODATIONS } from '../data/accommodations';
import { Accommodation } from '../types/travel';
import {
  Building2,
  Star,
  MapPin,
  Check,
  ExternalLink,
  Users,
  Shield,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface HotelMarketplaceProps {
  onBookHotel: (hotel: Accommodation) => void;
  onLogAffiliateClick?: (partner: string, hotelName: string) => void;
}

export const HotelMarketplace: React.FC<HotelMarketplaceProps> = ({
  onBookHotel,
  onLogAffiliateClick,
}) => {
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [priceMax, setPriceMax] = useState<number>(2000);
  const [selectedLodgeModal, setSelectedLodgeModal] = useState<Accommodation | null>(null);

  const filteredAccommodations = ACCOMMODATIONS.filter((hotel) => {
    const matchesTier = selectedTier === 'all' || hotel.tier === selectedTier;
    const matchesPrice = hotel.pricePerNightUSD <= priceMax;
    return matchesTier && matchesPrice;
  });

  const handleExternalAffiliateClick = (hotel: Accommodation) => {
    onLogAffiliateClick?.(hotel.affiliateProvider || 'Booking.com', hotel.name);
    if (hotel.affiliateUrl) {
      window.open(hotel.affiliateUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="hotels" className="py-16 bg-stone-900 text-stone-100 px-4 sm:px-6 lg:px-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-stone-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>World-Class Sanctuaries</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
              Luxury Lodges, Tented Camps &amp; Beach Villas
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-2xl font-light">
              Experience quintessential African hospitality. From cliffside luxury tents suspended above the Maasai Mara to private beachfront coral estates in Diani.
            </p>
          </div>

          {/* Quick Filters */}
          <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-3">
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="bg-stone-950 border border-stone-800 text-stone-300 text-xs rounded-lg px-3 py-2 focus:ring-1 focus:ring-amber-500 outline-none"
            >
              <option value="all">All Property Styles</option>
              <option value="Ultra Luxury">Ultra Luxury</option>
              <option value="Classic Luxury">Classic Luxury</option>
              <option value="Tented Camp">Tented Camp</option>
              <option value="Beachfront Villa">Beachfront Villa</option>
              <option value="Boutique">Boutique &amp; Historic</option>
              <option value="Eco Lodge">Eco Lodge</option>
            </select>

            <div className="flex items-center gap-2 bg-stone-950 border border-stone-800 px-3 py-1.5 rounded-lg text-xs text-stone-300">
              <span className="text-stone-400">Max Night:</span>
              <span className="font-bold text-amber-400">${priceMax}</span>
              <input
                type="range"
                min="300"
                max="2000"
                step="50"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-20 accent-amber-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Accommodation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAccommodations.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-stone-950 rounded-2xl border border-stone-800 overflow-hidden shadow-xl hover:border-amber-500/40 transition-all flex flex-col justify-between group"
            >
              {/* Image & Badges */}
              <div className="relative h-48 overflow-hidden bg-stone-900">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />

                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-stone-950/80 backdrop-blur-sm border border-stone-700 text-amber-300 text-[11px] font-bold">
                    {hotel.tier}
                  </span>
                  {hotel.isDirectPartner && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-600/50 text-emerald-300 text-[10px] font-semibold">
                      Direct Partner
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-stone-950/85 text-amber-400 text-xs font-bold">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{hotel.rating}</span>
                </div>

                <div className="absolute bottom-2 left-3 right-3 text-xs text-stone-300 flex items-center gap-1 truncate font-medium">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{hotel.destinationName}</span>
                </div>
              </div>

              {/* Details Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {hotel.name}
                  </h3>
                  <p className="text-xs text-stone-400 font-light mt-1 line-clamp-2">
                    {hotel.highlights[0]}
                  </p>
                </div>

                {/* Amenities pills */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {hotel.amenities.slice(0, 3).map((amenity, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-[10px] text-stone-300"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                {/* Pricing & Booking */}
                <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-stone-400 block font-semibold">From</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-extrabold text-amber-400">
                        ${hotel.pricePerNightUSD}
                      </span>
                      <span className="text-[11px] text-stone-400">/ night</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {hotel.affiliateUrl && (
                      <button
                        type="button"
                        onClick={() => handleExternalAffiliateClick(hotel)}
                        title={`Book on ${hotel.affiliateProvider}`}
                        className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
                        aria-label={`External link to ${hotel.affiliateProvider}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onBookHotel(hotel)}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wide transition-colors"
                    >
                      Book Direct
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
