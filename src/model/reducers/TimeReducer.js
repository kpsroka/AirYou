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
  return updateDistanceRemaining(
      state.airplanesInFlight,
      timeUpdate.newMillis - timeUpdate.oldMillis);
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
