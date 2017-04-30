import React from 'react';

import { Input, Button } from 'reactstrap';

import { mutCreator } from 'components/state-helpers';

export default class TextEntry extends React.Component {
  constructor(props) {
    super(props);

    this.mut = mutCreator(this);

    // which room / person do we send to?
    this.currentRoomId = props.currentRoomId;

    // setup which variables are going to be bound to changes
    this.state = { messageToSend: '' };

    // set up appropriate context bindings for actions
    this.onKeyPress = this.onKeyPress.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  }

  sendMessage() {
    const { onSendText } = this.props;
    const { messageToSend } = this.state;

    // clear the state before we do anything that
    // could cause errors (so the text box can be
    // free for more text entry)
    this.setState({ messageToSend: '' });

    onSendText(messageToSend);
    window.scrollTo(0, document.body.scrollHeight);
  }

  render() {
    const mut = this.mut;

    const who = 'everyone';
    return (
      <div
        className='p-2 d-flex justify-content-starts'>
        <Input
          placeholder={`Send a message to ${who}...`}
          className='p-3 full-width'
          type='text'
          value={this.state.messageToSend}
          onKeyPress={this.onKeyPress}
          onChange={mut('messageToSend')}/>

        <Button onClick={this.sendMessage} color='success'>
          Send
        </Button>
      </div>
    );
  }
}
