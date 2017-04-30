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

    this.state = { showUsers: false };
    this.props.connect();
    this.didEnterMessage = this.didEnterMessage.bind(this);
    this.didClickShowUsers = this.didClickShowUsers.bind(this);
  }

  handleUserSelect(user) {
    // let id = (user === defaultChat ? user : user.id);
    // this.currentRoomId = id;
    // let path = `/chat/${id}`;
    //
    // this.props.router.push(path);
  }

  didEnterMessage(message) {
    const { handleInput } = this.props;

    handleInput(message);
  }

  didClickShowUsers() {
    this.setState({ showUsers: !this.state.showUsers });
  }

  render() {
    const { messages } = this.props;
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
          onClick={this.didClickShowUsers}
          className='off-canvas-open-button'>
          <i className='fa fa-bars'></i>
        </a>
        <Col className='d-flex h-100 flex-column mr-0'>
          <div
            id='chat-wrapper'
            className='h-100 d-flex flex-column'>
            <ChatRoom
              messages={messages} />
            <TextEntry
              onSendText={this.didEnterMessage}
              currentRoomId={this.currentRoomId}/>
          </div>
        </Col>
        <Col
          className='h-100 pl-0'
          style={{
            display: showUsers ? 'flex' : 'none',
            maxWidth: '300px'
          }}>
          <UserList
            users={this.users}
            handleUserSelect={this.handleUserSelect.bind(this)}/>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  config: state.identity.config,
  messages: state.data.messages.records
});

const mapDispatchToProps = dispatch => ({
  handleInput: bindActionCreators(inputHandler.handleInput, dispatch),
  connect: bindActionCreators(actionCable.connectToCable, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatIndex);
