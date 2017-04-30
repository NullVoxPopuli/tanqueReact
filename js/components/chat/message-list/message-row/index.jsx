import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import MessageContent from './message-content';

import './style.scss';

export default class MessageRow extends Component {
  static propTypes = {
    message: PropTypes.object.isRequired,
    toUser: PropTypes.object,
    sameMemberAsPrevious: PropTypes.bool
  }

  render() {
    const { message, sameMemberAsPrevious } = this.props;
    const { to, toName, type, time_sent: timeSent, sender, decryptedMessage } = message;
    const name = sender.name;
    const toSomeoneElse = (to !== undefined && to && to !== sender.uid);
    const time = moment(timeSent).format('lll');
    const msg = decryptedMessage || 'could not be decrypted';

    let messageHeader = '';

    if (!sameMemberAsPrevious) {
      let names = name;
      if (toSomeoneElse) {
        names = `${name} → ${toName}`;
      }
      messageHeader = (
        <span className='message-header'>
          <strong>{names}</strong> <small className='float-right'>{time}</small>
        </span>
      );
    }

    return (
      <div className={`message clearfix ${type}`}>
        <div className={'p-2'}>
          {messageHeader}

          <MessageContent
            message={msg}
            className='message-content' />
        </div>
      </div>
    );
  }
}
