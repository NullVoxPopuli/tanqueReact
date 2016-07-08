import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import configReducer from 'js/reducers/config-reducer';
import currentChatReducer from 'js/reducers/current-chat-reducer';
import dataStoreReducer from 'js/reducers/data-store-reducer';
import actionCableReducer from 'js/reducers/action-cable-reducer';
import identityReducer from 'js/reducers/identity-reducer';

import { loadState, saveState } from './local-storage';
import dataStore, { defaultChat } from 'js/data/store';

import thunk from 'redux-thunk';
import promise from 'redux-promise';
import logger from 'redux-logger';

const logs = logger();

const reducers = combineReducers({
  currentChat: currentChatReducer,
  config: configReducer,
  dataStore: dataStoreReducer,
  cable: actionCableReducer,
  identityReducer,
});

const persistedState = loadState();
const initialState = {
  clientName: 'tanqueRéact',
  clientVersion: '0.0.1',
};

// TODO: remove these, hard coding bad
dataStore.add('user', {
    id: 'user1',
    alias: 'TerminalClient',
    status: 'online',
  });
dataStore.add('user', {
    id: 'user2',
    alias: 'NullVoxPopuli',
    status: 'offline',
  });


const middleware = applyMiddleware(logs, promise, thunk);
const reduxStore = createStore(reducers, persistedState, middleware);
export default reduxStore;

reduxStore.subscribe(() => {
  saveState({
    config: reduxStore.getState().config,
  });
});
