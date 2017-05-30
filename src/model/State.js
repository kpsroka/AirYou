/* @flow */

export type State = {
  time:StateTime,
  airports:Array<StateAirport>,
  airplanesInFlight:Array<StateAirplaneInFlight>,
  flights:Array<StateFlight>,
  schedules:Array<StateSchedule>
}

export type StateTime = {
  millis:number,
  tick:number
};

export type StateAirport = {
  code:string,
  position:Position
};

export type Position = {
  x:number,
  y:number
};

export type StateAirplaneInFlight = {
  flight:StateFlight,
  distanceRemainingM:number,
  speedMps:number
};

export type StateFlight = {
  airlineIataCode:string,
  flightNumber:string,
  departureAirportCode:string,
  arrivalAirportCode:string,
  distanceKm:number
};

export type StateSchedule = {
  flightId:string,
  departureHours:number,
  departureMinutes:number,
  departureDaysOfWeek:Array<number>
};

export const CreateAirportFn = (
    code:string="???",
    positionX:number=50,
    positionY:number=50)
    :StateAirport => {
  return {
    code: code,
    position: {
      x: positionX,
      y: positionY
    },
  };
};

export const CreateFlightFn = (
    airlineIataCode:string="AY",
    flightNumber:string="0000",
    departureAirportCode:string ="???",
    arrivalAirportCode:string ="???",
    distanceKm:number=1000)
    :StateFlight => {
  return {
    airlineIataCode: airlineIataCode,
    flightNumber: flightNumber,
    departureAirportCode: departureAirportCode,
    arrivalAirportCode: arrivalAirportCode,
    distanceKm: distanceKm
  }
};

export const CreateFlightScheduleFn = (
    flightId:string="",
    departureHours:number=0,
    departureMinutes:number=0,
    departureDaysOfWeek:Array<number>=[0, 1, 2, 3, 4, 5, 6])
    :StateSchedule => {
  return {
    flightId: flightId,
    departureHours: departureHours,
    departureMinutes: departureMinutes,
    departureDaysOfWeek: departureDaysOfWeek
  }
};
