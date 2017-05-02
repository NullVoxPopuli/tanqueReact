import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Input, Button } from 'reactstrap';

import { mutCreator } from 'react-state-helpers';

export default class TextEntry extends React.Component {
  static propTypes = {
    whisperingToUser: PropTypes.any,
    onSendText: PropTypes.func.isRequired
  }

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
    this.isSendingDisabled = this.isSendingDisabled.bind(this);
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      if (this.isSendingDisabled()) return;
      this.sendMessage();
    }
  }

  isSendingDisabled() {
    const { messageToSend } = this.state;

    return _.isEmpty(messageToSend);
  }

  sendMessage() {
    const { onSendText } = this.props;
    const { messageToSend } = this.state;

    // clear the state before we do anything that
    // could cause errors (so the text box can be
    // free for more text entry)
    this.setState({ messageToSend: '' });

    onSendText(messageToSend);
  }

  render() {
    const {
      state: { messageToSend },
      props: { whisperingToUser: to },
      mut, onKeyPress, sendMessage, isSendingDisabled
    } = this;

    const who = (to && to.alias) || 'everyone';
    const sendDisabled = isSendingDisabled();

    return (
      <div
        className='p-2 d-flex justify-content-starts'>
        <Input
          placeholder={`Send a message to ${who}...`}
          className='p-3 full-width'
          type='text'
          value={messageToSend}
          onKeyPress={onKeyPress}
          onChange={mut('messageToSend')}/>

        <Button
          disabled={sendDisabled}
          onClick={sendMessage}
          color='success'>
          Send
        </Button>
      </div>
    );
  }
}
