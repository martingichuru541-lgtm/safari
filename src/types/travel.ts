/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DestinationRegion = 'Rift Valley' | 'Coast' | 'Central & Highlands' | 'Northern Kenya' | 'Southern Savannah' | 'Urban & Lakes';

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  category: 'Savannah' | 'Mountain' | 'Coastal Beach' | 'Rift Valley Lake' | 'Arid Reserve' | 'Urban Sanctuary';
  region: DestinationRegion;
  coordinates: { lat: number; lng: number };
  elevationMeters: number;
  bestMonths: string[];
  climate: string;
  wildlifeHighlights: string[];
  description: string;
  keyAttractions: string[];
  accentColor: string;
  imageTheme: string;
  sceneIndex: number; // Links to 3D scene index
}

export type AccommodationTier = 'Ultra Luxury' | 'Classic Luxury' | 'Boutique' | 'Eco Lodge' | 'Beachfront Villa' | 'Tented Camp';

export interface Accommodation {
  id: string;
  name: string;
  destinationId: string;
  destinationName: string;
  tier: AccommodationTier;
  rating: number;
  reviewCount: number;
  pricePerNightUSD: number;
  image: string;
  gallery: string[];
  highlights: string[];
  roomTypes: {
    name: string;
    description: string;
    maxGuests: number;
    priceMultiplier: number;
  }[];
  amenities: string[];
  isDirectPartner: boolean;
  partnerName: string;
  affiliateProvider?: 'Booking.com' | 'Expedia' | 'Agoda' | 'Direct';
  affiliateUrl?: string;
  isDemo?: boolean;
}

export interface SafariPackage {
  id: string;
  title: string;
  subtitle: string;
  durationDays: number;
  startingCity: string;
  destinationsCovered: string[];
  tier: 'Signature Luxury' | 'Photographic Expedition' | 'Family Wildlife' | 'Bush & Beach';
  basePriceUSD: number;
  rating: number;
  reviewCount: number;
  groupType: 'Private Escorted' | 'Small Group (Max 6)' | 'Bespoke Fly-in';
  departureFrequency: string;
  included: string[];
  notIncluded: string[];
  itineraryDays: {
    day: number;
    title: string;
    location: string;
    activities: string[];
    accommodation: string;
    meals: string;
  }[];
  featured: boolean;
}

export interface SafariVehicle {
  id: string;
  name: string;
  category: '4x4 Extended Land Cruiser' | '4x4 Standard Land Cruiser' | 'Safari Minivan' | 'Overland Expedition Truck';
  seats: number;
  dailyRateUSD: number;
  features: string[];
  description: string;
  includesGuideDriver: boolean;
  fuelIncluded: boolean;
  mileageLimit: string;
  tag: string;
}

export interface TravelExperience {
  id: string;
  title: string;
  destinationId: string;
  destinationName: string;
  category: 'Aerial & Adventure' | 'Marine & Water' | 'Cultural & Heritage' | 'Trekking & Wildlife';
  durationHours: string;
  priceUSD: number;
  rating: number;
  reviewCount: number;
  highlights: string[];
  affiliateProvider?: string;
}

export interface BookingInquiry {
  id: string;
  itemType: 'safari' | 'hotel' | 'vehicle' | 'custom_itinerary';
  itemId: string;
  itemName: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  travelDate: string;
  durationDays: number;
  travelers: number;
  specialRequests?: string;
  estimatedTotalUSD: number;
  status: 'Pending Review' | 'Quoted' | 'Confirmed' | 'Completed';
  createdAt: string;
  isDemo?: boolean;
}

export interface AffiliateClickLog {
  id: string;
  timestamp: string;
  partner: 'Booking.com' | 'Viator' | 'GetYourGuide' | 'Expedia';
  targetListing: string;
  estimatedCommissionUSD: number;
  status: 'Referred' | 'Pending Partner Report' | 'Validated' | 'Paid';
}
