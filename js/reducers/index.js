import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import configReducer from 'js/reducers/config-reducer';
// import currentChatReducer from 'js/reducers/current-chat-reducer';
import actionCableReducer from 'js/reducers/action-cable-reducer';
// import dataStore, { defaultChat } from 'js/data/store';

export default combineReducers({
  // currentChat: currentChatReducer,
  config: configReducer,
  // dataStore: dataStoreReducer,
  cable: actionCableReducer,
  routing: routerReducer
});
