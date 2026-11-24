/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SafariPackage } from '../types/travel';

export const SAFARI_PACKAGES: SafariPackage[] = [
  {
    id: 'great-migration-signature-7d',
    title: 'The Great Migration & Mara Triangle Fly-in Expedition',
    subtitle: '7 Days of World-Class Predator Action, River Crossings & Bespoke Tented Camps',
    durationDays: 7,
    startingCity: 'Nairobi (Wilson Airport)',
    destinationsCovered: ['Nairobi', 'Maasai Mara National Reserve', 'Mara North Conservancy'],
    tier: 'Signature Luxury',
    basePriceUSD: 4650,
    rating: 4.97,
    reviewCount: 142,
    groupType: 'Small Group (Max 6)',
    departureFrequency: 'Daily departures (Peak July-October & Dec-March)',
    featured: true,
    included: [
      'Scenic internal return flights from Wilson Airport to Mara',
      'All luxury tented camp accommodation with ensuite facilities',
      '3 daily chef-prepared meals, fine wines, spirits, and laundry',
      'Unlimited 4x4 game drives in custom open-sided Land Cruisers',
      'All Park and Conservancy conservation entry fees',
      'AMREF Flying Doctors 24/7 medical evacuation coverage',
      'Experienced Silver-level KPSGA certified professional guide'
    ],
    notIncluded: [
      'International airfares and Kenya tourist eVisa',
      'Hot air balloon flight with champagne breakfast ($490 pp)',
      'Gratuities for driver guides and camp team',
      'Premium vintage French champagnes'
    ],
    itineraryDays: [
      {
        day: 1,
        title: 'Arrival in Nairobi & Historic Giraffe Experience',
        location: 'Nairobi City & Karen Sanctuary',
        activities: ['VIP airport meet & greet', 'Transfer to boutique hotel', 'Afternoon tea and private visit to Daphne Sheldrick Elephant Orphanage'],
        accommodation: 'Hemingways Nairobi (Deluxe Suite)',
        meals: 'Dinner included'
      },
      {
        day: 2,
        title: 'Scenic Flight into the Great Maasai Mara',
        location: 'Maasai Mara — Mara North Conservancy',
        activities: ['Scenic bush plane flight over the Great Rift Valley', 'Land at Mara North airstrip', 'Sunset game drive tracking lions and cheetahs'],
        accommodation: 'Karen Blixen Camp / Elephant Pepper Camp',
        meals: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 3,
        title: 'The Mara River & Great Migration Crossing Points',
        location: 'Maasai Mara National Reserve',
        activities: ['Full-day safari drive to the Mara River', 'Witnessing wildebeest herds gathering at historical crossing points', 'Bush picnic under yellow fever trees'],
        accommodation: 'Karen Blixen Camp',
        meals: 'Breakfast, Bush Picnic Lunch, Dinner'
      },
      {
        day: 4,
        title: 'Dawn Hot Air Balloon Safari & Predator Tracking',
        location: 'Central Mara Plains',
        activities: ['Optional sunrise balloon safari gliding over savannah', 'Champagne bush breakfast on landing', 'Afternoon tracking of black-maned lion prides'],
        accommodation: 'Angama Mara / Sanctuary Olonana',
        meals: 'Breakfast, Lunch, 5-Course Dinner'
      },
      {
        day: 5,
        title: 'Exclusive Conservancy Walking Safari & Night Drive',
        location: 'Mara North Conservancy',
        activities: ['Guided walking safari with Samburu & Maasai trackers', 'Learning traditional tracking and medicinal plants', 'Spotlit night drive seeking leopards, aardvarks, and servals'],
        accommodation: 'Angama Mara / Sanctuary Olonana',
        meals: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 6,
        title: 'The Escarpment & Maasai Cultural Manyatta',
        location: 'Oloololo Escarpment',
        activities: ['Morning scenic drive along the high escarpment ridge', 'Authentic Maasai community partnership visit', 'Farewell boma bush dinner under African stars'],
        accommodation: 'Angama Mara / Sanctuary Olonana',
        meals: 'Breakfast, Lunch, Bush Boma Dinner'
      },
      {
        day: 7,
        title: 'Final Dawn Safari & Flight to Nairobi',
        location: 'Wilson Airport Nairobi',
        activities: ['Early morning farewell safari drive', 'Bush flight back to Nairobi', 'Dayroom access and transfer for international flight home'],
        accommodation: 'Dayroom at Hemingways Nairobi',
        meals: 'Breakfast, Light Lunch'
      }
    ]
  },
  {
    id: 'kenya-classic-giants-8d',
    title: 'The Grand Kenya Wildlife Odyssey: Amboseli, Nakuru & Mara',
    subtitle: '8 Days of Majestic Elephants, Rhino Sanctuaries, Flamingos & Big Cats',
    durationDays: 8,
    startingCity: 'Nairobi',
    destinationsCovered: ['Nairobi', 'Amboseli National Park', 'Lake Nakuru', 'Maasai Mara'],
    tier: 'Signature Luxury',
    basePriceUSD: 3890,
    rating: 4.95,
    reviewCount: 96,
    groupType: 'Private Escorted',
    departureFrequency: 'Every Monday, Wednesday & Saturday',
    featured: true,
    included: [
      'Exclusive 4x4 Land Cruiser with pop-up photography roof and onboard fridge',
      'Dedicated English/German/French/Spanish speaking Silver-level naturalist guide',
      '7 nights luxury safari lodge accommodation',
      'All meals and bottled mineral water during game drives',
      'All park entrance and conservation fees',
      'Guaranteed window seat for every traveler'
    ],
    notIncluded: [
      'International flights and tips',
      'Travel insurance (available as add-on)'
    ],
    itineraryDays: [
      {
        day: 1,
        title: 'Nairobi to Amboseli — Beneath Mount Kilimanjaro',
        location: 'Amboseli National Park',
        activities: ['Pick-up from Nairobi hotel', 'Drive south through scenic Maasai plains', 'Afternoon game drive with iconic Kilimanjaro backdrop'],
        accommodation: 'Ol Tukai Lodge / Tortilis Camp',
        meals: 'Lunch, Dinner'
      },
      {
        day: 2,
        title: 'Full Day with Amboseli’s Legendary Elephant Herds',
        location: 'Amboseli Swamps & Observation Hill',
        activities: ['Sunrise photography of elephant families crossing marshes', 'Picnic on Observation Hill overlooking Enkongo Narok swamp', 'Evening sundowner'],
        accommodation: 'Ol Tukai Lodge / Tortilis Camp',
        meals: 'Breakfast, Picnic Lunch, Dinner'
      },
      {
        day: 3,
        title: 'Great Rift Valley Ascent to Lake Nakuru',
        location: 'Lake Nakuru National Park',
        activities: ['Drive via Nairobi stopping at Great Rift Valley viewpoint', 'Enter Lake Nakuru sanctuary', 'Sunset flamingo viewing along shoreline'],
        accommodation: 'The Cliff Nakuru / Sarova Lion Hill',
        meals: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 4,
        title: 'Rhino Tracking & Journey to the Maasai Mara',
        location: 'Lake Nakuru to Maasai Mara',
        activities: ['Morning tracking of endangered White & Black Rhinos', 'Scenic drive into the rolling grasslands of the Maasai Mara', 'Evening game drive'],
        accommodation: 'Mara Serena Safari Lodge',
        meals: 'Breakfast, Packed Lunch, Dinner'
      },
      {
        day: 5,
        title: 'Heart of the Mara — Endless Horizons & Big Cats',
        location: 'Maasai Mara Reserve',
        activities: ['Full-day safari drive in search of lions, cheetahs, and leopards', 'Bush picnic on the open savannah'],
        accommodation: 'Mara Serena Safari Lodge',
        meals: 'Breakfast, Bush Lunch, Dinner'
      },
      {
        day: 6,
        title: 'Mara River & Wildlife Migratory Paths',
        location: 'Mara River Basin',
        activities: ['Visit hippo pools and crocodile basking sandbars', 'Tracking cheetah coalitions hunting gazelles across open plains'],
        accommodation: 'Mara Serena Safari Lodge',
        meals: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 7,
        title: 'Private Conservancy Exploration & Cultural Insights',
        location: 'Mara Conservancies',
        activities: ['Morning safari drive in private conservancy', 'Visit traditional Maasai Manyatta and witness warrior ceremonies'],
        accommodation: 'Mara Serena Safari Lodge',
        meals: 'Breakfast, Lunch, Gala Dinner'
      },
      {
        day: 8,
        title: 'Dawn Safari & Return to Nairobi',
        location: 'Nairobi',
        activities: ['Last early morning game drive in the Mara', 'Scenic drive back to Nairobi or transfer to international airport'],
        accommodation: 'End of Safari Tour',
        meals: 'Breakfast, Lunch'
      }
    ]
  },
  {
    id: 'bush-and-beach-luxury-10d',
    title: 'Kenya Bush & Beach: Maasai Mara Safari & Diani Coral Coast',
    subtitle: '10 Days of Big Five Safari Grandeur Followed by Turquoise Indian Ocean Serenity',
    durationDays: 10,
    startingCity: 'Nairobi',
    destinationsCovered: ['Nairobi', 'Maasai Mara', 'Diani Beach'],
    tier: 'Bush & Beach',
    basePriceUSD: 5200,
    rating: 4.98,
    reviewCount: 204,
    groupType: 'Bespoke Fly-in',
    departureFrequency: 'Daily private departures',
    featured: true,
    included: [
      'All internal scheduled bush flights (Nairobi - Mara - Diani - Nairobi)',
      '4 Nights in Maasai Mara luxury tented lodge (All inclusive)',
      '5 Nights in private beachfront villa at Diani Beach (All inclusive)',
      'Unlimited safari game drives with private safari guide',
      'Complimentary Swahili dhow cruise at Diani',
      'Private airport transfers in executive air-conditioned vehicles'
    ],
    notIncluded: ['International flights', 'Scuba diving certification courses'],
    itineraryDays: [
      { day: 1, title: 'Arrival in Nairobi', location: 'Nairobi', activities: ['Arrival and overnight at luxury boutique retreat'], accommodation: 'House of Waine', meals: 'Dinner' },
      { day: 2, title: 'Fly to the Maasai Mara', location: 'Maasai Mara', activities: ['Morning flight to Mara, afternoon predator drive'], accommodation: 'Entim Mara Camp', meals: 'All meals & drinks' },
      { day: 3, title: 'Incredible Big Cats Safari', location: 'Maasai Mara', activities: ['Dawn till dusk tracking lions, leopards, and cheetahs'], accommodation: 'Entim Mara Camp', meals: 'All meals & drinks' },
      { day: 4, title: 'Mara River & Savannah Picnic', location: 'Maasai Mara', activities: ['Full day safari, riverside champagne lunch'], accommodation: 'Entim Mara Camp', meals: 'All meals & drinks' },
      { day: 5, title: 'Flight from Bush to Tropical Beach', location: 'Diani Beach', activities: ['Direct bush flight from Mara to Ukunda Airstrip Diani', 'Check-in to oceanfront villa', 'Barefoot sunset walk'], accommodation: 'Alfajiri Beach Villa / WaterPan Villa', meals: 'All meals & drinks' },
      { day: 6, title: 'Turquoise Waters & Private Coral Reef', location: 'Diani Beach', activities: ['Snorkelling on offshore coral sandbars', 'Afternoon massage by the private pool'], accommodation: 'Alfajiri Beach Villa', meals: 'All meals & drinks' },
      { day: 7, title: 'Kisite-Mpunguti Dolphin Dhow Safari', location: 'Wasini Island & Marine Park', activities: ['Sail on traditional Swahili dhow', 'Swim with wild dolphins and sea turtles', 'Fresh seafood lunch on Wasini Island'], accommodation: 'Alfajiri Beach Villa', meals: 'All meals & drinks' },
      { day: 8, title: 'Relaxation & Beachside Dining', location: 'Diani Beach', activities: ['Leisurely beachfront day, paddleboarding, sunset cocktails'], accommodation: 'Alfajiri Beach Villa', meals: 'All meals & drinks' },
      { day: 9, title: 'Galu Beach & Swahili Culture', location: 'South Coast', activities: ['Visit sacred Kaya Kinondo indigenous forest and local village'], accommodation: 'Alfajiri Beach Villa', meals: 'All meals & drinks' },
      { day: 10, title: 'Fly to Nairobi & Departure', location: 'Nairobi', activities: ['Morning swim, flight to Nairobi Wilson, transfer to JKIA for departure'], accommodation: 'End of Journey', meals: 'Breakfast' }
    ]
  },
  {
    id: 'samburu-northern-wilds-5d',
    title: 'Samburu & Northern Frontier Wilderness Expedition',
    subtitle: '5 Days Exploring Ewaso Nyiro River, The Samburu Special Five & Mount Ololokwe',
    durationDays: 5,
    startingCity: 'Nairobi (Wilson)',
    destinationsCovered: ['Nairobi', 'Samburu National Reserve', 'Buffalo Springs'],
    tier: 'Photographic Expedition',
    basePriceUSD: 2950,
    rating: 4.91,
    reviewCount: 68,
    groupType: 'Small Group (Max 6)',
    departureFrequency: 'Every Tuesday & Friday',
    featured: false,
    included: [
      'Return flights Wilson - Samburu',
      'Luxury tented lodge on the riverbank',
      'All meals and drinks',
      'Samburu guide and tracker',
      'All conservation fees'
    ],
    notIncluded: ['Tips and visa'],
    itineraryDays: [
      { day: 1, title: 'Flight to Samburu', location: 'Samburu', activities: ['Fly north over Mount Kenya', 'Afternoon game drive along the palm-fringed river'], accommodation: 'Samburu Elephant Bedroom Camp', meals: 'Lunch, Dinner' },
      { day: 2, title: 'Samburu Special Five Search', location: 'Samburu', activities: ['Photographing Grevy’s Zebras, Reticulated Giraffes, and Gerenuks'], accommodation: 'Samburu Elephant Bedroom Camp', meals: 'All meals' },
      { day: 3, title: 'Predators of the Arid North', location: 'Buffalo Springs', activities: ['Tracking leopards in riverine acacias and lion prides'], accommodation: 'Saruni Samburu', meals: 'All meals' },
      { day: 4, title: 'Rock Art & Samburu Traditions', location: 'Kalama Conservancy', activities: ['Ancient caves, Samburu singing wells visit', 'Sundowner on granite kopje'], accommodation: 'Saruni Samburu', meals: 'All meals' },
      { day: 5, title: 'Flight back to Nairobi', location: 'Nairobi', activities: ['Final morning game drive, flight to Nairobi'], accommodation: 'End of Tour', meals: 'Breakfast' }
    ]
  }
];
