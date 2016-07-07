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

import * as ActionCable from 'actioncable/lib/assets/compiled/action_cable';

let myUid = '123';
let url = `ws://mesh-relay-in-us-1.herokuapp.com?uid=${myUid}`;
const cable = ActionCable.createConsumer(url);

let logg = data => {
  console.log(data);
};

const channel = cable.subscriptions.create({ channel: 'MeshRelayChannel', }, {
  connected: () => {
    console.log('connected');
  },

  disconnected: (data) => {
    console.log(data);
    console.log('disconnected');
  },

  rejected: (data) => {
    console.log(data);
    console.log('rejected');
  },

  received: (data) => {
    console.log(data);
    console.log('received');
  },

  chat: (data) => {
    console.log(data);
    console.log('chat');
  },
});

setTimeout(() => {
  channel.chat({ to: myUid, message: 'test message' });
}, 5000);

// export default cable;
//
// channel.send({
//   sent_by: "Paul",
//   body: "This is a cool chat app."
// });

render(
  <Provider store={reduxStore}>
    <Router history={browserHistory}>
      <div>
        <AppNavigation />
        <Route path="/" component={App}>
          <IndexRoute component={Index} />
          <Route path="/settings" component={Settings} />
          <Route path="/chat" component={Chat}>
            <Route path="/chat/:chatRoomId" component={ChatRoom} />
          </Route>
        </Route>
      </div>
    </Router>
  </Provider>,
  document.getElementById('app')
);

console.log('main.js is open for business.');
