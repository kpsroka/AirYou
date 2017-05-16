import { Time } from '../../Constants.js';

const TimeReducer = (stateTime, action) => {
  switch (action.type) {
    case 'TIME_TICK':
      return { ...stateTime, millis: stateTime.millis + stateTime.tick };
    case 'TIME_TICK_CHANGE':
      return { ...stateTime, tick: getNextTick(stateTime.tick) };
    default:
      return stateTime;
  }
};

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
