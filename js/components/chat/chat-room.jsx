import React from 'react';
import moment from 'moment';

import { connect } from 'react-redux';
import MessageRow from './message-row';

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = { };
  }

  render() {
    const { publicKey } = this.props;

    let messageMarkup = 'There are no messages... yet.';

    const messageRecords = [{
      time_sent: new Date(),
      message: 'encrypted',
      decryptedMessage: 'decrypted',
      sender: {
        name: 'etk',
        location: 'ip address',
        uid: 'uid/public-key'
      }
    }, {
      time_sent: new Date(),
      message: 'encrypted',
      decryptedMessage: 'Part of Bootstrap’s job is to provide an elegant, consistent, and simple baseline to build upon. We use Reboot, a collection of element-specific CSS changes in a single file, to kickstart that.',
      sender: {
        name: 'nvp',
        location: 'ip address',
        uid: publicKey
      }
    }, {
      time_sent: new Date(),
      message: 'encrypted',
      decryptedMessage: 'decrypted',
      sender: {
        name: 'etk',
        location: 'ip address',
        uid: 'uid/public-key'
      }
    }, {
      time_sent: new Date(),
      message: 'encrypted',
      decryptedMessage: 'decrypted',
      sender: {
        name: 'nvp',
        location: 'ip address',
        uid: publicKey
      }
    }, {
      time_sent: new Date(),
      message: 'encrypted',
      decryptedMessage: 'decrypted',
      sender: {
        name: 'etk',
        location: 'ip address',
        uid: 'uid/public-key'
      }
    }];

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
        <h3>{this.state.id}</h3>
        <h4>Last Message Received</h4>
        <hr />
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
