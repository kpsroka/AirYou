/* @flow */

import type { Position } from './Position.js';
import { distanceBetween } from './Position.js';
import type { Airport } from './Airports.js';
import { AIRPORTS } from './Airports.js';
import { AIRPLANES } from './Airplanes.js';

export type StateTime = {
  millis:number,
  tick:number
};

export type StateClockTime = {
  hours:number,
  minutes:number
}

export type StateSchedule = {
  departureTime:StateClockTime,
  departureDaysOfWeek:Array<boolean>
};

export type StateRoute = {
  departureAirportCode:string,
  arrivalAirportCode:string,
}

export type StateAirplaneInFlight = {
  flightNumber:string,
  airplaneIndex:number,
  route:StateRoute,
  distanceRemainingM:number,
  speedMps:number
};

export type StateFlight = {
  flightNumber:string,
  airplaneIndex:number,
  schedule:StateSchedule,
  route:StateRoute
};

export type StatePassengerGroup = {
  departureAiportCode:string,
  destinationAirportCode:string,
  count:number,
}

export type StateAirportDetails = {
  airportCode:string,
  passengerDemand:Array<StatePassengerGroup>
}

export type State = {
  time:StateTime,
  airplanesInFlight:Array<StateAirplaneInFlight>,
  flights:Array<StateFlight>,
  airportDetails:Array<StateAirportDetails>
}

export const CreateRouteFn = (
    departureAirportCode:string,
    arrivalAirportCode:string)
    :StateRoute => {
  return {
    departureAirportCode: departureAirportCode,
    arrivalAirportCode: arrivalAirportCode,
  }
};

export const CreateFlightFn = (
    flightNumber:string,
    airplaneShortName:string,
    route:StateRoute,
    schedule:StateSchedule)
    :StateFlight => {
  return {
    flightNumber: flightNumber,
    airplaneIndex: AIRPLANES.findIndex(airplane => airplane.shortName === airplaneShortName),
    route: route,
    schedule: schedule
  }
};

export const CreateFlightScheduleFn = (
    departureHours:number = 0,
    departureMinutes:number = 0,
    departureDaysOfWeek:Array<boolean> = [true, true, true, true, true, true, true])
    :StateSchedule => {
  return {
    departureTime: {
      hours: departureHours % 24,
      minutes: departureMinutes % 60
    },
    departureDaysOfWeek: departureDaysOfWeek
  };
};

function getAirplaneSpeedMps(airplaneIndex:number):number {
  return AIRPLANES[airplaneIndex].speedKmph / 3.6;
}

function getAirportPosition(airportCode:string):Position {
  let maybeAirport:?Airport = AIRPORTS.find((airport) => (airport.code === airportCode));
  return maybeAirport ? maybeAirport.position : { x: 0, y: 0 };
}

function getRouteDistance(route) {
  return distanceBetween(
      getAirportPosition(route.departureAirportCode),
      getAirportPosition(route.arrivalAirportCode));
}

export const CreateAirplaneInFlightFn = (flight:StateFlight):StateAirplaneInFlight => {
  return {
    flightNumber: flight.flightNumber,
    airplaneIndex: flight.airplaneIndex,
    route: flight.route,
    distanceRemainingM: getRouteDistance(flight.route) * 1000,
    speedMps: getAirplaneSpeedMps(flight.airplaneIndex),
  };
};
