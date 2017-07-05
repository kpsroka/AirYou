import { connect } from 'react-redux';
import FieldOfPlay from './FieldOfPlay.js';
import { AIRPORTS } from '../../model/Airports.js';
import { distanceBetween } from '../../model/Position.js'

function mapStateToProps(state) {
  return {
    airplanesInFlight: state.airplanesInFlight.map((airplane) => {
      return {
        flightNumber: airplane.flightNumber,
        position: getAirplanePosition(airplane.route, airplane.distanceRemainingM),
        rotation: getAirplaneRotation(airplane.route)
      };
    })
  };
}

function getAirplanePosition(route, distanceRemainingM) {
  let departurePosition = findAirportPosition(route.departureAirportCode);
  let arrivalPosition = findAirportPosition(route.arrivalAirportCode);
  let progressPct = calculateFlightProgress(
      departurePosition,
      arrivalPosition,
      distanceRemainingM);

  return positionToXYCoords(departurePosition, arrivalPosition, progressPct);
}

function findAirportPosition(departureAirportCode) {
  return AIRPORTS.find((airport) => airport.code === departureAirportCode).position;
}

function calculateFlightProgress(departurePostion, arrivalPosition, distanceRemainingM) {
  let distanceM = distanceBetween(departurePostion, arrivalPosition) * 1000;
  return 100 - (100 * (distanceRemainingM / distanceM));
}

function positionToXYCoords(departurePosition, arrivalPosition, flightProgressPct) {
  return {
    x: departurePosition.x + (arrivalPosition.x - departurePosition.x) * (flightProgressPct / 100),
    y: departurePosition.y + (arrivalPosition.y - departurePosition.y) * (flightProgressPct / 100)
  }
}

function getAirplaneRotation(route) {
  let departurePosition = findAirportPosition(route.departureAirportCode);
  let arrivalPosition = findAirportPosition(route.arrivalAirportCode);
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
