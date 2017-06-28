/* @flow */

import { type Action, type DeleteScheduleAction, type IntegrateScheduleAction }
    from '../Actions.js';
import { AIRPLANES } from '../Airplanes.js';
import { AIRPORTS } from '../Airports.js';
import { type StateFlight, CreateFlightFn, CreateFlightScheduleFn, CreateRouteFn }
    from '../State.js';
import Objects from '../../aux/Objects.js';

const ScheduleReducer = (
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
      let newSchedules = stateSchedules.slice();
      newSchedules.push(createNewSchedule(stateSchedules));
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
  let flightNumbers = schedules.map(schedule => Number(schedule.flightNumber)).sort();
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

export default ScheduleReducer;
