/* @flow */

export type Action = {
  type:string
}

export type NewFlightAction = {
  type:'NEW_FLIGHT',
  payload:string
}

export type DeleteScheduleAction = {
  type:'DELETE_SCHEDULE',
  payload:string
}
