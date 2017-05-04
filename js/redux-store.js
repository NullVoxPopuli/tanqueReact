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
  .subscribe(() => {
    const state = reduxStore.getState();

    saveState({
      data: {
        users: state.data.users,
        messages: {
          records: state.data.messages.records.slice(1).slice(-1000)
        }
      },
      identity: state.identity
    });
  });
