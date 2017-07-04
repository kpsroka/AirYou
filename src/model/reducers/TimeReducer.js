/* @flow */

import { Time } from '../../Constants.js';
import type { Action } from '../Actions.js';
import type { State, StateAirplaneInFlight, StateFlight, StateSchedule, StateTime } from '../State.js';
import { CreateAirplaneInFlightFn } from '../State.js';

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
  Array.prototype.push.apply(
    newAirplanesInFlight,
    launchFlightsByIndices(state, getNewFlightsFromSchedule(state.flights, timeUpdate)));
  return newAirplanesInFlight;
}

function launchFlightsByIndices(
    state:State,
    flightIndices:Array<number>)
    :Array<StateAirplaneInFlight> {
  let newFlights:Array<?StateAirplaneInFlight> = flightIndices.map((flightIndex) => {
    let maybeFlight:?StateFlight = state.flights[flightIndex];
    if (maybeFlight) {
      return CreateAirplaneInFlightFn(maybeFlight);
    } else {
      return null;
    }
  });

  return newFlights.filter(Boolean);
}

function getNewFlightsFromSchedule(
    schedules:Array<StateFlight>,
    timeUpdate:TimeUpdate)
    :Array<number> {
  return schedules.map((flight, flightIndex) => {
        if (
            deltaMinutesToSchedule(flight.schedule, timeUpdate.oldMillis) <
            deltaMinutesToSchedule(flight.schedule, timeUpdate.newMillis)) {
          return flightIndex;
        } else {
          return NaN;
        }
      }
  ).filter(item => !Number.isNaN(item));
}

function deltaMinutesToSchedule(
    schedule:StateSchedule,
    millis:number)
    :number {
  let delta = 0;
  let date = new Date(millis);

  delta += (schedule.departureTime.hours - date.getHours()) * 60;
  delta += (schedule.departureTime.minutes - date.getMinutes());

  while (delta < 0 || !schedule.departureDaysOfWeek[date.getDay()]) {
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
