import React from 'react';
import { render } from 'react-dom';

import { BrowserRouter as Router, Route } from 'react-router-dom';

// import { browserHistory, hashHistory, IndexRoute, Router, Route } from 'react-router';
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { Provider } from 'react-redux';

import CSS from '../css/application';

import reduxStore from './redux-store';
import Chat from './components/chat/index';
import Settings from './components/settings';
import Index from './components/index';
import AppWrapper from './components/application/wrapper';

// reduxStore.dispatch(connectToCable());
// const history = syncHistoryWithStore(browserHistory, reduxStore);
 // history={browserHistory}
render(
  <Provider store={reduxStore}>
    <Router component={AppWrapper}>
      <Route exect path="/" component={Index}>
        <Route path="/settings" component={Settings} />
        <Route path="/chat" component={Chat}>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
