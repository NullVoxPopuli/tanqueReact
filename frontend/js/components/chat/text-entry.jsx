import React from 'react';
import { render } from 'react-dom';

export default class extends React.Component {
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
    this.props.onSendMessage(this.state.messageToSend);
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
        <button onClick={this.sendMessage}>Send</button>
      </div>
    );
  }
}
