import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import FlightEditor from './FlightEditor.js';
import FlightEditorRow from './FlightEditorRow.js';
import { AIRPLANES } from '../../model/Airplanes.js';
import { AIRPORTS } from '../../model/Airports.js';
import { CreateFlightFn, CreateFlightScheduleFn, CreateRouteFn } from '../../model/State.js';

describe("FlightEditor", () => {
  let testFlight = CreateFlightFn(
      "101",
      AIRPLANES[0].shortName,
      CreateRouteFn(AIRPORTS[0].code, AIRPORTS[1].code),
      CreateFlightScheduleFn());

  test("displays title from props", () => {
    const testString = "Schedule Editor Test";
    const scheduleEditor = shallow(<FlightEditor title={testString} />);
    expect(scheduleEditor.find(".modalWindowTitle").length).toEqual(1);
    expect(scheduleEditor.find(".modalWindowTitle").text()).toEqual(testString);
  });

  test("launches provided fn on close click", () => {
    const onClickSpy = sinon.spy();
    const scheduleEditor = shallow(<FlightEditor onCloseWindowRequest={onClickSpy} />);
    expect(scheduleEditor.find(".modalWindowClose").length).toEqual(1);

    const scheduleCloseLabel = scheduleEditor.find(".modalWindowClose").at(0);

    scheduleCloseLabel.simulate("click");
    expect(onClickSpy.callCount).toEqual(1);

    scheduleCloseLabel.simulate("click");
    expect(onClickSpy.callCount).toEqual(2);
  });

  test("passes values to child rows", () => {
    const scheduleEditor = shallow(
        <FlightEditor flight={testFlight}>
          <ScheduleEditorRow path={["flightNumber"]} />
          <ScheduleEditorRow path={["airplaneIndex"]} />
        </FlightEditor>
    );
    const childRows = scheduleEditor.find(FlightEditorRow);

    expect(childRows.length).toEqual(2);
    expect(childRows.at(0).props().value).toEqual(testFlight.flightNumber);
    expect(childRows.at(1).props().value).toEqual(testFlight.airplaneIndex);
  });

  test("class props.integrateSchedule on child row onSave", () => {
    const testflightIndex = 123;
    const testPath = ["route", "departureAirportCode"];
    const integrateScheduleSpy = sinon.spy();
    const scheduleEditor = shallow(
        <FlightEditor
            integrateSchedule={integrateScheduleSpy}
            flightIndex={testflightIndex}
            flight={testFlight}>
          <ScheduleEditorRow path={testPath} />
        </FlightEditor>
    );

    const childRows = scheduleEditor.find(FlightEditorRow);
    expect(childRows.length).toBeGreaterThan(0);
    expect(integrateScheduleSpy.called).toBe(false);

    const testValue = "VaLuE";
    childRows.at(0).props().onSave(testPath, testValue);

    expect(integrateScheduleSpy.callCount).toBe(1);
    expect(integrateScheduleSpy.calledWith(testflightIndex, testPath, testValue))
        .toBe(true);
  });
});
