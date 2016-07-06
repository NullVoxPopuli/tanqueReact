import React from 'react';
import { render } from 'react-dom';
import store, { defaultChat } from 'js/data/store';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.rooms = props.rooms;
    this.currentRoomId = props.currentRoomId;
    this.store = store;
  }

  currentRoom() {
    let rooms = store.filter('chatRoom', {
      id: this.currentRoomId,
    });

    // TODO: what if room isn't found?
    return rooms[0];
  }

  messages() {
    return this.currentRoom().messages;
  }

  render() {
    let messageRecords = this.messages();

    if (messageRecords.length > 0) {
      let messages = this.messages().map(m => <p>{m.content}</p>);
      return (<div>{messages}</div>);
    }

    return (<div>No messages... yet!</div>);
  }
}
