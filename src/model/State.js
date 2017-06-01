/* @flow */

import { type Position, distanceBetween } from './Position.js';
import { AIRPORTS } from './Airports.js';

export type State = {
  time:StateTime,
  airplanesInFlight:Array<StateAirplaneInFlight>,
  flights:Array<StateFlight>
}

export type StateTime = {
  millis:number,
  tick:number
};

export type StateAirplaneInFlight = {
  flight:StateFlight,
  distanceRemainingM:number,
  speedMps:number
};

export type StateFlight = {
  flightId:string,
  departureAirportCode:string,
  arrivalAirportCode:string,
  distanceKm:number,
  schedule:StateSchedule
};

export type StateSchedule = {
  flightId:string,
  departureHours:number,
  departureMinutes:number,
  departureDaysOfWeek:Array<number>
};

export const CreateFlightFn = (
    airlineIataCode:string,
    flightNumber:string,
    departureAirportCode:string,
    arrivalAirportCode:string,
    schedule:StateSchedule)
    :StateFlight => {
  return {
    flightId: airlineIataCode + flightNumber,
    departureAirportCode: departureAirportCode,
    arrivalAirportCode: arrivalAirportCode,
    distanceKm:
        distanceBetween(
            getAirportPosition(departureAirportCode),
            getAirportPosition(arrivalAirportCode)),
    schedule: schedule
  }
};

function getAirportPosition(airportCode:string):Position {
  return AIRPORTS.find((airport) => (airport.code === airportCode)).position;
}

export const CreateFlightScheduleFn = (
    flightId:string="",
    departureHours:number=0,
    departureMinutes:number=0,
    departureDaysOfWeek:Array<number>=[0, 1, 2, 3, 4, 5, 6])
    :StateSchedule => {
  return {
    flightId: flightId,
    departureHours: departureHours % 24,
    departureMinutes: departureMinutes % 60,
    departureDaysOfWeek: departureDaysOfWeek
  }
};
