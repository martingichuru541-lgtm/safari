/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FlightConnection, FlightDirection } from '../types/flights';

export interface FlightFilterCriteria {
  airport?: 'ALL' | 'JKIA' | 'Wilson';
  direction?: 'ALL' | FlightDirection;
  status?: string;
  query?: string;
}

export function filterFlights(
  flights: FlightConnection[],
  criteria: FlightFilterCriteria
): FlightConnection[] {
  return flights.filter((flight) => {
    // Airport filter
    if (criteria.airport && criteria.airport !== 'ALL') {
      if (flight.airport !== criteria.airport) return false;
    }

    // Direction filter
    if (criteria.direction && criteria.direction !== 'ALL') {
      if (flight.direction !== criteria.direction) return false;
    }

    // Status filter
    if (criteria.status && criteria.status !== 'ALL') {
      if (flight.status !== criteria.status) return false;
    }

    // Search query filter
    if (criteria.query && criteria.query.trim()) {
      const q = criteria.query.toLowerCase().trim();
      const matchNumber = flight.flightNumber.toLowerCase().includes(q);
      const matchAirline = flight.airline.toLowerCase().includes(q);
      const matchCity = flight.originOrDestinationCity.toLowerCase().includes(q);
      const matchGuest = flight.guestPartyName?.toLowerCase().includes(q);
      const matchNote = flight.safariConnectionNote?.toLowerCase().includes(q);
      if (!matchNumber && !matchAirline && !matchCity && !matchGuest && !matchNote) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Calculates connection buffer between arriving international flight (at JKIA)
 * and departing bush flight (at Wilson Airport).
 * Assumes time format HH:MM in 24h clock.
 */
export function calculateConnectionFeasibility(
  arrivalTimeStr: string,
  departureTimeStr: string,
  transitMin: number = 25
): {
  bufferMinutes: number;
  isFeasible: boolean;
  status: 'Comfortable' | 'Tight' | 'Critical / Impossible';
  explanation: string;
} {
  const [arrH, arrM] = arrivalTimeStr.split(':').map(Number);
  const [depH, depM] = departureTimeStr.split(':').map(Number);

  if (isNaN(arrH) || isNaN(arrM) || isNaN(depH) || isNaN(depM)) {
    return {
      bufferMinutes: 0,
      isFeasible: false,
      status: 'Critical / Impossible',
      explanation: 'Invalid flight time format.',
    };
  }

  const arrTotal = arrH * 60 + arrM;
  let depTotal = depH * 60 + depM;

  // Handle overnight connection if departure is next day early morning
  if (depTotal < arrTotal) {
    depTotal += 24 * 60;
  }

  const rawWindowMinutes = depTotal - arrTotal;

  // Required buffer: Customs & Baggage (45m) + Transfer (transitMin) + Bush Flight Check-in (30m)
  const minimumRequiredMinutes = 45 + transitMin + 30; // typically 100 mins
  const spareBuffer = rawWindowMinutes - minimumRequiredMinutes;

  if (rawWindowMinutes < minimumRequiredMinutes) {
    return {
      bufferMinutes: rawWindowMinutes,
      isFeasible: false,
      status: 'Critical / Impossible',
      explanation: `Only ${rawWindowMinutes} mins between flights. Minimum required is ${minimumRequiredMinutes} mins for customs, expressway transfer, and bush check-in.`,
    };
  }

  if (spareBuffer < 45) {
    return {
      bufferMinutes: rawWindowMinutes,
      isFeasible: true,
      status: 'Tight',
      explanation: `${rawWindowMinutes} mins total window. VIP fast-track escort and express vehicle transfer recommended.`,
    };
  }

  return {
    bufferMinutes: rawWindowMinutes,
    isFeasible: true,
    status: 'Comfortable',
    explanation: `${rawWindowMinutes} mins window (${Math.floor(rawWindowMinutes / 60)}h ${rawWindowMinutes % 60}m). Ample time for lounge refreshment and relaxed bush hop boarding.`,
  };
}
