/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InsightArticle } from '../types/insights';

export const INITIAL_INSIGHTS: InsightArticle[] = [
  {
    id: 'art-001',
    slug: 'maasai-mara-great-migration-crossing-guide',
    title: 'The Great Migration: Secrets to Witnessing the Mara River Crossing',
    subtitle: 'A Master Guide to River Crossing Mechanics, Crossing Points, and Ethical Positioning in the Mara Triangle',
    category: 'Safari Guides',
    author: {
      name: 'Ole Kishoiyo',
      role: 'Senior Head Naturalist',
      credentials: 'Gold-Level KPSGA Guide • 22 Years Mara Field Experience',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: 'November 2, 2026',
    readTimeMinutes: 7,
    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    tags: ['Maasai Mara', 'Great Migration', 'Mara River', 'Wildebeest', 'Field Guide'],
    featured: true,
    viewsCount: 14280,
    excerpt:
      'Every year between July and October, over 1.5 million wildebeest and zebras brave treacherous waters and apex crocodiles. Here is how our veteran guides anticipate crossings before the crowds arrive.',
    relatedReserveIds: ['maasai-mara'],
    relatedSafariIds: ['great-migration-signature-7d'],
    sections: [
      {
        heading: 'Reading the Herd: The Psychology of Crossing Points',
        body: [
          'A common misconception among first-time safari travelers is that wildebeest cross randomly along the Mara River. In reality, the herds follow established geographical funnels shaped by centuries of seasonal instinct.',
          'Watch for the "lead scout." A single bull or experienced female often steps down the steep river embankment, testing the current and scanning for crocodile heads near the surface. The entire herd of tens of thousands may mill anxiously on the ridge for hours. The crucial moment arrives when the lead animal plunges in—at that instant, panic and herd momentum trigger a thunderous deluge of leaping bodies.',
        ],
        proTip:
          'Never urge your guide to park right at the river lip before animals enter the water. Doing so creates a vehicular barricade that frightens the lead scout back up the cliff, spoiling the crossing for the entire herd.',
      },
      {
        heading: 'Cul-de-Sac Points & River Topography',
        body: [
          'The Mara River features distinct historical crossing points such as Purungat Bridge, Serena Crossing, Cul-de-Sac, and Main Crossing. In the Mara Triangle, conservation rangers enforce strict 25-meter standoff zones until at least 50 animals have entered the river.',
          'Sunlight angles dramatically affect visibility: early morning crossings (07:30 - 09:30) provide warm, sidelit illumination with minimal river glare, while mid-afternoon crossings (13:00 - 15:30) often witness the highest crocodile activity.',
        ],
        photoSettings: {
          cameraBody: 'Sony A1 / Canon R5 Mark II',
          lens: '100-400mm f/4.5-5.6 or 70-200mm f/2.8',
          aperture: 'f/6.3 (for multi-animal depth of field across water)',
          shutterSpeed: '1/2500s (freezes splashing water droplets and mid-air leaps)',
          iso: 'ISO 400 - 800 (depending on morning dust haze)',
          lightingNote: 'Expose for the wet hides of animals to prevent burnt-out water highlights.',
        },
      },
      {
        heading: 'Seasonal Windows: July through October',
        body: [
          'While river crossings can occur anytime the mega-herds reside in Kenya, late July typically heralds the first vanguard arriving from Tanzania’s northern Serengeti. August and September represent peak crossing frequency across multiple points daily, while October brings dramatic reverse crossings as the herds follow incoming southern rain clouds.',
        ],
      },
    ],
  },
  {
    id: 'art-002',
    slug: 'wildlife-photography-african-savannah-masterclass',
    title: 'Savannah Photography: Conquering Heat Haze, Dust & Golden Light',
    subtitle: 'Professional Camera Setup, Low-Angle Technique, and Storytelling for African Wildlife',
    category: 'Wildlife Photography',
    author: {
      name: 'Amara Vance',
      role: 'Resident Wildlife Photographer',
      credentials: 'Sony Artisan of Imagery • Wildlife Photographer of the Year Finalist',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: 'October 28, 2026',
    readTimeMinutes: 9,
    heroImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Photography', 'Camera Gear', 'Big Cats', 'Lighting', 'Predator Action'],
    featured: false,
    viewsCount: 9840,
    excerpt:
      'From managing equatorial heat shimmer before 10 AM to utilizing bean bags and custom camera hatches on Kenya’s rugged Land Cruisers, here is how to capture exhibition-grade wildlife imagery.',
    relatedReserveIds: ['maasai-mara', 'amboseli'],
    relatedSafariIds: ['great-migration-signature-7d', 'samburu-northern-wilds-5d'],
    sections: [
      {
        heading: 'Taming Equatorial Heat Shimmer (Atmospheric Mirage)',
        body: [
          'By 09:30 AM on the equatorial savannah, ground radiation produces rapid air turbulence that ruins telephoto sharpness even with premium $12,000 prime glass. The solution is positioning: you must get physically closer rather than relying on 2x teleconverters, and shoot before the earth heats up.',
          'Focus on shooting during the "magic 45 minutes" between 06:15 AM (first dawn pink) and 07:00 AM, and resume in the afternoon after 16:30 PM when the sun drops below 30 degrees, casting warm amber sidelight through dry grass.',
        ],
        proTip:
          'Turn off your safari cruiser engine immediately before shooting. Engine idle vibrations transmit directly through vehicle panels into your lens stabilizer.',
      },
      {
        heading: 'Low-Angle Perspective vs Roof Hatch Shooting',
        body: [
          'Most tourists shoot exclusively from the standing roof hatch, which produces a high, bird’s-eye perspective looking down on animal backs. This diminishes predator stature and creates distracting grass backgrounds.',
          'Whenever possible, ask for a VIP Photographic Cruiser equipped with lower window fold-down flaps or sit on the cruiser floor with a heavy beanbag draped over the door sill. Eye-level portraits of lions or cheetahs connect emotionally with viewers and naturally blur distant horizon trees into creamy bokeh.',
        ],
        photoSettings: {
          cameraBody: 'Nikon Z9 / Sony A7R V',
          lens: '400mm f/2.8 or 600mm f/4 Prime',
          aperture: 'f/2.8 - f/4 (isolating animal eyes against background)',
          shutterSpeed: '1/3200s for running cheetah hunts; 1/800s for resting portraits',
          iso: 'ISO 200 - 1600',
          lightingNote: 'Backlight subjects against the rising morning dust for spectacular rim lighting halos.',
        },
      },
    ],
  },
  {
    id: 'art-003',
    slug: 'samburu-special-five-wild-north-kenya',
    title: 'The Samburu Special Five: Discovering Kenya’s Arid Northern Endemics',
    subtitle: 'Why Discerning Safari Travelers Head North to the Rugged Ewaso Nyiro River Ecosystem',
    category: 'Conservation & Community',
    author: {
      name: 'Lemayan Lengusuranga',
      role: 'Kalama Conservancy Ranger & Cultural Lead',
      credentials: 'Samburu Elder • Conservation Biology Honouree',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: 'October 19, 2026',
    readTimeMinutes: 6,
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Samburu', 'Northern Frontier', 'Special Five', 'Reticulated Giraffe', 'Grevy Zebra'],
    featured: false,
    viewsCount: 7120,
    excerpt:
      'While southern Kenya dazzles with the Big Five, northern Kenya harbors five extraordinary evolutionary wonders found nowhere else south of the equator. Meet the Gerenuk, Grevy’s Zebra, and Reticulated Giraffe.',
    relatedReserveIds: ['samburu'],
    relatedSafariIds: ['samburu-northern-wilds-5d'],
    sections: [
      {
        heading: 'Adapting to the Semi-Arid Red Clay Terrain',
        body: [
          'North of the equator and the shadow of Mount Kenya lies Samburu, Buffalo Springs, and Shaba. This is a dramatic landscape of doum palms, thorny commiphora, and red granite kopjes intersected by the life-giving Ewaso Nyiro River.',
          'Here, wildlife has adapted with extraordinary survival mechanisms to withstand scorching mid-day heat and sparse water sources.',
        ],
      },
      {
        heading: 'The Five Northern Specialists',
        body: [
          '1. Grevy’s Zebra (Equus grevyi): Africa’s largest and most endangered wild equid, distinguished by oversized mule-like ears and razor-thin pinstripes that do not join under the belly.',
          '2. Reticulated Giraffe: Possessing striking polygonal russet plates outlined by crisp white webbing, creating the most visually ornate camouflage in the giraffe family.',
          '3. Gerenuk (The Giraffe-Gazelle): Legendary for standing completely upright on its two hind legs to browse tender acacia leaves up to 2.5 meters off the ground—they never drink water, deriving all moisture from forage.',
          '4. Somali Ostrich: Recognized by distinctive cobalt-blue legs and neck during breeding displays, contrasting with the pink plumage of southern savannah ostriches.',
          '5. Beisa Oryx: Striking symmetrical straight scimitar horns and bold black facial mask markings resembling a ceremonial shield.',
        ],
        proTip:
          'Keep your binoculars focused along riverbank acacia tortilis groves at mid-morning to spot gerenuks standing vertical on their hind legs.',
      },
    ],
  },
  {
    id: 'art-004',
    slug: 'swahili-coast-dhow-sailing-diani-watamu-lamu',
    title: 'Swahili Romance: Navigating Lamu, Watamu & Diani by Traditional Dhow',
    subtitle: 'From 13th-Century Gedi Ruins to Marine Biospheres and Powder-White Sandbanks',
    category: 'Swahili Coast',
    author: {
      name: 'Farida Bwanaheri',
      role: 'Maritime Heritage Historian & Coastal Guide',
      credentials: 'National Museums of Kenya Research Affiliate',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: 'October 12, 2026',
    readTimeMinutes: 8,
    heroImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    tags: ['Diani Beach', 'Watamu', 'Lamu', 'Swahili Culture', 'Dhow Sailing', 'Marine Parks'],
    featured: false,
    viewsCount: 8430,
    excerpt:
      'Kenya’s coastline is not merely a tropical playground—it is a thousand-year-old living maritime crossroads where monsoon trade winds, hand-carved mahogany vessels, and vibrant coral reefs meet.',
    relatedReserveIds: ['diani-beach', 'watamu-malindi', 'lamu-archipelago'],
    relatedSafariIds: ['bush-and-beach-luxury-10d'],
    sections: [
      {
        heading: 'The Art of the Lateen Sail and Kaskazi Winds',
        body: [
          'For over a millennium, Swahili dhow captains have read the monsoon trade winds—the Kaskazi blowing from the northeast from November to March, and the Kusi surging from the southwest from April to October.',
          'Boarding an authentic dhow in Lamu or Wasini Island is a sensory journey: the gentle creak of mangrove timber timbers, the triangular lateen canvas billowing silently against turquoise water, and fresh coconut water served directly from green husks.',
        ],
        proTip:
          'Opt for a sunset sail leaving at 16:45 PM from Shela Village or Diani Galu Reef. The wind settles into a calm evening breeze as the Indian Ocean turns from aquamarine to burnished gold.',
      },
      {
        heading: 'Protected Coral Barrier Reefs: Kisite & Watamu',
        body: [
          'Unlike many global destinations where coral bleaching has decimated reefs, Kenya’s marine sanctuaries at Kisite-Mpunguti and Watamu are protected by strict conservation zones that shelter green sea turtles, pods of spinner dolphins, and over 300 coral species.',
        ],
      },
    ],
  },
  {
    id: 'art-005',
    slug: 'kenya-safari-eta-health-tipping-travel-essentials',
    title: 'Kenya Travel Essentials 2026: Official eTA, Health & Safari Etiquette',
    subtitle: 'Crucial Documentation, Currency Practicalities, Voltage, and Cultural Etiquette for Travelers',
    category: 'Travel Essentials',
    author: {
      name: 'David Gitonga',
      role: 'Director of Guest Experience',
      credentials: 'Kenya Tourism Federation Representative',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: 'October 5, 2026',
    readTimeMinutes: 5,
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    tags: ['Travel Advice', 'eTA Visa', 'Health Guidelines', 'Packing Tips', 'Tipping Etiquette'],
    featured: false,
    viewsCount: 16420,
    excerpt:
      'Everything you need to know before touching down in Nairobi: navigating Kenya’s paperless Electronic Travel Authorisation (eTA), yellow fever certificates, and safari tipping guidelines.',
    relatedReserveIds: ['nairobi-park'],
    relatedSafariIds: ['kenya-classic-giants-8d'],
    sections: [
      {
        heading: 'Electronic Travel Authorisation (eTA) Protocol',
        body: [
          'Kenya abolished traditional visa stamps in favour of a 100% digital eTA system. Every international visitor (including infants and children) must apply online prior to flight departure via the official government portal (etakenya.go.ke).',
          'Standard processing takes between 24 and 72 hours, costing $35 USD. Have your passport scan (minimum 6 months validity), return flight tickets, and confirmed lodge booking confirmations ready upon submission.',
        ],
        proTip:
          'Beware of fraudulent third-party clone websites charging $120+ for visas. Always ensure you are on the official .go.ke domain.',
      },
      {
        heading: 'Currency, M-PESA & Safari Tipping Guidelines',
        body: [
          'The national currency is the Kenyan Shilling (KES). US Dollars are widely accepted across safari lodges, but banknotes must be dated 2013 or newer—older series notes are rejected by Kenyan banks due to counterfeiting safeguards.',
          'Recommended safari tipping etiquette: $15 - $25 USD per guest per day for your Silver-level driver guide, and $10 - $15 USD per guest per day into the communal staff gratuity box at your lodge.',
        ],
      },
    ],
  },
  {
    id: 'art-006',
    slug: 'black-rhino-conservation-renaissance-ol-pejeta-lewa',
    title: 'The Black Rhino Renaissance: Inside Kenya’s Frontline Sanctuaries',
    subtitle: 'How Community Conservancies, Armed Rangers, and Smart Tech Reversed Rhino Extinction',
    category: 'Conservation & Community',
    author: {
      name: 'Dr. Njeri Mwangi',
      role: 'Senior Wildlife Veterinarian',
      credentials: 'Kenya Wildlife Service Special Projects Partner',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: 'September 24, 2026',
    readTimeMinutes: 7,
    heroImage: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80',
    tags: ['Conservation', 'Ol Pejeta', 'Rhinos', 'Anti-Poaching', 'Eco Tourism'],
    featured: false,
    viewsCount: 11150,
    excerpt:
      'In the 1980s, poaching reduced Kenya’s eastern black rhino population from 20,000 to fewer than 400. Today, Kenya boasts over 1,000 black rhinos thanks to pioneering sanctuary partnerships.',
    relatedReserveIds: ['laikipia-ol-pejeta', 'nairobi-park'],
    relatedSafariIds: ['kenya-classic-giants-8d'],
    sections: [
      {
        heading: 'The Conservancy Model: People and Wildlife in Harmony',
        body: [
          'Traditional fortress conservation separated indigenous communities from ancestral lands. Modern Kenyan sanctuaries such as Ol Pejeta and Lewa Wildlife Conservancy flipped this model upside down: surrounding local communities receive up to 70% of tourism concession revenues directly into schools, health clinics, and clean water boreholes.',
          'When local pastoralists directly benefit from the presence of a living rhino, they become the first and fiercest intelligence network defending against illegal incursions.',
        ],
      },
      {
        heading: 'Tech-Driven Protection: GPS Horn Transmitters & K9 Units',
        body: [
          'Every rhino in Ol Pejeta is individually identified through ear notch patterns and monitored daily. Highly trained Belgian Malinois anti-poaching tracker dogs and thermal night-vision reconnaissance drones patrol fence boundaries 24 hours a day.',
        ],
        proTip:
          'When visiting Ol Pejeta, pre-book a behind-the-scenes session with the K9 Anti-Poaching tracker unit to witness firsthand how these elite dogs detect hidden scents in thick scrub.',
      },
    ],
  },
];
