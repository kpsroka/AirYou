/* @flow */

import { type Action, type NewFlightAction } from '../Actions.js';
import { type StateAirplaneInFlight, type StateFlight } from '../State.js';
import { getAirplaneSpeedMps } from '../Airplanes.js';

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
          {
            flightCode: flight.flightCode,
            flightNumber: flight.flightNumber,
            airplane: flight.airplane,
            route: flight.route,
            distanceRemainingM: flight.route.distanceKm * 1000,
            speedMps: getAirplaneSpeedMps(flight.airplane)
          }
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
