import ScheduleReducer from './ScheduleReducer.js';
import { CreateFlightFn, CreateFlightScheduleFn } from '../State.js';

it("ScheduleReducer removes schedule with matching flight code", () => {
  let flights = [
      CreateFlightFn("XX", "101", "JFK", "ORD", CreateFlightScheduleFn(1, 1)),
      CreateFlightFn("XX", "102", "ORD", "JFK", CreateFlightScheduleFn(12, 12))
  ];

  let newFlights = ScheduleReducer(flights, {type:'DELETE_SCHEDULE', payload:'XX101'});
  expect(newFlights).toHaveLength(1);
  expect(newFlights[0]).toEqual(flights[1]);

  let newerFlights =  ScheduleReducer(newFlights, {type:'DELETE_SCHEDULE', payload:'YY999'});
  expect(newerFlights).toEqual(newFlights);

  let newestFlights = ScheduleReducer(newFlights, {type:'DELETE_SCHEDULE', payload:'XX102'});
  expect(newestFlights).toHaveLength(0);
});
