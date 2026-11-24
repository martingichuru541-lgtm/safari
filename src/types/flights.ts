/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AirportCode = 'NBO' | 'WIL';
export type FlightDirection = 'arrival' | 'departure';
export type FlightStatus =
  | 'On Time'
  | 'Approaching'
  | 'Landed'
  | 'Taxiing'
  | 'Boarding'
  | 'Departed'
  | 'Delayed';

export interface FlightConnection {
  id: string;
  flightNumber: string;
  airline: string;
  airlineCode: string;
  airport: 'JKIA' | 'Wilson';
  airportCode: AirportCode;
  direction: FlightDirection;
  originOrDestinationCity: string;
  originOrDestinationCode: string;
  scheduledTime: string; // HH:MM EAT
  estimatedTime: string;
  status: FlightStatus;
  terminalOrApron: string;
  gateOrHangar?: string;
  aircraftType: string;
  baggageBelt?: string;
  safariConnectionNote?: string;
  guestPartyName?: string;
}

export interface AirportStatusSummary {
  airportCode: AirportCode;
  airportName: string;
  role: string;
  runwayStatus: string;
  metarWeather: string;
  tempC: number;
  transferTimeBetweenMin: number;
  activeMovementsCount: number;
}
