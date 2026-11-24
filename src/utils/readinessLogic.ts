/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReadinessItem, ReadinessSummary, ReadinessCategory } from '../types/readiness';
import { GeneratedItinerary } from './itineraryBuilder';
import { BASE_READINESS_ITEMS } from '../data/readinessData';

export function generateItineraryReadinessItems(
  itinerary?: GeneratedItinerary | null
): ReadinessItem[] {
  const items: ReadinessItem[] = BASE_READINESS_ITEMS.map((item) => ({ ...item }));

  if (!itinerary) {
    return items;
  }

  const allText = [
    itinerary.title,
    itinerary.overview,
    itinerary.recommendedSafari,
    ...itinerary.destinations,
    ...itinerary.days.map((d) => `${d.location} ${d.title} ${d.activities.join(' ')}`),
  ]
    .join(' ')
    .toLowerCase();

  // 1. Coastal / Marine additions
  const isCoastal =
    allText.includes('diani') ||
    allText.includes('watamu') ||
    allText.includes('lamu') ||
    allText.includes('marine') ||
    allText.includes('beach') ||
    allText.includes('dhow');

  if (isCoastal) {
    items.push({
      id: 'req-reef-sunscreen',
      category: 'packing',
      title: 'Biodegradable Reef-Safe Sunscreen (SPF 50+)',
      subtitle: 'Marine Sanctuary Conservation in Diani / Watamu',
      description:
        'Oxybenzone-free, mineral-based zinc sunscreen to protect delicate coral reefs in Kisite-Mpunguti and Watamu Marine National Parks.',
      urgency: 'strongly_recommended',
      timingGuidance: 'Pack for beach / marine leg',
      itineraryRelevance: 'Coastal & Marine Safari',
      completed: false,
    });

    items.push({
      id: 'req-dry-bag',
      category: 'packing',
      title: 'Waterproof Dry Bag (10L–20L) for Dhow Excursions',
      subtitle: 'Protection from Salt Spray & Ocean Hops',
      description:
        'Keeps mobile phones, passports, and cameras safe while boarding traditional lateen dhows or snorkeling sandbanks.',
      urgency: 'strongly_recommended',
      timingGuidance: 'Pack with swimwear',
      itineraryRelevance: 'Dhow Sailing & Sandbank Hops',
      completed: false,
    });
  }

  // 2. Hot Air Balloon Safari additions
  const hasBalloon = allText.includes('balloon');
  if (hasBalloon) {
    items.push({
      id: 'req-balloon-gear',
      category: 'packing',
      title: 'Pre-Dawn Warm Layers for 05:00 AM Balloon Launch',
      subtitle: 'High Thermal Heat Under Burners & Pre-Dawn Chill',
      description:
        'Balloon launch sites in the Mara are very cold at 05:00 AM, but warm directly beneath the gas burners. A dark cap, neck buff, and closed-toe flat shoes are required for basket landings.',
      urgency: 'strongly_recommended',
      timingGuidance: 'Prepare morning of Day 3 / balloon day',
      itineraryRelevance: 'Maasai Mara Sunrise Ballooning',
      completed: false,
    });
  }

  // 3. Rainy Season additions
  const isRainySeason =
    allText.includes('november') ||
    allText.includes('december') ||
    allText.includes('april') ||
    allText.includes('may');

  if (isRainySeason) {
    items.push({
      id: 'req-rain-jacket',
      category: 'packing',
      title: 'Breathable Waterproof Shell Jacket & Mud Gaiters',
      subtitle: 'Short Rains (Vuli) / Long Rains (Masika) Preparedness',
      description:
        'Afternoon tropical downpours are common. A lightweight, packable Gore-Tex shell jacket keeps you dry while keeping camera gear protected in pop-up safari cruisers.',
      urgency: 'strongly_recommended',
      timingGuidance: 'Pack in daypack for afternoon game drives',
      itineraryRelevance: 'Green Season Safari',
      completed: false,
    });
  }

  // 4. Cultural Manyatta / Village Visit additions
  const hasCultural = allText.includes('maasai') || allText.includes('cultural') || allText.includes('manyatta');
  if (hasCultural) {
    items.push({
      id: 'req-cultural-attire',
      category: 'customs_finance',
      title: 'Respectful Village Etiquette & Photography Protocol',
      subtitle: 'Modest Dress & Permission for Portrait Photography',
      description:
        'When visiting indigenous Maasai or Samburu Manyattas, wear clothing that covers shoulders and knees. Always ask permission before photographing individuals, especially village elders and warriors.',
      urgency: 'strongly_recommended',
      timingGuidance: 'Review before cultural community excursions',
      itineraryRelevance: 'Indigenous Cultural Immersion',
      completed: false,
    });
  }

  return items;
}

export function computeReadinessSummary(items: ReadinessItem[]): ReadinessSummary {
  const totalItems = items.length;
  if (totalItems === 0) {
    return {
      totalItems: 0,
      completedItems: 0,
      percentComplete: 0,
      mandatoryComplete: false,
      statusLabel: 'Action Required',
    };
  }

  const completedItems = items.filter((i) => i.completed).length;
  const mandatoryItems = items.filter((i) => i.urgency === 'mandatory');
  const mandatoryComplete = mandatoryItems.every((i) => i.completed);
  const percentComplete = Math.round((completedItems / totalItems) * 100);

  let statusLabel: ReadinessSummary['statusLabel'] = 'Action Required';
  if (percentComplete === 100) {
    statusLabel = '100% Safari Ready';
  } else if (percentComplete >= 75 && mandatoryComplete) {
    statusLabel = 'Almost Ready';
  } else if (percentComplete >= 40) {
    statusLabel = 'Good Progress';
  } else {
    statusLabel = 'Action Required';
  }

  return {
    totalItems,
    completedItems,
    percentComplete,
    mandatoryComplete,
    statusLabel,
  };
}

export function filterReadinessItems(
  items: ReadinessItem[],
  category: 'all' | ReadinessCategory,
  onlyPending: boolean = false
): ReadinessItem[] {
  return items.filter((item) => {
    if (category !== 'all' && item.category !== category) {
      return false;
    }
    if (onlyPending && item.completed) {
      return false;
    }
    return true;
  });
}
