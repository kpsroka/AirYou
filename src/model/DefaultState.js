/* @flow */

import type { Airport } from './Airports.js';
import { AIRPORTS } from './Airports.js';
import { Time } from '../Constants.js';
import type { State, StateAirportDetails, StateFlight, StatePassengerGroup, StateTime } from './State.js';
import { CreateFlightFn, CreateFlightScheduleFn, CreateRouteFn } from './State.js';

const DefaultState:State = createDefaultState();

function createDefaultState():State {
  return {
    time: createDefaultTime(),
    airplanesInFlight: [],
    flights: createFlights(),
    airportDetails: createDefaultAirportDetails(),
  }
}

function createDefaultTime():StateTime {
  return {
    millis: Date.now(),
    tick: Time.SLOW_TICK_MILLIS
  }
}

function createFlights():Array<StateFlight> {
  let now = new Date();

  return [
    CreateFlightFn(
        "101", "E901",
        CreateRouteFn("MCI", "ATL"),
        CreateFlightScheduleFn(now.getHours() + 4, now.getMinutes() + 45)),
    CreateFlightFn(
        "311", "A210",
        CreateRouteFn("JFK", "ATL"),
        CreateFlightScheduleFn(now.getHours() + 2, 30)),
    CreateFlightFn(
        "301", "B73",
        CreateRouteFn("JFK", "SFO"),
        CreateFlightScheduleFn(now.getHours() + 3, 0, [false, true, true, true, true, true, false])),
    CreateFlightFn(
        "901", "A210",
        CreateRouteFn("SFO", "MCI"),
        CreateFlightScheduleFn(now.getHours() + 1, now.getMinutes())),
  ];
}

function createDefaultAirportDetails():Array<StateAirportDetails> {
  return AIRPORTS.map((airport) => ({
    passengerDemand: createPassengerDemand(airport)
  }));
}

function createPassengerDemand(departureAirport:Airport):Array<StatePassengerGroup> {
  let passengerDemand:Array<StatePassengerGroup> = [];
  AIRPORTS.forEach((destinationAirport) => {
    if (destinationAirport !== departureAirport) {
      passengerDemand.push({
        departureAiportCode: departureAirport.code,
        destinationAirportCode: destinationAirport.code,
        count: Math.floor(Math.random() * (departureAirport.size + destinationAirport.size)),
      });
    }
  });
  return passengerDemand;
}

export default DefaultState;
