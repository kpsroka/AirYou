/* @flow */

import type { Position } from './Position.js';

export type Airport = {
  code:string,
  fullName:string,
  position:Position,
  size:number
};

export const AIRPORTS = [
  createAirport("ATL", 72, 35, 101),
  createAirport("BOS", 91, 73, 33),
  createAirport("CLT", 75, 42, 44),
  createAirport("DEN", 33, 67, 54),
  createAirport("DFW", 48, 30, 64),
  createAirport("DTW", 71, 67, 33),
  createAirport("IAD", 82, 58, 21),
  createAirport("JFK", 88, 66, 56),
  createAirport("LAX", 8, 42, 74),
  createAirport("MCI", 52, 53, 10),
  createAirport("MEM", 63, 44, 3),
  createAirport("MIA", 82, 6, 44),
  createAirport("MSP", 54, 74, 36),
  createAirport("ORD", 63, 65, 76),
  createAirport("PDX", 7, 89, 16),
  createAirport("PHX", 19, 37, 44),
  createAirport("PIT", 77, 61, 8),
  createAirport("SEA", 10, 95, 42),
  createAirport("SFO", 3, 59, 50),
  createAirport("SLC", 22, 62, 22)
];

export function createAirport(
    code:string,
    positionX:number,
    positionY:number,
    size:number)
    :Airport {
  return {
    code: code,
    fullName: `${code} Airport`,
    position: {
      x: positionX,
      y: positionY
    },
    size: size,
  }
}
