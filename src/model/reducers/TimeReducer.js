let MINUTE_IN_MILLIS = 60000;

const TimeReducer = (stateTime, action) => {
  switch (action.type) {
    case 'TIME_TICK':
      return { ...stateTime, millis: stateTime.millis + stateTime.tick }
    case 'TIME_TICK_CHANGE':
      return { ...stateTime, tick: getNextTick(stateTime.tick) }
    default:
      return stateTime
  }
};

function getNextTick(currentTick) {
  switch (currentTick) {
    case MINUTE_IN_MILLIS:
      return 5 * MINUTE_IN_MILLIS;
    case 5 * MINUTE_IN_MILLIS:
      return 0;
    case 0:
    default:
      return MINUTE_IN_MILLIS;
  }
}

export default TimeReducer;
