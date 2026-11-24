/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ParkWeatherReport {
  parkId: string;
  parkName: string;
  region: string;
  currentTempC: number;
  feelsLikeC: number;
  condition: 'Sunny & Golden' | 'Partly Cloudy' | 'Afternoon Showers' | 'Crisp Alpine Mist' | 'Tropical Coastal Breeze';
  humidityPercent: number;
  windSpeedKmh: number;
  uvIndex: number;
  visibilityKm: number;
  safariSuitabilityScore: number; // 1 - 10
  suitabilityStatus: string; // e.g. "Optimal Predator Tracking"
  goldenHourLightQuality: 'Exemplary' | 'Excellent' | 'Good' | 'Diffused';
  dustIndex: 'Low (Ideal for Lenses)' | 'Moderate' | 'High (Use Dust Covers)';
  forecast5Day: {
    dayName: string;
    tempHighC: number;
    tempLowC: number;
    condition: string;
    precipitationChance: number;
  }[];
  seasonalNote: string;
  lastUpdated: string;
}
