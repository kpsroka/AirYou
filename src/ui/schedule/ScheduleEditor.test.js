import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import ScheduleEditor from './ScheduleEditor.js';
import ScheduleEditorRowComponent from './ScheduleEditorRowComponent.js';
import { AIRPLANES } from '../../model/Airplanes.js';
import { AIRPORTS } from '../../model/Airports.js';
import { CreateFlightFn, CreateFlightScheduleFn, CreateRouteFn } from '../../model/State.js';

describe("ScheduleEditor", () => {
  let testFlight = CreateFlightFn(
      "101",
      AIRPLANES[0].shortName,
      CreateRouteFn(AIRPORTS[0].code, AIRPORTS[1].code),
      CreateFlightScheduleFn());

  test("displays title from props", () => {
    const testString = "Schedule Editor Test";
    const scheduleEditor = shallow(<ScheduleEditor title={testString} />);
    expect(scheduleEditor.find(".modalWindowTitle").length).toEqual(1);
    expect(scheduleEditor.find(".modalWindowTitle").text()).toEqual(testString);
  });

  test("launches provided fn on close click", () => {
    const onClickSpy = sinon.spy();
    const scheduleEditor = shallow(<ScheduleEditor onCloseWindowRequest={onClickSpy} />);
    expect(scheduleEditor.find(".modalWindowClose").length).toEqual(1);

    const scheduleCloseLabel = scheduleEditor.find(".modalWindowClose").at(0);

    scheduleCloseLabel.simulate("click");
    expect(onClickSpy.callCount).toEqual(1);

    scheduleCloseLabel.simulate("click");
    expect(onClickSpy.callCount).toEqual(2);
  });

  test("passes flight to child rows", () => {
    const scheduleEditor = shallow(
        <ScheduleEditor flight={testFlight}>
          <ScheduleEditorRowComponent />
          <ScheduleEditorRowComponent />
        </ScheduleEditor>
    );
    const childRows = scheduleEditor.find(ScheduleEditorRowComponent);

    expect(childRows.length).toBeGreaterThan(0);  // If this fails, the test is useless.

    for (let i = 0; i < childRows.length; i++) {
      expect(childRows.at(i).props().flight).toEqual(testFlight);
    }
  });

  test("class props.integrateSchedule on child row onSave", () => {
    const testflightIndex = 123;
    const integrateScheduleSpy = sinon.spy();
    const scheduleEditor = shallow(
        <ScheduleEditor
            integrateSchedule={integrateScheduleSpy}
            flightIndex={testflightIndex}
            flight={testFlight}>
          <ScheduleEditorRowComponent />
          <ScheduleEditorRowComponent />
        </ScheduleEditor>
    );

    const childRows = scheduleEditor.find(ScheduleEditorRowComponent);
    expect(childRows.length).toBeGreaterThan(0);
    expect(integrateScheduleSpy.called).toBe(false);

    const testPath = ["route", "departureAirportCode"];
    const testValue = "VaLuE";
    childRows.at(0).props().onSave(testPath, testValue);

    expect(integrateScheduleSpy.callCount).toBe(1);
    expect(integrateScheduleSpy.calledWith(testflightIndex, testPath, testValue))
        .toBe(true);
  });
});
