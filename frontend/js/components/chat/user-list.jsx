import React from 'react';
import UserListRow from './user-list-row';
import { Nav, NavItem, Row, Col } from 'react-bootstrap';

import store, { defaultChat } from 'js/data/store';

export default class extends React.Component {
  constructor(props) {
    super(props);
    store.add('user', [
      {
        id: 1,
        alias: 'neatInternetName',
        status: 'online',
      },
      {
        id: 2,
        alias: 'NullVoxPopuli',
        status: 'online',
      },
      {
        id: 3,
        alias: 'NeuroTek',
        status: 'offline',
      },
    ]);

    this.users = [{
      id: defaultChat,
      alias: 'All',
      status: 'online',
    },];
    this.users = this.users.concat(store.getAll('user'));
  }

  // set up whispering to the clicked user
  onSelect(user) {
    // TODO: write action which switches the app into whisper mode to this user
    return null;
  }

  handleUserSelect(user) {
    this.props.handleUserSelect(user);
  }

  render() {
    let userList = this.users.map(user =>
      <UserListRow
        user={user}
        handleUserSelect={this.handleUserSelect.bind(this, user)} />);
    return (
      <Nav bsStyle='pills' stacked onSelect={this.onSelect}>
        {userList}
      </Nav>
    );
  }
}
