import { applyMiddleware, createStore, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import { loadState, saveState } from './local-storage';

import thunk from 'redux-thunk';
import promise from 'redux-promise';
import logger from 'redux-logger';

import reducers from './reducers';

const logs = logger();


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
