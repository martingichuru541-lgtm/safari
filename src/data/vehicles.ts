/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SafariVehicle } from '../types/travel';

export const SAFARI_VEHICLES: SafariVehicle[] = [
  {
    id: 'extended-land-cruiser-v8',
    name: 'Custom Extended 4x4 Safari Land Cruiser (8-Seater)',
    category: '4x4 Extended Land Cruiser',
    seats: 7,
    dailyRateUSD: 240,
    features: [
      'Heavy-duty 4x4 with raised heavy suspension and off-road BF Goodrich tires',
      'Panoramic 360° pop-up photography roof hatch with bean-bag supports',
      'High-output electric inverter (220V/110V) with charging ports at every seat',
      'Onboard 40-litre compressor refrigerator for cold mineral water & drinks',
      'Professional two-way VHF radio communication for ranger updates',
      'High-grade optical binoculars (Bushnell 10x42) provided for guests',
      'Pop-out side windows and extra legroom with individual captain bucket seats'
    ],
    description: 'The definitive gold standard for African safaris. Our flagship extended Toyota Land Cruiser is specially customized in Kenya for rough savannah terrain, offering smooth photography and guaranteed individual window seats.',
    includesGuideDriver: true,
    fuelIncluded: false,
    mileageLimit: 'Unlimited within National Parks and Conservancies',
    tag: 'Most Popular'
  },
  {
    id: 'luxury-photographic-cruiser',
    name: 'VIP Photographic Edition 4x4 Land Cruiser (Drop-Down Flaps)',
    category: '4x4 Standard Land Cruiser',
    seats: 4,
    dailyRateUSD: 310,
    features: [
      'Fold-down side metal camera flaps for ultra-low angle eye-level animal shots',
      'Gimbal heads and heavy fluid monopod clamps installed at each window',
      'Sound-damped diesel engine for zero wildlife disturbance on approach',
      'Starlink Satellite onboard mobile Wi-Fi connectivity in deep wilderness',
      'Integrated solar roof panels feeding auxiliary camera battery chargers',
      'Comfort leather reclining seats and removable rear glass panels'
    ],
    description: 'Engineered specifically for National Geographic, BBC, and professional wildlife photographers who demand eye-level perspectives, low ground clearance shots, and satellite connectivity.',
    includesGuideDriver: true,
    fuelIncluded: false,
    mileageLimit: 'Unlimited',
    tag: 'Photographer’s Choice'
  },
  {
    id: 'safari-minivan-4x4',
    name: 'Touring 4x4 Safari Minivan (HiAce Custom)',
    category: 'Safari Minivan',
    seats: 7,
    dailyRateUSD: 140,
    features: [
      'Pop-up safari roof for wildlife spotting and photography',
      'Full-time 4WD conversion for savannah track handling',
      'Individual reclining cloth seats with seatbelts',
      'Cooler box for mineral water',
      'USB phone charging ports and radio'
    ],
    description: 'A cost-effective, comfortable option for families and budget-conscious groups wanting reliable game drives across paved roads and main park circuits.',
    includesGuideDriver: true,
    fuelIncluded: false,
    mileageLimit: 'Unlimited within parks',
    tag: 'Best Value'
  },
  {
    id: 'overland-expedition-truck',
    name: 'Scania 4x4 Heavy Overland Safari Truck',
    category: 'Overland Expedition Truck',
    seats: 22,
    dailyRateUSD: 450,
    features: [
      'Heavy-duty 4x4 chassis with high ground clearance for cross-country routes',
      'Roll-up heavy-duty canvas windows providing unobstructed panoramic views',
      'Onboard commercial kitchen, water filtration plant, and dual freezers',
      'Individual lockable gear lockers for each traveler',
      'Roof viewing observation platform'
    ],
    description: 'Built for university expeditions, photographic clubs, and adventurous trans-Kenya journeys across Turkana, Samburu, and the Great Rift Valley.',
    includesGuideDriver: true,
    fuelIncluded: false,
    mileageLimit: 'Unlimited',
    tag: 'Group Expedition'
  }
];
