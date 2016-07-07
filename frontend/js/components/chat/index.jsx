import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { withRouter } from 'react-router';

import { Row, Col } from 'react-bootstrap';

import UserList from './user-list';
import TextEntry from './text-entry';

import store, { defaultChat } from 'js/data/store';

class Index extends React.Component {
  constructor(props, context) {
    super(props);

    this.users         = store.getAll('user');
    this.chatRooms     = store.getAll('chatRoom');
    this.currentRoomId = defaultChat;
  }

  handleSendMessage(message) {
    console.log(message);
    console.log(this.currentRoomId);

    // TODO: build a network message, and send to the web socket
    store.add('message', {
      chatRoomId: this.currentRoomId,
      content: message,
    });

    // Ensure that we re-render the child components
    this.forceUpdate();
    this.props.children.props.route.component.forceUpdate();
  }

  handleUserSelect(user) {
    console.log(user);
    console.log('switching the current chat room');

    let id = (user === defaultChat ? user : user.id);
    this.currentRoomId = id;
    let path = `/chat/${id}`;

    this.props.router.push(path);
  }

  render() {
    return (
      <Row>
        <Col xs={9}>
          {this.props.children}
          <TextEntry
            currentRoomId={this.currentRoomId}
            onSendMessage={this.handleSendMessage.bind(this)}/>
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

Index.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Index);
