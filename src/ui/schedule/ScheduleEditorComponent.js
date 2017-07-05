import { connect } from 'react-redux';
import ScheduleEditor from './ScheduleEditor.js';
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

function getFlight(flights, props) {
  if (typeof props.flightIndex === 'number') {
    return flights[props.flightIndex];
  } else if (props.flight !== undefined) {
    return props.flight;
  } else {
    throw new Error("Neither flight nor flight index are provided");
  }
}

function mapStateToProps(state, ownProps) {
  let extraProps = {};
  const flight = getFlight(state.flights, ownProps);
  extraProps.canIntegrate = (path, input) => {
    return Objects.getObjectValueByPath(integrateChecks, path).call(null, state.flights, flight, input);
  };

  return extraProps;
}

function mapDispatchToProps(dispatch) {
  return {
    integrateSchedule: (index, path, value) => dispatch({
      type: 'INTEGRATE_SCHEDULE',
      payload: {flightIndex: index, propertyPath: path, propertyValue: value}
    }),
    addSchedule: (flight) => dispatch({
      type: 'ADD_SCHEDULE',
      payload: flight
    }),
  };
}

const ScheduleEditorComponent = connect(mapStateToProps, mapDispatchToProps)(ScheduleEditor);

export default ScheduleEditorComponent;
