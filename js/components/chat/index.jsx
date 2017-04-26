import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Row, Col } from 'reactstrap';

import UserList from './user-list';
import TextEntry from './entry';
import ChatRoom from './chat-room';

import * as actionCable from 'js/actions/network/action-cable';

class ChatIndex extends React.Component {
  static propTypes = {
  }

  constructor(props) {
    super(props);

    this.props.connect();
    this.didEnterMessage = this.didEnterMessage.bind(this);
  }

  handleUserSelect(user) {
    // let id = (user === defaultChat ? user : user.id);
    // this.currentRoomId = id;
    // let path = `/chat/${id}`;
    //
    // this.props.router.push(path);
  }

  didEnterMessage(message) {
    const { config, sendMessage, received } = this.props;
    const { publicKey } = config;

    sendMessage(publicKey, message);
    received({ uid: publicKey, message });
  }

  render() {
    return (
      <Row>
        <Col xs={9}>
          <ChatRoom />
          <TextEntry
            onSendText={this.didEnterMessage}
            currentRoomId={this.currentRoomId}/>
        </Col>
        <Col xs={3}>
          <UserList
            users={this.users}
            handleUserSelect={this.handleUserSelect.bind(this)}/>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  config: state.identity.config
});

const mapDispatchToProps = dispatch => ({
  sendMessage: bindActionCreators(actionCable.send, dispatch),
  received: actionCable.received,
  connect: bindActionCreators(actionCable.connectToCable, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatIndex)
