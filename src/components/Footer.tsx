/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AFFILIATE_DISCLOSURE } from '../data/affiliates';
import { Shield, Award, HeartHandshake, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenDashboard: () => void;
  onOpenPartnerPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDashboard,
  onOpenPartnerPortal,
}) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Trust & Accreditations Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-stone-900/60 border border-stone-800 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <strong className="block text-white font-bold">KATO Bonded</strong>
              <span className="text-stone-400 text-[11px]">Kenya Tour Operators Member</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <strong className="block text-white font-bold">KTB Licensed</strong>
              <span className="text-stone-400 text-[11px]">Kenya Tourism Board Certified</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <strong className="block text-white font-bold">AMREF Flying Doctors</strong>
              <span className="text-stone-400 text-[11px]">24/7 Medevac Included</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <strong className="block text-white font-bold">Silver KPSGA Guides</strong>
              <span className="text-stone-400 text-[11px]">Expert Kenyan Naturalists</span>
            </div>
          </div>
        </div>

        {/* Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-extrabold text-lg font-serif">
                K1
              </div>
              <span className="text-lg font-bold text-white font-serif tracking-tight">
                KENYAONE TRAVEL &amp; SAFARIS
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed font-light">
              Discover Kenya. Experience the extraordinary. International luxury tourism marketplace combining cinematic 3D interactive journeys, curated luxury tented camps, bespoke private safaris, and custom 4x4 expedition fleets.
            </p>
            <div className="space-y-1.5 text-stone-400 text-[11px]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Nairobi Headquarters: Karen Road, Karen, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>24/7 Concierge: +254 (0) 700 888 999</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span>Inquiries: concierge@kenyaone-safaris.com</span>
              </div>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Top Reserves
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>Maasai Mara National Reserve</li>
              <li>Amboseli National Park</li>
              <li>Lake Nakuru &amp; Naivasha</li>
              <li>Samburu National Reserve</li>
              <li>Mount Kenya National Park</li>
              <li>Diani Beach &amp; South Coast</li>
              <li>Watamu Marine Sanctuary</li>
              <li>Tsavo East &amp; Tsavo West</li>
            </ul>
          </div>

          {/* Safaris & Marketplace */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Marketplace
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>Great Migration Fly-in Safaris</li>
              <li>Kenya Bush &amp; Beach Combos</li>
              <li>Luxury Tented Safari Camps</li>
              <li>Oceanfront Private Villas</li>
              <li>4x4 Land Cruiser Fleet Hire</li>
              <li>Hot Air Ballooning Mara</li>
              <li>Kisite Dhow &amp; Dolphin Tours</li>
              <li>Mount Kenya Summit Treks</li>
            </ul>
          </div>

          {/* Operations & Enterprise */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Operations &amp; Portals
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  type="button"
                  onClick={onOpenDashboard}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Admin &amp; Operations Dashboard
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPartnerPortal}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Register as Direct Supplier
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('insights');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Kenya Insights &amp; Photography Guides
                </button>
              </li>
              <li>Booking.com Affiliate Network</li>
              <li>Viator &amp; TripAdvisor Integration</li>
              <li>eTA Travel Visa Guidance</li>
              <li>Responsible Tourism Code</li>
            </ul>
          </div>
        </div>

        {/* Transparent Affiliate & Legal Disclosure */}
        <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 text-[11px] text-stone-400 leading-relaxed font-light">
          {AFFILIATE_DISCLOSURE}
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 KenyaOne Travel &amp; Safaris Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>KATO Bonding Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
