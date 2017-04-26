import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';

import Navigation from 'components/application/navigation';
import Chat from 'components/chat/index';
import Settings from 'components/settings';
import Index from 'components/index';
import Setup from 'components/setup';

import { isConfigValid } from 'actions/identity/config';

export default class Wrapper extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <br />
        <div className='container'>
          <Route exact={true} path="/" render={() => (
            isConfigValid() ? (<Redirect to="/setup" />) : <Index />
        )} />

          <Route path='/setup' component={Setup} />
          <Route path="/settings" component={Settings} />
          <Route path="/chat" component={Chat} />
        </div>
      </div>
    );
  }
}
