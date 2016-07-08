import CSS from '../css/application';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory, hashHistory, IndexRoute, Router, Route } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { Provider } from 'react-redux';
import reduxStore from './redux-store';

import Chat from './components/chat/index';
import AppNavigation from './components/app-navigation';
import Settings from './components/settings';
import Index from './components/index';
import App from './components/app';
import ChatRoom from './components/chat/chat-room';

import { connectToCable } from 'js/actions/action-cable-actions';

reduxStore.dispatch(connectToCable());

render(
  <Provider store={reduxStore}>
    <Router history={browserHistory}>
      <div>
        <AppNavigation />
        <Route path="/" component={App}>
          <IndexRoute component={Index} />
          <Route path="/settings" component={Settings} />
          <Route path="/chat" component={Chat}>
          </Route>
        </Route>
      </div>
    </Router>
  </Provider>,
  document.getElementById('app')
);

// <Route path="/chat/:chatRoomId" component={ChatRoom} />

console.log('main.js is open for business.');
