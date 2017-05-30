/* @flow */

import { Time } from '../Constants.js';

type State = {
 time:StateTime,
 airports:Array<StateAirport>,
 airplanesInFlight:Array<StateAirplaneInFlight>,
 flights:Array<StateFlight>,
 schedules:Array<StateSchedule>
}

type StateTime = {
 millis:number,
 tick:number
};

type StateAirport = {
  code:string,
  position:Position
};

type Position = {
 x:number,
 y:number
};

type StateAirplaneInFlight = {
 flight:StateFlight,
 distanceRemainingM:number,
 speedMps:number
};

type StateFlight = {
  airlineIataCode:string,
  flightNumber:string,
  departureAirportCode:string,
  arrivalAirportCode:string,
  distanceKm:number
};

type StateSchedule = {
  flightId:string,
  departureHours:number,
  departureMinutes:number,
  departureDaysOfWeek:Array<number>
};

const DefaultState:State = createDefaultState();

function createDefaultState():State {
  let airports = createAirports();
  return {
    time:createDefaultTime(),
    airports: airports,
    airplanesInFlight: [],
    flights: createFlights(),
    schedules: createSchedules()
  }
}

function createDefaultTime():StateTime {
  return {
    millis: Date.now(),
    tick: Time.SLOW_TICK_MILLIS
  }
}

function createAirports():Array<StateAirport> {
  return [
    createAirport("SFO", 3, 59),
    createAirport("LAX", 8, 42),
    createAirport("PDX", 7, 89),
    createAirport("SEA", 10, 95),
    createAirport("SLC", 22, 62),
    createAirport("PHX", 19, 37),
    createAirport("DEN", 33, 67),
    createAirport("MCI", 52, 53),
    createAirport("DFW", 48, 30),
    createAirport("MSP", 54, 74),
    createAirport("ORD", 63, 65),
    createAirport("DTW", 71, 67),
    createAirport("MEM", 63, 44),
    createAirport("ATL", 72, 35),
    createAirport("MIA", 82, 6),
    createAirport("CLT", 75, 42),
    createAirport("PIT", 77, 61),
    createAirport("IAD", 82, 58),
    createAirport("BOS", 91, 73),
    createAirport("JFK", 88, 66)
  ]
}

function createAirport(
    code:string="???",
    positionX:number=50,
    positionY:number=50)
    :StateAirport {
  return {
    code: code,
    position: {
      x: positionX,
      y: positionY
    },
  };
}

function createFlights():Array<StateFlight> {
  return [
    createFlight("AY", "9001", "SFO", "MCI", 1000),
    createFlight("BA", "101", "JFK", "ATL", 1000),
    createFlight("UA", "3030", "JFK", "SFO", 1000),
    createFlight("LH", "33", "MCI", "ATL", 1000)
  ]
}

function createFlight(
    airlineIataCode:number="AY",
    flightNumber:string="0000",
    departureAirportCode:string ="???",
    arrivalAirportCode:string ="???",
    distanceKm:number=1000)
    :StateFlight {
  return {
    airlineIataCode: airlineIataCode,
    flightNumber: flightNumber,
    departureAirportCode: departureAirportCode,
    arrivalAirportCode: arrivalAirportCode,
    distanceKm: distanceKm
  }
}

function createSchedules():Array<StateSchedule> {
  let now = new Date();

  return [
    createFlightSchedule("AY9001", now.getHours() + 1, now.getMinutes()),
    createFlightSchedule("BA101", now.getHours() + 3, 0)
  ];
}

function createFlightSchedule(
  flightId:string="",
  departureHours:number=0,
  departureMinutes:number=0,
  departureDaysOfWeek:Array<number>=[0, 1, 2, 3, 4, 5, 6])
  :StateSchedule {
  return {
    flightId: flightId,
    departureHours: departureHours,
    departureMinutes: departureMinutes,
    departureDaysOfWeek: departureDaysOfWeek
  }
}

export default DefaultState;
