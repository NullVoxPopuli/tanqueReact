import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Navigation from 'components/application/navigation';
import Chat from 'components/chat/index';
import Settings from 'components/settings';
import Index from 'components/index';

export default class Wrapper extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <div className='content'>
          <Route exact={true} path="/" component={Index} />
          <Route path="/settings" component={Settings} />
          <Route path="/chat" component={Chat} />
        </div>
      </div>
    );
  }
}
