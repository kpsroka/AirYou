/* @flow */

export type Position = {
  x: number,
  y: number
};

const HORIZONTAL_DISTANCE_FACTOR:number = 49.029;
const VERTICAL_DISTANCE_FACTOR:number = 27.887;

export function distanceBetween(a:Position, b:Position):number {
  return Math.sqrt(
      Math.pow((a.x-b.x) * HORIZONTAL_DISTANCE_FACTOR, 2)
      + Math.pow((a.y-b.y) * VERTICAL_DISTANCE_FACTOR, 2));
}
