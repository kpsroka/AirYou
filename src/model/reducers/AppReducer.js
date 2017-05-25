import TimeReducer from './TimeReducer.js';
import AirplaneInFlightReducer from './AirplaneInFlightReducer.js';

const AppReducer = (state, action={}) => {
  let newState = TimeReducer(state, action);
  newState.airplanesInFlight = AirplaneInFlightReducer(newState.airplanesInFlight, action);

  return newState;
};

export default AppReducer;
