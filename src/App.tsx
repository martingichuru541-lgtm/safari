/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThreeCanvas, SCENE_NAMES } from './three/ThreeCanvas';
import { Navbar } from './components/Navbar';
import { DestinationMap } from './components/DestinationMap';
import { SafariMarketplace } from './components/SafariMarketplace';
import { HotelMarketplace } from './components/HotelMarketplace';
import { VehicleMarketplace } from './components/VehicleMarketplace';
import { ExperienceMarketplace } from './components/ExperienceMarketplace';
import { KenyaInsights } from './components/KenyaInsights';
import { AIConcierge } from './components/AIConcierge';
import { BookingModal } from './components/BookingModal';
import { AdminDashboard } from './components/AdminDashboard';
import { PartnerPortalModal } from './components/PartnerPortalModal';
import { Footer } from './components/Footer';

import {
  BookingInquiry,
  AffiliateClickLog,
  Destination,
  SafariPackage,
  Accommodation,
  SafariVehicle,
  TravelExperience,
} from './types/travel';
import { GeneratedItinerary } from './utils/itineraryBuilder';
import { SAFARI_PACKAGES } from './data/safaris';
import { TravelAlert } from './types/alerts';
import { INITIAL_TRAVEL_ALERTS } from './data/travelAlerts';

// Initial realistic demonstration inquiries
const INITIAL_INQUIRIES: BookingInquiry[] = [
  {
    id: 'KY1-839210',
    itemType: 'safari',
    itemId: 'great-migration-signature-7d',
    itemName: 'The Great Migration & Mara Triangle Fly-in Expedition',
    customerName: 'Lord Alistair Crawford',
    customerEmail: 'crawford@estate-uk.com',
    customerPhone: '+44 20 7946 0912',
    travelDate: '2026-08-14',
    durationDays: 7,
    travelers: 4,
    specialRequests: 'Exclusive private vehicle and French champagne upon arrival.',
    estimatedTotalUSD: 18600,
    status: 'Confirmed',
    createdAt: '2026-11-01T10:30:00Z',
    isDemo: true,
  },
  {
    id: 'KY1-492104',
    itemType: 'hotel',
    itemId: 'alfajiri-villas-diani',
    itemName: 'Alfajiri Cliff & Garden Villas (Diani Beach)',
    customerName: 'Monique & Henri Dupont',
    customerEmail: 'dupont.paris@luxury.fr',
    travelDate: '2026-09-05',
    durationDays: 5,
    travelers: 2,
    specialRequests: 'Honeymoon couple, private dhow dinner at sunset.',
    estimatedTotalUSD: 8000,
    status: 'Quoted',
    createdAt: '2026-11-02T14:15:00Z',
    isDemo: true,
  },
  {
    id: 'KY1-204918',
    itemType: 'safari',
    itemId: 'kenya-classic-giants-8d',
    itemName: 'The Grand Kenya Wildlife Odyssey: Amboseli, Nakuru & Mara',
    customerName: 'Marcus Lindstrom',
    customerEmail: 'marcus@stockholm-tech.se',
    travelDate: '2026-07-22',
    durationDays: 8,
    travelers: 2,
    specialRequests: 'Wildlife photography focus, window seats guaranteed.',
    estimatedTotalUSD: 7780,
    status: 'Pending Review',
    createdAt: '2026-11-03T08:00:00Z',
    isDemo: true,
  },
];

const INITIAL_AFFILIATE_CLICKS: AffiliateClickLog[] = [
  {
    id: 'clk-001',
    timestamp: '2026-11-03 14:22',
    partner: 'Booking.com',
    targetListing: 'Hemingways Watamu Ocean Resort',
    estimatedCommissionUSD: 115,
    status: 'Validated',
  },
  {
    id: 'clk-002',
    timestamp: '2026-11-03 16:45',
    partner: 'GetYourGuide',
    targetListing: 'Maasai Mara Sunrise Balloon Safari',
    estimatedCommissionUSD: 49,
    status: 'Pending Partner Report',
  },
  {
    id: 'clk-003',
    timestamp: '2026-11-03 17:10',
    partner: 'Expedia',
    targetListing: 'Sweetwaters Serena Tented Camp',
    estimatedCommissionUSD: 85,
    status: 'Referred',
  },
];

