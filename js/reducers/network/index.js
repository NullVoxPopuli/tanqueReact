import { combineReducers } from 'redux';

import actionCableReducer from './action-cable-reducer';

export default combineReducers({
  actionCable: actionCableReducer
});
