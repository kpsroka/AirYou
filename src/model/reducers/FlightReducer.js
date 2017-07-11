/* @flow */

import type { Action, AddScheduleAction, DeleteScheduleAction, IntegrateScheduleAction } from '../Actions.js';
import { AIRPLANES } from '../Airplanes.js';
import { AIRPORTS } from '../Airports.js';
import type { StateFlight } from '../State.js';
import { CreateFlightFn, CreateFlightScheduleFn, CreateRouteFn } from '../State.js';
import Objects from '../../aux/Objects.js';

const FlightReducer = (
    stateSchedules:Array<StateFlight>,
    action:Action)
    :Array<StateFlight> => {
  switch (action.type) {
    case 'DELETE_SCHEDULE': {
      let deleteScheduleAction = ((action: any): DeleteScheduleAction);
      let flightIndex = deleteScheduleAction.payload;
      let newSchedules = stateSchedules.slice();
      delete newSchedules[flightIndex];
      return newSchedules;
    }
    case 'INTEGRATE_SCHEDULE': {
      let integrateScheduleAction = ((action: any): IntegrateScheduleAction);
      let newFlight =
          Objects.updateObject(
              stateSchedules[integrateScheduleAction.payload.flightIndex],
              integrateScheduleAction.payload.propertyPath,
              integrateScheduleAction.payload.propertyValue);
      let newSchedules = stateSchedules.slice();
      newSchedules[integrateScheduleAction.payload.flightIndex] = newFlight;
      return newSchedules;
    }
    case 'ADD_SCHEDULE': {
      let addScheduleAction = ((action: any): AddScheduleAction);
      let newSchedules = stateSchedules.slice();
      if (addScheduleAction.payload) {
        newSchedules.push(addScheduleAction.payload);
      } else {
        newSchedules.push(createNewSchedule(stateSchedules));
      }
      return newSchedules;
    }
    default:
      return stateSchedules;
  }
};

function createNewSchedule(schedules:Array<StateFlight>):StateFlight {
  return CreateFlightFn(
      findNextAvailableFlightNumber(schedules),
      AIRPLANES[0].shortName,
      CreateRouteFn(AIRPORTS[0].code, AIRPORTS[1].code),
      CreateFlightScheduleFn()
  );
}

function findNextAvailableFlightNumber(schedules:Array<StateFlight>):string {
  let flightNumbers = schedules.map(schedule => Number(schedule.flightNumber))
      .sort((a, b) => (a - b));
  let nextCandidateNumber = 1;
  for (let i = 0; i < flightNumbers.length; i++) {
    if (flightNumbers[i] > nextCandidateNumber) {
      break;
    } else if (flightNumbers[i] === nextCandidateNumber) {
      nextCandidateNumber++;
    }
  }

  return String(nextCandidateNumber);
}

export default FlightReducer;
