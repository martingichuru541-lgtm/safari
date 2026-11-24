/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ReforestationProject,
  WildlifeCensusTrend,
  CarbonAndEcoMetrics,
} from '../types/sustainability';

export const REFORESTATION_PROJECTS: ReforestationProject[] = [
  {
    id: 'ref-01',
    name: 'Mau Forest Complex Indigenous Canopy Restoration',
    location: 'Rift Valley Water Tower Catchment',
    treesPlanted: 142500,
    treesTarget: 250000,
    species: ['African Olive (Olea africana)', 'Cedar (Juniperus procera)', 'Podo (Podocarpus latifolius)'],
    partnerCampSponsors: ['Angama Mara', 'Karen Blixen Camp Foundation'],
    survivalRatePercent: 88,
  },
  {
    id: 'ref-02',
    name: 'Mount Kenya Afro-Alpine Wildlife Corridor',
    location: 'Mount Kenya National Park Buffer Zone',
    treesPlanted: 86400,
    treesTarget: 120000,
    species: ['East African Rosewood', 'Bamboo Clones', 'Yellowwood'],
    partnerCampSponsors: ['Fairmont Mount Kenya Safari Club', 'Ol Pejeta Conservancy'],
    survivalRatePercent: 92,
  },
  {
    id: 'ref-03',
    name: 'Mida Creek & Watamu Blue Carbon Mangrove Belt',
    location: 'Kilifi Coastal Marine Biosphere',
    treesPlanted: 68900,
    treesTarget: 100000,
    species: ['Red Mangrove (Rhizophora mucronata)', 'Black Mangrove (Bruguiera gymnorhiza)'],
    partnerCampSponsors: ['Hemingways Watamu', 'Alfajiri Beach Villas'],
    survivalRatePercent: 94,
  },
];

export const WILDLIFE_CENSUS_DATA: WildlifeCensusTrend[] = [
  {
    speciesName: 'Eastern Black Rhino (Diceros bicornis michaeli)',
    category: 'Critically Endangered',
    year1989Count: 380,
    year2020Count: 853,
    year2026Count: 1024,
    growthRatePercent: 20.0,
    primarySanctuaries: ['Ol Pejeta Conservancy', 'Lewa Wildlife Conservancy', 'Nairobi National Park'],
  },
  {
    speciesName: 'African Savannah Elephant (Loxodonta africana)',
    category: 'Endangered',
    year1989Count: 16000,
    year2020Count: 34125,
    year2026Count: 36280,
    growthRatePercent: 6.3,
    primarySanctuaries: ['Amboseli National Park', 'Tsavo Ecosystem', 'Maasai Mara National Reserve'],
  },
  {
    speciesName: 'Grevy’s Zebra (Equus grevyi)',
    category: 'Endangered',
    year1989Count: 1900,
    year2020Count: 2800,
    year2026Count: 3042,
    growthRatePercent: 8.6,
    primarySanctuaries: ['Samburu National Reserve', 'Buffalo Springs', 'Kalama Community Conservancy'],
  },
  {
    speciesName: 'Mountain Bongo Antelope (Tragelaphus eurycerus isaaci)',
    category: 'Critically Endangered',
    year1989Count: 50,
    year2020Count: 96,
    year2026Count: 184,
    growthRatePercent: 91.6,
    primarySanctuaries: ['Mount Kenya Wildlife Conservancy Mawingu Sanctuary', 'Aberdare Ranges'],
  },
];

export const SUSTAINABILITY_METRICS: CarbonAndEcoMetrics = {
  totalCO2OffsetTonnes: 18420,
  verifiedStandard: 'Verra VCS + CCB Gold Standard (Chyulu Hills REDD+ Project)',
  partnerSolarMWhYear: 3840,
  singleUsePlasticBottlesEliminated: 1250000,
  communityAcreageProtected: 1850000, // 1.85 Million acres across Maasai, Samburu and Rendille conservancies
  lowEmissionCruisersPercent: 78,
};
