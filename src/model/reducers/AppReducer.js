/* @flow */

import AirplaneInFlightReducer from './AirplaneInFlightReducer.js';
import ScheduleReducer from './ScheduleReducer.js';
import TimeReducer from './TimeReducer.js';
import type { Action } from '../Actions.js';
import type { State } from '../State.js';

const AppReducer = (state:State, action:Action={type: "UNDEFINED"}):State => {
  let newState = TimeReducer(state, action);
  newState.flights = ScheduleReducer(newState.flights, action);
  newState.airplanesInFlight =
      AirplaneInFlightReducer(newState.airplanesInFlight, newState.flights, action);

  return newState;
};

export default AppReducer;