export default function App() {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);

  // Modals & Panels state
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isPartnerPortalOpen, setIsPartnerPortalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const [bookingTarget, setBookingTarget] = useState<{
    type: 'safari' | 'hotel' | 'vehicle' | 'custom_itinerary';
    id: string;
    title: string;
    basePrice: number;
    destinationName?: string;
  } | null>(null);

  // Inquiries and affiliate referral tracking
  const [inquiries, setInquiries] = useState<BookingInquiry[]>(INITIAL_INQUIRIES);
  const [affiliateClicks, setAffiliateClicks] = useState<AffiliateClickLog[]>(INITIAL_AFFILIATE_CLICKS);
  const [alerts, setAlerts] = useState<TravelAlert[]>(INITIAL_TRAVEL_ALERTS);

  // Handler: Select and scroll to 3D scene
  const handleSelectScene = (index: number) => {
    setCurrentSceneIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Open booking modal for Safari
  const handleBookSafari = (safari: SafariPackage) => {
    setBookingTarget({
      type: 'safari',
      id: safari.id,
      title: safari.title,
      basePrice: safari.basePriceUSD,
    });
    setIsBookingModalOpen(true);
  };

  // Handler: Open booking modal for Hotel
  const handleBookHotel = (hotel: Accommodation) => {
    setBookingTarget({
      type: 'hotel',
      id: hotel.id,
      title: hotel.name,
      basePrice: hotel.pricePerNightUSD,
      destinationName: hotel.destinationName,
    });
    setIsBookingModalOpen(true);
  };

  // Handler: Open booking modal for Vehicle
  const handleHireVehicle = (vehicle: SafariVehicle) => {
    setBookingTarget({
      type: 'vehicle',
      id: vehicle.id,
      title: vehicle.name,
      basePrice: vehicle.dailyRateUSD,
    });
    setIsBookingModalOpen(true);
  };

  // Handler: Open booking modal for Experience
  const handleBookExperience = (exp: TravelExperience) => {
    setBookingTarget({
      type: 'custom_itinerary',
      id: exp.id,
      title: exp.title,
      basePrice: exp.priceUSD,
      destinationName: exp.destinationName,
    });
    setIsBookingModalOpen(true);
  };

  // Handler: Open booking from AI Concierge plan
  const handleBookAIPlan = (plan: GeneratedItinerary) => {
    setBookingTarget({
      type: 'custom_itinerary',
      id: plan.id,
      title: plan.title,
      basePrice: plan.costPerPersonUSD,
    });
    setIsBookingModalOpen(true);
  };

  // Handler: Log affiliate click
  const handleLogAffiliateClick = (partner: string, itemName: string) => {
    const newLog: AffiliateClickLog = {
      id: `clk-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      partner: partner as AffiliateClickLog['partner'],
      targetListing: itemName,
      estimatedCommissionUSD: 45 + Math.floor(Math.random() * 80),
      status: 'Referred',
    };
    setAffiliateClicks((prev) => [newLog, ...prev]);
  };

  // Handler: Save newly submitted booking inquiry
  const handleSuccessBooking = (newInquiry: BookingInquiry) => {
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  // Handler: Update status in admin dashboard
  const handleUpdateInquiryStatus = (id: string, status: BookingInquiry['status']) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* 1. Global Navigation Bar */}
      <Navbar
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onOpenPartnerPortal={() => setIsPartnerPortalOpen(true)}
        onSelectScene={handleSelectScene}
        onQuickBook={() => handleBookSafari(SAFARI_PACKAGES[0])}
      />

      {/* 2. Hero 3D Cinematic Experience */}
      <main className="flex-1">
        <section id="cinema" className="w-full">
          <ThreeCanvas
            currentSceneIndex={currentSceneIndex}
            onSceneChange={(idx) => setCurrentSceneIndex(idx)}
            onExploreMarketplace={() => {
              const el = document.getElementById('destinations');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </section>

        {/* 3. Interactive Destination Discovery Map */}
        <section id="destinations">
          <DestinationMap
            onSelectDestination={(dest) => {
              // optional sync
            }}
            onBookSafari={(safariId) => {
              const saf = SAFARI_PACKAGES.find((s) => s.id === safariId) || SAFARI_PACKAGES[0];
              handleBookSafari(saf);
            }}
            onView3DScene={(sceneIndex) => {
              handleSelectScene(sceneIndex);
            }}
          />
        </section>

        {/* 4. Safari Packages Marketplace */}
        <SafariMarketplace onBookSafari={handleBookSafari} />

        {/* 5. Luxury Hotels, Lodges & Beach Villas Marketplace */}
        <HotelMarketplace
          onBookHotel={handleBookHotel}
          onLogAffiliateClick={handleLogAffiliateClick}
        />

        {/* 6. Safari Vehicles & 4x4 Fleet Marketplace */}
        <VehicleMarketplace
          onHireVehicle={handleHireVehicle}
          onExplore3DVehicle={() => handleSelectScene(9)}
        />

        {/* 7. Tours, Activities & Experiences Marketplace */}
        <ExperienceMarketplace
          onBookExperience={handleBookExperience}
          onLogAffiliateClick={handleLogAffiliateClick}
        />

        {/* 8. Kenya Insights Editorial Journal & Photography Guides */}
        <KenyaInsights
          alerts={alerts}
          onBookSafari={(safariId) => {
            const saf = SAFARI_PACKAGES.find((s) => s.id === safariId) || SAFARI_PACKAGES[0];
            handleBookSafari(saf);
          }}
          onView3DScene={(sceneIndex) => {
            handleSelectScene(sceneIndex);
          }}
        />

        {/* 9. AI Travel Concierge & Itinerary Architect */}
        <AIConcierge onRequestBooking={handleBookAIPlan} />
      </main>

      {/* 9. Global Luxury Footer */}
      <Footer
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onOpenPartnerPortal={() => setIsPartnerPortalOpen(true)}
      />

      {/* 10. Direct Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        bookingTarget={bookingTarget}
        onSuccessBooking={handleSuccessBooking}
      />

      {/* 11. Travel Operations & Admin Dashboard Modal */}
      {isDashboardOpen && (
        <AdminDashboard
          inquiries={inquiries}
          affiliateClicks={affiliateClicks}
          alerts={alerts}
          onUpdateAlerts={setAlerts}
          onUpdateInquiryStatus={handleUpdateInquiryStatus}
          onClose={() => setIsDashboardOpen(false)}
        />
      )}

      {/* 12. Direct Supplier & Partner Registration Modal */}
      <PartnerPortalModal
        isOpen={isPartnerPortalOpen}
        onClose={() => setIsPartnerPortalOpen(false)}
      />
    </div>
  );
}
