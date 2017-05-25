import { Time } from '../Constants.js';

const DefaultState = createDefaultState();

function createDefaultState() {
  let airports = createAirports();
  let airportsMap = createAirportsMap(airports);
  return {
    time: createDefaultTime(),
    airports: airports,
    airportsByCode: airportsMap,
    airplanesInFlight: [],
    flights: createFlights(),
    schedules: createSchedules()
  }
}

function createDefaultTime() {
  return {
    millis: Date.now(),
    tick: Time.SLOW_TICK_MILLIS
  }
}

function createAirports() {
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

function createAirport(code="???", positionX=50, positionY=50) {
  return {
    code: code,
    position: {
      x: positionX,
      y: positionY
    },
  };
}

function createAirportsMap(airports) {
  return new Map(airports.map((value, index) => [value.code, index]));
}

function createFlights() {
  return [
    createFlight("AY", "9001", "SFO", "MCI", 1000),
    createFlight("BA", "101", "JFK", "ATL", 1000),
    createFlight("UA", "3030", "JFK", "SFO", 1000),
    createFlight("LH", "33", "MCI", "ATL", 1000)
  ]
}

function createFlight(
    airlineIataCode="AY",
    flightNumber="0000",
    departureAirportCode="???",
    arrivalAirportCode="???",
    distanceKm=1000) {
  return {
    airlineIataCode: airlineIataCode,
    flightNumber: flightNumber,
    departureAirportCode: departureAirportCode,
    arrivalAirportCode: arrivalAirportCode,
    distanceKm: distanceKm
  }
}

function createSchedules() {
  let now = new Date();

  return [
    createFlightSchedule("AY9001", now.getHours() + 1, now.getMinutes()),
    createFlightSchedule("BA101", now.getHours() + 3, 0)
  ];
}

function createFlightSchedule(
  flightId="",
  departureHour=0,
  departureMinutes=0,
  departureDaysOfWeek=[0, 1, 2, 3, 4, 5, 6]) {
  return {
    flightId: flightId,
    departureHour: departureHour,
    departureMinutes: departureMinutes,
    departureDaysOfWeek: departureDaysOfWeek
  }
}

export default DefaultState;
