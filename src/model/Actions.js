/* @flow */

import { type StateFlight } from './State.js';

export type Action = {
  type:string
}

export type NewFlightAction = {
  type:'NEW_FLIGHT',
  payload:StateFlight
}
