import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router';
import { ToastContainer } from 'react-toastify';

import Navigation from 'components/application/navigation';
import Chat from 'components/chat/index';
import Settings from 'components/settings';
import Index from 'components/index';
import Setup from 'components/setup';

import { isStoredConfigValid } from 'actions/identity/config';

const requireConfig = (Comp, props = {}) => () => {
  if (isStoredConfigValid()) return <Comp { ...props } />;

  return <Redirect to="/setup" />;
};

class Wrapper extends Component {
  static propTypes = {
    history: PropTypes.any.isRequired
  }

  render() {
    const { history } = this.props;
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
          <Route
            exact={true}
            path="/"
            render={requireConfig(Index, {
              toChat: () => history.push('/chat')
            })} />

          <Route path='/setup' component={Setup} />
          <Route path="/settings" render={requireConfig(Settings)} />
          <Route path="/chat" render={requireConfig(Chat)} />
        </div>
      </div>
    );
  }
}

export default withRouter(Wrapper)
