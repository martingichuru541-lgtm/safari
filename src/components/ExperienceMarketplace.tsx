/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EXPERIENCES } from '../data/experiences';
import { TravelExperience } from '../types/travel';
import { Compass, Clock, Star, ArrowRight, ExternalLink } from 'lucide-react';

interface ExperienceMarketplaceProps {
  onBookExperience: (exp: TravelExperience) => void;
  onLogAffiliateClick?: (partner: string, expTitle: string) => void;
}

export const ExperienceMarketplace: React.FC<ExperienceMarketplaceProps> = ({
  onBookExperience,
  onLogAffiliateClick,
}) => {
  return (
    <section id="experiences" className="py-16 bg-stone-900 text-stone-100 px-4 sm:px-6 lg:px-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-stone-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Unforgettable Adventures</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
              Kenyan Tours, Excursions &amp; Activities
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-2xl font-light">
              Elevate your journey with dawn hot air balloon flights over the Mara, wild dolphin snorkelling in Wasini, and authentic Maasai cultural village ceremonies.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="bg-stone-950 rounded-2xl border border-stone-800 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded bg-stone-900 text-amber-400 text-[11px] font-bold uppercase tracking-wider">
                    {exp.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{exp.rating}</span>
                    <span className="text-stone-500">({exp.reviewCount})</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white font-serif">{exp.title}</h3>

                <div className="flex items-center gap-2 text-xs text-stone-400">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>{exp.durationHours}</span>
                  <span>•</span>
                  <span className="text-stone-300">{exp.destinationName}</span>
                </div>

                <ul className="space-y-1.5 pt-2 border-t border-stone-800/70">
                  {exp.highlights.slice(0, 3).map((h, i) => (
                    <li key={i} className="text-xs text-stone-300 font-light flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-stone-400 block font-semibold">From</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-amber-400">${exp.priceUSD}</span>
                    <span className="text-xs text-stone-400">/ person</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onBookExperience(exp)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wide transition-colors"
                >
                  Book Activity
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
