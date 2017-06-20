import { connect } from 'react-redux';
import ScheduleEditorRow from './ScheduleEditorRow.js';
import Objects from '../../aux/Objects.js';

function mapStateToProps(state, ownProps) {
  let extraProps = {};
  if (ownProps.flightIndex !== undefined && typeof ownProps.value === "function") {
    let flight = state.flights[ownProps.flightIndex];
    extraProps.value = ownProps.value(flight);
  }
  return Object.assign({}, ownProps, extraProps);
}

function integrateInput(inputPath) {
  let newFlight =
      Objects.updateObject(
          this.props.flight,
          inputPath,
          Objects.getObjectValueByPath(this.state.input, inputPath));
  this.props.onSaveSchedule(newFlight);
}

const ScheduleEditorRowComponent = connect(mapStateToProps)(ScheduleEditorRow);

export default ScheduleEditorRowComponent;
