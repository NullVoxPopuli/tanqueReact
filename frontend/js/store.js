import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import sample, { actions as sampleActions } from 'js/sample/ducks'

import thunk from 'redux-thunk';
import promise from 'redux-promise';
import logger from 'redux-logger';

const logs = logger();

export default () => {
  return createStore(combineReducers({
    sample,
    routing: routerReducer,
  }), undefined, compose(
    applyMiddleware(thunk, promise, logs, routerMiddleware(browserHistory)),
     typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  ));
};
