import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { ToastContainer } from 'react-toastify';

import Navigation from 'components/application/navigation';
import Chat from 'components/chat/index';
import Settings from 'components/settings';
import Index from 'components/index';
import Setup from 'components/setup';

import { isStoredConfigValid } from 'actions/identity/config';

const requireConfig = Route => () => {
  if (isStoredConfigValid()) return <Route />;

  return <Redirect to="/setup" />;
};

export default class Wrapper extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <ToastContainer
          className='toast-container'
          autoClose={4000}
          position='top-center'
        />
        <br />
        <div className='container'>
          <Route exact={true} path="/" render={requireConfig(Index)} />

          <Route path='/setup' component={Setup} />
          <Route path="/settings" render={requireConfig(Settings)} />
          <Route path="/chat" render={requireConfig(Chat)} />
        </div>
      </div>
    );
  }
}
