import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import store, { defaultChat } from 'js/data/store';
import { OFFLINE, ONLINE } from 'js/data/models/user';
import { sendMessageToCable, received } from 'js/actions/action-cable-actions';

class TextEntry extends React.Component {
  constructor(props) {
    super(props);

    // which room / person do we send to?
    this.currentRoomId = props.currentRoomId;

    // setup which variables are going to be bound to changes
    this.state = {
      messageToSend: '',
    };

    // set up appropriate context bindings for actions
    this._onKeyPress = this._onKeyPress.bind(this);
    this._onChange   = this._onChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  _onKeyPress(e) {
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  }

  _onChange(e) {
    this.setState({ messageToSend: e.target.value });
  }

  sendMessage() {
    console.log('sendMessage');

    if (this.currentRoomId === defaultChat) {
      let onlineUsers = store.filter('user', {
        status: ONLINE,
      });

      onlineUsers.forEach(user => {
        this.props.sendMessageToCable(user.id, this.state.messageToSend);
      });
    } else {
      this.props.sendMessageToCable(this.currentRoomId, this.state.messageToSend);
    }

    // call received so that we can display our own chat messages
    // so that other people's replies have context
    this.props.received({ uid: this.props.myAlias, message: this.state.messageToSend });
    this.setState({ messageToSend: '' });
  }

  render() {
    return (
      <div>
        <input type='text'
         value={this.state.messageToSend}
         onKeyPress={this._onKeyPress}
         onChange={this._onChange}
        />
        <button onClick={this.sendMessage.bind(this)}>Send</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    store: state.dataStore,
    messages: state.dataStore.getAll('message'),
    myAlias: state.config.alias,
    lastMessageReceived: state.cable.lastMessageReceived,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sendMessageToCable: (id, msg) => dispatch(sendMessageToCable(id, msg)),
    received: data => dispatch(received(data)),
  };
}

export default connect(
  mapStateToProps,
  { sendMessageToCable, received }
)(TextEntry);
