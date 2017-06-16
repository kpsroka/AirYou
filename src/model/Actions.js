/* @flow */

import { type StateFlight } from './State.js';

export type Action = {
  type:string
}

export type NewFlightAction = {
  type:'NEW_FLIGHT',
  payload:number
}

export type DeleteScheduleAction = {
  type:'DELETE_SCHEDULE',
  payload:number
}

export type SaveScheduleAction = {
  type:'SAVE_SCHEDULE',
  payload: {
    index:number,
    flight:StateFlight
  }
}
