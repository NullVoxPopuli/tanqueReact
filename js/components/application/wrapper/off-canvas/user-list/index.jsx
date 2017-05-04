import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink } from 'reactstrap';
import _ from 'lodash';

import UserListRow from './user-list-row';

export default class UserList extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    whisperingToUser: PropTypes.any,
    handleUserSelect: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.handleUserSelect = this.handleUserSelect.bind(this);
  }

  handleUserSelect(user) {
    return () => {
      this.props.handleUserSelect(user);
    };
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
          handleUserSelect={this.handleUserSelect(user)} />
      </NavItem>);

    // TODO: implement Channels
    const isWhispering = !_.isEmpty(to);

    return (
      <div >
        <h5>Channels</h5>
        <Nav>
          <NavItem>
            <div
              style={{
                cusor: 'pointer',
                fontWeight: isWhispering ? 'normal' : 'bold' }}
              onClick={this.handleUserSelect('')}>
              General
            </div>
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
