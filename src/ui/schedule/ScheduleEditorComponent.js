import { connect } from 'react-redux';
import ScheduleEditor from './ScheduleEditor.js';

function mapStateToProps() { return {}; }

function mapDispatchToProps(dispatch) {
  return {
    integrateSchedule: (index, path, value) => dispatch({
      type: 'INTEGRATE_SCHEDULE',
      payload: {flightIndex: index, propertyPath: path, propertyValue: value}
  })};
}

const ScheduleEditorComponent = connect(mapStateToProps, mapDispatchToProps)(ScheduleEditor);

export default ScheduleEditorComponent;
