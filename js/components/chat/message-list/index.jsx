import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import MessageRow from './message-row';

export default class MessageList extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired
  }
  constructor(props) {
    super(props);

    this.state = { };
  }

  render() {
    const { messages: messageRecords } = this.props;

    const messages = [];
    const pastMessages = [];
    const numberOfMessages = messageRecords.length;
    for (let i = 0; i < numberOfMessages; i++) {
      const m = messageRecords[i];
      const name = m.sender.name;
      const date = moment(m.time_sent).format('lll');
      const msg = m.decryptedMessage || 'could not be decrypted';
      const previous = pastMessages[i - i] || {};
      const previousSender = previous.sender || {};

      const sameMemberAsPrevious = (
        m.sender.uid === previousSender.uid &&
        m.type === previous.type
      );

      pastMessages.push(m);
      messages.push(
        <MessageRow
          sameMemberAsPrevious={sameMemberAsPrevious}
          type={m.type}
          time={date}
          name={name}
          message={msg}
        />);
    }

    return (
      <div
        style={{ flex: '1' }}
        className='flex-grow'>
        <div className='messages'>
          {messages}
        </div>
      </div>
    );
  }
}
