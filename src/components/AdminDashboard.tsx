/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookingInquiry, AffiliateClickLog } from '../types/travel';
import { AFFILIATE_PARTNERS } from '../data/affiliates';
import { calculateCommission } from '../utils/marketplaceRules';
import {
  LayoutDashboard,
  TrendingUp,
  DollarSign,
  Compass,
  Building2,
  Users,
  Search,
  CheckCircle,
  Clock,
  ExternalLink,
  Bot,
  Settings,
  Shield,
  FileText,
  Activity,
  Globe,
  BookOpen,
  Plus,
  Leaf,
  TreePine,
  CloudSun,
  Wind,
  Thermometer,
  Sparkles,
  Radio,
  RotateCw,
  BellRing,
  AlertTriangle,
  ChevronRight,
  Plane,
} from 'lucide-react';
import { FlightConnectionsWidget } from './FlightConnectionsWidget';
import { InsightArticle } from '../types/insights';
import { INITIAL_INSIGHTS } from '../data/insights';
import { TravelAlert } from '../types/alerts';
import { INITIAL_TRAVEL_ALERTS } from '../data/travelAlerts';
import {
  REFORESTATION_PROJECTS,
  WILDLIFE_CENSUS_DATA,
  SUSTAINABILITY_METRICS,
} from '../data/sustainability';
import { ParkWeatherReport } from '../types/climate';
import { INITIAL_PARK_WEATHER_DATA } from '../data/climateData';
import { calculateTotalTreesPlanted, calculateTotalWildlifeGrowth } from '../utils/sustainabilityLogic';
import { calculateAverageNationalTemp, getBestParkForCurrentSeason } from '../utils/climateLogic';

interface AdminDashboardProps {
  inquiries: BookingInquiry[];
  affiliateClicks: AffiliateClickLog[];
  alerts?: TravelAlert[];
  onUpdateAlerts?: (alerts: TravelAlert[]) => void;
  onUpdateInquiryStatus: (id: string, status: BookingInquiry['status']) => void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  inquiries,
  affiliateClicks,
  alerts = INITIAL_TRAVEL_ALERTS,
  onUpdateAlerts,
  onUpdateInquiryStatus,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'inquiries'
    | 'flights'
    | 'content_studio'
    | 'ai_agents'
    | 'climate'
    | 'sustainability'
    | 'affiliates'
    | 'commissions'
    | 'seo'
  >('overview');

  const [articlesList, setArticlesList] = useState<InsightArticle[]>(INITIAL_INSIGHTS);
  const [alertsList, setAlertsList] = useState<TravelAlert[]>(alerts);
  const [weatherList, setWeatherList] = useState<ParkWeatherReport[]>(INITIAL_PARK_WEATHER_DATA);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<InsightArticle['category']>('Safari Guides');
  const [newExcerpt, setNewExcerpt] = useState('');

