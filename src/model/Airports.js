/* @flow */

import type { Position } from './Position.js';

export type Airport = {
  code:string,
  position:Position
};

export const AIRPORTS = [
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
];

export function createAirport(
    code:string,
    positionX:number,
    positionY:number)
    :Airport {
  return {
    code: code,
    position: {
      x: positionX,
      y: positionY
    }
  }
}
