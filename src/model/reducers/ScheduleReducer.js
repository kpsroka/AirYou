/* @flow */

import { type Action, type DeleteScheduleAction, type IntegrateScheduleAction }
    from '../Actions.js';
import { type StateFlight } from '../State.js';
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
    default:
      return stateSchedules;
  }
};

export default ScheduleReducer;
