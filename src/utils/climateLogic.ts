/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ParkWeatherReport } from '../types/climate';

export function getBestParkForCurrentSeason(reports: ParkWeatherReport[]): ParkWeatherReport | null {
  if (reports.length === 0) return null;
  return [...reports].sort((a, b) => b.safariSuitabilityScore - a.safariSuitabilityScore)[0];
}

export function filterWeatherByRegion(reports: ParkWeatherReport[], query: string): ParkWeatherReport[] {
  const q = query.trim().toLowerCase();
  if (!q) return reports;
  return reports.filter(
    (r) =>
      r.parkName.toLowerCase().includes(q) ||
      r.region.toLowerCase().includes(q) ||
      r.condition.toLowerCase().includes(q)
  );
}

export function calculateAverageNationalTemp(reports: ParkWeatherReport[]): number {
  if (reports.length === 0) return 0;
  const sum = reports.reduce((acc, r) => acc + r.currentTempC, 0);
  return Math.round((sum / reports.length) * 10) / 10;
}
