import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
          message={m}
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
