/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Plane,
  PlaneLanding,
  PlaneTakeoff,
  Clock,
  MapPin,
  Search,
  RotateCw,
  Car,
  CheckCircle2,
  AlertTriangle,
  Radio,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { FlightConnection, FlightDirection } from '../types/flights';
import { INITIAL_FLIGHTS, AIRPORT_SUMMARIES } from '../data/flightData';
import { filterFlights, calculateConnectionFeasibility } from '../utils/flightLogic';

interface FlightConnectionsWidgetProps {
  onAssignChauffeur?: (flightNumber: string, guestName?: string) => void;
}

export const FlightConnectionsWidget: React.FC<FlightConnectionsWidgetProps> = ({
  onAssignChauffeur,
}) => {
  const [flights, setFlights] = useState<FlightConnection[]>(INITIAL_FLIGHTS);
  const [airportFilter, setAirportFilter] = useState<'ALL' | 'JKIA' | 'Wilson'>('ALL');
  const [directionFilter, setDirectionFilter] = useState<'ALL' | FlightDirection>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState('Just now (Live KAA / ADS-B)');

  // Inter-airport connection planner state
  const [selectedArrivalFlightId, setSelectedArrivalFlightId] = useState<string>(
    INITIAL_FLIGHTS.find((f) => f.airport === 'JKIA' && f.direction === 'arrival')?.id || ''
  );
  const [selectedDepartureFlightId, setSelectedDepartureFlightId] = useState<string>(
    INITIAL_FLIGHTS.find((f) => f.airport === 'Wilson' && f.direction === 'departure')?.id || ''
  );
  const [chauffeurAssignedFlightId, setChauffeurAssignedFlightId] = useState<string | null>(null);

  // Filtered flights
  const filteredFlights = filterFlights(flights, {
    airport: airportFilter,
    direction: directionFilter,
    status: statusFilter,
    query: searchQuery,
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshed(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ' EAT');
    }, 700);
  };

  // Connection feasibility calculation
  const arrivingFlight = flights.find((f) => f.id === selectedArrivalFlightId);
  const departingFlight = flights.find((f) => f.id === selectedDepartureFlightId);

  const connectionAnalysis =
    arrivingFlight && departingFlight
      ? calculateConnectionFeasibility(
          arrivingFlight.scheduledTime,
          departingFlight.scheduledTime,
          AIRPORT_SUMMARIES.JKIA.transferTimeBetweenMin
        )
      : null;

  return (
    <div className="space-y-6">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <h3 className="text-lg font-bold text-white font-serif flex items-center gap-2">
            <Plane className="w-5 h-5 text-amber-400" />
            <span>Nairobi Flight Connections &amp; Airport Logistics</span>
          </h3>
          <p className="text-xs text-stone-400 font-light">
            Real-time flight arrival &amp; departure tracking across Jomo Kenyatta International (JKIA / NBO) and Wilson Safari Hub (WIL) for seamless guest airport transfers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-stone-400 font-mono hidden md:inline">
            Feed: <strong className="text-emerald-400">{lastRefreshed}</strong>
          </span>
          <button
            type="button"
            disabled={isRefreshing}
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Syncing Radar...' : 'Sync ADS-B Radar'}</span>
          </button>
        </div>
      </div>

      {/* 2. Airport Status Twin-Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* JKIA Summary */}
        <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-sky-950 border border-sky-800 text-sky-400 font-bold flex items-center justify-center text-xs">
                NBO
              </span>
              <div>
                <h4 className="text-sm font-bold text-white">Jomo Kenyatta International (JKIA)</h4>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                  Primary International Gateway
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
              ILS Cat II Active
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-stone-900 border border-stone-800/80 text-center text-xs">
            <div>
              <span className="text-[10px] text-stone-500 uppercase block">Weather</span>
              <span className="font-bold text-white">{AIRPORT_SUMMARIES.JKIA.tempC}°C</span>
              <span className="text-[10px] text-emerald-400 block">Clear Vis</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 uppercase block">Wilson Transfer</span>
              <span className="font-bold text-amber-400">~{AIRPORT_SUMMARIES.JKIA.transferTimeBetweenMin} min</span>
              <span className="text-[10px] text-stone-400 block">Expressway</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 uppercase block">Movements</span>
              <span className="font-bold text-sky-400">{AIRPORT_SUMMARIES.JKIA.activeMovementsCount}</span>
              <span className="text-[10px] text-stone-400 block">Long-Haul</span>
            </div>
          </div>

          <div className="text-[11px] text-stone-400 flex items-center justify-between">
            <span>Terminal 1A (Intl), 1E (Arrivals), T2</span>
            <span className="text-stone-500 font-mono text-[10px]">HKJK METAR Verified</span>
          </div>
        </div>

        {/* Wilson Summary */}
        <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-800 text-amber-400 font-bold flex items-center justify-center text-xs">
                WIL
              </span>
              <div>
                <h4 className="text-sm font-bold text-white">Wilson Airport (Safari Bush Hub)</h4>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                  Bush Charters &amp; Scenic Flights
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
              VFR CAVOK
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-stone-900 border border-stone-800/80 text-center text-xs">
            <div>
              <span className="text-[10px] text-stone-500 uppercase block">Weather</span>
              <span className="font-bold text-white">{AIRPORT_SUMMARIES.Wilson.tempC}°C</span>
              <span className="text-[10px] text-emerald-400 block">080/08kt</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 uppercase block">Airstrip Access</span>
              <span className="font-bold text-amber-400">100% Open</span>
              <span className="text-[10px] text-stone-400 block">Mara, Amboseli</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 uppercase block">Bush Flights</span>
              <span className="font-bold text-emerald-400">{AIRPORT_SUMMARIES.Wilson.activeMovementsCount}</span>
              <span className="text-[10px] text-stone-400 block">Cessna/Dash-8</span>
            </div>
          </div>

          <div className="text-[11px] text-stone-400 flex items-center justify-between">
            <span>Safarilink, AirKenya, Governors Hangars</span>
            <span className="text-stone-500 font-mono text-[10px]">HKNW METAR Verified</span>
          </div>
        </div>
      </div>

      {/* 3. Inter-Airport Transfer & Connection Feasibility Calculator */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border border-amber-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold text-white">
              JKIA International ➔ Wilson Safari Bush Transfer Calculator
            </h4>
          </div>
          <span className="text-[10px] text-amber-400 font-mono uppercase">
            VIP Chauffeur Link • Nairobi Expressway
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div>
            <label className="block text-[10px] text-stone-400 uppercase font-semibold mb-1">
              Inbound International Flight (JKIA)
            </label>
            <select
              value={selectedArrivalFlightId}
              onChange={(e) => setSelectedArrivalFlightId(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
            >
              {flights
                .filter((f) => f.airport === 'JKIA' && f.direction === 'arrival')
                .map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.scheduledTime} — {f.flightNumber} ({f.originOrDestinationCode}) {f.airline}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-stone-400 uppercase font-semibold mb-1">
              Outbound Safari Bush Flight (Wilson)
            </label>
            <select
              value={selectedDepartureFlightId}
              onChange={(e) => setSelectedDepartureFlightId(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
            >
              {flights
                .filter((f) => f.airport === 'Wilson' && f.direction === 'departure')
                .map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.scheduledTime} — {f.flightNumber} ({f.originOrDestinationCity.split(' ')[0]}) {f.airline}
                  </option>
                ))}
            </select>
          </div>

          <div className="sm:col-span-2 lg:col-span-1 flex flex-col justify-end">
            {connectionAnalysis && (
              <div
                className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                  connectionAnalysis.status === 'Comfortable'
                    ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-300'
                    : connectionAnalysis.status === 'Tight'
                    ? 'bg-amber-950/40 border-amber-800/80 text-amber-300'
                    : 'bg-red-950/40 border-red-800/80 text-red-300'
                }`}
              >
                <div>
                  <span className="font-bold block">
                    {connectionAnalysis.status}: {connectionAnalysis.bufferMinutes}m Window
                  </span>
                  <span className="text-[10px] opacity-80 block">
                    {connectionAnalysis.isFeasible ? 'Safe connection' : 'Transfer risk'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (arrivingFlight) {
                      setChauffeurAssignedFlightId(arrivingFlight.id);
                      onAssignChauffeur?.(arrivingFlight.flightNumber, arrivingFlight.guestPartyName);
                      setTimeout(() => setChauffeurAssignedFlightId(null), 3000);
                    }
                  }}
                  className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-100 border border-stone-700 text-[11px] font-semibold transition-colors"
                >
                  {chauffeurAssignedFlightId === arrivingFlight?.id ? 'Dispatched!' : 'Assign VIP Transfer'}
                </button>
              </div>
            )}
          </div>
        </div>

        {connectionAnalysis && (
          <p className="text-[11px] text-stone-400 italic">
            &quot;{connectionAnalysis.explanation}&quot;
          </p>
        )}
      </div>

      {/* 4. Filter Toolbar */}
      <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-3">
        <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
          {/* Airport Selector */}
          <div className="flex items-center gap-1.5 bg-stone-900 p-1 rounded-xl border border-stone-800 text-xs shrink-0">
            {(['ALL', 'JKIA', 'Wilson'] as const).map((ap) => (
              <button
                key={ap}
                type="button"
                onClick={() => setAirportFilter(ap)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  airportFilter === ap
                    ? 'bg-amber-500 text-stone-950 shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {ap === 'ALL' ? 'All Airports' : ap === 'JKIA' ? 'JKIA (NBO)' : 'Wilson (WIL)'}
              </button>
            ))}
          </div>

          {/* Direction Selector */}
          <div className="flex items-center gap-1.5 bg-stone-900 p-1 rounded-xl border border-stone-800 text-xs shrink-0">
            {(['ALL', 'arrival', 'departure'] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => setDirectionFilter(dir)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                  directionFilter === dir
                    ? 'bg-stone-100 text-stone-950 shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {dir === 'arrival' && <PlaneLanding className="w-3.5 h-3.5 text-sky-500" />}
                {dir === 'departure' && <PlaneTakeoff className="w-3.5 h-3.5 text-amber-500" />}
                <span>
                  {dir === 'ALL' ? 'All Movements' : dir === 'arrival' ? 'Arrivals' : 'Departures'}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search flight #, airline, destination or guest..."
              className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>

      {/* 5. Flight Connection Board Table */}
      <div className="bg-stone-950 rounded-2xl border border-stone-800 p-5 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-stone-800">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Active Flight Movements ({filteredFlights.length})</span>
          </h4>
          <span className="text-[11px] text-stone-400">
            Times in East Africa Time (EAT / UTC+3)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-800 text-stone-400 uppercase font-semibold">
                <th className="pb-3">Flight / Airline</th>
                <th className="pb-3">Hub</th>
                <th className="pb-3">Route (Origin / Dest)</th>
                <th className="pb-3">Sched / Est</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Gate / Belt</th>
                <th className="pb-3">Aircraft</th>
                <th className="pb-3 text-right">Logistics Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {filteredFlights.map((flight) => (
                <tr key={flight.id} className="text-stone-300 hover:bg-stone-900/40 transition-colors">
                  {/* Flight # & Airline */}
                  <td className="py-3.5 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-amber-400 text-xs">
                        {flight.flightNumber}
                      </span>
                      <span className="text-stone-400 text-[11px] block">{flight.airline}</span>
                    </div>
                  </td>

                  {/* Airport Hub */}
                  <td className="py-3.5 pr-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        flight.airport === 'JKIA'
                          ? 'bg-sky-950 text-sky-400 border border-sky-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {flight.airportCode} ({flight.airport})
                    </span>
                  </td>

                  {/* Route */}
                  <td className="py-3.5 pr-2">
                    <div className="flex items-center gap-1.5">
                      {flight.direction === 'arrival' ? (
                        <PlaneLanding className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      ) : (
                        <PlaneTakeoff className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      )}
                      <div>
                        <span className="text-white font-medium block">
                          {flight.originOrDestinationCity}
                        </span>
                        <span className="text-[10px] text-stone-500 uppercase">
                          {flight.direction === 'arrival' ? 'Inbound' : 'Outbound'}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Sched / Est Time */}
                  <td className="py-3.5 pr-2">
                    <div className="font-mono">
                      <span className="text-white font-bold block">{flight.scheduledTime}</span>
                      <span className="text-[10px] text-stone-500">Est: {flight.estimatedTime}</span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 pr-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        flight.status === 'Landed' || flight.status === 'Departed'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : flight.status === 'Approaching' || flight.status === 'Boarding'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800 animate-pulse'
                          : flight.status === 'Delayed'
                          ? 'bg-red-950 text-red-400 border border-red-800'
                          : 'bg-stone-800 text-stone-300'
                      }`}
                    >
                      {flight.status}
                    </span>
                  </td>

                  {/* Terminal & Gate / Baggage Belt */}
                  <td className="py-3.5 pr-2 text-stone-400 text-[11px]">
                    <span className="text-stone-200 block">{flight.terminalOrApron}</span>
                    {flight.gateOrHangar && <span>{flight.gateOrHangar}</span>}
                    {flight.baggageBelt && (
                      <span className="text-amber-400 block font-mono text-[10px]">
                        {flight.baggageBelt}
                      </span>
                    )}
                  </td>

                  {/* Aircraft */}
                  <td className="py-3.5 pr-2 text-stone-400 text-[11px]">
                    <span className="block truncate max-w-[140px]" title={flight.aircraftType}>
                      {flight.aircraftType}
                    </span>
                  </td>

                  {/* Logistics Note */}
                  <td className="py-3.5 text-right">
                    {flight.safariConnectionNote ? (
                      <div className="max-w-xs ml-auto text-left">
                        <span className="text-[11px] text-amber-200/90 font-light block line-clamp-2">
                          {flight.safariConnectionNote}
                        </span>
                        {flight.guestPartyName && (
                          <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">
                            Guest: {flight.guestPartyName}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-stone-500 text-[10px]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
