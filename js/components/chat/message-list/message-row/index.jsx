import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MessageContent from './message-content';

import './style.scss';

export default class MessageRow extends Component {
  static propTypes = {
    time: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    sameMemberAsPrevious: PropTypes.bool
  }

  render() {
    const {
      time, type, name, message, sameMemberAsPrevious
    } = this.props;

    let messageHeader = '';

    if (!sameMemberAsPrevious) {
      messageHeader = (
        <span className='message-header'>
          <strong>{name}</strong> <small>{time}</small>
        </span>
      );
    }

    return (
      <div className={`message clearfix ${type}`}>
        <div className={'p-2'}>
          {messageHeader}

          <MessageContent
            message={message}
            className='message-content' />
        </div>
      </div>
    );
  }
}
