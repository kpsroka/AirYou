import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import FlightsList from './FlightsList.js';
import { CreateFlightFn, CreateFlightScheduleFn, CreateRouteFn } from '../../model/State.js';
import { AirlineIataCode } from '../../Constants.js';
import { AIRPLANES } from '../../model/Airplanes.js';
import { AIRPORTS } from '../../model/Airports.js';

describe('FlightsList', () => {
  let flights = [
    CreateFlightFn(
        "101",
        AIRPLANES[0].shortName,
        CreateRouteFn(AIRPORTS[0].code, AIRPORTS[1].code),
        CreateFlightScheduleFn()),
    CreateFlightFn(
        "202",
        AIRPLANES[1].shortName,
        CreateRouteFn(AIRPORTS[1].code, AIRPORTS[2].code),
        CreateFlightScheduleFn()),
  ];

  test('displays list of flights', () => {
    const scheduleList = shallow(<FlightsList flights={flights} />);
    expect(scheduleList.find(".flightsListItem").length).toEqual(2);

    assertFlightsListItemContentsEqualFlight(
        scheduleList.find(".flightsListItem").at(0), flights[0]);
    assertFlightsListItemContentsEqualFlight(
        scheduleList.find(".flightsListItem").at(1), flights[1]);
  });

  test('fires appropriate prop on edit label click', () => {
    const onClickSpy = sinon.spy();
    const scheduleList =
        shallow(<FlightsList flights={flights} onEditSchedule={onClickSpy} />);

    const items = scheduleList.find(".flightsListItem");
    expect(items.length).toEqual(2);

    const firstEditButton = getLabelWithText(items.at(0), "Edit");
    expect(firstEditButton.length).toEqual(1);

    const secondEditButton = getLabelWithText(items.at(1), "Edit");
    expect(secondEditButton.length).toEqual(1);

    secondEditButton.simulate("click");
    expect(onClickSpy.callCount).toEqual(1);
    expect(onClickSpy.lastCall.args).toEqual([1]);

    firstEditButton.simulate("click");
    expect(onClickSpy.callCount).toEqual(2);
    expect(onClickSpy.lastCall.args).toEqual([0]);

    secondEditButton.simulate("click");
    expect(onClickSpy.callCount).toEqual(3);
    expect(onClickSpy.lastCall.args).toEqual([1]);
  });
});

function assertFlightsListItemContentsEqualFlight(scheduleListItem, flight) {
  expect(scheduleListItem.find(".scheduleListItemFlightCode").text())
      .toEqual(`${AirlineIataCode}${flight.flightNumber}`);
  expect(scheduleListItem.find(".flightsListItemAirplaneShortName").text())
      .toEqual(AIRPLANES[flight.airplaneIndex].shortName);
  expect(scheduleListItem.find(".flightsListItemRoute").text())
      .toMatch(flight.route.departureAirportCode);
  expect(scheduleListItem.find(".flightsListItemRoute").text())
      .toMatch(flight.route.arrivalAirportCode);
}

function getLabelWithText(wrapper, text) {
  return wrapper.findWhere(n => n.type() === "div" && n.text() === text);
}
