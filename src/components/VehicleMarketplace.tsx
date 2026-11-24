/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SAFARI_VEHICLES } from '../data/vehicles';
import { SafariVehicle } from '../types/travel';
import {
  Car,
  Users,
  CheckCircle2,
  Shield,
  Gauge,
  Radio,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface VehicleMarketplaceProps {
  onHireVehicle: (vehicle: SafariVehicle) => void;
  onExplore3DVehicle?: () => void;
}

export const VehicleMarketplace: React.FC<VehicleMarketplaceProps> = ({
  onHireVehicle,
  onExplore3DVehicle,
}) => {
  const [hireDays, setHireDays] = useState<number>(5);

  return (
    <section id="vehicles" className="py-16 bg-stone-950 text-stone-100 px-4 sm:px-6 lg:px-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-stone-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Car className="w-3.5 h-3.5" />
              <span>Expedition Fleet</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
              Safari Vehicles &amp; 4x4 Land Cruiser Fleet
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-2xl font-light">
              Specially customized African safari vehicles with pop-up photography roofs, high-lift suspensions, onboard charging inverters, and professional KPSGA-licensed driver naturalists.
            </p>
          </div>

          {onExplore3DVehicle && (
            <button
              type="button"
              onClick={onExplore3DVehicle}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 text-amber-400 hover:text-amber-300 text-xs font-semibold transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Inspect 3D Cruiser in Engine</span>
            </button>
          )}
        </div>

        {/* Vehicle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SAFARI_VEHICLES.map((vehicle) => {
            const estimatedTripHire = vehicle.dailyRateUSD * hireDays;

            return (
              <div
                key={vehicle.id}
                className="bg-stone-900 rounded-2xl border border-stone-800 p-6 sm:p-7 shadow-xl hover:border-amber-500/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-400 text-xs font-bold uppercase tracking-wider">
                      {vehicle.tag}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-stone-300 font-semibold bg-stone-950 px-3 py-1 rounded-full border border-stone-800">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      <span>{vehicle.seats} Window Seats</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white font-serif tracking-tight">
                      {vehicle.name}
                    </h3>
                    <p className="text-stone-300 text-xs sm:text-sm mt-1.5 font-light leading-relaxed">
                      {vehicle.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="pt-2 border-t border-stone-800/80 space-y-2">
                    <span className="text-[11px] font-semibold uppercase text-stone-400 tracking-wider block">
                      Custom Off-Road Specs:
                    </span>
                    {vehicle.features.slice(0, 4).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-300 font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-stone-400 bg-stone-950/60 p-3 rounded-xl border border-stone-800/60">
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      <Shield className="w-3.5 h-3.5" /> Professional Guide Included
                    </span>
                    <span>•</span>
                    <span>{vehicle.mileageLimit}</span>
                  </div>
                </div>

                {/* Footer Pricing & Hire CTA */}
                <div className="mt-6 pt-5 border-t border-stone-800 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] uppercase text-stone-400 block font-semibold">
                      Daily Fleet Rate
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                        ${vehicle.dailyRateUSD}
                      </span>
                      <span className="text-xs text-stone-400">/ day</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onHireVehicle(vehicle)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs tracking-wide shadow-md transition-all uppercase flex items-center gap-1.5"
                  >
                    <span>Reserve Fleet</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
