/* @flow */

import { Time } from '../Constants.js';
import {
  type State, type StateAirport, type StateFlight, type StateSchedule, type StateTime,
  CreateAirportFn, CreateFlightFn, CreateFlightScheduleFn } from './State.js';

const DefaultState:State = createDefaultState();

function createDefaultState():State {
  let airports = CreateAirportFns();
  return {
    time: createDefaultTime(),
    airports: airports,
    airplanesInFlight: [],
    flights: createFlights(),
    schedules: createSchedules()
  }
}

function createDefaultTime():StateTime {
  return {
    millis: Date.now(),
    tick: Time.SLOW_TICK_MILLIS
  }
}

function CreateAirportFns():Array<StateAirport> {
  return [
    CreateAirportFn("SFO", 3, 59),
    CreateAirportFn("LAX", 8, 42),
    CreateAirportFn("PDX", 7, 89),
    CreateAirportFn("SEA", 10, 95),
    CreateAirportFn("SLC", 22, 62),
    CreateAirportFn("PHX", 19, 37),
    CreateAirportFn("DEN", 33, 67),
    CreateAirportFn("MCI", 52, 53),
    CreateAirportFn("DFW", 48, 30),
    CreateAirportFn("MSP", 54, 74),
    CreateAirportFn("ORD", 63, 65),
    CreateAirportFn("DTW", 71, 67),
    CreateAirportFn("MEM", 63, 44),
    CreateAirportFn("ATL", 72, 35),
    CreateAirportFn("MIA", 82, 6),
    CreateAirportFn("CLT", 75, 42),
    CreateAirportFn("PIT", 77, 61),
    CreateAirportFn("IAD", 82, 58),
    CreateAirportFn("BOS", 91, 73),
    CreateAirportFn("JFK", 88, 66)
  ]
}

function createFlights():Array<StateFlight> {
  return [
    CreateFlightFn("AY", "9001", "SFO", "MCI", 1000),
    CreateFlightFn("BA", "101", "JFK", "ATL", 1000),
    CreateFlightFn("UA", "3030", "JFK", "SFO", 1000),
    CreateFlightFn("LH", "33", "MCI", "ATL", 1000)
  ]
}

function createSchedules():Array<StateSchedule> {
  let now = new Date();

  return [
    CreateFlightScheduleFn("AY9001", now.getHours() + 1, now.getMinutes()),
    CreateFlightScheduleFn("BA101", now.getHours() + 3, 0)
  ];
}

export default DefaultState;
