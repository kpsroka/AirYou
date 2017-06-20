import { connect } from 'react-redux';
import ScheduleEditorRow from './ScheduleEditorRow.js';

function mapStateToProps(state, ownProps) {
  let extraProps = {};
  if (ownProps.flightIndex !== undefined && typeof ownProps.value === "function") {
    let flight = state.flights[ownProps.flightIndex];
    extraProps.value = ownProps.value(flight);
  }
  return Object.assign({}, ownProps, extraProps);
}

function mapDispatchToProps(dispatch) {
  return {
    integrateSchedule: (index, path, value) => dispatch({
      type: 'INTEGRATE_SCHEDULE',
      payload: {flightIndex: index, propertyPath: path, propertyValue: value}
    })
  }
}

const ScheduleEditorRowComponent = connect(mapStateToProps, mapDispatchToProps)(ScheduleEditorRow);

export default ScheduleEditorRowComponent;
