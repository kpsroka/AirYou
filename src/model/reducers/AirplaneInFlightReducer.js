/* @flow */

import { type Action, type NewFlightAction } from '../Actions.js';
import { type StateAirplaneInFlight } from '../State.js';

const AirplaneInFlightReducer = (
    stateAirplanesInFlight:Array<StateAirplaneInFlight>,
    action:Action)
    :Array<StateAirplaneInFlight> => {
  switch (action.type) {
    case 'NEW_FLIGHT': {
      let newFlightAction = ((action: any): NewFlightAction);
      return [
        ...stateAirplanesInFlight,
        {
          flight: newFlightAction.payload,
          flightCode: newFlightAction.payload.flightId,
          distanceRemainingM: newFlightAction.payload.distanceKm * 1000,
          speedMps: 150
        }
      ];
    }
    default:
      return stateAirplanesInFlight;
  }
};

export default AirplaneInFlightReducer;
