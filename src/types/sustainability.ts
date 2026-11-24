/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ReforestationProject {
  id: string;
  name: string;
  location: string;
  treesPlanted: number;
  treesTarget: number;
  species: string[];
  partnerCampSponsors: string[];
  survivalRatePercent: number;
}

export interface WildlifeCensusTrend {
  speciesName: string;
  category: 'Critically Endangered' | 'Endangered' | 'Vulnerable' | 'Recovering';
  year1989Count: number;
  year2020Count: number;
  year2026Count: number;
  growthRatePercent: number;
  primarySanctuaries: string[];
}

export interface CarbonAndEcoMetrics {
  totalCO2OffsetTonnes: number;
  verifiedStandard: string;
  partnerSolarMWhYear: number;
  singleUsePlasticBottlesEliminated: number;
  communityAcreageProtected: number;
  lowEmissionCruisersPercent: number;
}
