import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, Row, Col } from 'reactstrap';

import UserListRow from './user-list-row';

class UserList extends Component {
  // set up whispering to the clicked user
  onSelect(user) {
    // TODO: write action which switches the app into whisper mode to this user
    return null;
  }

  handleUserSelect(user) {
    // this.props.handleUserSelect(user);
  }

  // maybbe use this
  // https://github.com/mango/slideout
  render() {
    const { users } = this.props;
    const userList = users.map(user =>
      <NavItem key={user}>
        <UserListRow
          user={user}
          handleUserSelect={this.handleUserSelect.bind(this, user)} />
      </NavItem>);
    return (
      <div>
        <h5>Member List</h5>
        <Nav onSelect={this.onSelect}>
          {userList}
        </Nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.data.users.records
  };
}

export default connect(
  mapStateToProps, {}
)(UserList);
