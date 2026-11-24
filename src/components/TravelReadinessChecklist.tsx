/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Luggage,
  Syringe,
  FileText,
  DollarSign,
  CheckCircle,
  Circle,
  ExternalLink,
  AlertTriangle,
  Clock,
  Sparkles,
  Printer,
  RotateCcw,
  Check,
  ChevronDown,
  ChevronUp,
  Info,
} from 'lucide-react';
import { ReadinessItem, ReadinessCategory } from '../types/readiness';
import { GeneratedItinerary } from '../utils/itineraryBuilder';
import {
  generateItineraryReadinessItems,
  computeReadinessSummary,
  filterReadinessItems,
} from '../utils/readinessLogic';

interface TravelReadinessChecklistProps {
  itinerary?: GeneratedItinerary | null;
  onAllCompleted?: () => void;
}

export const TravelReadinessChecklist: React.FC<TravelReadinessChecklistProps> = ({
  itinerary,
  onAllCompleted,
}) => {
  const [items, setItems] = useState<ReadinessItem[]>(() =>
    generateItineraryReadinessItems(itinerary)
  );
  const [activeCategory, setActiveCategory] = useState<'all' | ReadinessCategory>('all');
  const [onlyPending, setOnlyPending] = useState<boolean>(false);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  // Re-generate if itinerary changes
  useEffect(() => {
    setItems((prev) => {
      const generated = generateItineraryReadinessItems(itinerary);
      // Preserve user checked status across re-renders
      return generated.map((genItem) => {
        const existing = prev.find((p) => p.id === genItem.id);
        return existing ? { ...genItem, completed: existing.completed } : genItem;
      });
    });
  }, [itinerary]);

  const summary = computeReadinessSummary(items);

  const handleToggleItem = (id: string) => {
    setItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      const newSummary = computeReadinessSummary(updated);
      if (newSummary.percentComplete === 100) {
        onAllCompleted?.();
      }
      return updated;
    });
  };

  const handleToggleAll = (complete: boolean) => {
    setItems((prev) => prev.map((i) => ({ ...i, completed: complete })));
  };

  const filteredItems = filterReadinessItems(items, activeCategory, onlyPending);

  const categories: { id: 'all' | ReadinessCategory; label: string; icon: React.ElementType }[] = [
    { id: 'all', label: 'All Requirements', icon: FileText },
    { id: 'visa', label: 'Visa & eTA Entry', icon: ShieldCheck },
    { id: 'health', label: 'Vaccines & Health', icon: Syringe },
    { id: 'packing', label: 'Packing & Gear', icon: Luggage },
    { id: 'customs_finance', label: 'Customs & Finance', icon: DollarSign },
  ];

  return (
    <div className="space-y-5 text-stone-100">
      {/* 1. Header & Progress Panel */}
      <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-base font-bold text-white font-serif">
                  Kenya Travel Readiness &amp; Safari Preparation Dossier
                </h3>
                <span className="text-[11px] text-stone-400">
                  {itinerary
                    ? `Personalised for: ${itinerary.title}`
                    : 'Universal pre-departure requirements & compliance rules for Kenya'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border ${
                summary.statusLabel === '100% Safari Ready'
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                  : summary.statusLabel === 'Almost Ready'
                  ? 'bg-amber-950 text-amber-400 border-amber-800'
                  : summary.statusLabel === 'Good Progress'
                  ? 'bg-sky-950 text-sky-400 border-sky-800'
                  : 'bg-stone-900 text-stone-300 border-stone-800'
              }`}
            >
              {summary.statusLabel}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-stone-400">
              Readiness Progress:{' '}
              <strong className="text-white">
                {summary.completedItems} of {summary.totalItems} requirements checked
              </strong>
            </span>
            <span className="font-mono font-bold text-amber-400">{summary.percentComplete}%</span>
          </div>

          <div className="w-full bg-stone-900 h-2.5 rounded-full overflow-hidden border border-stone-800">
            <div
              className="bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${summary.percentComplete}%` }}
            />
          </div>
        </div>

        {/* Mandatory requirements banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs pt-1 border-t border-stone-900 gap-2">
          <div className="flex items-center gap-1.5 text-stone-400">
            <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              Mandatory Entry Status:{' '}
              <strong className={summary.mandatoryComplete ? 'text-emerald-400' : 'text-amber-400'}>
                {summary.mandatoryComplete
                  ? 'All mandatory requirements cleared'
                  : 'Mandatory action items still require attention'}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleToggleAll(true)}
              className="text-[11px] text-amber-400 hover:text-amber-300 underline font-medium"
            >
              Check All
            </button>
            <span className="text-stone-600">•</span>
            <button
              type="button"
              onClick={() => handleToggleAll(false)}
              className="text-[11px] text-stone-400 hover:text-stone-200 underline"
            >
              Reset
            </button>
            <span className="text-stone-600">•</span>
            <button
              type="button"
              onClick={() => window.print()}
              className="text-[11px] text-stone-300 hover:text-white flex items-center gap-1"
            >
              <Printer className="w-3 h-3" />
              <span>Print Dossier</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Official Kenya eTA Alert Callout */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-stone-950 to-stone-950 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-amber-300 uppercase tracking-wider text-[10px] block">
              Official Kenya Border &amp; Immigration Protocol
            </span>
            <p className="text-stone-200 font-light">
              Kenya replaced traditional paper visas with mandatory digital <strong>Electronic Travel Authorisation (eTA)</strong>. Applications must be submitted through the official government portal <strong>etakenya.go.ke</strong> at least 3 business days before departure.
            </p>
          </div>
        </div>

        <a
          href="https://www.etakenya.go.ke/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shrink-0 flex items-center gap-1.5 transition-colors self-end sm:self-center"
        >
          <span>Open eTA Portal</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* 3. Category Filter Tabs & Options */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5 bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const count =
              cat.id === 'all'
                ? items.length
                : items.filter((i) => i.category === cat.id).length;
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                  active
                    ? 'bg-amber-500 text-stone-950 font-bold shadow'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1 rounded-full ${
                    active ? 'bg-stone-950 text-amber-400' : 'bg-stone-900 text-stone-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <label className="flex items-center gap-2 text-xs text-stone-400 cursor-pointer self-end sm:self-center">
          <input
            type="checkbox"
            checked={onlyPending}
            onChange={(e) => setOnlyPending(e.target.checked)}
            className="rounded bg-stone-900 border-stone-800 text-amber-500 focus:ring-0"
          />
          <span>Show Pending Only</span>
        </label>
      </div>

      {/* 4. Requirements Checklist Items */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isExpanded = expandedItemId === item.id;
          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all ${
                item.completed
                  ? 'bg-stone-950/60 border-stone-900 opacity-70'
                  : 'bg-stone-950 border-stone-800 hover:border-stone-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                {/* Left check and title */}
                <div className="flex items-start gap-3 flex-1">
                  <button
                    type="button"
                    onClick={() => handleToggleItem(item.id)}
                    aria-label={item.completed ? 'Mark incomplete' : 'Mark completed'}
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      item.completed
                        ? 'bg-emerald-500 text-stone-950 shadow'
                        : 'border border-stone-700 hover:border-amber-400 bg-stone-900'
                    }`}
                  >
                    {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>

                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          item.urgency === 'mandatory'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : item.urgency === 'strongly_recommended'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-stone-900 text-stone-300 border border-stone-800'
                        }`}
                      >
                        {item.urgency.replace('_', ' ')}
                      </span>

                      <span className="text-[11px] text-stone-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-stone-500" />
                        <span>{item.timingGuidance}</span>
                      </span>

                      {item.itineraryRelevance && (
                        <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800 text-[10px] font-semibold flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>{item.itineraryRelevance}</span>
                        </span>
                      )}
                    </div>

                    <h4
                      className={`text-sm font-bold transition-colors ${
                        item.completed ? 'line-through text-stone-500' : 'text-white'
                      }`}
                    >
                      {item.title}
                    </h4>
                    <p className="text-xs text-stone-400 font-light">{item.subtitle}</p>

                    {/* Expandable description */}
                    {isExpanded && (
                      <div className="pt-2 text-xs text-stone-300 font-light leading-relaxed border-t border-stone-900 mt-2 space-y-2">
                        <p>{item.description}</p>
                        {item.officialLink && (
                          <a
                            href={item.officialLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 underline font-semibold pt-1"
                          >
                            <span>{item.officialLinkLabel || 'View Official Documentation'}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Expand / Collapse toggle */}
                <button
                  type="button"
                  onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                  className="text-stone-500 hover:text-stone-300 p-1 shrink-0"
                  aria-label={isExpanded ? 'Collapse' : 'Expand'}
                >
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="text-center py-12 rounded-xl bg-stone-950 border border-stone-800 text-stone-400 text-xs">
            <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-80" />
            <p className="font-semibold text-white">All selected requirements are checked!</p>
            <p className="text-stone-500 mt-1">Uncheck &quot;Show Pending Only&quot; to review all completed items.</p>
          </div>
        )}
      </div>
    </div>
  );
};
