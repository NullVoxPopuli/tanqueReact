import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class UserListRow extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    handleUserSelect: PropTypes.func.isRequired
  }

  isOnline() {
    const { user } = this.props;
    return user.status === 'ONLINE';
  }

  onlineStatus() {
    // return null;
    if (this.isOnline()) {
      return <i className='fa fa-circle'></i>;
    }

    return <i className='fa fa-circle-o'></i>;
  }


  render() {
    const { user, active, handleUserSelect } = this.props;
    const status = this.onlineStatus();

    return (
      <div
        className='d-flex flex-rows'
        style={{ cursor: 'pointer', fontWeight: active ? 'bold' : 'normal' }}
        onClick={handleUserSelect}>
        <div className='mr-2'> {status} </div>
        <div>
          {user.alias}
        </div>
      </div>
    );
  }
}
