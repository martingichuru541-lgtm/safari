/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ConciergePlanRequest,
  GeneratedItinerary,
  buildIntelligentItinerary,
} from '../utils/itineraryBuilder';
import {
  Sparkles,
  Bot,
  Send,
  Calendar,
  Users,
  Compass,
  CheckCircle,
  FileText,
  Printer,
  Share2,
  Check,
  Luggage,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { TravelReadinessChecklist } from './TravelReadinessChecklist';

interface AIConciergeProps {
  onRequestBooking: (itinerary: GeneratedItinerary) => void;
}

export const AIConcierge: React.FC<AIConciergeProps> = ({ onRequestBooking }) => {
  const [formData, setFormData] = useState<ConciergePlanRequest>({
    travelerName: 'Sarah Jenkins',
    residenceCountry: 'United Kingdom',
    durationDays: 7,
    travelersCount: 2,
    travelMonth: 'August',
    budgetTier: 'Luxury ($500-$1000/day)',
    interests: ['Great Wildebeest Migration', 'Big Cats Tracking', 'Balloon Safari', 'Bush Dinners'],
    travelStyle: 'Big Cats & Savannah',
  });

  const [generatedPlan, setGeneratedPlan] = useState<GeneratedItinerary | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'readiness'>('itinerary');
  const [copiedLink, setCopiedLink] = useState(false);

  const interestOptions = [
    'Great Wildebeest Migration',
    'Big Cats Tracking',
    'Balloon Safari',
    'Mount Kilimanjaro Views',
    'Beach & Marine',
    'Scuba & Snorkelling',
    'Rhino Sanctuary',
    'Cultural Maasai Manyatta',
    'Photographic Hides',
  ];

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interest);
      if (exists) {
        return { ...prev, interests: prev.interests.filter((i) => i !== interest) };
      } else {
        return { ...prev, interests: [...prev.interests, interest] };
      }
    });
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const plan = buildIntelligentItinerary(formData);
      setGeneratedPlan(plan);
      setIsGenerating(false);
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section id="concierge" className="py-16 bg-stone-900 text-stone-100 px-4 sm:px-6 lg:px-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Bot className="w-3.5 h-3.5" />
            <span>KenyaOne AI Travel Concierge</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif">
            Intelligent Kenyan Itinerary Architect
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-2 font-light">
            Plan your extraordinary holiday in seconds. Our AI engine integrates real flight circuits, seasonal wildlife migrations, and luxury lodge concessions into a seamless day-by-day program.
          </p>
        </div>

        {/* Two Column Layout: Generator Form + Live Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Configurator (5 Cols) */}
          <div className="lg:col-span-5 bg-stone-950 rounded-2xl border border-stone-800 p-6 sm:p-7 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 font-serif">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Configure Your Dream Journey</span>
            </h3>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                  Primary Traveler Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.travelerName}
                  onChange={(e) => setFormData({ ...formData, travelerName: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:ring-1 focus:ring-amber-500 outline-none"
                  placeholder="e.g. Elena Rostova"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                    Country of Residence
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.residenceCountry}
                    onChange={(e) => setFormData({ ...formData, residenceCountry: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:ring-1 focus:ring-amber-500 outline-none"
                    placeholder="e.g. United States"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                    Travel Month
                  </label>
                  <select
                    value={formData.travelMonth}
                    onChange={(e) => setFormData({ ...formData, travelMonth: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2.5 text-xs text-white focus:ring-1 focus:ring-amber-500 outline-none"
                  >
                    {['January', 'February', 'March', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(
                      (m) => (
                        <option key={m} value={m}>
                          {m} (2026)
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                    Duration (Days)
                  </label>
                  <input
                    type="number"
                    min="3"
                    max="14"
                    value={formData.durationDays}
                    onChange={(e) => setFormData({ ...formData, durationDays: Number(e.target.value) })}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:ring-1 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                    Party Size (Travelers)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={formData.travelersCount}
                    onChange={(e) => setFormData({ ...formData, travelersCount: Number(e.target.value) })}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:ring-1 focus:ring-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                  Holiday Style
                </label>
                <select
                  value={formData.travelStyle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      travelStyle: e.target.value as ConciergePlanRequest['travelStyle'],
                    })
                  }
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2.5 text-xs text-white focus:ring-1 focus:ring-amber-500 outline-none"
                >
                  <option value="Big Cats & Savannah">Big Cats &amp; Savannah (Maasai Mara &amp; Amboseli)</option>
                  <option value="Bush & Beach Combo">Bush &amp; Beach Combo (Mara + Diani Coast)</option>
                  <option value="Photographic Focus">Photographic Expedition Focus</option>
                  <option value="Family Wildlife">Family Wildlife &amp; Conservation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                  Budget Accommodation Tier
                </label>
                <select
                  value={formData.budgetTier}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      budgetTier: e.target.value as ConciergePlanRequest['budgetTier'],
                    })
                  }
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2.5 text-xs text-white focus:ring-1 focus:ring-amber-500 outline-none"
                >
                  <option value="Luxury ($500-$1000/day)">Signature Luxury ($500 - $1,000 / day)</option>
                  <option value="Ultra Luxury ($1000+/day)">Ultra Luxury &amp; Private Villas ($1,000+ / day)</option>
                  <option value="Classic Safari ($300-$500/day)">Classic Safari Lodges ($300 - $500 / day)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                  Special Interests &amp; Bucket List
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {interestOptions.map((opt) => {
                    const active = formData.interests.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleInterestToggle(opt)}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                          active
                            ? 'bg-amber-500 text-stone-950 font-bold'
                            : 'bg-stone-900 text-stone-400 border border-stone-800 hover:text-stone-200'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full mt-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isGenerating ? (
                  <span>Synthesizing Optimal Circuit...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Custom Itinerary</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Display Area (7 Cols) */}
          <div className="lg:col-span-7 bg-stone-950 rounded-2xl border border-stone-800 p-6 sm:p-7 shadow-2xl relative min-h-[520px]">
            {generatedPlan ? (
              <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
                      AI Generated Program #{generatedPlan.id.slice(-6)}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-serif mt-0.5">
                      {generatedPlan.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleShare}
                      className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-white transition-colors text-xs flex items-center gap-1.5"
                      title="Copy Shareable Link"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'Copied' : 'Share'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-white transition-colors text-xs flex items-center gap-1.5"
                      title="Print or Save PDF"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print/PDF</span>
                    </button>
                  </div>
                </div>

                {/* Tab switchers */}
                <div className="flex gap-2 border-b border-stone-800 pb-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('itinerary')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                      activeTab === 'itinerary'
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Day-by-Day Journey</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('readiness')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                      activeTab === 'readiness'
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Travel Readiness Checklist (eTA, Vaccines &amp; Gear)</span>
                  </button>
                </div>

                {/* Tab Content: Itinerary */}
                {activeTab === 'itinerary' && (
                  <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
                    {generatedPlan.days.map((d) => (
                      <div
                        key={d.day}
                        className="p-4 rounded-xl bg-stone-900/80 border border-stone-800/80 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-amber-400">
                            Day {d.day} • {d.location}
                          </span>
                          <span className="text-[11px] text-stone-400 bg-stone-950 px-2 py-0.5 rounded border border-stone-800">
                            Stay: {d.overnightLodge}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white">{d.title}</h4>
                        <ul className="space-y-1">
                          {d.activities.map((act, i) => (
                            <li key={i} className="text-xs text-stone-300 font-light flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="text-[11px] text-amber-300/90 bg-amber-950/20 border border-amber-900/40 p-2 rounded-lg font-light italic">
                          💡 <strong>Guide Tip:</strong> {d.insiderTip}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tab Content: Travel Readiness Checklist */}
                {activeTab === 'readiness' && (
                  <div className="max-h-[480px] overflow-y-auto pr-1">
                    <TravelReadinessChecklist itinerary={generatedPlan} />
                  </div>
                )}

                {/* Pricing & Booking CTA */}
                <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] uppercase text-stone-400 block font-semibold">
                      Estimated Program Cost
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-amber-400">
                        ${generatedPlan.estimatedCostUSD.toLocaleString()}
                      </span>
                      <span className="text-xs text-stone-400">
                        (approx. ${generatedPlan.costPerPersonUSD.toLocaleString()} / person)
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRequestBooking(generatedPlan)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
                  >
                    Confirm &amp; Request Custom Quote
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-24 text-stone-400">
                <Bot className="w-12 h-12 text-amber-500 mx-auto mb-3 opacity-60" />
                <h4 className="text-lg font-bold text-white">Your Tailor-Made Safari Awaits</h4>
                <p className="text-xs text-stone-400 max-w-sm mx-auto mt-1">
                  Adjust your travelers, dates, and preferences on the left and click &quot;Generate Custom Itinerary&quot; to review your bespoke journey.
                </p>
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => {
                      const plan = buildIntelligentItinerary(formData);
                      setGeneratedPlan(plan);
                      setActiveTab('readiness');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-semibold transition-colors shadow"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Explore Kenya Travel Readiness Checklist (eTA, Vaccines &amp; Gear)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
