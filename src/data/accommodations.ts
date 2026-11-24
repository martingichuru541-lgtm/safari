/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Accommodation } from '../types/travel';

export const ACCOMMODATIONS: Accommodation[] = [
  {
    id: 'angama-mara-sky',
    name: 'Angama Mara Luxury Lodge',
    destinationId: 'maasai-mara',
    destinationName: 'Maasai Mara National Reserve',
    tier: 'Ultra Luxury',
    rating: 4.98,
    reviewCount: 312,
    pricePerNightUSD: 1450,
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: ['Suspended on the Oloololo Escarpment', 'Out of Africa 180° Views', 'Private Airfield', 'Infiniti Pool overlooking the Mara Triangle'],
    roomTypes: [
      { name: 'Panoramic Glass-Front Tented Suite', description: 'Floor-to-ceiling glass wall, cantilevered cedar deck, and copper soaking tub', maxGuests: 2, priceMultiplier: 1.0 },
      { name: 'Family Interconnecting Pavilion', description: 'Two luxury ensuite suites connected by private wooden breezeway', maxGuests: 4, priceMultiplier: 1.8 }
    ],
    amenities: ['Private Safari Vehicle Included', 'Infinity Edge Pool', 'Gym & Safari Spa', 'Wine Cellar', 'Photographic Studio', 'All Inclusive Meals & Premium Drinks'],
    isDirectPartner: true,
    partnerName: 'Angama Safaris Group',
    affiliateProvider: 'Direct',
    isDemo: true,
  },
  {
    id: 'finch-hattons-tsavo',
    name: 'Finch Hattons Camp',
    destinationId: 'tsavo-ecosystem',
    destinationName: 'Tsavo West National Park',
    tier: 'Ultra Luxury',
    rating: 4.95,
    reviewCount: 184,
    pricePerNightUSD: 1180,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: ['Natural spring waterholes with resident hippos', 'Views of Mount Kilimanjaro', 'Chyulu Hills private conservancy'],
    roomTypes: [
      { name: 'Luxury Tented Suite', description: 'Heated private plunge pool, chandelier, outdoor shower', maxGuests: 2, priceMultiplier: 1.0 },
      { name: 'Finch Hattons Presidential Suite', description: 'Private butler, private vehicle, kitchen and heated pool', maxGuests: 4, priceMultiplier: 2.2 }
    ],
    amenities: ['Chyulu Wellness Spa', 'Stargazing Star Bed Deck', 'Fitness Pavilion', 'Guided Bush Walks', 'Gourmet 6-Course Dining'],
    isDirectPartner: true,
    partnerName: 'Finch Hattons Luxury Collection',
    affiliateProvider: 'Direct',
    isDemo: true,
  },
  {
    id: 'hemingways-watamu',
    name: 'Hemingways Watamu Ocean Resort',
    destinationId: 'watamu-malindi',
    destinationName: 'Watamu Marine Sanctuary & Malindi',
    tier: 'Beachfront Villa',
    rating: 4.92,
    reviewCount: 420,
    pricePerNightUSD: 460,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: ['Direct private access to Watamu Marine Park', 'World-class deep sea sport fishing', 'Botanical swimming pool'],
    roomTypes: [
      { name: 'Ocean View Deluxe Room', description: 'Balcony facing the turquoise bay with Indian Ocean sunrise views', maxGuests: 2, priceMultiplier: 1.0 },
      { name: '2-Bedroom Ocean Front Residence', description: 'Fully equipped designer kitchen, lounge, and private ocean terrace', maxGuests: 4, priceMultiplier: 1.9 }
    ],
    amenities: ['Direct Beach Access', 'PADI Certified Dive Centre', 'Spa & Thalassotherapy', 'Deep Sea Fishing Fleet', 'Beachfront Raw Bar'],
    isDirectPartner: false,
    partnerName: 'Hemingways Collection',
    affiliateProvider: 'Booking.com',
    affiliateUrl: 'https://www.booking.com/hotel/ke/hemingways-watamu.html',
    isDemo: true,
  },
  {
    id: 'alfajiri-villas-diani',
    name: 'Alfajiri Cliff & Garden Villas',
    destinationId: 'diani-beach',
    destinationName: 'Diani Beach & South Coast',
    tier: 'Ultra Luxury',
    rating: 4.99,
    reviewCount: 156,
    pricePerNightUSD: 1600,
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: ['Voted Most Luxurious Villa in the World', 'Private butler and dedicated gourmet chef', 'Perched on high coral cliffs above Diani Beach'],
    roomTypes: [
      { name: 'Cliff Villa Private Estate', description: 'Four ensuite master suites, freeform infinity pool hanging over the ocean', maxGuests: 8, priceMultiplier: 1.0 }
    ],
    amenities: ['Private Butler & Chef', 'Daily Massages Included', 'Private 4x4 with Chauffeur', 'Direct Coral Beach Stairs', 'Exclusive Use Only'],
    isDirectPartner: true,
    partnerName: 'Alfajiri Private Villas',
    affiliateProvider: 'Direct',
    isDemo: true,
  },
  {
    id: 'tortilis-camp-amboseli',
    name: 'Tortilis Camp Amboseli',
    destinationId: 'amboseli',
    destinationName: 'Amboseli National Park',
    tier: 'Classic Luxury',
    rating: 4.88,
    reviewCount: 260,
    pricePerNightUSD: 780,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: ['Prime front-row views of Mount Kilimanjaro', 'Private Kitirua Conservancy concession', 'Famous resident elephant herds'],
    roomTypes: [
      { name: 'Kilimanjaro Luxury Safari Tent', description: 'Under thatch roof, ensuite stonework bathroom, private verandah', maxGuests: 2, priceMultiplier: 1.0 },
      { name: 'Tortilis Family Tent', description: 'Master bedroom, second twin bedroom, living lounge, shared pool', maxGuests: 4, priceMultiplier: 1.75 }
    ],
    amenities: ['Shaded Swimming Pool', 'Bush Breakfasts', 'Kitirua Walking Safaris', 'Cultural Maasai Guides', 'Open-sided Custom 4x4s'],
    isDirectPartner: false,
    partnerName: 'Elewana Collection',
    affiliateProvider: 'Booking.com',
    affiliateUrl: 'https://www.booking.com/hotel/ke/tortilis-camp.html',
    isDemo: true,
  },
  {
    id: 'saruni-samburu',
    name: 'Saruni Samburu Eco Villa',
    destinationId: 'samburu',
    destinationName: 'Samburu National Reserve',
    tier: 'Eco Lodge',
    rating: 4.93,
    reviewCount: 198,
    pricePerNightUSD: 950,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: ['Built onto giant volcanic rock kopjes', 'Spectacular panoramic wilderness horizon', 'Guided by local Samburu warriors'],
    roomTypes: [
      { name: 'Open-Air Rock Villa', description: 'Built into granite boulder, open front with sweeping Kalama Conservancy vistas', maxGuests: 2, priceMultiplier: 1.0 },
      { name: 'Two-Bedroom Family Kopje Villa', description: 'Dual bedrooms, private dining area, large outdoor viewing deck', maxGuests: 4, priceMultiplier: 1.8 }
    ],
    amenities: ['Two Infinity Pools', 'Samburu Wellbeing Space', 'Photographic Ground-Level Hide', 'Night Game Drives', 'Cave Rock Art Excursions'],
    isDirectPartner: true,
    partnerName: 'Saruni Lodges Kenya',
    affiliateProvider: 'Direct',
    isDemo: true,
  },
  {
    id: 'giraffe-manor-nairobi',
    name: 'The Historic Giraffe Manor',
    destinationId: 'nairobi-park',
    destinationName: 'Nairobi National Park',
    tier: 'Boutique',
    rating: 4.97,
    reviewCount: 540,
    pricePerNightUSD: 1350,
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: ['Resident Rothschild Giraffes joining morning breakfast', '1930s Scottish hunting lodge architecture', 'Private indigenous sanctuary forest'],
    roomTypes: [
      { name: 'Karen Blixen Suite', description: 'Original period antiques, access to balcony giraffe feeding', maxGuests: 2, priceMultiplier: 1.0 },
      { name: 'Finch Hatton Master Suite', description: 'Mezzanine twin beds, clawfoot bathtub, fireplace', maxGuests: 4, priceMultiplier: 1.7 }
    ],
    amenities: ['Giraffe Feeding Interactions', 'The Retreat Day Spa & Pool', 'Afternoon High Tea', 'Private Chauffeur Airport Transfers', 'Historical Library'],
    isDirectPartner: true,
    partnerName: 'The Safari Collection',
    affiliateProvider: 'Direct',
    isDemo: true,
  },
  {
    id: 'sweetwaters-serena-camp',
    name: 'Sweetwaters Serena Tented Camp',
    destinationId: 'laikipia-ol-pejeta',
    destinationName: 'Laikipia & Ol Pejeta Conservancy',
    tier: 'Tented Camp',
    rating: 4.84,
    reviewCount: 380,
    pricePerNightUSD: 420,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: ['Floodlit waterhole with constant rhino and elephant visits', 'Located inside Ol Pejeta Chimpanzee reserve', 'Direct views of Mount Kenya'],
    roomTypes: [
      { name: 'Standard Waterhole-View Tent', description: 'Ensuite canvas tent with covered veranda looking onto the waterhole', maxGuests: 2, priceMultiplier: 1.0 },
      { name: 'Morani Luxury Wing Tent', description: 'Spacious raised deck tent with King bed and private bathroom', maxGuests: 2, priceMultiplier: 1.3 }
    ],
    amenities: ['Swimming Pool', 'Rhino Sanctuary Access', 'Waterhole Night Spotting', 'Chimpanzee Sanctuary Entry', 'Conference Tent'],
    isDirectPartner: false,
    partnerName: 'Serena Hotels Africa',
    affiliateProvider: 'Expedia',
    affiliateUrl: 'https://www.expedia.com/Sweetwaters-Tented-Camp.h2691654.Hotel-Information',
    isDemo: true,
  }
];
