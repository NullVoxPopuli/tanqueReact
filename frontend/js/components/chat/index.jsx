import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { Row, Col } from 'react-bootstrap';

import UserList from './user-list';
import TextEntry from './text-entry';
import ChatRoom from './chat-room';

import store, { defaultChat } from 'js/data/store';

class Index extends React.Component {
  constructor(props, context) {
    super(props);

    this.users         = store.getAll('user');
    this.chatRooms     = store.getAll('chatRoom');
    this.currentRoomId = defaultChat;
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
          <ChatRoom />
          <TextEntry
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

Index.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};

let routed = withRouter(Index);

export default routed;
