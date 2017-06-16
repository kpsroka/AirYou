/* @flow */

import { type Action, type NewFlightAction } from '../Actions.js';
import { type StateAirplaneInFlight, type StateFlight,
  CreateAirplaneInFlightFn } from '../State.js';

const AirplaneInFlightReducer = (
    stateAirplanesInFlight:Array<StateAirplaneInFlight>,
    stateFlights:Array<StateFlight>,
    action:Action)
    :Array<StateAirplaneInFlight> => {
  switch (action.type) {
    case 'NEW_FLIGHT': {
      let newFlightAction = ((action: any): NewFlightAction);
      let flight = stateFlights.find((flight) => (flight.flightCode === newFlightAction.payload));
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
