import React from 'react';
import { render } from 'react-dom';

import store, { defaultChat } from 'js/data/store';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.store = store;
    this.state = {};
    this.updateMessages(this.props.chatRoomId);
  }

  componentWillReceiveProps(nextProps, nextState) {
    // if (nextProps.params.chatRoomId !== this.props.params.chatRoomId) {
    let id = nextProps.params.chatRoomId;
    this.updateMessages(id);
    let newState = Object.assign({}, this.state);
    this.setState(nextState);

    // }
  }

  updateMessages(roomId) {
    this.state.id = roomId;
    this.state.messages = this.roomFor(roomId).messages;
  }

  roomFor(id) {
    let room = this.store.get('chatRoom', id);

    // if the room doesn't yet exist, create it
    if (room === undefined) {
      room = this.store.add('chatRoom', {
        id: this.chatRoomId,
      });
    }

    return room;
  }

  render() {
    let messageRecords = this.state.messages;

    let messageMarkup = 'There are no messages... yet';

    if (messageRecords.length > 0) {
      let messages = messageRecords.map(m => <p>{m.content}</p>);
      messageMarkup = (<div>{messages}</div>);
    }

    return (
      <div>
        <h3>{this.state.id}</h3>
        <hr />
        {messageMarkup}
      </div>
    );
  }
}
