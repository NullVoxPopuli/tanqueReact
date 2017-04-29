import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';


import UserList from './user-list';
import TextEntry from './entry';
import ChatRoom from './chat-room';

import { actionCable, messageDispatch } from 'js/actions/network';

class ChatIndex extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,

    sendToAll: PropTypes.func.isRequired,
    connect: PropTypes.func.isRequired
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
    const { sendToAll } = this.props;

    sendToAll(message, 'chat');
  }

  render() {
    const { messages } = this.props;

    return (
      <div>
        <Row className='mb-5'>
          {/* <Col xs={9}> */}
            <ChatRoom
              messages={messages} />
          {/* </Col> */}
          {/* <Col xs={3}> */}
            {/* <UserList
              users={this.users}
              handleUserSelect={this.handleUserSelect.bind(this)}/> */}
          {/* </Col> */}
        </Row>
        <TextEntry
          onSendText={this.didEnterMessage}
          currentRoomId={this.currentRoomId}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  config: state.identity.config,
  messages: state.data.messages.records
});

const mapDispatchToProps = dispatch => ({
  sendToAll: bindActionCreators(messageDispatch.sendToAll, dispatch),
  connect: bindActionCreators(actionCable.connectToCable, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatIndex);
