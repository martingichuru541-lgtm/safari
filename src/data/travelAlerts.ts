/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TravelAlert } from '../types/alerts';

export const INITIAL_TRAVEL_ALERTS: TravelAlert[] = [
  {
    id: 'alt-001',
    type: 'migration_timing',
    severity: 'high_interest',
    title: 'Mara River Mega-Crossings Transitioning to Southern Plains',
    message: 'Large wildebeest columns are concentrating along the Sand River and southern Mara Triangle as short afternoon showers trigger fresh pasture growth in the southern Serengeti corridor.',
    region: 'Maasai Mara & Mara Triangle',
    validFrom: '2026-11-01',
    validTo: '2026-11-20',
    isActive: true,
    sourceAgent: 'AI Migration Radar Agent (v3.2)',
    ctaLabel: 'View Mara Expeditions',
    actionTarget: 'safaris',
    linkedReserveId: 'maasai-mara',
  },
  {
    id: 'alt-002',
    type: 'cultural_festival',
    severity: 'advisory',
    title: 'Lamu Cultural Festival 2026: Dhow Regattas & Donkey Races Confirmed',
    message: 'The annual UNESCO Lamu Cultural Festival celebrations are slated for late November. Expect historic Swahili poetry recitals, traditional lateen dhow sailing races, and henna craft showcases across Shela and Old Town.',
    region: 'Lamu Archipelago (Coast)',
    validFrom: '2026-11-05',
    validTo: '2026-11-30',
    isActive: true,
    sourceAgent: 'Cultural Heritage Sentinel Agent',
    ctaLabel: 'Explore Coast & Lamu',
    actionTarget: 'destinations',
    linkedReserveId: 'lamu-archipelago',
  },
  {
    id: 'alt-003',
    type: 'weather_season',
    severity: 'info',
    title: 'Short Rains (Vuli) Commencing: Peak "Green Season" Photographic Conditions',
    message: 'Kenya Meteorological Department signals refreshing afternoon showers across the Great Rift Valley. Dust levels have plummeted and savannah clarity is at an annual peak with vibrant green backdrops and newborn grazers.',
    region: 'Rift Valley, Amboseli & Central Highlands',
    validFrom: '2026-11-03',
    validTo: '2026-12-15',
    isActive: true,
    sourceAgent: 'KMD Meteorological Travel Watcher',
    ctaLabel: 'Plan Green Season Safari',
    actionTarget: 'concierge',
  },
  {
    id: 'alt-004',
    type: 'conservation_advisory',
    severity: 'info',
    title: 'Ol Pejeta Welcomes Two Healthy Black Rhino Calves',
    message: 'Sanctuary rangers confirm two new eastern black rhino births in the Morani and Sweetwaters sectors, bringing the conservancy’s total thriving population to 172 individuals.',
    region: 'Laikipia & Ol Pejeta',
    validFrom: '2026-11-04',
    validTo: '2026-11-28',
    isActive: true,
    sourceAgent: 'Wildlife Telemetry Sentinel Agent',
    ctaLabel: 'Visit Ol Pejeta',
    actionTarget: 'hotels',
    linkedReserveId: 'laikipia-ol-pejeta',
  },
];
