const TimeReducer = (stateTime, action) => {
  switch (action.type) {
    case 'TIME_TICK':
      return { ...stateTime, millis: stateTime.millis + stateTime.tick }
    default:
      return stateTime
  }
};

export default TimeReducer;
