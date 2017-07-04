/* @flow */

import type { Action, NewFlightAction } from '../Actions.js';
import type { StateAirplaneInFlight, StateFlight } from '../State.js';
import { CreateAirplaneInFlightFn } from '../State.js';

const AirplaneInFlightReducer = (
    stateAirplanesInFlight:Array<StateAirplaneInFlight>,
    stateFlights:Array<StateFlight>,
    action:Action)
    :Array<StateAirplaneInFlight> => {
  switch (action.type) {
    case 'NEW_FLIGHT': {
      let newFlightAction = ((action: any): NewFlightAction);
      let flight = stateFlights[newFlightAction.payload];
      if (flight) {
        return [
          ...stateAirplanesInFlight,
          CreateAirplaneInFlightFn(flight)
        ];
      } else {
        return stateAirplanesInFlight;
      }
    }
    default:
      return stateAirplanesInFlight;
  }
};

export default AirplaneInFlightReducer;
