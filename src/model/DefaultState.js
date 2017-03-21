import { Time } from '../Constants.js';

const DefaultState = createDefaultState();

function createDefaultState() {
  return {
    time: createDefaultTime(),
    airports: createAirports()
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

export default DefaultState;
