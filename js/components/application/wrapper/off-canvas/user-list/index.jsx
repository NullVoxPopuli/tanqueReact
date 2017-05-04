import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink } from 'reactstrap';
import _ from 'lodash';

import UserListRow from './user-list-row';

export default class UserList extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    whisperingToUser: PropTypes.any,
    didCloseList: PropTypes.func.isRequired,
    handleUserSelect: PropTypes.func.isRequired
  }

  handleUserSelect(user) {
    this.props.handleUserSelect(user);
  }

  // maybbe use this
  // https://github.com/mango/slideout
  render() {
    const { users, whisperingToUser: to } = this.props;
    const userList = users.map(user =>
      <NavItem key={user.uid}>
        <UserListRow
          active={user.uid === (to && to.uid)}
          user={user}
          handleUserSelect={this.handleUserSelect.bind(this, user)} />
      </NavItem>);

    // TODO: implement Channels
    const isWhispering = !_.isEmpty(to);

    return (
      <div >
        <h5>Channels</h5>
        <Nav>
          <NavItem>
            <NavLink
              style={{
                cusor: 'pointer',
                fontWeight: isWhispering ? 'normal' : 'bold' }}
              onClick={this.handleUserSelect.bind(this, '')}>
              General
            </NavLink>
          </NavItem>
        </Nav>

        <h5 className='mt-5'>Members</h5>
        <Nav vertical onSelect={this.onSelect}>
          {userList}
        </Nav>
      </div>
    );
  }
}
