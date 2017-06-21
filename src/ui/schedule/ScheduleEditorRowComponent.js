import { connect } from 'react-redux';
import ScheduleEditorRow from './ScheduleEditorRow.js';
import Objects from '../../aux/Objects.js';

const integrateChecks = {
  flightNumber: (flights, flightIndex, input) => (
      !Boolean(flights.find((flight) => (flight && flight.flightNumber === input)))),
  route: {
    arrivalAirportCode: (flights, flightIndex, input) => (
        input !== flights[flightIndex].route.departureAirportCode),
    departureAirportCode: (flights, flightIndex, input) => (
        input !== flights[flightIndex].route.arrivalAirportCode),
  },
  schedule: {
    departureTime: (flights, flightIndex, input) => {
      return input.hours >= 0 && input.hours < 24 &&
              input.minutes >= 0 && input.minutes < 60;
    },
    departureDaysOfWeek: (flights, flightIndex, input) => {
      return input.includes(true);
    }
  },
  airplaneIndex: (flights, flightIndex, input) => true,
};

function mapStateToProps(state, ownProps) {
  let extraProps = {};
  if (ownProps.flightIndex !== undefined && ownProps.value === undefined) {
    let flight = state.flights[ownProps.flightIndex];
    extraProps.canIntegrate =
        Objects.getObjectValueByPath(integrateChecks, ownProps.path)
            .bind(null, state.flights, ownProps.flightIndex);
    if (ownProps.value === undefined) {
      extraProps.value = Objects.getObjectValueByPath(flight, ownProps.path);
    }
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
