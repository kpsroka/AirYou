let MINUTE_IN_MILLIS = 60000;
let SLOW_TICK = MINUTE_IN_MILLIS / 4;
let FAST_TICK = MINUTE_IN_MILLIS;

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
    case SLOW_TICK:
      return FAST_TICK;
    case FAST_TICK:
      return 0;
    case 0:
    default:
      return SLOW_TICK;
  }
}

export default TimeReducer;