  // AI Alerts state
  const [newAlertTitle, setNewAlertTitle] = useState('');
  const [newAlertType, setNewAlertType] = useState<TravelAlert['type']>('migration_timing');
  const [newAlertRegion, setNewAlertRegion] = useState('Maasai Mara & Mara Triangle');
  const [newAlertMessage, setNewAlertMessage] = useState('');
  const [isAlertScanning, setIsAlertScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  // Climate state
  const [selectedParkId, setSelectedParkId] = useState<string>(INITIAL_PARK_WEATHER_DATA[0].parkId);
  const [isRefreshingWeather, setIsRefreshingWeather] = useState(false);

  // Compute live aggregates from actual application state
  const totalInquiries = inquiries.length;
  const totalGrossBookingUSD = inquiries.reduce((sum, item) => sum + item.estimatedTotalUSD, 0);

  // Compute estimated commissions across inquiries
  const totalDirectCommissionUSD = inquiries.reduce((sum, item) => {
    const calc = calculateCommission({
      bookingAmount: item.estimatedTotalUSD,
      partnerType: item.itemType === 'hotel' ? 'direct_lodge' : 'tour_operator',
    });
    return sum + calc.commissionEarned;
  }, 0);

  const totalAffiliateClicks = affiliateClicks.length;
  const totalAffiliateRevenueUSD = affiliateClicks.reduce(
    (sum, c) => sum + c.estimatedCommissionUSD,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-7xl h-[92vh] flex flex-col overflow-hidden shadow-2xl text-stone-100">
        {/* Top Navbar */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              K1
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-serif">
                KenyaOne Enterprise Operations Dashboard
              </h2>
              <p className="text-[11px] text-stone-400">
                Live Marketplace Telemetry, Financial Ledger &amp; Partner Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Production Marketplace Live</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition-colors"
            >
              Exit Dashboard
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar Nav */}
          <div className="w-56 bg-stone-950 p-4 border-r border-stone-800 flex flex-col justify-between shrink-0">
            <div className="space-y-1">
              {[
                { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
                { id: 'inquiries', label: 'Inquiries & Bookings', icon: FileText, badge: totalInquiries },
                { id: 'flights', label: 'Flight Connections (JKIA/WIL)', icon: Plane, badge: 14 },
                { id: 'content_studio', label: 'Content Studio (CMS)', icon: BookOpen, badge: articlesList.length },
                { id: 'ai_agents', label: 'AI Travel Alerts Agent', icon: Bot, badge: alertsList.filter((a) => a.isActive).length },
                { id: 'climate', label: 'AI Climate Monitoring', icon: CloudSun, badge: weatherList.length },
                { id: 'sustainability', label: 'Conservation & Eco', icon: Leaf },
                { id: 'affiliates', label: 'Affiliate Network', icon: ExternalLink, badge: totalAffiliateClicks },
                { id: 'commissions', label: 'Commissions & Payouts', icon: DollarSign },
                { id: 'seo', label: 'SEO & Organic Traffic', icon: Globe },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      active
                        ? 'bg-amber-500 text-stone-950 font-bold shadow'
                        : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </div>
                    {tab.badge !== undefined && tab.badge > 0 && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                          active ? 'bg-stone-950 text-amber-400' : 'bg-stone-800 text-stone-300'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-stone-800/80 text-[11px] text-stone-400 space-y-1">
              <span className="block font-semibold text-stone-300">Operator: KenyaOne Ltd</span>
              <span>License: KTB/KATO/2026/049</span>
              <span className="block text-[10px] text-stone-500">Security: RBAC Authenticated</span>
            </div>
          </div>

          {/* Main Panel */}
          <div className="flex-1 p-6 overflow-y-auto bg-stone-900/60">
            {/* TAB 1: EXECUTIVE OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Metric Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800">
                    <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
                      Active Inquiries
                    </span>
                    <div className="text-3xl font-extrabold text-white mt-1">
                      {totalInquiries}
                    </div>
                    <span className="text-[11px] text-emerald-400 font-medium block mt-1">
                      +100% verified traveler leads
                    </span>
                  </div>

                  <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800">
                    <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
                      Gross Pipeline Value
                    </span>
                    <div className="text-3xl font-extrabold text-amber-400 mt-1">
                      ${totalGrossBookingUSD.toLocaleString()} USD
                    </div>
                    <span className="text-[11px] text-stone-400 block mt-1">
                      Across Safaris &amp; Luxury Lodges
                    </span>
                  </div>

                  <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800">
                    <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
                      Direct Net Commission
                    </span>
                    <div className="text-3xl font-extrabold text-emerald-400 mt-1">
                      ${Math.round(totalDirectCommissionUSD).toLocaleString()} USD
                    </div>
                    <span className="text-[11px] text-stone-400 block mt-1">
                      Avg. 12-15% supplier contract rate
                    </span>
                  </div>

                  <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800">
                    <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
                      Affiliate Referrals
                    </span>
                    <div className="text-3xl font-extrabold text-sky-400 mt-1">
                      {totalAffiliateClicks}
                    </div>
                    <span className="text-[11px] text-stone-400 block mt-1">
                      OTA Referral rev-share pending
                    </span>
                  </div>
                </div>

                {/* Live Flight Connections Alert Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-950/40 via-stone-950 to-amber-950/40 border border-sky-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-900/40 border border-sky-700/50 flex items-center justify-center text-sky-400 shrink-0">
                      <Plane className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">
                        Airport Logistics &amp; Inbound Travelers
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        Live Flight Operations: JKIA (NBO) &amp; Wilson Airport (WIL) Active
                      </h4>
                      <p className="text-xs text-stone-400 font-light mt-0.5">
                        Lord Crawford party landed on KQ 101 from LHR. VIP transfer standing by for Wilson bush hop SAF 012 to Maasai Mara.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab('flights')}
                    className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1.5"
                  >
                    <span>View Flight Board</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Recent Inquiries Quick Table */}
                <div className="bg-stone-950 rounded-2xl border border-stone-800 p-6 space-y-4">
                  <h3 className="text-base font-bold text-white font-serif">
                    Recent Customer Inquiries &amp; Quotations
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-stone-800 text-stone-400 uppercase font-semibold">
                          <th className="pb-3">Reference</th>
                          <th className="pb-3">Traveler</th>
                          <th className="pb-3">Package / Property</th>
                          <th className="pb-3">Target Date</th>
                          <th className="pb-3">Estimated Total</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-800/60">
                        {inquiries.map((inq) => (
                          <tr key={inq.id} className="text-stone-300">
                            <td className="py-3 font-mono font-bold text-amber-400">{inq.id}</td>
                            <td className="py-3 font-medium text-white">{inq.customerName}</td>
                            <td className="py-3">{inq.itemName}</td>
                            <td className="py-3">{inq.travelDate}</td>
                            <td className="py-3 font-bold text-emerald-400">
                              ${inq.estimatedTotalUSD.toLocaleString()}
                            </td>
                            <td className="py-3">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  inq.status === 'Confirmed'
                                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                    : inq.status === 'Quoted'
                                    ? 'bg-amber-950 text-amber-400 border border-amber-800'
                                    : 'bg-stone-800 text-stone-300'
                                }`}
                              >
                                {inq.status}
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              <select
                                value={inq.status}
                                onChange={(e) =>
                                  onUpdateInquiryStatus(
                                    inq.id,
                                    e.target.value as BookingInquiry['status']
                                  )
                                }
                                className="bg-stone-900 border border-stone-800 text-stone-200 rounded px-2 py-1 text-[11px]"
                              >
                                <option value="Pending Review">Pending</option>
                                <option value="Quoted">Quoted</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: INQUIRIES & BOOKINGS */}
            {activeTab === 'inquiries' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white font-serif">
                    All Customer Inquiries ({inquiries.length})
                  </h3>
                </div>

                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="bg-stone-950 p-5 rounded-2xl border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-amber-400">
                            {inq.id}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-stone-900 text-stone-300 text-[10px] uppercase font-semibold">
                            {inq.itemType}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white">{inq.itemName}</h4>
                        <p className="text-xs text-stone-400">
                          Guest: <strong className="text-stone-200">{inq.customerName}</strong> ({inq.customerEmail}) • Party of {inq.travelers} • Date: {inq.travelDate}
                        </p>
                        {inq.specialRequests && (
                          <p className="text-[11px] text-stone-400 italic">
                            &quot;{inq.specialRequests}&quot;
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <div className="text-right">
                          <span className="text-[10px] uppercase text-stone-400 block font-semibold">
                            Value
                          </span>
                          <span className="text-lg font-extrabold text-amber-400">
                            ${inq.estimatedTotalUSD.toLocaleString()} USD
                          </span>
                        </div>

                        <select
                          value={inq.status}
                          onChange={(e) =>
                            onUpdateInquiryStatus(
                              inq.id,
                              e.target.value as BookingInquiry['status']
                            )
                          }
                          className="bg-stone-900 border border-stone-800 text-stone-200 rounded-xl px-3 py-2 text-xs font-semibold"
                        >
                          <option value="Pending Review">Pending Review</option>
                          <option value="Quoted">Quoted</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: FLIGHT CONNECTIONS (JKIA & WILSON) */}
            {activeTab === 'flights' && (
              <FlightConnectionsWidget />
            )}

            {/* TAB 3: AFFILIATE NETWORK */}
            {activeTab === 'affiliates' && (
              <div className="space-y-6">
                <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800">
                  <h3 className="text-base font-bold text-white font-serif mb-2">
                    Authorized Global Affiliate Integrations
                  </h3>
                  <p className="text-xs text-stone-400 mb-6 font-light">
                    KenyaOne seamlessly redirects travelers to approved booking providers with deep-link tracking and commission attribution.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {AFFILIATE_PARTNERS.map((partner) => (
                      <div
                        key={partner.id}
                        className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-white">{partner.name}</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold">
                            {partner.status}
                          </span>
                        </div>
                        <p className="text-xs text-stone-400 font-light">{partner.description}</p>
                        <div className="pt-2 border-t border-stone-800 text-[11px] space-y-1">
                          <div className="flex justify-between">
                            <span className="text-stone-400">Commission Rate:</span>
                            <span className="text-amber-400 font-semibold">{partner.baseCommissionRate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-400">Tracking Parameter:</span>
                            <span className="text-stone-300 font-mono">{partner.trackingParam}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Affiliate Click Log */}
                <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 space-y-3">
                  <h4 className="text-sm font-bold text-white">Recent Referral Clicks ({affiliateClicks.length})</h4>
                  {affiliateClicks.length > 0 ? (
                    <div className="space-y-2">
                      {affiliateClicks.map((click) => (
                        <div
                          key={click.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-stone-900 text-xs border border-stone-800"
                        >
                          <div>
                            <span className="font-bold text-white block">{click.targetListing}</span>
                            <span className="text-stone-400 text-[11px]">{click.partner} • {click.timestamp}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-amber-400 font-bold block">+${click.estimatedCommissionUSD} est.</span>
                            <span className="text-[10px] text-stone-400">{click.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-stone-500">No external clicks logged yet.</p>
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: COMMISSIONS & PAYOUTS */}
            {activeTab === 'commissions' && (
              <div className="space-y-6">
                <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 space-y-4">
                  <h3 className="text-base font-bold text-white font-serif">
                    Direct Partner Revenue Share Matrix
                  </h3>
                  <p className="text-xs text-stone-400 font-light">
                    Configurable commission rules for hotels, lodges, vehicle operators, and guides under contract with KenyaOne.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-stone-900 border border-stone-800">
                      <span className="text-stone-400 block uppercase font-semibold">Direct Luxury Lodges</span>
                      <span className="text-2xl font-bold text-amber-400 mt-1 block">15.0%</span>
                      <span className="text-stone-500 text-[11px]">Net billing post guest check-out</span>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-900 border border-stone-800">
                      <span className="text-stone-400 block uppercase font-semibold">Tour Outfitters</span>
                      <span className="text-2xl font-bold text-amber-400 mt-1 block">12.0%</span>
                      <span className="text-stone-500 text-[11px]">Wholesale contracted departures</span>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-900 border border-stone-800">
                      <span className="text-stone-400 block uppercase font-semibold">Safari Fleet Hire</span>
                      <span className="text-2xl font-bold text-amber-400 mt-1 block">10.0%</span>
                      <span className="text-stone-500 text-[11px]">Daily vehicle dry/wet hire fee</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: SEO CENTRE */}
            {activeTab === 'seo' && (
              <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 space-y-4">
                <h3 className="text-base font-bold text-white font-serif">
                  SEO &amp; Organic Search Centre
                </h3>
                <p className="text-xs text-stone-400 font-light">
                  Targeted high-intent landing pages for international safari discovery.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    { slug: '/safaris/maasai-mara-great-migration', kw: 'Maasai Mara Great Migration Safaris 2026', impressions: '14,200', ctr: '8.4%' },
                    { slug: '/destinations/amboseli-elephants-kilimanjaro', kw: 'Amboseli Safari Kilimanjaro View', impressions: '9,800', ctr: '7.1%' },
                    { slug: '/hotels/luxury-safari-lodges-kenya', kw: 'Luxury Safari Lodges in Kenya', impressions: '18,500', ctr: '9.6%' },
                    { slug: '/guide/best-time-to-visit-kenya', kw: 'Best Time to Visit Kenya Safari', impressions: '31,000', ctr: '11.2%' },
                    { slug: '/vehicles/4x4-land-cruiser-hire-nairobi', kw: '4x4 Safari Land Cruiser Hire Kenya', impressions: '6,400', ctr: '6.8%' },
                    { slug: '/destinations/diani-beach-luxury-villas', kw: 'Diani Beach Luxury Villas Kenya', impressions: '11,300', ctr: '7.9%' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 flex justify-between items-center">
                      <div>
                        <span className="text-white font-semibold block">{item.kw}</span>
                        <span className="text-[11px] text-stone-500 font-mono">{item.slug}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-400 font-bold block">{item.ctr} CTR</span>
                        <span className="text-[10px] text-stone-400">{item.impressions} impr.</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: CONTENT STUDIO (CMS) */}
            {activeTab === 'content_studio' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <h3 className="text-lg font-bold text-white font-serif">
                      Kenya Insights Content Studio &amp; CMS
                    </h3>
                    <p className="text-xs text-stone-400 font-light">
                      Manage published field guides, wildlife photography dispatches, and guest briefing articles.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-stone-950 border border-stone-800 rounded-lg text-xs text-amber-400 font-semibold">
                      {articlesList.length} Active Articles
                    </span>
                    <span className="px-3 py-1 bg-stone-950 border border-stone-800 rounded-lg text-xs text-emerald-400 font-semibold">
                      {articlesList.reduce((acc, a) => acc + a.viewsCount, 0).toLocaleString()} Total Views
                    </span>
                  </div>
                </div>

                {/* Quick Article Drafter Form */}
                <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Plus className="w-4 h-4 text-amber-400" />
                    <span>Publish New Kenya Travel Insight</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Article Headline (e.g. Tsavo Red Elephants: Mudanda Rock Guide)..."
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as InsightArticle['category'])}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      >
                        <option value="Safari Guides">Safari Guides</option>
                        <option value="Wildlife Photography">Wildlife Photography</option>
                        <option value="Conservation & Community">Conservation &amp; Community</option>
                        <option value="Swahili Coast">Swahili Coast</option>
                        <option value="Travel Essentials">Travel Essentials</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <textarea
                      rows={2}
                      value={newExcerpt}
                      onChange={(e) => setNewExcerpt(e.target.value)}
                      placeholder="Brief excerpt / introduction for travelers..."
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!newTitle.trim()) return;
                      const newArticle: InsightArticle = {
                        id: `art-${Date.now()}`,
                        slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                        title: newTitle,
                        subtitle: 'Fresh Dispatch from KenyaOne Field Guides',
                        category: newCategory,
                        author: {
                          name: 'Ole Kishoiyo',
                          role: 'Senior Naturalist',
                          credentials: 'Gold-Level KPSGA Guide',
                          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                        },
                        publishedAt: 'Today',
                        readTimeMinutes: 5,
                        heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
                        tags: ['Kenya', 'Safari', newCategory],
                        featured: false,
                        viewsCount: 1,
                        excerpt: newExcerpt || 'Expert dispatches from KenyaOne field naturalists.',
                        sections: [
                          {
                            heading: 'Overview & Highlights',
                            body: [newExcerpt || 'A detailed exploration of Kenyan wildlife habitats.'],
                          },
                        ],
                        relatedReserveIds: ['maasai-mara'],
                        relatedSafariIds: ['great-migration-signature-7d'],
                      };
                      setArticlesList([newArticle, ...articlesList]);
                      setNewTitle('');
                      setNewExcerpt('');
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all"
                  >
                    Publish to Kenya Insights
                  </button>
                </div>

                {/* Published Articles List */}
                <div className="bg-stone-950 rounded-2xl border border-stone-800 p-5 space-y-3">
                  <h4 className="text-sm font-bold text-white">Articles Inventory ({articlesList.length})</h4>
                  <div className="space-y-2.5">
                    {articlesList.map((art) => (
                      <div
                        key={art.id}
                        className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-stone-950 text-amber-400 font-semibold text-[10px] uppercase">
                              {art.category}
                            </span>
                            {art.featured && (
                              <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-bold text-[10px]">
                                Featured
                              </span>
                            )}
                            <span className="text-stone-500 text-[11px]">• {art.readTimeMinutes} min</span>
                          </div>
                          <span className="text-white font-bold block">{art.title}</span>
                          <span className="text-stone-400 text-[11px]">
                            By {art.author.name} ({art.author.role})
                          </span>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-stone-400 font-mono text-xs">
                            {art.viewsCount.toLocaleString()} reads
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setArticlesList(
                                articlesList.map((item) =>
                                  item.id === art.id ? { ...item, featured: !item.featured } : item
                                )
                              );
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                              art.featured
                                ? 'bg-amber-500 text-stone-950'
                                : 'bg-stone-800 text-stone-300 hover:text-white'
                            }`}
                          >
                            {art.featured ? 'Featured' : 'Set Featured'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: AI TRAVEL ALERTS AGENT */}
            {activeTab === 'ai_agents' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <h3 className="text-lg font-bold text-white font-serif flex items-center gap-2">
                      <Bot className="w-5 h-5 text-amber-400" />
                      <span>AI Travel Alerts Agent &amp; Field Dispatch</span>
                    </h3>
                    <p className="text-xs text-stone-400 font-light">
                      Monitors real-time Great Migration coordinates, KMD seasonal weather radar, and cultural festival timetables to broadcast live advisory banners to guests.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={isAlertScanning}
                      onClick={() => {
                        setIsAlertScanning(true);
                        setScanMessage('Connecting to Mara Triangle telemetry & KMD meteorological radar...');
                        setTimeout(() => {
                          setScanMessage('Satellite telemetry verified: Sand River crossing active. 0 new advisories required.');
                          setIsAlertScanning(false);
                          setTimeout(() => setScanMessage(null), 4000);
                        }, 1200);
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all"
                    >
                      <RotateCw className={`w-3.5 h-3.5 ${isAlertScanning ? 'animate-spin' : ''}`} />
                      <span>{isAlertScanning ? 'Scanning Telemetry...' : 'Trigger AI Alert Scan'}</span>
                    </button>
                  </div>
                </div>

                {scanMessage && (
                  <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-xs text-amber-200 flex items-center gap-2">
                    <Radio className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
                    <span>{scanMessage}</span>
                  </div>
                )}

                {/* Form: Dispatch New AI Traveler Alert */}
                <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <BellRing className="w-4 h-4 text-amber-400" />
                    <span>Dispatch New Guest Advisory Banner</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] text-stone-400 uppercase font-semibold mb-1">
                        Alert Title
                      </label>
                      <input
                        type="text"
                        value={newAlertTitle}
                        onChange={(e) => setNewAlertTitle(e.target.value)}
                        placeholder="e.g. Mara River Crossing: 8,000 Wildebeest at Purungat..."
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-stone-400 uppercase font-semibold mb-1">
                        Category Type
                      </label>
                      <select
                        value={newAlertType}
                        onChange={(e) => setNewAlertType(e.target.value as TravelAlert['type'])}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      >
                        <option value="migration_timing">Migration Timing</option>
                        <option value="weather_season">Weather &amp; Season</option>
                        <option value="cultural_festival">Cultural Festival</option>
                        <option value="conservation_advisory">Conservation Advisory</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-stone-400 uppercase font-semibold mb-1">
                        Target Ecosystem / Region
                      </label>
                      <input
                        type="text"
                        value={newAlertRegion}
                        onChange={(e) => setNewAlertRegion(e.target.value)}
                        placeholder="e.g. Maasai Mara, Amboseli, Lamu Coast..."
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-stone-400 uppercase font-semibold mb-1">
                        Dispatch Source Agent
                      </label>
                      <input
                        type="text"
                        readOnly
                        value="KenyaOne Autonomous Sentinel (Live Dispatch)"
                        className="w-full bg-stone-900/50 border border-stone-800/60 rounded-xl px-3.5 py-2 text-xs text-stone-400 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-stone-400 uppercase font-semibold mb-1">
                      Travel Advisory Message (Displayed in Kenya Insights Banner)
                    </label>
                    <textarea
                      rows={2}
                      value={newAlertMessage}
                      onChange={(e) => setNewAlertMessage(e.target.value)}
                      placeholder="Concise advisory for travelers explaining wildlife behavior, weather impact, or photography tips..."
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!newAlertTitle.trim() || !newAlertMessage.trim()) return;
                      const newAlert: TravelAlert = {
                        id: `alt-${Date.now()}`,
                        type: newAlertType,
                        severity: newAlertType === 'migration_timing' ? 'high_interest' : 'advisory',
                        title: newAlertTitle,
                        message: newAlertMessage,
                        region: newAlertRegion || 'All Kenya Reserves',
                        validFrom: new Date().toISOString().split('T')[0],
                        validTo: '2026-12-31',
                        isActive: true,
                        sourceAgent: 'KenyaOne Autonomous Sentinel (Live Dispatch)',
                        ctaLabel: 'View Active Expeditions',
                        actionTarget: 'safaris',
                      };

                      const updated = [newAlert, ...alertsList];
                      setAlertsList(updated);
                      onUpdateAlerts?.(updated);
                      setNewAlertTitle('');
                      setNewAlertMessage('');
                    }}
                    className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all"
                  >
                    Broadcast Alert to Travelers
                  </button>
                </div>

                {/* Active Alerts List */}
                <div className="bg-stone-950 rounded-2xl border border-stone-800 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                      <span>Live Travel Advisories ({alertsList.length})</span>
                    </h4>
                    <span className="text-[11px] text-stone-400">
                      {alertsList.filter((a) => a.isActive).length} active on public website
                    </span>
                  </div>

                  <div className="space-y-3">
                    {alertsList.map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-4 rounded-xl border transition-all ${
                          alert.isActive
                            ? 'bg-stone-900 border-stone-800'
                            : 'bg-stone-900/40 border-stone-900 opacity-60'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  alert.type === 'migration_timing'
                                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                    : alert.type === 'weather_season'
                                    ? 'bg-sky-950 text-sky-300 border border-sky-800'
                                    : alert.type === 'cultural_festival'
                                    ? 'bg-purple-950 text-purple-300 border border-purple-800'
                                    : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                }`}
                              >
                                {alert.type.replace('_', ' ')}
                              </span>
                              <span className="text-stone-400 text-[11px] font-medium">
                                {alert.region}
                              </span>
                              <span className="text-stone-500 text-[10px] font-mono">
                                • Valid {alert.validFrom} to {alert.validTo}
                              </span>
                            </div>
                            <h5 className="text-sm font-bold text-white">{alert.title}</h5>
                            <p className="text-xs text-stone-300 font-light max-w-3xl">
                              {alert.message}
                            </p>
                            <span className="text-[10px] text-stone-500 block">
                              Source: {alert.sourceAgent}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                            <button
                              type="button"
                              onClick={() => {
                                const updated = alertsList.map((a) =>
                                  a.id === alert.id ? { ...a, isActive: !a.isActive } : a
                                );
                                setAlertsList(updated);
                                onUpdateAlerts?.(updated);
                              }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                alert.isActive
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800 hover:bg-emerald-900'
                                  : 'bg-stone-800 text-stone-400 hover:text-white'
                              }`}
                            >
                              {alert.isActive ? 'Active (Live)' : 'Paused'}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = alertsList.filter((a) => a.id !== alert.id);
                                setAlertsList(updated);
                                onUpdateAlerts?.(updated);
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-900/50 text-xs transition-colors"
                            >
                              Dismiss
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: CLIMATE MONITORING */}
            {activeTab === 'climate' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <h3 className="text-lg font-bold text-white font-serif flex items-center gap-2">
                      <CloudSun className="w-5 h-5 text-amber-400" />
                      <span>AI Climate &amp; Park Weather Telemetry</span>
                    </h3>
                    <p className="text-xs text-stone-400 font-light">
                      Real-time regional weather feeds across Kenya&apos;s premier national parks to assist safari planning, game drive timing, and camera lens preparation.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={isRefreshingWeather}
                      onClick={() => {
                        setIsRefreshingWeather(true);
                        setTimeout(() => {
                          setIsRefreshingWeather(false);
                        }, 800);
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition-colors"
                    >
                      <RotateCw className={`w-3.5 h-3.5 ${isRefreshingWeather ? 'animate-spin' : ''}`} />
                      <span>{isRefreshingWeather ? 'Syncing...' : 'Sync Radar'}</span>
                    </button>
                  </div>
                </div>

                {/* Summary Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                    <span className="text-[11px] text-stone-400 uppercase font-semibold block">
                      National Average Safari Temp
                    </span>
                    <span className="text-2xl font-bold text-white mt-1 block">
                      {calculateAverageNationalTemp(weatherList)}°C
                    </span>
                    <span className="text-[10px] text-emerald-400">
                      Temperate highland &amp; savannah conditions
                    </span>
                  </div>

                  <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                    <span className="text-[11px] text-stone-400 uppercase font-semibold block">
                      Optimal Wildlife Tracking This Month
                    </span>
                    <span className="text-base font-bold text-amber-400 mt-1 block">
                      {getBestParkForCurrentSeason(weatherList)?.parkName.split(' ')[0] || 'Maasai Mara'}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      Based on grass height, predator activity &amp; waterhole access
                    </span>
                  </div>

                  <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                    <span className="text-[11px] text-stone-400 uppercase font-semibold block">
                      Telemetry Station Accuracy
                    </span>
                    <span className="text-base font-bold text-emerald-400 mt-1 block">
                      99.4% Verified
                    </span>
                    <span className="text-[10px] text-stone-400">
                      Kenya Meteorological Department &amp; KWS Field Radios
                    </span>
                  </div>
                </div>

                {/* Park Selector Tabs */}
                <div className="flex flex-wrap gap-2">
                  {weatherList.map((park) => {
                    const isSelected = park.parkId === selectedParkId;
                    return (
                      <button
                        key={park.parkId}
                        type="button"
                        onClick={() => setSelectedParkId(park.parkId)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-amber-500 text-stone-950 font-bold shadow'
                            : 'bg-stone-950 text-stone-300 hover:bg-stone-800 border border-stone-800'
                        }`}
                      >
                        {park.parkName.split(' ')[0]} ({park.currentTempC}°C)
                      </button>
                    );
                  })}
                </div>

                {/* Selected Park Detail View */}
                {(() => {
                  const currentReport =
                    weatherList.find((p) => p.parkId === selectedParkId) || weatherList[0];
                  return (
                    <div className="bg-stone-950 rounded-2xl border border-stone-800 p-6 space-y-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-800">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                            {currentReport.region}
                          </span>
                          <h4 className="text-xl font-bold text-white font-serif mt-0.5">
                            {currentReport.parkName}
                          </h4>
                          <span className="text-xs text-stone-400 mt-1 block">
                            Status: <strong className="text-emerald-400">{currentReport.suitabilityStatus}</strong>
                          </span>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span className="text-4xl font-extrabold text-white">
                              {currentReport.currentTempC}°C
                            </span>
                            <span className="text-xs text-stone-400 block">
                              Feels like {currentReport.feelsLikeC}°C • {currentReport.condition}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Telemetry Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                        <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
                          <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                            Safari Suitability Score
                          </span>
                          <span className="text-xl font-bold text-amber-400 mt-1 block">
                            {currentReport.safariSuitabilityScore} / 10
                          </span>
                          <span className="text-[10px] text-emerald-400">Exceptional Game Viewing</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
                          <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                            Golden Hour Light
                          </span>
                          <span className="text-base font-bold text-white mt-1 block">
                            {currentReport.goldenHourLightQuality}
                          </span>
                          <span className="text-[10px] text-stone-400">Peak 06:15 &amp; 17:45 EAT</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
                          <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                            Dust Index
                          </span>
                          <span className="text-base font-bold text-white mt-1 block">
                            {currentReport.dustIndex}
                          </span>
                          <span className="text-[10px] text-stone-400">Humidity: {currentReport.humidityPercent}%</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
                          <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                            Visibility &amp; Wind
                          </span>
                          <span className="text-base font-bold text-white mt-1 block">
                            {currentReport.visibilityKm} km • {currentReport.windSpeedKmh} km/h
                          </span>
                          <span className="text-[10px] text-stone-400">UV Index: {currentReport.uvIndex}</span>
                        </div>
                      </div>

                      {/* Seasonal Note & Broadcast Action */}
                      <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                            Park Naturalist Seasonal Telemetry
                          </span>
                          <p className="text-xs text-stone-200 font-light">
                            {currentReport.seasonalNote}
                          </p>
                          <span className="text-[10px] text-stone-500 font-mono block">
                            {currentReport.lastUpdated}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const advisoryAlert: TravelAlert = {
                              id: `alt-weather-${Date.now()}`,
                              type: 'weather_season',
                              severity: 'info',
                              title: `${currentReport.parkName.split(' ')[0]}: ${currentReport.suitabilityStatus}`,
                              message: currentReport.seasonalNote,
                              region: currentReport.parkName,
                              validFrom: new Date().toISOString().split('T')[0],
                              validTo: '2026-12-15',
                              isActive: true,
                              sourceAgent: 'KMD Meteorological Travel Watcher',
                              ctaLabel: 'Plan Safari Now',
                              actionTarget: 'safaris',
                            };
                            const updated = [advisoryAlert, ...alertsList];
                            setAlertsList(updated);
                            onUpdateAlerts?.(updated);
                            setActiveTab('ai_agents');
                          }}
                          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shrink-0"
                        >
                          Broadcast as Travel Alert
                        </button>
                      </div>

                      {/* 5-Day Forecast */}
                      <div>
                        <h5 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
                          5-Day Forward Safari Outlook
                        </h5>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                          {currentReport.forecast5Day.map((day, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-center space-y-1"
                            >
                              <span className="text-xs font-bold text-white block">{day.dayName}</span>
                              <span className="text-[11px] text-amber-400 font-semibold block">
                                {day.tempHighC}° / {day.tempLowC}°C
                              </span>
                              <span className="text-[10px] text-stone-400 block">{day.condition}</span>
                              <span className="text-[10px] text-sky-400 block font-mono">
                                {day.precipitationChance}% Rain
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* TAB: SUSTAINABILITY & CONSERVATION */}
            {activeTab === 'sustainability' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <h3 className="text-lg font-bold text-white font-serif flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-emerald-400" />
                      <span>Conservation, Reforestation &amp; Eco-Operations</span>
                    </h3>
                    <p className="text-xs text-stone-400 font-light">
                      Transparent environmental stewardship tracking across KenyaOne partner lodges, community conservancies, and wildlife trusts.
                    </p>
                  </div>

                  <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-lg text-xs font-semibold">
                    Verra VCS Verified Standards
                  </span>
                </div>

                {/* Key Eco Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800">
                    <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
                      Indigenous Trees Planted
                    </span>
                    <div className="text-3xl font-extrabold text-emerald-400 mt-1">
                      {calculateTotalTreesPlanted(REFORESTATION_PROJECTS).toLocaleString()}
                    </div>
                    <span className="text-[11px] text-stone-400 block mt-1">
                      Mau Water Tower &amp; Mount Kenya Corridors
                    </span>
                  </div>

                  <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800">
                    <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
                      Carbon Offset (tCO2e)
                    </span>
                    <div className="text-3xl font-extrabold text-amber-400 mt-1">
                      {SUSTAINABILITY_METRICS.totalCO2OffsetTonnes.toLocaleString()}
                    </div>
                    <span className="text-[11px] text-stone-400 block mt-1">
                      Chyulu Hills REDD+ Carbon Project
                    </span>
                  </div>

                  <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800">
                    <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
                      Clean Solar Generated
                    </span>
                    <div className="text-3xl font-extrabold text-sky-400 mt-1">
                      {SUSTAINABILITY_METRICS.partnerSolarMWhYear.toLocaleString()} MWh
                    </div>
                    <span className="text-[11px] text-stone-400 block mt-1">
                      Across 42 partner safari camps
                    </span>
                  </div>

                  <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800">
                    <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
                      Plastic Bottles Eliminated
                    </span>
                    <div className="text-3xl font-extrabold text-emerald-400 mt-1">
                      {(SUSTAINABILITY_METRICS.singleUsePlasticBottlesEliminated / 1000000).toFixed(2)}M
                    </div>
                    <span className="text-[11px] text-stone-400 block mt-1">
                      Reverse-osmosis camp refill stations
                    </span>
                  </div>
                </div>

                {/* Section 1: Reforestation Projects */}
                <div className="bg-stone-950 rounded-2xl border border-stone-800 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white font-serif flex items-center gap-2">
                      <TreePine className="w-4 h-4 text-emerald-400" />
                      <span>Reforestation &amp; Water Tower Restoration Projects</span>
                    </h4>
                    <span className="text-xs text-stone-400">
                      Target: 470,000 trees across key catchments
                    </span>
                  </div>

                  <div className="space-y-4">
                    {REFORESTATION_PROJECTS.map((project) => {
                      const percentage = Math.round((project.treesPlanted / project.treesTarget) * 100);
                      return (
                        <div
                          key={project.id}
                          className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-2.5"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <h5 className="text-sm font-bold text-white">{project.name}</h5>
                              <span className="text-xs text-stone-400">{project.location}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-mono font-bold text-emerald-400">
                                {project.treesPlanted.toLocaleString()} / {project.treesTarget.toLocaleString()} ({percentage}%)
                              </span>
                              <span className="text-[10px] text-stone-400 block">
                                Survival Rate: <strong className="text-white">{project.survivalRatePercent}%</strong>
                              </span>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full bg-stone-800 h-2.5 rounded-full overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-emerald-500 to-amber-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] pt-1 text-stone-400">
                            <span>
                              Indigenous Species: <strong className="text-stone-300">{project.species.join(', ')}</strong>
                            </span>
                            <span>
                              Partner Lodges: <strong className="text-amber-400">{project.partnerCampSponsors.join(', ')}</strong>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section 2: Wildlife Census Data */}
                <div className="bg-stone-950 rounded-2xl border border-stone-800 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white font-serif flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Official Kenya Wildlife Service (KWS) Census Rebounds</span>
                    </h4>
                    <span className="text-xs text-emerald-400 font-semibold">
                      Historical 1989 Baseline vs 2026 Telemetry
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {WILDLIFE_CENSUS_DATA.map((animal, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                              {animal.category}
                            </span>
                            <h5 className="text-sm font-bold text-white mt-0.5">
                              {animal.speciesName}
                            </h5>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold">
                            +{animal.growthRatePercent}% (2020-2026)
                          </span>
                        </div>

                        {/* Counts Comparison */}
                        <div className="grid grid-cols-3 gap-2 text-center py-2 bg-stone-950 rounded-lg border border-stone-800/80">
                          <div>
                            <span className="text-[10px] text-stone-500 uppercase block">1989 (Crisis)</span>
                            <span className="text-xs font-mono font-bold text-stone-400">
                              {animal.year1989Count.toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-stone-500 uppercase block">2020 (KWS)</span>
                            <span className="text-xs font-mono font-bold text-stone-300">
                              {animal.year2020Count.toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-amber-400 uppercase block font-semibold">2026 (Now)</span>
                            <span className="text-sm font-mono font-extrabold text-emerald-400">
                              {animal.year2026Count.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="text-[11px] text-stone-400">
                          Primary Sanctuaries:{' '}
                          <strong className="text-stone-300">
                            {animal.primarySanctuaries.join(', ')}
                          </strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3: Community Conservancies & Accreditations */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-stone-950 to-stone-950 border border-emerald-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                      Community Conservancies Acreage
                    </span>
                    <h5 className="text-base font-bold text-white">
                      1.85 Million Acres Secured Under Indigenous Maasai &amp; Samburu Land Trusts
                    </h5>
                    <p className="text-xs text-stone-400 font-light max-w-2xl">
                      Over 84% of camp staff are employed directly from local host communities, with 100% of conservation land-lease fees paid directly to pastoral landowners.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-500 text-stone-950 text-xs font-bold uppercase tracking-wider block text-center">
                      Gold Eco-Rating Certified
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
