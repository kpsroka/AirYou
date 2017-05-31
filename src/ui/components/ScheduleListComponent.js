import { connect } from 'react-redux';
import ScheduleListControl from './ScheduleListControl.js';

function mapStateToProps(state) {
  return { flights: state.schedules };
}

const ScheduleListComponent = connect(mapStateToProps)(ScheduleListControl);

export default ScheduleListComponent;
