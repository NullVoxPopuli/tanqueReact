import React from 'react';
import { render } from 'react-dom';
import { Row, Col } from 'react-bootstrap';

import UserList from './user-list';
import TextEntry from './text-entry';
import MessagePane from './message-pane';

import store, { defaultChat } from 'js/data/store';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.users         = store.getAll('user');
    this.chatRooms     = store.getAll('chatRoom');
    this.currentRoomId = defaultChat;
  }

  handleSendMessage(message) {
    // TODO: build a network message, and send to the web socket
    store.add('message', {
      chatRoomId: this.currentRoomId,
      content: message,
    });

    // Ensure that we re-render the child components
    this.forceUpdate();
  }

  render() {
    return (
      <Row>
        <Col xs={9}>
          <MessagePane
            rooms={this.chatRooms}
            currentRoomId={this.currentRoomId}
            messages={this.messages} />
          <TextEntry
            currentRoomId={this.currentRoomId}
            onSendMessage={this.handleSendMessage.bind(this)}/>
        </Col>
        <Col xs={3}>
          <UserList
            users={this.users} />
        </Col>
      </Row>
    );
  }
}
