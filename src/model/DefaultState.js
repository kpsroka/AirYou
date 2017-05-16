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
    flights: createFlights()
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
    createAirport("SFO", 5, 35),
    createAirport("MCI", 45, 33),
    createAirport("ATL", 88, 19),
    createAirport("JFK", 92, 66)
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

export default DefaultState;
