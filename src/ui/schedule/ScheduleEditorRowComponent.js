import { connect } from 'react-redux';
import ScheduleEditorRow from './ScheduleEditorRow.js';
import Objects from '../../aux/Objects.js';

const integrateChecks = {
  flightNumber: (flights, thisFlight, input) => (
      !Boolean(flights.find((flight) => (flight && flight.flightNumber === input)))),
  route: {
    arrivalAirportCode: (flights, thisFlight, input) => (
        input !== thisFlight.route.departureAirportCode),
    departureAirportCode: (flights, thisFlight, input) => (
        input !== thisFlight.route.arrivalAirportCode),
  },
  schedule: {
    departureTime: (flights, thisFlight, input) => {
      return input.hours >= 0 && input.hours < 24 &&
              input.minutes >= 0 && input.minutes < 60;
    },
    departureDaysOfWeek: (flights, thisFlight, input) => {
      return input.includes(true);
    }
  },
  airplaneIndex: (flights, thisFlight, input) => true,
};

function mapStateToProps(state, ownProps) {
  let extraProps = {};
  if (ownProps.flightIndex !== undefined && ownProps.value === undefined) {
    let flight = null;
    if (ownProps.flightIndex >= 0) {
      flight = state.flights[ownProps.flightIndex];
    } else {
      // TODO: add a field to state to hold new flight data.
      flight = null;
    }
    extraProps.canIntegrate = (input) => {
      return Objects.getObjectValueByPath(integrateChecks, ownProps.path)
          .call(null, state.flights, flight, input);
    };
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
