import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import ScheduleList from './ScheduleList.js';
import { CreateFlightFn, CreateFlightScheduleFn, CreateRouteFn } from '../../model/State.js';
import { AirlineIataCode } from '../../Constants.js';
import { AIRPLANES } from '../../model/Airplanes.js';
import { AIRPORTS } from '../../model/Airports.js';

describe('ScheduleList', () => {
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

  test('displays list of schedules', () => {
    const scheduleList = shallow(<ScheduleList flights={flights} />);
    expect(scheduleList.find(".scheduleListItem").length).toEqual(2);

    assertScheduleListItemContentsEqualFlight(
        scheduleList.find(".scheduleListItem").at(0), flights[0]);
    assertScheduleListItemContentsEqualFlight(
        scheduleList.find(".scheduleListItem").at(1), flights[1]);
  });

  test('fires appropriate prop on edit label click', () => {
    const onClickSpy = sinon.spy();
    const scheduleList =
        shallow(<ScheduleList flights={flights} onEditSchedule={onClickSpy} />);

    const items = scheduleList.find(".scheduleListItem");
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

function assertScheduleListItemContentsEqualFlight(scheduleListItem, flight) {
  expect(scheduleListItem.find(".scheduleListItemFlightCode").text())
      .toEqual(`${AirlineIataCode}${flight.flightNumber}`);
  expect(scheduleListItem.find(".scheduleListItemAirplaneShortName").text())
      .toEqual(AIRPLANES[flight.airplaneIndex].shortName);
  expect(scheduleListItem.find(".scheduleListItemRoute").text())
      .toMatch(flight.route.departureAirportCode);
  expect(scheduleListItem.find(".scheduleListItemRoute").text())
      .toMatch(flight.route.arrivalAirportCode);
}

function getLabelWithText(wrapper, text) {
  return wrapper.findWhere(n => n.type() === "div" && n.text() === text);
}