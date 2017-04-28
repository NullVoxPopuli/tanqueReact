import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.scss';

export default class MessageRow extends Component {
  static propTypes = {
    time: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }

  render() {
    const { time, name, message } = this.props;
    return (
      <div className='message clearfix'>
        <div className={'p-2'}>
          <span className='message-header'>
            <strong>{name}</strong> <small>{time}</small>
          </span>
          <span className='message-content'>{message}</span>
        </div>
      </div>
    );
  }
}
