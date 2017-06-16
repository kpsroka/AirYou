/* @flow */

import { Time } from '../../Constants.js';
import { type Action } from '../Actions.js';
import {
  CreateAirplaneInFlightFn,
  type State, type StateAirplaneInFlight, type StateFlight, type StateSchedule,
  type StateTime } from '../State.js';

type TimeUpdate = {
  oldMillis:number,
  newMillis:number
};

const TimeReducer = (state:State, action:Action):State => {
  switch (action.type) {
    case 'TIME_TICK':
      let timeUpdate = createTimeUpdate(state.time.millis, state.time.millis + state.time.tick);
      return {
        ...state,
        time: updateTimeMillis(state.time, timeUpdate.newMillis),
        airplanesInFlight: updateAirplanesInFlight(state, timeUpdate)
      };
    case 'TIME_TICK_CHANGE':
      return {...state, time: updateTimeTick(state.time, getNextTick(state.time.tick))};
    default:
      return state;
  }
};

function createTimeUpdate(
    oldMillis:number,
    newMillis:number)
    :TimeUpdate {
  return { oldMillis: oldMillis, newMillis: newMillis }
}

function updateTimeMillis(
    stateTime:StateTime,
    newMillis:number)
    :StateTime {
  return { ...stateTime, millis: newMillis };
}

function updateAirplanesInFlight(
    state:State,
    timeUpdate:TimeUpdate)
    :Array<StateAirplaneInFlight> {
  let newAirplanesInFlight =
    updateDistanceRemaining(
      state.airplanesInFlight,
      timeUpdate.newMillis - timeUpdate.oldMillis);
  let newFlights = getNewFlightsFromSchedule(state.flights, timeUpdate);
  Array.prototype.push.apply(
    newAirplanesInFlight,
    launchFlightsByCodes(state, newFlights));
  return newAirplanesInFlight;
}

function launchFlightsByCodes(
    state:State,
    flightCodes:Array<string>)
    :Array<StateAirplaneInFlight> {
  let newFlights:Array<?StateAirplaneInFlight> = flightCodes.map((flightId) => {
    let maybeFlight:?StateFlight = findFlightByCode(state.flights, flightId);
    if (maybeFlight != null) {
      return CreateAirplaneInFlightFn(maybeFlight);
    } else {
      return null;
    }
  });

  return newFlights.filter(Boolean);
}

function findFlightByCode(
    flights:Array<StateFlight>,
    flightCode:string)
    :?StateFlight {
  return flights.find((flight) => (flight && flightCode === flight.flightCode));
}

function getNewFlightsFromSchedule(
    schedules:Array<StateFlight>,
    timeUpdate:TimeUpdate)
    :Array<string> {
  return schedules.filter((flight) => (
    deltaMinutesToSchedule(flight.schedule, timeUpdate.oldMillis) <
    deltaMinutesToSchedule(flight.schedule, timeUpdate.newMillis))
  ).map((schedule) => (schedule.flightCode));
}

function deltaMinutesToSchedule(
    schedule:StateSchedule,
    millis:number)
    :number {
  let delta = 0;
  let date = new Date(millis);

  delta += (schedule.departureHours - date.getHours()) * 60;
  delta += (schedule.departureMinutes - date.getMinutes());

  while (delta < 0 || schedule.departureDaysOfWeek.indexOf(date.getDay()) === -1) {
    delta += 24 * 60;
    date.setDate(date.getDate() + 1);
  }

  return delta;
}

function updateDistanceRemaining(
    airplanesInFlight:Array<StateAirplaneInFlight>,
    millisDelta:number)
    :Array<StateAirplaneInFlight> {
  return airplanesInFlight
    .map((airplaneInFlight) => {
      let newDistanceRemaining =
        airplaneInFlight.distanceRemainingM - (airplaneInFlight.speedMps * millisDelta) / 1000;
      return {
        ...airplaneInFlight,
        distanceRemainingM: newDistanceRemaining,
      }
    }).filter((airplaneInFlight) => airplaneInFlight.distanceRemainingM > 0);
}

function updateTimeTick(
    stateTime:StateTime,
    nextTick:number)
    :StateTime {
  return { ...stateTime, tick: nextTick };
}

function getNextTick(currentTick:number):number {
  switch (currentTick) {
    case Time.SLOW_TICK_MILLIS:
      return Time.FAST_TICK_MILLIS;
    case Time.FAST_TICK_MILLIS:
      return 0;
    case 0:
    default:
      return Time.SLOW_TICK_MILLIS;
  }
}

export default TimeReducer;
