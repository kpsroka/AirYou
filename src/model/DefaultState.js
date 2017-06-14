/* @flow */

import { Time } from '../Constants.js';
import {
  type State, type StateFlight, type StateTime,
  CreateFlightFn, CreateFlightScheduleFn, CreateRouteFn } from './State.js';

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
        "AY", "33", "E901",
        CreateRouteFn("MCI", "ATL"),
        CreateFlightScheduleFn(now.getHours() + 4, now.getMinutes() + 45)),
    CreateFlightFn(
        "AY", "101", "A210",
        CreateRouteFn("JFK", "ATL"),
        CreateFlightScheduleFn(now.getHours() + 2, 30)),
    CreateFlightFn(
        "AY", "3030", "B73",
        CreateRouteFn("JFK", "SFO"),
        CreateFlightScheduleFn(now.getHours() + 3, 0, [0, 1, 2, 3, 4])),
    CreateFlightFn(
        "AY", "9001", "A210",
        CreateRouteFn("SFO", "MCI"),
        CreateFlightScheduleFn(now.getHours() + 1, now.getMinutes())),
  ];
}

export default DefaultState;
