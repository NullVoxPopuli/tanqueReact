import CSS from '../css/application';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory, IndexRoute, Router, Route } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { App, Foo, ReduxTest } from './components';
import { Provider } from 'react-redux';
import createStore from './store';

const store = createStore();
const history = syncHistoryWithStore(browserHistory, store);
render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route path="/" component={App}>
          <IndexRoute component={ReduxTest} />
          <Route path="foo" component={Foo} />
        </Route>
      </div>
    </Router>
   </Provider>,
  document.getElementById('root')
);

console.log('main.js is open for business.');
