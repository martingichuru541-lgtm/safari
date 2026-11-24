/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReforestationProject, WildlifeCensusTrend } from '../types/sustainability';
import { TravelAlert, AlertType } from '../types/alerts';

export function calculateTotalTreesPlanted(projects: ReforestationProject[]): {
  totalPlanted: number;
  totalTarget: number;
  overallProgressPercent: number;
} {
  const totalPlanted = projects.reduce((acc, p) => acc + p.treesPlanted, 0);
  const totalTarget = projects.reduce((acc, p) => acc + p.treesTarget, 0);
  const overallProgressPercent = totalTarget > 0 ? Math.round((totalPlanted / totalTarget) * 100) : 0;

  return { totalPlanted, totalTarget, overallProgressPercent };
}

export function filterActiveTravelAlerts(
  alerts: TravelAlert[],
  options?: {
    type?: AlertType | 'all';
    regionQuery?: string;
  }
): TravelAlert[] {
  const { type = 'all', regionQuery = '' } = options || {};
  const query = regionQuery.trim().toLowerCase();

  return alerts.filter((alert) => {
    if (!alert.isActive) return false;
    if (type !== 'all' && alert.type !== type) return false;
    if (query) {
      const inRegion = alert.region.toLowerCase().includes(query);
      const inTitle = alert.title.toLowerCase().includes(query);
      const inMessage = alert.message.toLowerCase().includes(query);
      if (!inRegion && !inTitle && !inMessage) return false;
    }
    return true;
  });
}

export function calculateTotalWildlifeGrowth(trends: WildlifeCensusTrend[]): {
  averageGrowthRate: number;
  totalYear2026Individuals: number;
} {
  if (trends.length === 0) return { averageGrowthRate: 0, totalYear2026Individuals: 0 };
  const totalGrowth = trends.reduce((acc, t) => acc + t.growthRatePercent, 0);
  const totalYear2026Individuals = trends.reduce((acc, t) => acc + t.year2026Count, 0);
  const averageGrowthRate = Math.round((totalGrowth / trends.length) * 10) / 10;

  return { averageGrowthRate, totalYear2026Individuals };
}
