import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { Row, Col } from 'reactstrap';

import Navigation from 'components/application/navigation';
import Chat from 'components/chat/index';
import Settings from 'components/settings';
import Index from 'components/index';
import Setup from 'components/setup';
import Footer from 'components/footer';

import { isStoredConfigValid } from 'actions/identity/config';
import { app } from 'actions/views';

import OffCanvas from './off-canvas';
import { processMessage } from 'actions/network/message-processor';

const requireConfig = (Comp, props = {}) => () => {
  if (isStoredConfigValid()) return <Comp { ...props } />;

  return <Redirect to="/setup" />;
};

class Wrapper extends Component {
  static propTypes = {
    history: PropTypes.any.isRequired,
    toggleLeftBar: PropTypes.func.isRequired
  }

  render() {
    const { history, toggleLeftBar, isLeftBarShown } = this.props;
    const path = window.location.pathname;
    const isRootPath = path.match('/$');
    const isChat = path.match('/chat');

    return (
      <div id='app-wrapper'>
        <ToastContainer
          className='toast-container'
          autoClose={4000}
          position='top-center' />

        <OffCanvas showUserList={isChat} isLeftBarShown={isLeftBarShown} />
        <div id='app-container'>
          <Navigation toggleLeftBar={toggleLeftBar} />

          <Route
            exact={true}
            path="/"
            render={requireConfig(Index, {
              toChat: () => history.push('/chat')
            })} />

          <Route path="/chat" render={requireConfig(Chat)} />

          <div className='container'>
            <br />

            <Route path='/setup' component={Setup} />
            <Route path="/settings" render={requireConfig(Settings)} />
          </div>
        </div>

        {isRootPath && <Footer />}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  isLeftBarShown: state.views.app.isLeftBarShown
});
const mapDispatchToProps = dispatch => ({
  receivedMessage: bindActionCreators(processMessage, dispatch),
  toggleLeftBar: bindActionCreators(app.toggleLeftBar, dispatch)
});

const connectedWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(Wrapper);

export default withRouter(connectedWrapper);
