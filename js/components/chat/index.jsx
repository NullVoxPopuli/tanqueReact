import React from 'react';
import PropTypes from 'prop-types';

import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { Row, Col } from 'reactstrap';

import UserList from './user-list';
import TextEntry from './text-entry';
import ChatRoom from './chat-room';

class Index extends React.Component {
  static propTypes = {
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired
  }

  constructor(props, context) {
    super(props);

    // this.users         = store.getAll('user');
    // this.chatRooms     = store.getAll('chatRoom');
    this.currentRoomId = defaultChat;
  }

  handleUserSelect(user) {
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

let routed = withRouter(Index);

export default routed;
