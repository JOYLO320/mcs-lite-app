import {
  RETRIEVEDASHBOARD,
} from '../constants/DashboardActionTypes';
import assign from 'object-assign';

const initialState = {
  templates: [],
  userPrototypes: {},
};

export default function dashboard( state = initialState, action ) {
  switch ( action.type ) {
    case RETRIEVEDASHBOARD:
      return assign({}, state, { templates: action.data.templates, userPrototypes: action.data.userPrototypes });
    default:
      return state;
  }
}
