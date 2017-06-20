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

it("ScheduleReducer integrates provided input", () => {
  let flights = [
    CreateFlightFn("101", CreateRouteFn("JFK", "ORD"), CreateFlightScheduleFn(1, 1)),
    CreateFlightFn("102", CreateRouteFn("ORD", "JFK"), CreateFlightScheduleFn(12, 12)),
    CreateFlightFn("103", CreateRouteFn("MIA", "BOS"), CreateFlightScheduleFn(2, 2))
  ];

  let newFlight = Object.assign({}, flights[1]);
  newFlight.route.departureAirportCode = "BOS";
  newFlight.flightNumber = "333";


  let updatedFlights =
      ScheduleReducer(
        ScheduleReducer(
          flights,
          {
            type:'INTEGRATE_SCHEDULE',
            payload:{flightIndex:1,propertyPath:["flightNumber"],propertyValue:"333"}
          }),
        {
          type:'INTEGRATE_SCHEDULE',
          payload:{flightIndex:1,propertyPath:["route", "departureAirportCode"],propertyValue:"BOS"}
        });

  expect(updatedFlights).toEqual([flights[0], newFlight, flights[2]]);
});
