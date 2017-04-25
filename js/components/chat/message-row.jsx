import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Badge } from 'reactstrap';

export default class MessageRow extends Component {
  static propTypes = {
    time: PropTypes.isRequired,
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }

  render() {
    const { time, name, message } = this.props;
    return (
      <div className='clearfix'>
        <div className={'p-2'}>
          <strong>{name}</strong> <small>{time}</small><br />
          {message}
        </div>
      </div>
    );
  }
}
