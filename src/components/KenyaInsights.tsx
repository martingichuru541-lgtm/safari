/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { InsightArticle, ArticleCategory } from '../types/insights';
import { INITIAL_INSIGHTS } from '../data/insights';
import {
  BookOpen,
  Camera,
  Compass,
  Clock,
  UserCheck,
  Search,
  Sparkles,
  ArrowRight,
  X,
  Share2,
  Check,
  Sliders,
  ShieldCheck,
  Lightbulb,
  Tag,
  Eye,
  BellRing,
  CloudRain,
  CalendarDays,
  Radio,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import { TravelAlert } from '../types/alerts';
import { INITIAL_TRAVEL_ALERTS } from '../data/travelAlerts';

interface KenyaInsightsProps {
  articles?: InsightArticle[];
  alerts?: TravelAlert[];
  onSelectReserve?: (reserveId: string) => void;
  onBookSafari?: (safariId: string) => void;
  onView3DScene?: (sceneIndex: number) => void;
}

export const KenyaInsights: React.FC<KenyaInsightsProps> = ({
  articles = INITIAL_INSIGHTS,
  alerts = INITIAL_TRAVEL_ALERTS,
  onSelectReserve,
  onBookSafari,
  onView3DScene,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<InsightArticle | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeAlertIndex, setActiveAlertIndex] = useState(0);
  const [dismissedAlertIds, setDismissedAlertIds] = useState<string[]>([]);

  const activeAlerts = alerts.filter((a) => a.isActive && !dismissedAlertIds.includes(a.id));

  const categories: string[] = [
    'All',
    'Safari Guides',
    'Wildlife Photography',
    'Conservation & Community',
    'Swahili Coast',
    'Travel Essentials',
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const featuredArticle = articles.find((a) => a.featured) || articles[0];

  const handleShare = (art: InsightArticle) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/#insights-${art.slug}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  return (
    <section id="insights" className="py-20 bg-stone-900 text-stone-100 px-4 sm:px-6 lg:px-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-stone-800 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Editorial Journal &amp; Field Notes</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif tracking-tight">
              Kenya Insights
            </h2>
            <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-2xl font-light">
              Authoritative field dispatches, masterclass wildlife photography settings, migration crossing timings, and conservation chronicles from veteran KPSGA naturalists.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search wildlife, gear, tips..."
              className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Dynamic AI Travel Alerts Banner System */}
        {activeAlerts.length > 0 && (
          <div className="relative rounded-2xl bg-stone-950 border border-stone-800 p-4 sm:p-5 shadow-2xl transition-all">
            {(() => {
              const currentAlert = activeAlerts[activeAlertIndex % activeAlerts.length];
              const getIcon = () => {
                switch (currentAlert.type) {
                  case 'migration_timing':
                    return <Compass className="w-5 h-5 text-amber-400" />;
                  case 'weather_season':
                    return <CloudRain className="w-5 h-5 text-sky-400" />;
                  case 'cultural_festival':
                    return <CalendarDays className="w-5 h-5 text-emerald-400" />;
                  case 'conservation_advisory':
                    return <ShieldCheck className="w-5 h-5 text-purple-400" />;
                  default:
                    return <BellRing className="w-5 h-5 text-amber-400" />;
                }
              };

              const getBadgeColors = () => {
                switch (currentAlert.type) {
                  case 'migration_timing':
                    return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
                  case 'weather_season':
                    return 'bg-sky-500/20 text-sky-400 border-sky-500/40';
                  case 'cultural_festival':
                    return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
                  case 'conservation_advisory':
                    return 'bg-purple-500/20 text-purple-400 border-purple-500/40';
                  default:
                    return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
                }
              };

              return (
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 shrink-0 mt-0.5">
                      {getIcon()}
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getBadgeColors()}`}>
                          {currentAlert.type.replace('_', ' ')}
                        </span>
                        <span className="text-xs text-stone-400 flex items-center gap-1 font-mono">
                          <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                          <span>{currentAlert.sourceAgent}</span>
                        </span>
                        <span className="text-stone-500 text-xs">•</span>
                        <span className="text-stone-400 text-xs font-semibold">{currentAlert.region}</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white font-serif">
                        {currentAlert.title}
                      </h4>
                      <p className="text-xs text-stone-300 font-light max-w-3xl leading-relaxed">
                        {currentAlert.message}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Carousel controls */}
                  <div className="flex items-center gap-3 shrink-0 self-end lg:self-center pt-2 lg:pt-0 border-t lg:border-t-0 border-stone-800 w-full lg:w-auto justify-between lg:justify-end">
                    {/* Carousel Indicators if > 1 */}
                    {activeAlerts.length > 1 && (
                      <div className="flex items-center gap-1.5 mr-2">
                        {activeAlerts.map((a, idx) => (
                          <button
                            key={a.id}
                            type="button"
                            onClick={() => setActiveAlertIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              idx === activeAlertIndex % activeAlerts.length
                                ? 'bg-amber-400 w-5'
                                : 'bg-stone-700 hover:bg-stone-500'
                            }`}
                            aria-label={`Show alert ${idx + 1}`}
                          />
                        ))}
                      </div>
                    )}

                    {currentAlert.ctaLabel && (
                      <button
                        type="button"
                        onClick={() => {
                          if (currentAlert.actionTarget === 'safaris') {
                            const el = document.getElementById('safaris');
                            el?.scrollIntoView({ behavior: 'smooth' });
                          } else if (currentAlert.actionTarget === 'destinations') {
                            const el = document.getElementById('destinations');
                            el?.scrollIntoView({ behavior: 'smooth' });
                          } else if (currentAlert.actionTarget === 'concierge') {
                            const el = document.getElementById('concierge');
                            el?.scrollIntoView({ behavior: 'smooth' });
                          } else if (currentAlert.actionTarget === 'hotels') {
                            const el = document.getElementById('hotels');
                            el?.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-stone-950 font-bold text-xs tracking-wide transition-all uppercase flex items-center gap-1"
                      >
                        <span>{currentAlert.ctaLabel}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setDismissedAlertIds([...dismissedAlertIds, currentAlert.id])}
                      className="p-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-white text-xs transition-colors"
                      title="Dismiss Alert"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'bg-stone-950 text-stone-300 border border-stone-800 hover:border-stone-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lead Featured Article Spotlight (when on All and no search) */}
        {selectedCategory === 'All' && !searchQuery && featuredArticle && (
          <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-stone-950 shadow-2xl group">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-7 relative min-h-[340px] lg:min-h-[460px] overflow-hidden">
                <img
                  src={featuredArticle.heroImage}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent lg:hidden" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-stone-950 text-xs font-extrabold uppercase tracking-wider shadow">
                    Cover Story
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-stone-400">
                    <span className="px-2.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-amber-400 font-semibold">
                      {featuredArticle.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      {featuredArticle.readTimeMinutes} min read
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-stone-400" />
                      {featuredArticle.viewsCount.toLocaleString()}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-tight leading-tight group-hover:text-amber-400 transition-colors">
                    {featuredArticle.title}
                  </h3>

                  <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>

                  {/* Author badge */}
                  <div className="flex items-center gap-3 pt-3 border-t border-stone-800">
                    <img
                      src={featuredArticle.author.avatar}
                      alt={featuredArticle.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {featuredArticle.author.name}
                      </span>
                      <span className="text-[11px] text-stone-400 block font-light">
                        {featuredArticle.author.credentials}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {featuredArticle.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-stone-900 text-stone-400 text-[11px]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveArticle(featuredArticle)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-stone-950 rounded-2xl border border-stone-800 overflow-hidden shadow-xl hover:border-amber-500/40 transition-all flex flex-col justify-between group"
            >
              {/* Card Image */}
              <div className="relative h-52 overflow-hidden bg-stone-900">
                <img
                  src={article.heroImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-stone-950/90 border border-stone-700 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-950/85 text-stone-300 text-[11px]">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{article.readTimeMinutes} min</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[11px] text-stone-500 block font-mono">
                    {article.publishedAt}
                  </span>

                  <h3 className="text-lg font-bold text-white font-serif leading-snug group-hover:text-amber-400 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-xs text-stone-400 font-light line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                {/* Author row & Read button */}
                <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-8 h-8 rounded-full object-cover border border-stone-700"
                    />
                    <div className="leading-tight">
                      <span className="text-xs font-semibold text-white block">
                        {article.author.name}
                      </span>
                      <span className="text-[10px] text-stone-500 block">
                        {article.author.role}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveArticle(article)}
                    className="p-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 text-amber-400 hover:text-amber-300 transition-colors"
                    aria-label={`Read ${article.title}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16 text-stone-400 bg-stone-950 rounded-2xl border border-stone-800">
            <BookOpen className="w-10 h-10 text-amber-500 mx-auto mb-2 opacity-60" />
            <p className="text-sm">No articles match &quot;{searchQuery}&quot;.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-3 px-4 py-1.5 rounded-lg bg-stone-900 text-xs text-amber-400 border border-stone-800"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Full-Screen Article Reader Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
            <div className="bg-stone-950 border border-stone-800 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative text-stone-100 flex flex-col">
              {/* Sticky Top Reader Bar */}
              <div className="sticky top-0 z-30 px-6 py-4 bg-stone-950/95 border-b border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    {activeArticle.category}
                  </span>
                  <span className="text-stone-400 text-xs">•</span>
                  <span className="text-xs text-stone-400">{activeArticle.readTimeMinutes} min read</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleShare(activeArticle)}
                    className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors text-xs flex items-center gap-1.5"
                    title="Share Article Link"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                    <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveArticle(null)}
                    className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors"
                    aria-label="Close Article"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Reader Body */}
              <div className="p-6 sm:p-10 space-y-8">
                {/* Title & Subtitle */}
                <div className="space-y-3">
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-serif tracking-tight leading-tight">
                    {activeArticle.title}
                  </h1>
                  <p className="text-stone-300 text-sm sm:text-base font-light italic">
                    {activeArticle.subtitle}
                  </p>
                </div>

                {/* Author Bylines Card */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-stone-900/90 border border-stone-800">
                  <img
                    src={activeArticle.author.avatar}
                    alt={activeArticle.author.name}
                    className="w-12 h-12 rounded-full object-cover border border-amber-500/50"
                  />
                  <div>
                    <span className="text-sm font-bold text-white block">
                      {activeArticle.author.name}
                    </span>
                    <span className="text-xs text-amber-400 block font-medium">
                      {activeArticle.author.role}
                    </span>
                    <span className="text-[11px] text-stone-400 block font-light">
                      {activeArticle.author.credentials}
                    </span>
                  </div>
                </div>

                {/* Hero Photo Banner */}
                <div className="rounded-2xl overflow-hidden border border-stone-800 shadow-xl max-h-[380px]">
                  <img
                    src={activeArticle.heroImage}
                    alt={activeArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Article Sections */}
                <div className="space-y-8">
                  {activeArticle.sections.map((sec, idx) => (
                    <div key={idx} className="space-y-4">
                      <h3 className="text-xl font-bold text-white font-serif border-l-2 border-amber-500 pl-3">
                        {sec.heading}
                      </h3>

                      <div className="space-y-3 text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
                        {sec.body.map((p, pIdx) => (
                          <p key={pIdx}>{p}</p>
                        ))}
                      </div>

                      {/* Pro Tip Box */}
                      {sec.proTip && (
                        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
                          <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <strong className="block text-amber-300 font-semibold mb-0.5">
                              Guide Insider Tip:
                            </strong>
                            <span className="font-light leading-relaxed">{sec.proTip}</span>
                          </div>
                        </div>
                      )}

                      {/* Photo Settings Box */}
                      {sec.photoSettings && (
                        <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                            <Camera className="w-4 h-4 text-amber-400" />
                            <span>Recommended Camera EXIF Settings</span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                            <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800">
                              <span className="text-[10px] text-stone-400 block uppercase">Camera &amp; Lens</span>
                              <span className="text-stone-200 font-semibold">{sec.photoSettings.lens}</span>
                            </div>
                            <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800">
                              <span className="text-[10px] text-stone-400 block uppercase">Aperture</span>
                              <span className="text-amber-400 font-bold font-mono">{sec.photoSettings.aperture}</span>
                            </div>
                            <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800">
                              <span className="text-[10px] text-stone-400 block uppercase">Shutter Speed</span>
                              <span className="text-amber-400 font-bold font-mono">{sec.photoSettings.shutterSpeed}</span>
                            </div>
                          </div>

                          <p className="text-[11px] text-stone-400 italic">
                            💡 Lighting notes: {sec.photoSettings.lightingNote}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Related Safaris & 3D Scene CTA */}
                <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-400">Featured In:</span>
                    {activeArticle.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-stone-300 text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    {onView3DScene && (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveArticle(null);
                          onView3DScene(0);
                        }}
                        className="px-4 py-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 text-amber-400 text-xs font-semibold"
                      >
                        Explore 3D Scene
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        const safariId = activeArticle.relatedSafariIds[0];
                        setActiveArticle(null);
                        if (safariId && onBookSafari) {
                          onBookSafari(safariId);
                        } else {
                          const el = document.getElementById('safaris');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider"
                    >
                      View Linked Safaris →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
