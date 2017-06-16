/* @flow */

import { type Position, distanceBetween } from './Position.js';
import { type Airport, AIRPORTS } from './Airports.js';
import { type Airplane, AIRPLANES } from './Airplanes.js';

export type StateTime = {
  millis:number,
  tick:number
};

export type StateSchedule = {
  departureHours:number,
  departureMinutes:number,
  departureDaysOfWeek:Array<number>
};

export type StateRoute = {
  departureAirportCode:string,
  arrivalAirportCode:string,
  distanceKm:number
}

export type StateAirplaneInFlight = {
  flightNumber:string,
  airplane:string,
  route:StateRoute,
  distanceRemainingM:number,
  speedMps:number
};

export type StateFlight = {
  flightNumber:string,
  airplane:string,
  schedule:StateSchedule,
  route:StateRoute
};

export type State = {
  time:StateTime,
  airplanesInFlight:Array<StateAirplaneInFlight>,
  flights:Array<StateFlight>
}

export const CreateRouteFn = (
    departureAirportCode:string,
    arrivalAirportCode:string)
    :StateRoute => {
  return {
    departureAirportCode: departureAirportCode,
    arrivalAirportCode: arrivalAirportCode,
    distanceKm: distanceBetween(
        getAirportPosition(departureAirportCode),
        getAirportPosition(arrivalAirportCode)),
  }
};

export const CreateFlightFn = (
    flightNumber:string,
    airplane:string,
    route:StateRoute,
    schedule:StateSchedule)
    :StateFlight => {
  return {
    flightNumber: flightNumber,
    airplane: airplane,
    route: route,
    schedule: schedule
  }
};

function getAirportPosition(airportCode:string):Position {
  let maybeAirport:?Airport = AIRPORTS.find((airport) => (airport.code === airportCode));
  return maybeAirport ? maybeAirport.position : { x: 0, y: 0 };
}

export const CreateFlightScheduleFn = (
    departureHours:number = 0,
    departureMinutes:number = 0,
    departureDaysOfWeek:Array<number> = [0, 1, 2, 3, 4, 5, 6])
    :StateSchedule => {
  return {
    departureHours: departureHours % 24,
    departureMinutes: departureMinutes % 60,
    departureDaysOfWeek: departureDaysOfWeek
  };
};

function getAirplaneSpeedMps(airplaneShortName:string):number {
  let airplane:?Airplane = AIRPLANES.find((plane) => (plane.shortName === airplaneShortName));
  if (airplane) {
    return airplane.speedKmph / 3.6;
  } else {
    return 250;
  }
}

export const CreateAirplaneInFlightFn = (flight:StateFlight):StateAirplaneInFlight => {
  return {
    flightNumber: flight.flightNumber,
    airplane: flight.airplane,
    route: flight.route,
    distanceRemainingM: flight.route.distanceKm * 1000,
    speedMps: getAirplaneSpeedMps(flight.airplane),
  };
};
