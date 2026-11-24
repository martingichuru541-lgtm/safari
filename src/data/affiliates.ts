/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AffiliatePartner {
  id: string;
  name: string;
  logoText: string;
  category: 'Hotels & Lodges' | 'Tours & Experiences' | 'Car Rentals' | 'Flights';
  baseCommissionRate: string;
  cookieDurationDays: number;
  trackingParam: string;
  status: 'Active' | 'Under Review' | 'Configured';
  payoutSchedule: string;
  description: string;
}

export const AFFILIATE_PARTNERS: AffiliatePartner[] = [
  {
    id: 'booking-com',
    name: 'Booking.com Affiliate Network',
    logoText: 'Booking.com',
    category: 'Hotels & Lodges',
    baseCommissionRate: '25% - 40% of Booking.com share (approx. 4-6% total GMV)',
    cookieDurationDays: 30,
    trackingParam: 'aid=kenyaone_safaris_2026',
    status: 'Active',
    payoutSchedule: 'Monthly (Net 60 upon check-out)',
    description: 'Integrates over 450 verified Kenyan lodges, Nairobi boutique hotels, and Diani beach villas with instant confirmation and multi-currency pricing.'
  },
  {
    id: 'getyourguide',
    name: 'GetYourGuide Partner Program',
    logoText: 'GetYourGuide',
    category: 'Tours & Experiences',
    baseCommissionRate: '8% - 10% gross booking value',
    cookieDurationDays: 30,
    trackingParam: 'partner_id=KY1_GYG_EXP',
    status: 'Active',
    payoutSchedule: 'Monthly (Net 30 post activity)',
    description: 'Offers high-converting excursion tickets including Mara Hot Air Balloon Safaris, Nairobi National Park half-day game drives, and Giraffe Centre tours.'
  },
  {
    id: 'viator',
    name: 'Viator (TripAdvisor Company)',
    logoText: 'Viator',
    category: 'Tours & Experiences',
    baseCommissionRate: '8% gross booking value',
    cookieDurationDays: 30,
    trackingParam: 'pubId=kenyaone_viator',
    status: 'Active',
    payoutSchedule: 'Monthly',
    description: 'Extensive inventory of guided day trips, Swahili dhow charters in Mombasa & Diani, and Maasai cultural village encounters.'
  },
  {
    id: 'expedia-group',
    name: 'Expedia Group Partner Solutions',
    logoText: 'Expedia Partner Solutions',
    category: 'Hotels & Lodges',
    baseCommissionRate: '5.5% - 7.5% gross booking value',
    cookieDurationDays: 7,
    trackingParam: 'camref=kenyaone_expedia',
    status: 'Active',
    payoutSchedule: 'Monthly',
    description: 'Global reach for package bookings, luxury beach resorts, and partner flight combinations into Nairobi Jomo Kenyatta (NBO) and Mombasa (MBA).'
  }
];

export const AFFILIATE_DISCLOSURE = 
  "Transparent Affiliate Disclosure: KenyaOne Travel & Safaris partners with world-class international travel providers (Booking.com, GetYourGuide, Viator, Expedia) alongside direct Kenyan luxury lodge operators. When you book via selected external partner links, KenyaOne may receive a referral commission at no additional cost to you. All prices remain identical to or lower than direct supplier rates.";
