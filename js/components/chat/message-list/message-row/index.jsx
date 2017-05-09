import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Tooltip } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { toggleCreator } from 'react-state-helpers';

import { WHISPER } from 'actions/data/messages';

import MessageContent from './message-content';
import './style.scss';

export default class MessageRow extends Component {
  static propTypes = {
    message: PropTypes.object.isRequired,
    sameMemberAsPrevious: PropTypes.bool
  }

  constructor(props) {
    super(props);

    this.state = { showTooltip: false };
    this.toggle = toggleCreator(this);
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
    const {
      toggle
    } = this;

    const { message: payload, sameMemberAsPrevious } = this.props;
    const { to, toName, type, time_sent: timeSent, sender, message } = payload;
    const name = sender.name;
    const toSomeoneElse = (to !== undefined && to /* && to !== sender.uid*/);
    const time = moment(timeSent).format('lll');
    const msg = message || 'could not be decrypted';
    const transmissionStatus = (payload.__meta__ || {}).transmissionStatus || {};
    const { status, to_uid: toUid, reason } = transmissionStatus;
    const messageId = `message-${payload.id}`;
    const { showTooltip } = this.state;
    const isError = (status === 'error');


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
      <div id={messageId} className={`message clearfix ${type} ${status}`}>
        <div className={'p-2'}>
          {messageHeader}

          <MessageContent
            message={msg}
            className='message-content' />

          {isError && <Tooltip
            style={{ maxidth: 'inherit' }}
            className='text-left'
            target={messageId}
            isOpen={showTooltip}
            toggle={toggle('showTooltip')}
            autohide={false}>
            Message to {toUid} could not be sent.<br />
            <strong>Reason</strong><br />
            {reason}
          </Tooltip>}
        </div>
      </div>
    );
  }
}
