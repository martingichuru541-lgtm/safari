/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ConciergePlanRequest {
  travelerName: string;
  residenceCountry: string;
  durationDays: number;
  travelersCount: number;
  travelMonth: string;
  budgetTier: 'Luxury ($500-$1000/day)' | 'Ultra Luxury ($1000+/day)' | 'Classic Safari ($300-$500/day)';
  interests: string[];
  travelStyle: 'Big Cats & Savannah' | 'Bush & Beach Combo' | 'Photographic Focus' | 'Family Wildlife';
}

export interface GeneratedItinerary {
  id: string;
  title: string;
  overview: string;
  estimatedCostUSD: number;
  costPerPersonUSD: number;
  destinations: string[];
  recommendedLodges: string[];
  recommendedSafari: string;
  recommendedVehicle: string;
  days: {
    day: number;
    title: string;
    location: string;
    activities: string[];
    overnightLodge: string;
    insiderTip: string;
  }[];
  packingChecklist: string[];
  visaHealthChecklist: string[];
  createdAt: string;
}

export function buildIntelligentItinerary(req: ConciergePlanRequest): GeneratedItinerary {
  const daysCount = Math.max(3, Math.min(14, req.durationDays));
  const isBushAndBeach = req.travelStyle === 'Bush & Beach Combo' || req.interests.includes('Beach & Marine');

  let title = `${daysCount}-Day Bespoke Kenya Safari Expedition`;
  if (isBushAndBeach) {
    title = `${daysCount}-Day Kenya Wilderness & Indian Ocean Coral Escape`;
  } else if (req.travelStyle === 'Photographic Focus') {
    title = `${daysCount}-Day Masterclass Wildlife Photography Expedition`;
  }

  // Cost estimates
  let dailyRate = 750;
  if (req.budgetTier === 'Ultra Luxury ($1000+/day)') dailyRate = 1350;
  else if (req.budgetTier === 'Classic Safari ($300-$500/day)') dailyRate = 420;

  const costPerPersonUSD = dailyRate * daysCount;
  const estimatedCostUSD = costPerPersonUSD * Math.max(1, req.travelersCount);

  const itineraryDays: GeneratedItinerary['days'] = [];

  // Day 1: Nairobi arrival
  itineraryDays.push({
    day: 1,
    title: 'Arrival in Nairobi & Historic Wildlife Sanctuaries',
    location: 'Nairobi',
    activities: [
      'VIP Meet & Greet at Jomo Kenyatta International Airport (NBO)',
      'Private transfer to Giraffe Manor or Hemingways Nairobi in Karen',
      'Afternoon private encounter at Daphne Sheldrick Elephant Orphanage',
      'Welcome dinner featuring Kenyan fusion gastronomy'
    ],
    overnightLodge: req.budgetTier.includes('Ultra') ? 'The Historic Giraffe Manor' : 'Hemingways Nairobi',
    insiderTip: 'Kenya sits on East Africa Time (GMT+3). Enjoy an early restful night to prepare for dawn safari light tomorrow.'
  });

  // Intermediate safari days
  const safariDays = isBushAndBeach ? Math.max(2, Math.floor(daysCount * 0.6)) : daysCount - 1;

  for (let d = 2; d <= safariDays; d++) {
    if (d === 2) {
      itineraryDays.push({
        day: d,
        title: 'Bush Flight over Rift Valley into Maasai Mara',
        location: 'Maasai Mara National Reserve',
        activities: [
          'Scheduled 45-minute scenic internal bush flight landing at Mara North Airstrip',
          'Check-in to luxury riverside tented pavilion with panoramic savannah deck',
          'Late afternoon predator game drive with professional Silver-level tracker',
          'Sundowner cocktails overlooking resident hippo pod'
        ],
        overnightLodge: 'Angama Mara Luxury Lodge / Elephant Pepper Camp',
        insiderTip: 'Keep your camera set to 1/1600s shutter speed as animals become extraordinarily active during the golden hour.'
      });
    } else if (d === 3) {
      itineraryDays.push({
        day: d,
        title: 'The Mara River & Great Migration Crossing Circuit',
        location: 'Maasai Mara Triangle',
        activities: [
          'Full-day private game drive traversing central savannah plains',
          'Tracking lion prides, solitary leopards, and cheetah coalitions',
          'Gourmet bush picnic served under shaded yellow fever acacia trees',
          'Visit to Mara River hippo pools and giant Nile crocodiles'
        ],
        overnightLodge: 'Angama Mara Luxury Lodge',
        insiderTip: 'Ask your guide to stop near lookout hills for expansive 360-degree views of incoming migratory columns.'
      });
    } else if (d === 4) {
      itineraryDays.push({
        day: d,
        title: 'Dawn Hot Air Balloon Safari & Mara Conservancies',
        location: 'Mara North Conservancy',
        activities: [
          'Sunrise hot air balloon flight gliding silently above the savannah',
          'Celebratory champagne bush breakfast upon landing',
          'Afternoon walking safari guided by traditional Maasai warrior',
          'Spotlit evening night drive seeking nocturnal servals and aardvarks'
        ],
        overnightLodge: 'Karen Blixen Camp / Sanctuary Olonana',
        insiderTip: 'Conservancy rules allow off-road tracking and night drives that are restricted inside the main public reserve.'
      });
    } else {
      itineraryDays.push({
        day: d,
        title: `Amboseli & Mount Kilimanjaro Wilderness (Day ${d})`,
        location: 'Amboseli National Park',
        activities: [
          'Scenic transfer to Amboseli beneath Mount Kilimanjaro',
          'Game drive through Amboseli swamps observing giant tusker elephants',
          'Ascent to Observation Hill for bird-eye view of Enkongo Narok marshes'
        ],
        overnightLodge: 'Tortilis Camp Amboseli',
        insiderTip: 'Early morning from 06:00 to 08:30 offers the clearest cloud-free views of Kilimanjaro’s snowy summit.'
      });
    }
  }

  // Coast extension if Bush & Beach
  if (isBushAndBeach && daysCount > safariDays) {
    for (let d = safariDays + 1; d <= daysCount; d++) {
      if (d === daysCount) {
        itineraryDays.push({
          day: d,
          title: 'Swahili Farewell & Return Flight to Nairobi',
          location: 'Diani Beach to Nairobi',
          activities: [
            'Morning barefoot beach walk and fresh mango breakfast',
            'Transfer to Ukunda Airstrip for internal flight back to Nairobi Wilson',
            'Dayroom use and private airport transfer to JKIA for homeward flight'
          ],
          overnightLodge: 'Departure (Homeward Flight)',
          insiderTip: 'Allow 3 hours at Nairobi JKIA for international departures.'
        });
      } else {
        itineraryDays.push({
          day: d,
          title: `Diani Coral Coast & Marine Sanctuary (Day ${d})`,
          location: 'Diani Beach & Kisite-Mpunguti',
          activities: [
            'Sail on traditional Swahili wooden dhow to Kisite-Mpunguti Marine Park',
            'Snorkel vibrant coral gardens with sea turtles and wild spinner dolphins',
            'Fresh grilled seafood lunch on Wasini Island',
            'Evening sunset massage at oceanfront private villa'
          ],
          overnightLodge: 'Alfajiri Cliff & Garden Villas',
          insiderTip: 'Diani reef sandbars emerge at low tide, creating natural turquoise swimming lagoons in the middle of the sea.'
        });
      }
    }
  }

  return {
    id: `itinerary-${Date.now()}`,
    title,
    overview: `A bespoke Kenyan travel program handcrafted for ${req.travelerName} (${req.residenceCountry}). Combining ${req.travelStyle.toLowerCase()} across ${daysCount} unforgettable days.`,
    estimatedCostUSD,
    costPerPersonUSD,
    destinations: isBushAndBeach
      ? ['Nairobi', 'Maasai Mara', 'Diani Beach & Kisite-Mpunguti']
      : ['Nairobi', 'Maasai Mara', 'Amboseli beneath Kilimanjaro'],
    recommendedLodges: [
      req.budgetTier.includes('Ultra') ? 'Angama Mara' : 'Tortilis Camp',
      isBushAndBeach ? 'Alfajiri Beach Villas' : 'Finch Hattons Tsavo'
    ],
    recommendedSafari: isBushAndBeach ? 'Kenya Bush & Beach: Mara & Diani 10D' : 'The Great Migration 7-Day Fly-in',
    recommendedVehicle: 'Custom Extended 4x4 Safari Land Cruiser (8-Seater)',
    days: itineraryDays,
    packingChecklist: [
      'Neutral-toned safari clothing (khaki, olive, tan) — avoid dark navy/black which attract tsetse flies',
      'Lightweight breathable windbreaker / fleece jacket for crisp 6:00 AM game drives',
      'High-SPF sunscreen (SPF 50+), polarized sunglasses, and wide-brim safari hat',
      'Compact binoculars (8x42 or 10x42) and telephoto camera lens (100-400mm recommended)',
      'Type G (UK-style) 3-pin plug adapter and portable power bank for bush drives',
      'Swimwear and reef water shoes for coastal marine parks and lodge infinity pools'
    ],
    visaHealthChecklist: [
      'Kenya Electronic Travel Authorisation (eTA): Apply online at least 3 days prior at www.etakenya.go.ke ($35 fee)',
      'Yellow Fever vaccination card: Mandatory if arriving from or transiting through endemic yellow fever zones',
      'Malaria prophylaxis: Consult your physician for recommended prescription (e.g., Atovaquone-Proguanil or Doxycycline)',
      'Passport validity: Must be valid for at least 6 months with 2 consecutive blank visa pages'
    ],
    createdAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  };
}
