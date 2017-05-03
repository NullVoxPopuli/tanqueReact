import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';

import MessageContent from './message-content';
import { WHISPER} from 'actions/data/messages';

import './style.scss';

export default class MessageRow extends Component {
  static propTypes = {
    message: PropTypes.object.isRequired,
    sameMemberAsPrevious: PropTypes.bool
  }

  whisperNames(name, toName, toSomeoneElse) {
    if (toSomeoneElse) {
      return <span>
        {name}&nbsp;
        <FontAwesome name='angle-double-right'/>
        &nbsp;{toName}
      </span>;
    }

    return <span>
        {toName}&nbsp;
        <FontAwesome name='angle-double-left' />
        &nbsp;{name}
      </span>;
  }

  render() {
    const { message, sameMemberAsPrevious, toUser } = this.props;
    const { to, toName, type, time_sent: timeSent, sender, decryptedMessage } = message;
    const name = sender.name;
    const toSomeoneElse = (to !== undefined && to /*&& to !== sender.uid*/);
    const time = moment(timeSent).format('lll');
    const msg = decryptedMessage || 'could not be decrypted';

    let messageHeader = '';

    if (!sameMemberAsPrevious) {
      let names = name;
      if (type === WHISPER) {
        names = this.whisperNames(name, toName, toSomeoneElse);
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
