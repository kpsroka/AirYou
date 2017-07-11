/* @flow */

import { Time } from '../Constants.js';
import type { State, StateFlight, StateTime } from './State.js';
import { CreateFlightFn, CreateFlightScheduleFn, CreateRouteFn } from './State.js';

const DefaultState:State = createDefaultState();

function createDefaultState():State {
  return {
    time: createDefaultTime(),
    airplanesInFlight: [],
    flights: createFlights()
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

export default DefaultState;
