import {
  RETRIEVEPROTOTYPE,
  RETRIEVEPROTOTYPELIST,
  CREATENEWPROTOTYPE,
  CLONEPROTOTYPE,
  EDITPROTOTYPE,
  DELETEPROTOTYPE,
} from '../constants/PrototypeActionTypes';
import assign from 'object-assign';

const initialState = {
  prototypeList: [],
  prototypeDetail: {},
}

export default function prototypes( state = initialState, action ) {
  switch ( action.type ) {
    case RETRIEVEPROTOTYPE:
      return assign({}, state, { prototypeDetail: action.data });
    case RETRIEVEPROTOTYPELIST:
      return assign({}, state, { prototypeList: action.data });
    case CREATENEWPROTOTYPE:
      return assign({}, state, { prototypeList: action.data });
    case CLONEPROTOTYPE:
      return assign({}, state, { prototypeList: action.data });
    case EDITPROTOTYPE:
      return assign({}, state, { prototypeList: action.data });
    case DELETEPROTOTYPE:
      return assign({}, state, { prototypeList: action.data });
    default:
      return state;
  }
}
