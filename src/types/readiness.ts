/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ReadinessCategory = 'visa' | 'health' | 'packing' | 'customs_finance';
export type RequirementUrgency = 'mandatory' | 'strongly_recommended' | 'optional';

export interface ReadinessItem {
  id: string;
  category: ReadinessCategory;
  title: string;
  subtitle: string;
  description: string;
  urgency: RequirementUrgency;
  timingGuidance: string; // e.g. "Apply 14-30 days before departure"
  officialLink?: string;
  officialLinkLabel?: string;
  itineraryRelevance?: string;
  completed: boolean;
}

export interface ReadinessSummary {
  totalItems: number;
  completedItems: number;
  percentComplete: number;
  mandatoryComplete: boolean;
  statusLabel: 'Action Required' | 'Good Progress' | 'Almost Ready' | '100% Safari Ready';
}
