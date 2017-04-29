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
    const { publicKey, messages: messageRecords } = this.props;

    let messageMarkup = 'There are no messages... yet.';

    const messages = messageRecords.map(m => {
      const name = m.sender.name;
      const date = moment(m.time_sent).format('lll');
      const msg = m.decryptedMessage || 'could not be decrypted';
      return <MessageRow
          time={date}
          name={name}
          message={msg}
          />;
    });

    messageMarkup = (
      <div className='messages'>
        {messages}
      </div>
    );

    return (
      <div>
        {messageMarkup}
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
