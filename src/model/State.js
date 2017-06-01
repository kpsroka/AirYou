/* @flow */

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
    airlineIataCode:string="AY",
    flightNumber:string="0000",
    departureAirportCode:string="???",
    arrivalAirportCode:string="???",
    distanceKm:number=1000,
    schedule:StateSchedule)
    :StateFlight => {
  return {
    flightId: airlineIataCode + flightNumber,
    departureAirportCode: departureAirportCode,
    arrivalAirportCode: arrivalAirportCode,
    distanceKm: distanceKm,
    schedule: schedule
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
    departureHours: departureHours % 24,
    departureMinutes: departureMinutes % 60,
    departureDaysOfWeek: departureDaysOfWeek
  }
};
