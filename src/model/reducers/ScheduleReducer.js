/* @flow */

import { type Action, type DeleteScheduleAction } from '../Actions.js';
import { type StateSchedule } from '../State.js';

const ScheduleReducer = (
    stateSchedules:Array<StateSchedule>,
    action:Action)
    :Array<StateSchedule> => {
  switch (action.type) {
    case 'DELETE_SCHEDULE': {
      let deleteScheduleAction = ((action: any): DeleteScheduleAction);
      let flightId = deleteScheduleAction.payload;
      let scheduleIndex = stateSchedules.findIndex((element) => (element.flightId === flightId));
      if (scheduleIndex > -1) {
        let newStateSchedules = stateSchedules.slice();
        newStateSchedules.splice(scheduleIndex, 1);
        return newStateSchedules;
      } else {
        return stateSchedules;
      }
    }
    default:
      return stateSchedules;
  }
};

export default ScheduleReducer;
