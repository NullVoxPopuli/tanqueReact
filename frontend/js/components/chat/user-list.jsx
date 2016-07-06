import React from 'react';
import UserListRow from './user-list-row';
import { Nav } from 'react-bootstrap';
import store from 'js/data/store';

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

    this.users = store.getAll('user');
  }

  // set up whispering to the clicked user
  onSelect(user) {
    // TODO: write action which switches the app into whisper mode to this user
    return null;
  }

  render() {
    let userList = this.users.map(user => <UserListRow user={user}></UserListRow>);

    return (
      <Nav bsStyle='pills' stacked onSelect={this.onSelect}>
        {userList}
      </Nav>
    );
  }
}
