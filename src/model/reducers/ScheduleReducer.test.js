import ScheduleReducer from './ScheduleReducer.js';
import { CreateFlightFn, CreateFlightScheduleFn, CreateRouteFn } from '../State.js';

it("ScheduleReducer removes schedule with given index", () => {
  let flights = [
      CreateFlightFn("101", CreateRouteFn("JFK", "ORD"), CreateFlightScheduleFn(1, 1)),
      CreateFlightFn("102", CreateRouteFn("ORD", "JFK"), CreateFlightScheduleFn(12, 12))
  ];

  let newFlights = ScheduleReducer(flights, {type:'DELETE_SCHEDULE', payload:0});
  expect(newFlights).toHaveLength(2);
  expect(newFlights[0]).toBeUndefined();

  let newerFlights = ScheduleReducer(newFlights, {type:'DELETE_SCHEDULE', payload:3});
  expect(newerFlights).toEqual(newFlights);

  let newestFlights = ScheduleReducer(newFlights, {type:'DELETE_SCHEDULE', payload:1});
  expect(newestFlights).toHaveLength(2);
  expect(newestFlights).toEqual([,,]);
});

it("ScheduleReducer saves provided schedule", () => {
  let flights = [
    CreateFlightFn("101", CreateRouteFn("JFK", "ORD"), CreateFlightScheduleFn(1, 1)),
    CreateFlightFn("102", CreateRouteFn("ORD", "JFK"), CreateFlightScheduleFn(12, 12)),
    CreateFlightFn("103", CreateRouteFn("MIA", "BOS"), CreateFlightScheduleFn(2, 2))
  ];

  let newFlight = CreateFlightFn("399", CreateRouteFn("BOS", "MIA"), CreateFlightScheduleFn(15, 15));

  let updatedFlights = ScheduleReducer(
      flights,
      {type:'SAVE_SCHEDULE', payload:{index:1,flight:newFlight}});

  expect(updatedFlights).toEqual([flights[0], newFlight, flights[2]]);
});
