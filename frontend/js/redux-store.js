import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import configReducer from 'js/reducers/config-reducer';
import currentChatReducer from 'js/reducers/current-chat-reducer';
import dataStoreReducer from 'js/reducers/data-store-reducer';
import actionCableReducer from 'js/reducers/action-cable-reducer';
import { loadState, saveState } from './local-storage';

import thunk from 'redux-thunk';
import promise from 'redux-promise';
import logger from 'redux-logger';

const logs = logger();

const reducers = combineReducers({
  currentChat: currentChatReducer,
  config: configReducer,
  dataStore: dataStoreReducer,
  cable: actionCableReducer,
});

const persistedState = loadState();
const initialState = {
  clientName: 'tanqueRéact',
  clientVersion: '0.0.1',
};

const middleware = applyMiddleware(logs, promise, thunk);
const reduxStore = createStore(reducers, persistedState, middleware);
export default reduxStore;

reduxStore.subscribe(() => {
  saveState({
    config: reduxStore.getState().config,
  });
});
