/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AlertType = 'migration_timing' | 'weather_season' | 'cultural_festival' | 'conservation_advisory';

export type AlertSeverity = 'info' | 'advisory' | 'high_interest' | 'urgent';

export interface TravelAlert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  message: string;
  region: string;
  validFrom: string;
  validTo: string;
  isActive: boolean;
  sourceAgent: string;
  ctaLabel?: string;
  actionTarget?: 'safaris' | 'destinations' | 'concierge' | 'hotels';
  linkedReserveId?: string;
}
