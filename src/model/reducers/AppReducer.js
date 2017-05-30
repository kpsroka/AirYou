/* @flow */

import TimeReducer from './TimeReducer.js';
import AirplaneInFlightReducer from './AirplaneInFlightReducer.js';
import { type Action } from '../Actions.js';
import { type State } from '../State.js';

const AppReducer = (state:State, action:Action={type: "UNDEFINED"}):State => {
  let newState = TimeReducer(state, action);
  newState.airplanesInFlight = AirplaneInFlightReducer(newState.airplanesInFlight, action);

  return newState;
};

export default AppReducer;
