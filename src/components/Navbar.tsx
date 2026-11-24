/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Compass,
  Menu,
  X,
  Building2,
  Car,
  Bot,
  MapPin,
  ShieldCheck,
  UserCheck,
  Sparkles,
  LayoutDashboard,
} from 'lucide-react';

interface NavbarProps {
  onOpenDashboard: () => void;
  onOpenPartnerPortal: () => void;
  onSelectScene: (idx: number) => void;
  onQuickBook: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDashboard,
  onOpenPartnerPortal,
  onSelectScene,
  onQuickBook,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-stone-950/90 border-b border-stone-800 text-stone-100 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                onSelectScene(0);
              }}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-extrabold text-xl font-serif shadow-md group-hover:scale-105 transition-transform">
                K1
              </div>
              <div>
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white font-serif block leading-none">
                  KENYAONE
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium tracking-widest text-amber-400 uppercase block mt-1">
                  Travel &amp; Safaris
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-stone-300">
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-amber-400 transition-colors"
            >
              3D Cinema
            </button>
            <button
              type="button"
              onClick={() => scrollTo('destinations')}
              className="hover:text-amber-400 transition-colors"
            >
              Destinations
            </button>
            <button
              type="button"
              onClick={() => scrollTo('safaris')}
              className="hover:text-amber-400 transition-colors"
            >
              Safaris
            </button>
            <button
              type="button"
              onClick={() => scrollTo('hotels')}
              className="hover:text-amber-400 transition-colors"
            >
              Lodges &amp; Stays
            </button>
            <button
              type="button"
              onClick={() => scrollTo('vehicles')}
              className="hover:text-amber-400 transition-colors"
            >
              4x4 Fleet
            </button>
            <button
              type="button"
              onClick={() => scrollTo('experiences')}
              className="hover:text-amber-400 transition-colors"
            >
              Adventures
            </button>
            <button
              type="button"
              onClick={() => scrollTo('insights')}
              className="hover:text-amber-400 transition-colors"
            >
              Insights
            </button>
            <button
              type="button"
              onClick={() => scrollTo('concierge')}
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-amber-400"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Concierge</span>
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenPartnerPortal}
              className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:border-stone-700 text-xs font-semibold transition-all"
            >
              Partner Portal
            </button>

            <button
              type="button"
              onClick={onOpenDashboard}
              className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-amber-400 hover:text-amber-300 hover:border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Operations</span>
            </button>

            <button
              type="button"
              onClick={onQuickBook}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all"
            >
              Plan Safari
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={onQuickBook}
              className="px-3 py-1.5 rounded-lg bg-amber-500 text-stone-950 font-bold text-xs uppercase"
            >
              Book
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-stone-900 text-stone-300 hover:text-white border border-stone-800"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950 border-b border-stone-800 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-semibold uppercase tracking-wider text-stone-300">
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-amber-400"
            >
              3D Cinema Journey
            </button>
            <button
              type="button"
              onClick={() => scrollTo('destinations')}
              className="text-left py-2 hover:text-amber-400"
            >
              Destinations Map
            </button>
            <button
              type="button"
              onClick={() => scrollTo('safaris')}
              className="text-left py-2 hover:text-amber-400"
            >
              Safari Packages
            </button>
            <button
              type="button"
              onClick={() => scrollTo('hotels')}
              className="text-left py-2 hover:text-amber-400"
            >
              Luxury Lodges &amp; Stays
            </button>
            <button
              type="button"
              onClick={() => scrollTo('vehicles')}
              className="text-left py-2 hover:text-amber-400"
            >
              Safari Vehicles Fleet
            </button>
            <button
              type="button"
              onClick={() => scrollTo('experiences')}
              className="text-left py-2 hover:text-amber-400"
            >
              Adventures &amp; Tours
            </button>
            <button
              type="button"
              onClick={() => scrollTo('insights')}
              className="text-left py-2 hover:text-amber-400"
            >
              Kenya Insights &amp; Articles
            </button>
            <button
              type="button"
              onClick={() => scrollTo('concierge')}
              className="text-left py-2 text-amber-400"
            >
              AI Travel Concierge
            </button>
          </div>

          <div className="pt-4 border-t border-stone-800 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDashboard();
              }}
              className="w-full py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-amber-400 text-xs font-bold text-center"
            >
              Open Operations Dashboard
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPartnerPortal();
              }}
              className="w-full py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 text-xs font-bold text-center"
            >
              Partner / Supplier Portal
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
