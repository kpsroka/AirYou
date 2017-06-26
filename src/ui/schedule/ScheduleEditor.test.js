import React from 'react';
import { shallow } from 'enzyme';
import ScheduleEditor from './ScheduleEditor.js';

describe("ScheduleEditor", () => {
  test("displays title from props", () => {
    const testString = "Schedule Editor Test";
    const scheduleEditor = shallow(<ScheduleEditor title={testString} />);
    expect(scheduleEditor.find(".modalWindowTitle").length).toEqual(1);
    expect(scheduleEditor.find(".modalWindowTitle").text()).toEqual(testString);
  });
});
