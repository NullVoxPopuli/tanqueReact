import React from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, Row, Col } from 'reactstrap';

import UserListRow from './user-list-row';

class UserList extends React.Component {
  // set up whispering to the clicked user
  onSelect(user) {
    // TODO: write action which switches the app into whisper mode to this user
    return null;
  }

  handleUserSelect(user) {
    this.props.handleUserSelect(user);
  }

  render() {
    let userList = this.props.users.map(user =>
      <UserListRow
        user={user}
        handleUserSelect={this.handleUserSelect.bind(this, user)} />);
    return (
      <Nav onSelect={this.onSelect}>
        {userList}
      </Nav>
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
