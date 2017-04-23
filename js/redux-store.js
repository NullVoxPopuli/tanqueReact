import { applyMiddleware, createStore } from 'redux';

import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';

import { loadState, saveState } from './local-storage';
import reducers from './reducers';

const logs = createLogger();
const persistedState = loadState();
const middleware = applyMiddleware(logs, promise, thunk);
const reduxStore = createStore(reducers, persistedState, middleware);
export default reduxStore;

reduxStore
  .subscribe(() => saveState(reduxStore.getState()));
