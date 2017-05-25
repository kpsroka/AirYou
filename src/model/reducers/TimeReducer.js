import { Time } from '../../Constants.js';

const TimeReducer = (stateTime, action) => {
  switch (action.type) {
    case 'TIME_TICK':
      let timeUpdate = createTimeUpdate(stateTime.millis, stateTime.millis + stateTime.tick);
      return applyTimeUpdate(stateTime, timeUpdate);
    case 'TIME_TICK_CHANGE':
      return { ...stateTime, tick: getNextTick(stateTime.tick) };
    default:
      return stateTime;
  }
};

function createTimeUpdate(oldMillis, newMillis) {
  return { oldMillis: oldMillis, newMillis: newMillis }
}

function applyTimeUpdate(stateTime, timeUpdate) {
  return { ...stateTime, millis: timeUpdate.newMillis };
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
