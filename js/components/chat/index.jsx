import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import UserList from './user-list';
import TextEntry from './entry';
import ChatRoom from './chat-room';

import { actionCable } from 'js/actions/network';
import { inputHandler } from 'js/actions/views';
import { setWhisperToUser } from 'actions/data/users';

import './off-canvas-styles.scss';

class ChatIndex extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,

    handleInput: PropTypes.func.isRequired,
    connect: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = { showUsers: false, activeChannel: '' };
    this.props.connect();
    this.didEnterMessage = this.didEnterMessage.bind(this);
    this.didClickShowUsers = this.didClickShowUsers.bind(this);
    this.handleUserSelect = this.handleUserSelect.bind(this);
  }

  handleUserSelect(user) {
    const { setWhisper } = this.props;

    setWhisper(user);
  }

  didEnterMessage(message) {
    const { handleInput } = this.props;

    handleInput(message);
  }

  didClickShowUsers() {
    this.setState({ showUsers: !this.state.showUsers });
  }

  render() {
    const { messages, users, whisperingToUser } = this.props;
    const { showUsers } = this.state;

    return (
      <Row style={{
        position: 'fixed',
        bottom: '0px',
        top: '70px',
        left: '0px',
        right: '0px'
      }}>
        <a
          style={{ display: showUsers ? 'none' : 'block' }}
          onClick={this.didClickShowUsers}
          className='off-canvas-open-button'>
          <i className='fa fa-bars'></i>
        </a>
        <Col
          className='h-100 pr-0'
          style={{
            display: 'flex',
            transition: 'max-width 0.1s ease-in-out',
            maxWidth: showUsers ? '300px' : '50px'
          }}>
          {showUsers &&
            <UserList
              whisperingToUser={whisperingToUser}
              didCloseList={this.didClickShowUsers}
              users={users}
              handleUserSelect={this.handleUserSelect}/>}
        </Col>
        <Col className='d-flex h-100 flex-column pl-0'>
          <div
            id='chat-wrapper'
            className='h-100 d-flex flex-column'>
            <ChatRoom
              messages={messages} />
            <TextEntry
              whisperingToUser={whisperingToUser}
              onSendText={this.didEnterMessage}
              currentRoomId={this.currentRoomId}/>
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  config: state.identity.config,
  messages: state.data.messages.records,
  users: state.data.users.records,
  whisperingToUser: state.data.users.whisperingToUser
});

const mapDispatchToProps = dispatch => ({
  handleInput: bindActionCreators(inputHandler.handleInput, dispatch),
  connect: bindActionCreators(actionCable.connectToCable, dispatch),
  setWhisper: bindActionCreators(setWhisperToUser, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatIndex);
