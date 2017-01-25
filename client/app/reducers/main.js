import {
  CHECKTOKEN,
} from '../constants/ActionTypes';
import assign from 'object-assign';

const initialState = {
  userId: '',
  access_token: '',
  token: '',
  isInitialized: false,
}

export default function main( state = initialState, action ) {
  switch ( action.type ) {
    case CHECKTOKEN:
      return assign({}, state, { userId: action.userId, access_token: action.access_token, token: action.token, isInitialized: true });
    default:
      return state;
  }
}
