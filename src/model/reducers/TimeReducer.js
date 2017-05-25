import { Time } from '../../Constants.js';

const TimeReducer = (state, action) => {
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

function createTimeUpdate(oldMillis, newMillis) {
  return { oldMillis: oldMillis, newMillis: newMillis }
}

function updateTimeMillis(stateTime, newMillis) {
  return { ...stateTime, millis: newMillis };
}

function updateAirplanesInFlight(state, timeUpdate) {
  let newAirplanesInFlight =
    updateDistanceRemaining(
      state.airplanesInFlight,
      timeUpdate.newMillis - timeUpdate.oldMillis);
  let newFlights = getNewFlightsFromSchedule(state.schedules, timeUpdate);
  Array.prototype.push.apply(
    newAirplanesInFlight,
    launchFlightsById(state, newFlights));
  return newAirplanesInFlight;
}

function launchFlightsById(state, flightIds) {
  return flightIds.map((flightId) => {
    return {
      flight: findFlightById(state.flights, flightId),
      distanceRemainingM: 1000 * 1000,
      speedMps: 150
    }
  });
}

function findFlightById(flights, flightId) {
  return flights.find((flight) => (flightId === `${flight.airlineIataCode}${flight.flightNumber}`));
}

function getNewFlightsFromSchedule(schedules, timeUpdate) {
  return schedules.filter((schedule) => (
    deltaMinutesToSchedule(schedule, timeUpdate.oldMillis) <
    deltaMinutesToSchedule(schedule, timeUpdate.newMillis))
  ).map((schedule) => (schedule.flightId));
}

function deltaMinutesToSchedule(schedule, millis) {
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

function updateDistanceRemaining(airplanesInFlight, millisDelta) {
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

function updateTimeTick(stateTime, nextTick) {
  return { ...stateTime, tick: nextTick };
}

function getNextTick(currentTick) {
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
