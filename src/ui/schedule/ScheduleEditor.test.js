import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import ScheduleEditor from './ScheduleEditor.js';
import ScheduleEditorRowComponent from './ScheduleEditorRowComponent.js';

describe("ScheduleEditor", () => {
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

  test("passes flightIndex to child rows", () => {
    const testIndex = 321;
    const scheduleEditor = shallow(<ScheduleEditor flightIndex={testIndex} />);
    const childRows = scheduleEditor.find(ScheduleEditorRowComponent);

    expect(childRows.length).toBeGreaterThan(0);  // If this fails, the test is useless.

    for (let i = 0; i < childRows.length; i++) {
      expect(childRows.at(i).props().flightIndex).toEqual(testIndex);
    }
  });
});
