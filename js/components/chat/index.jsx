import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'reactstrap';

import UserList from './user-list';
import TextEntry from './text-entry';
import ChatRoom from './chat-room';

export default class Index extends React.Component {
  static propTypes = {
  }

  constructor(props) {
    super(props);
  }

  handleUserSelect(user) {
    // let id = (user === defaultChat ? user : user.id);
    // this.currentRoomId = id;
    // let path = `/chat/${id}`;
    //
    // this.props.router.push(path);
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
