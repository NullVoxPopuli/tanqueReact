import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { connect } from 'react-redux';
import MessageRow from './message-row';

class ChatRoom extends Component {
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
      const sameMemberAsPrevious = (
        m.sender.uid === (
          ((pastMessages[i - 1] || {})
            .sender || {})
            .uid
        )
      );

      pastMessages.push(m);
      messages.push(
        <MessageRow
          sameMemberAsPrevious={sameMemberAsPrevious}
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


const mapStateToProps = state => ({
  publicKey: state.identity.config.publicKey,
  messages: state.data.messages.records
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoom);
