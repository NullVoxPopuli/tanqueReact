import { combineReducers } from 'redux';

import userReducer from './users';
import messageReducer from './messages';

export default combineReducers({
  users: userReducer,
  messages: messageReducer
});
