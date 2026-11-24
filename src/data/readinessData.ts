/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReadinessItem } from '../types/readiness';

export const BASE_READINESS_ITEMS: ReadinessItem[] = [
  // 1. VISA & ENTRY (eTA)
  {
    id: 'req-eta',
    category: 'visa',
    title: 'Kenya Electronic Travel Authorisation (eTA)',
    subtitle: 'Mandatory Entry Requirement for All Foreign Visitors',
    description:
      'Kenya has transitioned to an official Electronic Travel Authorisation (eTA) system. Apply exclusively via the government portal (etakenya.go.ke). Have your passport bio page, passport photo, flight confirmation, and lodge booking vouchers ready.',
    urgency: 'mandatory',
    timingGuidance: 'Apply 14–30 days prior (minimum 3 business days before departure)',
    officialLink: 'https://www.etakenya.go.ke/',
    officialLinkLabel: 'Official Kenya eTA Government Portal',
    completed: false,
  },
  {
    id: 'req-passport',
    category: 'visa',
    title: 'Passport Validity & Blank Pages',
    subtitle: '6-Month Rule & Immigration Stamps',
    description:
      'Your passport must be valid for at least 6 months beyond your scheduled departure date from Kenya and contain at least two completely blank facing pages for customs and immigration entry/exit stamps.',
    urgency: 'mandatory',
    timingGuidance: 'Check validity 3–6 months in advance',
    completed: false,
  },
  {
    id: 'req-onward-ticket',
    category: 'visa',
    title: 'Proof of Return or Onward Travel',
    subtitle: 'Confirmed Return Flight Itinerary',
    description:
      'Immigration officers at Jomo Kenyatta International Airport (JKIA) require verified proof of return flight tickets back to your home country or onward international connections.',
    urgency: 'mandatory',
    timingGuidance: 'Have digital copy or printed ticket on boarding',
    completed: false,
  },

  // 2. HEALTH & VACCINATIONS
  {
    id: 'req-yellow-fever',
    category: 'health',
    title: 'Yellow Fever Vaccination Certificate',
    subtitle: 'Mandatory If Arriving From or Transiting Endemic Zones',
    description:
      'Proof of Yellow Fever vaccination (Yellow Card) is strictly required if you are arriving from, or have transited for more than 12 hours through, a country with risk of Yellow Fever transmission. Vaccine must be administered at least 10 days before arrival.',
    urgency: 'strongly_recommended',
    timingGuidance: 'Receive vaccine at least 10 days to 4 weeks before departure',
    officialLink: 'https://www.who.int/news-room/fact-sheets/detail/yellow-fever',
    officialLinkLabel: 'WHO International Travel Health Guidelines',
    completed: false,
  },
  {
    id: 'req-malaria',
    category: 'health',
    title: 'Malaria Prophylaxis & Insect Repellent',
    subtitle: 'Protection for Savannah & Coastal Ecosystems',
    description:
      'Most Kenyan national parks and the Swahili Coast have low-to-moderate malaria transmission risk. Consult a travel medicine clinic for anti-malarial medication (Malarone/Atovaquone-proguanil or Doxycycline). Pack 30%+ DEET or Picaridin mosquito spray.',
    urgency: 'strongly_recommended',
    timingGuidance: 'Consult travel doctor 4–6 weeks prior',
    completed: false,
  },
  {
    id: 'req-insurance-amref',
    category: 'health',
    title: 'Medical Evacuation Insurance (AMREF Flying Doctors)',
    subtitle: 'Emergency Air Ambulance Cover in Remote Bush',
    description:
      'Verify that your travel insurance policy includes emergency medical air evacuation from remote safari locations. KenyaOne provides optional direct AMREF Flying Doctors tourist evacuation enrolment covering direct airstrip airlifts to Nairobi private trauma hospitals.',
    urgency: 'strongly_recommended',
    timingGuidance: 'Confirm policy 14 days before departure',
    officialLink: 'https://flydoc.org/',
    officialLinkLabel: 'AMREF Flying Doctors Air Ambulance Evacuation',
    completed: false,
  },
  {
    id: 'req-routine-vaccines',
    category: 'health',
    title: 'Routine Booster Vaccines (Hep A/B, Tetanus, Typhoid)',
    subtitle: 'General Travel Health Standards',
    description:
      'Ensure standard immunizations are up-to-date, including Tetanus/Diphtheria booster, Hepatitis A and B, and Typhoid.',
    urgency: 'strongly_recommended',
    timingGuidance: 'Check medical records 4–8 weeks prior',
    completed: false,
  },

  // 3. PACKING & GEAR
  {
    id: 'req-soft-duffle',
    category: 'packing',
    title: 'Soft-Sided Duffle Bag (15kg / 33 lbs Bush Flight Limit)',
    subtitle: 'Strict Constraint for Wilson Airport Bush Charters',
    description:
      'Domestic safari bush flights (Safarilink, AirKenya, Governors) strictly enforce a 15kg (33 lbs) weight limit including hand luggage. Hard-shell rigid suitcases cannot fit in the Cessna Caravan aircraft belly pods. Use soft canvas or ballistic nylon duffles without rigid wheels.',
    urgency: 'mandatory',
    timingGuidance: 'Pack and weigh luggage 3 days prior',
    itineraryRelevance: 'Wilson Bush Charters & Fly-in Safaris',
    completed: false,
  },
  {
    id: 'req-safari-clothing',
    category: 'packing',
    title: 'Neutral Safari Palette (Khaki, Tan, Olive)',
    subtitle: 'Avoid Dark Blue, Black, and Bright Neon Colors',
    description:
      'Pack lightweight, breathable long-sleeve shirts and trousers in neutral earth tones (khaki, taupe, olive). Strictly avoid dark navy blue and black clothing as they attract tsetse flies in acacia woodlands, and camouflage military prints which are prohibited for civilian wear.',
    urgency: 'strongly_recommended',
    timingGuidance: 'Select wardrobe 1 week before departure',
    completed: false,
  },
  {
    id: 'req-dawn-layers',
    category: 'packing',
    title: 'Warm Fleece or Windbreaker for Dawn Game Drives',
    subtitle: 'Early 06:00 AM Savannah Chills (12°C–14°C)',
    description:
      'Highland savannahs (Maasai Mara, Laikipia, Amboseli) can be surprisingly cold at 06:00 AM in open-sided 4x4 Land Cruisers. Pack a warm fleece, light beanie, windbreaker jacket, and a lightweight scarf.',
    urgency: 'strongly_recommended',
    timingGuidance: 'Pack in carry-on for first morning drive',
    completed: false,
  },
  {
    id: 'req-optics-camera',
    category: 'packing',
    title: 'Binoculars (8x42 / 10x42) & Camera Dust Cover',
    subtitle: 'Essential Optics for Distant Predator Action',
    description:
      'Every traveler should have their own pair of quality 8x42 or 10x42 binoculars. For photographers: bring a telephoto lens (100–400mm or 70–200mm), extra memory cards, extra camera batteries (cold mornings deplete charge), and a microfiber lens dust cloth or bandana.',
    urgency: 'strongly_recommended',
    timingGuidance: 'Test camera gear 1 week prior',
    completed: false,
  },

  // 4. CUSTOMS, LAW & FINANCE
  {
    id: 'req-plastic-ban',
    category: 'customs_finance',
    title: 'Zero Plastic Carrier Bags (Kenya Environmental Law)',
    subtitle: 'National Ban on Single-Use Polythene Bags',
    description:
      'Kenya has one of the world’s strictest environmental plastic bag bans. Commercial single-use polythene carrier bags are illegal. Confiscations and fines occur at customs. Use reusable fabric tote bags, packing cubes, or clear transparent toiletry pouches with zip closures.',
    urgency: 'mandatory',
    timingGuidance: 'Review baggage contents before boarding',
    completed: false,
  },
  {
    id: 'req-currency-usd',
    category: 'customs_finance',
    title: 'USD Currency Series 2013 or Newer & Tipping Cash',
    subtitle: 'Strict Counterfeit Anti-Fraud Banking Regulations',
    description:
      'Kenyan banks, lodges, and forex bureaus will NOT accept US Dollar bills printed before 2013 or notes with minor tears or ink marks. Bring crisp, clean USD notes printed 2013–2026 in denominations of $1, $5, $10, $20 for tipping safari guides, camp staff, and trackers.',
    urgency: 'mandatory',
    timingGuidance: 'Order crisp bills from your bank 2 weeks prior',
    completed: false,
  },
  {
    id: 'req-drone-laws',
    category: 'customs_finance',
    title: 'Drone Prohibition in National Parks & Reserves',
    subtitle: 'Kenya Civil Aviation Authority (KCAA) & KWS Regulations',
    description:
      'Recreational flying of drones is strictly banned in all Kenyan National Parks and Conservancies to prevent wildlife harassment. Unauthorised drones brought through customs will be impounded at JKIA unless official KCAA commercial import permits are pre-registered.',
    urgency: 'mandatory',
    timingGuidance: 'Leave recreational drones at home',
    completed: false,
  },
  {
    id: 'req-plug-adapter',
    category: 'customs_finance',
    title: 'Type G (UK 3-Pin) Electrical Adapter & Power Bank',
    subtitle: 'Standard Voltage 240V / 50Hz',
    description:
      'Kenya uses Type G rectangular 3-pin British style electrical outlets. Most safari tented camps operate on solar inverter systems with timed generator power, so pack a high-capacity power bank (10,000–20,000 mAh) for recharging cameras and phones on game drives.',
    urgency: 'strongly_recommended',
    timingGuidance: 'Pack with camera electronics',
    completed: false,
  },
];
