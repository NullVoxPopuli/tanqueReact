import React from 'react';
import { render } from 'react-dom';

import store, { defaultChat } from 'js/data/store';
import { connect } from 'react-redux';

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.store = store;
    this.state = {};
  }

  render() {
    let messageRecords = this.props.messages;

    let messageMarkup = 'There are no messages... yet.';

    if (messageRecords.length > 0) {
      let messages = messageRecords.map(m => {
        let fromUser = this.props.store.get('user', m.content.uid);
        let fromName = fromUser ? fromUser.alias : '';
        return (
          <tr>
            <td>{new Date(m.id).toString()}</td>
            <td>{m.content.uid}</td>
            <td>{fromName}</td>
            <td>{m.content.message}</td>
          </tr>
        );
      });

      console.log(messages);
      messageMarkup = (
        <table className='messages'>
          <thead></thead>
          <tbody>
            {messages}
          </tbody>
        </table>
      );
    }

    let time = new Date(this.props.lastMessageReceived).toString();

    return (
      <div>
        <h3>{this.state.id}</h3>
        <h4>Messages: {messageRecords.length}</h4>
        <h4>Last Message Received: {time}</h4>
        <hr />
        {messageMarkup}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    store: state.dataStore,
    messages: state.dataStore.getAll('message'),
    lastMessageReceived: state.cable.lastMessageReceived,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoom);
