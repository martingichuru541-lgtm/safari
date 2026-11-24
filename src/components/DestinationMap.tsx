/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { KENYA_DESTINATIONS } from '../data/destinations';
import { ACCOMMODATIONS } from '../data/accommodations';
import { SAFARI_PACKAGES } from '../data/safaris';
import { Destination } from '../types/travel';
import { MapPin, Compass, Calendar, Mountain, Sparkles, ArrowRight, X, ExternalLink } from 'lucide-react';

interface DestinationMapProps {
  onSelectDestination?: (dest: Destination) => void;
  onBookSafari?: (safariId: string) => void;
  onView3DScene?: (sceneIndex: number) => void;
}

export const DestinationMap: React.FC<DestinationMapProps> = ({
  onSelectDestination,
  onBookSafari,
  onView3DScene,
}) => {
  const [selectedDest, setSelectedDest] = useState<Destination | null>(KENYA_DESTINATIONS[0]);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDestinations = KENYA_DESTINATIONS.filter((d) => {
    const matchesCat = filterCategory === 'all' || d.category === filterCategory;
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Calculate relative map coordinates for Kenya (Lat: ~4.5°N to 4.5°S, Lng: 34°E to 42°E)
  const getMapPosition = (lat: number, lng: number) => {
    // Kenya bounds: Lat -4.7 to 4.6 (height ~9.3 deg), Lng 33.9 to 41.9 (width ~8 deg)
    const minLat = -4.8;
    const maxLat = 4.8;
    const minLng = 33.8;
    const maxLng = 42.0;

    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100;
    return { left: `${Math.max(5, Math.min(95, x))}%`, top: `${Math.max(8, Math.min(92, y))}%` };
  };

  const nearbyLodges = selectedDest
    ? ACCOMMODATIONS.filter((a) => a.destinationId === selectedDest.id)
    : [];

  const nearbySafaris = selectedDest
    ? SAFARI_PACKAGES.filter((s) =>
        s.destinationsCovered.some((destName) =>
          selectedDest.name.toLowerCase().includes(destName.toLowerCase())
        )
      )
    : [];

  return (
    <div className="w-full bg-stone-900 text-stone-100 py-12 px-4 sm:px-6 lg:px-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-stone-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Interactive Geographic Map</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
              Discover Kenya’s Iconic Reserves &amp; Coasts
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-2xl font-light">
              From the Great Rift Valley savannahs to afro-alpine summits and pristine Swahili coral reefs. Click any pin to discover curated lodges, wildlife, and safari packages.
            </p>
          </div>

          {/* Quick Filters */}
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            {['all', 'Savannah', 'Coastal Beach', 'Rift Valley Lake', 'Mountain', 'Arid Reserve'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filterCategory === cat
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                }`}
              >
                {cat === 'all' ? 'All Kenya' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Map Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 1. Interactive Geographic Map Visual (7 Cols) */}
          <div className="lg:col-span-7 bg-stone-950 rounded-2xl border border-stone-800 p-6 relative overflow-hidden min-h-[520px] flex flex-col justify-between shadow-2xl">
            {/* Compass rose & Kenya Coordinates watermark */}
            <div className="absolute top-4 right-4 text-right pointer-events-none opacity-40">
              <span className="text-xs font-mono text-amber-400 block font-semibold">KENYA (EAC)</span>
              <span className="text-[10px] font-mono text-stone-500">LAT 0°00′N / LNG 38°00′E</span>
            </div>

            {/* Stylized SVG Map of Kenya */}
            <div className="relative w-full h-[440px] my-auto">
              <svg
                viewBox="0 0 600 500"
                className="w-full h-full opacity-35 filter drop-shadow-md"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Kenya country shape outline representation */}
                <path
                  d="M 180,70 L 320,60 L 440,110 L 490,230 L 430,340 L 360,440 L 300,430 L 220,380 L 150,330 L 130,220 L 140,130 Z"
                  fill="#1C1917"
                  stroke="#38302B"
                  strokeWidth="2"
                />
                {/* Great Rift Valley Fault line */}
                <path
                  d="M 230,60 Q 240,240 260,400"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.6"
                />
                {/* Indian Ocean Coastline curve */}
                <path
                  d="M 370,430 Q 430,340 480,240"
                  stroke="#0EA5E9"
                  strokeWidth="3"
                  opacity="0.8"
                />
                {/* Mount Kenya peak symbol */}
                <polygon points="275,225 285,205 295,225" fill="#10B981" opacity="0.6" />
                {/* Lake Victoria inlet representation */}
                <path
                  d="M 130,250 C 120,290 140,320 150,330"
                  stroke="#38BDF8"
                  strokeWidth="4"
                  opacity="0.6"
                />
              </svg>

              {/* Geographic Region Labels */}
              <div className="absolute top-8 left-12 text-[11px] font-semibold text-stone-600 tracking-widest uppercase">
                Northern Frontier
              </div>
              <div className="absolute top-1/2 left-8 text-[11px] font-semibold text-stone-600 tracking-widest uppercase">
                Great Rift Valley
              </div>
              <div className="absolute bottom-12 right-12 text-[11px] font-semibold text-sky-500/70 tracking-widest uppercase">
                Indian Ocean
              </div>

              {/* Destination Pins on Map */}
              {filteredDestinations.map((dest) => {
                const pos = getMapPosition(dest.coordinates.lat, dest.coordinates.lng);
                const isSelected = selectedDest?.id === dest.id;

                return (
                  <button
                    key={dest.id}
                    type="button"
                    style={{ left: pos.left, top: pos.top }}
                    onClick={() => {
                      setSelectedDest(dest);
                      onSelectDestination?.(dest);
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 focus:outline-none ${
                      isSelected ? 'z-30 scale-125' : 'z-20 hover:scale-115'
                    }`}
                    aria-label={`View details for ${dest.name}`}
                  >
                    {/* Pin Marker */}
                    <div className="relative flex items-center justify-center">
                      {isSelected && (
                        <span
                          className="absolute w-8 h-8 rounded-full opacity-75 animate-ping"
                          style={{ backgroundColor: dest.accentColor }}
                        />
                      )}
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shadow-lg border-2 border-stone-900 transition-transform"
                        style={{ backgroundColor: dest.accentColor }}
                      >
                        <MapPin className="w-3 h-3 text-white" />
                      </div>
                    </div>

                    {/* Pin Label Hover/Active */}
                    <div
                      className={`absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md text-[11px] font-bold tracking-tight shadow-md transition-all ${
                        isSelected
                          ? 'bg-amber-400 text-stone-950 font-bold opacity-100 ring-1 ring-amber-300'
                          : 'bg-stone-900/90 text-stone-200 border border-stone-800 opacity-80 group-hover:opacity-100'
                      }`}
                    >
                      {dest.name.split(' ')[0]}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="flex flex-wrap items-center justify-between text-xs text-stone-400 pt-4 border-t border-stone-800/80 gap-3">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Savannah
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> Coast / Coral Reef
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-500" /> Rift Valley Lakes
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Mountain / Highland
                </span>
              </div>
              <span className="text-stone-500">Showing {filteredDestinations.length} Key Reserves</span>
            </div>
          </div>

          {/* 2. Destination Detail Drawer & Nearby Stays (5 Cols) */}
          <div className="lg:col-span-5 bg-stone-950 rounded-2xl border border-stone-800 p-6 shadow-2xl relative">
            {selectedDest ? (
              <div className="space-y-6">
                {/* Category & Region */}
                <div className="flex items-center justify-between">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase"
                    style={{
                      backgroundColor: `${selectedDest.accentColor}25`,
                      color: selectedDest.accentColor,
                    }}
                  >
                    {selectedDest.category} • {selectedDest.region}
                  </span>

                  {onView3DScene && (
                    <button
                      type="button"
                      onClick={() => onView3DScene(selectedDest.sceneIndex)}
                      className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>View in 3D Scene</span>
                    </button>
                  )}
                </div>

                {/* Name & Tagline */}
                <div>
                  <h3 className="text-2xl font-bold text-white font-serif">{selectedDest.name}</h3>
                  <p className="text-amber-400 text-xs font-medium mt-1">{selectedDest.tagline}</p>
                </div>

                {/* Quick Facts Grid */}
                <div className="grid grid-cols-2 gap-3 bg-stone-900/90 rounded-xl p-3 border border-stone-800 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[11px] uppercase font-semibold flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-400" /> Best Season
                    </span>
                    <span className="text-stone-200 font-medium">
                      {selectedDest.bestMonths.slice(0, 3).join(', ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px] uppercase font-semibold flex items-center gap-1">
                      <Mountain className="w-3 h-3 text-emerald-400" /> Altitude
                    </span>
                    <span className="text-stone-200 font-medium">
                      {selectedDest.elevationMeters}m Above Sea Level
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-stone-400 block text-[11px] uppercase font-semibold">
                      Climate &amp; Weather
                    </span>
                    <span className="text-stone-200">{selectedDest.climate}</span>
                  </div>
                </div>

                {/* Wildlife Highlights */}
                <div>
                  <h4 className="text-xs font-semibold uppercase text-stone-400 tracking-wider mb-2">
                    Signature Wildlife &amp; Highlights
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDest.wildlifeHighlights.map((wildlife) => (
                      <span
                        key={wildlife}
                        className="px-2.5 py-1 rounded-md bg-stone-900 text-stone-300 border border-stone-800 text-xs font-medium"
                      >
                        {wildlife}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                  {selectedDest.description}
                </p>

                {/* Featured Stays in this destination */}
                {nearbyLodges.length > 0 && (
                  <div className="pt-4 border-t border-stone-800/80">
                    <h4 className="text-xs font-semibold uppercase text-stone-400 tracking-wider mb-3">
                      Luxury Accommodations ({nearbyLodges.length})
                    </h4>
                    <div className="space-y-2.5">
                      {nearbyLodges.slice(0, 2).map((lodge) => (
                        <div
                          key={lodge.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition-all"
                        >
                          <div>
                            <span className="text-xs font-bold text-white block">{lodge.name}</span>
                            <span className="text-[11px] text-stone-400">
                              {lodge.tier} • ★ {lodge.rating} ({lodge.reviewCount})
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-extrabold text-amber-400 block">
                              From ${lodge.pricePerNightUSD}/night
                            </span>
                            <span className="text-[10px] text-stone-500">{lodge.partnerName}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Safaris covering this destination */}
                {nearbySafaris.length > 0 && (
                  <div className="pt-2">
                    <h4 className="text-xs font-semibold uppercase text-stone-400 tracking-wider mb-2">
                      Featured Safari Packages
                    </h4>
                    {nearbySafaris.slice(0, 1).map((safari) => (
                      <div
                        key={safari.id}
                        className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 flex items-center justify-between"
                      >
                        <div>
                          <span className="text-xs font-bold text-white block">{safari.title}</span>
                          <span className="text-[11px] text-amber-400">
                            {safari.durationDays} Days • From ${safari.basePriceUSD} pp
                          </span>
                        </div>
                        {onBookSafari && (
                          <button
                            type="button"
                            onClick={() => onBookSafari(safari.id)}
                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg text-xs"
                          >
                            View Itinerary
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-20 text-stone-400">
                <MapPin className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <p>Select any reserve or beach on the map to explore details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
