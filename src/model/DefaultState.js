/* @flow */

import { Time } from '../Constants.js';
import {
  type State, type StateFlight, type StateTime,
  CreateFlightFn, CreateFlightScheduleFn } from './State.js';

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
        "AY", "9001", "SFO", "MCI", 1000,
        CreateFlightScheduleFn("AY9001", now.getHours() + 1, now.getMinutes())),
    CreateFlightFn(
        "BA", "101", "JFK", "ATL", 1000,
        CreateFlightScheduleFn("BA101", now.getHours() + 2, 30)),
    CreateFlightFn(
        "UA", "3030", "JFK", "SFO", 1000,
        CreateFlightScheduleFn("UA3030", now.getHours() + 3, 0, [0,1,2,3,4])),
    CreateFlightFn(
        "LH", "33", "MCI", "ATL", 1000,
        CreateFlightScheduleFn("LH33", now.getHours() + 4, now.getMinutes() + 45))
  ];
}

export default DefaultState;
