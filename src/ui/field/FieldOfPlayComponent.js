import { connect } from 'react-redux';
import FieldOfPlay from './FieldOfPlay.js';
import { AIRPORTS } from '../../model/Airports.js';

function mapStateToProps(state) {
  return {
    airplanesInFlight: state.airplanesInFlight.map((airplane) => {
      let flight = state.flights.find((flight) => (flight.flightId === airplane.flightCode));
      return {
        flightCode: airplane.flightCode,
        position: getAirplanePosition(flight, airplane.distanceRemainingM),
        rotation: getAirplaneRotation(flight)
      };
    })
  };
}

function getAirplanePosition(flight, distanceRemainingM) {
  let departurePosition = findAirportPosition(flight.departureAirportCode);
  let arrivalPosition = findAirportPosition(flight.arrivalAirportCode);
  let progressPct = calculateFlightProgress(flight.distanceKm, distanceRemainingM);

  return positionToXYCoords(departurePosition, arrivalPosition, progressPct);
}

function findAirportPosition(departureAirportCode) {
  return AIRPORTS.find((airport) => airport.code === departureAirportCode).position;
}

function calculateFlightProgress(distanceKm, distanceRemainingM) {
  return 100 - (100 * ((distanceRemainingM) / (distanceKm * 1000)));
}

function positionToXYCoords(departurePosition, arrivalPosition, flightProgressPct) {
  return {
    x: departurePosition.x + (arrivalPosition.x - departurePosition.x) * (flightProgressPct / 100),
    y: departurePosition.y + (arrivalPosition.y - departurePosition.y) * (flightProgressPct / 100)
  }
}

function getAirplaneRotation(flight) {
  let departurePosition = findAirportPosition(flight.departureAirportCode);
  let arrivalPosition = findAirportPosition(flight.arrivalAirportCode);
  return positionToRotation(departurePosition, arrivalPosition);
}

function positionToRotation(departurePosition, arrivalPosition) {
  return -1 *
      Math.atan2(arrivalPosition.y - departurePosition.y, arrivalPosition.x - departurePosition.x) *
      180 /
      Math.PI;
}

const FieldOfPlayComponent = connect(mapStateToProps)(FieldOfPlay);

export default FieldOfPlayComponent;
