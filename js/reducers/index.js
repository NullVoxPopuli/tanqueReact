import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import data from './data';
import identity from './identity';
import network from './network';
import views from './views';

export default combineReducers({
  // currentChat: currentChatReducer,
  // config: configReducer,
  // dataStore: dataStoreReducer,
  // cable: actionCableReducer,
  routing: routerReducer,
  data,
  identity,
  views,
  network
});
