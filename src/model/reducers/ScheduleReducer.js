/* @flow */

import { type Action, type DeleteScheduleAction } from '../Actions.js';
import { type StateFlight } from '../State.js';

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
    default:
      return stateSchedules;
  }
};

export default ScheduleReducer;
