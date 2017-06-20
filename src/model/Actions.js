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

export type IntegrateScheduleAction = {
  type:'INTEGRATE_SCHEDULE',
  payload: {
    flightIndex:number,
    propertyPath:Array<string>,
    propertyValue:any
  }
}
