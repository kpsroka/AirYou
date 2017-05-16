import TimeReducer from './TimeReducer.js';
import AirplaneInFlightReducer from './AirplaneInFlightReducer.js';

const AppReducer = (state, action={}) => {
  let newTime = TimeReducer(state.time, action);
  let newAirplanesInFlight =
    AirplaneInFlightReducer(state.airplanesInFlight, state.time.millis, newTime.millis, action);

  return Object.assign(
    {}, state,
    { time: newTime },
    { airplanesInFlight: newAirplanesInFlight }
  )
};

export default AppReducer;
