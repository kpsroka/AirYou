import { Time } from '../../Constants.js';

const TimeReducer = (state, action) => {
  switch (action.type) {
    case 'TIME_TICK':
      let timeUpdate = createTimeUpdate(state.time.millis, state.time.millis + state.time.tick);
      return updateTimeMillis(state, timeUpdate);
    case 'TIME_TICK_CHANGE':
      return updateTimeTick(state);
    default:
      return state;
  }
};

function createTimeUpdate(oldMillis, newMillis) {
  return { oldMillis: oldMillis, newMillis: newMillis }
}

function updateTimeMillis(state, timeUpdate){
  return { ...state, time: updateMillis(state.time, timeUpdate.newMillis)}
}

function updateMillis(stateTime, newMillis) {
  return { ...stateTime, millis: newMillis };
}

function updateTimeTick(state) {
  return { ...state, time: updateTick(state.time, getNextTick(state.time.tick)) };
}

function updateTick(stateTime, nextTick) {
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
