/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TravelExperience } from '../types/travel';

export const EXPERIENCES: TravelExperience[] = [
  {
    id: 'mara-hot-air-balloon',
    title: 'Maasai Mara Sunrise Hot Air Balloon & Bush Champagne Breakfast',
    destinationId: 'maasai-mara',
    destinationName: 'Maasai Mara National Reserve',
    category: 'Aerial & Adventure',
    durationHours: '4 hours (1 hour flight)',
    priceUSD: 490,
    rating: 4.99,
    reviewCount: 780,
    highlights: [
      'Gently float over the Mara savannah at sunrise as wildlife wakes up',
      'Panoramic 360-degree aerial views of the Mara River and migrating herds',
      'Full hot English breakfast with sparkling wine served out on the savannah',
      'Commemorative flight certificate signed by your captain'
    ],
    affiliateProvider: 'GetYourGuide'
  },
  {
    id: 'kisite-mpunguti-dhow-dolphin',
    title: 'Kisite-Mpunguti Marine Park Traditional Dhow Sailing & Dolphin Snorkel',
    destinationId: 'diani-beach',
    destinationName: 'Diani Beach & South Coast',
    category: 'Marine & Water',
    durationHours: '8 hours',
    priceUSD: 145,
    rating: 4.92,
    reviewCount: 390,
    highlights: [
      'Sail on an authentic carved Swahili dhow under billowing canvas',
      'High likelihood of swimming alongside wild spinner and bottlenose dolphins',
      'Snorkel on protected coral gardens teeming with angelfish, rays, and turtles',
      'Sumptuous fresh crab and seafood Swahili banquet on Wasini Island'
    ],
    affiliateProvider: 'Viator'
  },
  {
    id: 'mount-kenya-point-lenana-summit',
    title: 'Mount Kenya 4-Day Trek: Sirimon to Chogoria Route (Point Lenana 4,985m)',
    destinationId: 'mount-kenya',
    destinationName: 'Mount Kenya National Park',
    category: 'Trekking & Wildlife',
    durationHours: '4 Days',
    priceUSD: 780,
    rating: 4.89,
    reviewCount: 112,
    highlights: [
      'Climb through afro-alpine heather, giant lobelias, and scenic tarns',
      'Reach the sunrise summit of Point Lenana (4,985m) with views across to Kilimanjaro',
      'Descent via the breathtaking Gorges Valley and Lake Michaelson',
      'Experienced mountain guides, porters, and high-altitude chefs included'
    ],
    affiliateProvider: 'Direct'
  },
  {
    id: 'maasai-cultural-boma-immersion',
    title: 'Authentic Maasai Elder & Warrior Cultural Immersion at Talek Manyatta',
    destinationId: 'maasai-mara',
    destinationName: 'Maasai Mara National Reserve',
    category: 'Cultural & Heritage',
    durationHours: '3 hours',
    priceUSD: 60,
    rating: 4.86,
    reviewCount: 245,
    highlights: [
      'Traditional welcoming dance and adumu (jumping dance) with Morans (warriors)',
      'Learn ancient fire-making using cedar sticks and wild olive branches',
      'Understand pastoralist lifestyle, clan medicinal plant uses, and beadwork',
      'Direct village fee supporting community solar lighting and local school'
    ],
    affiliateProvider: 'Viator'
  },
  {
    id: 'diani-kite-surfing-mastery',
    title: 'Kitesurfing Masterclass on Galu Reef (IKO Certified)',
    destinationId: 'diani-beach',
    destinationName: 'Diani Beach & South Coast',
    category: 'Marine & Water',
    durationHours: '3 hours',
    priceUSD: 180,
    rating: 4.94,
    reviewCount: 95,
    highlights: [
      'Consistent warm trade winds (Kaskazi & Kusi) and shallow turquoise lagoon',
      'Top-tier North & Duotone equipment and dedicated water radio helmets',
      'Fast-track coaching for beginners or advanced wave-riding on outer reef'
    ],
    affiliateProvider: 'Direct'
  }
];
