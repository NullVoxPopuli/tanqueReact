import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Nav, NavItem, Row, Col } from 'reactstrap';

import UserListRow from './user-list-row';

class UserList extends Component {
  static propTypes = {
    didCloseList: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

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
    const { users, didCloseList } = this.props;
    const userList = users.map(user =>
      <NavItem key={user.uid}>
        <UserListRow
          user={user}
          handleUserSelect={this.handleUserSelect.bind(this, user)} />
      </NavItem>);

    return (
      <div style={{
        flex: 1,
        padding: '15px',
        borderLeft: '1px solid black',
        background: '#353535',
        color: 'white',
        boxShadow: '-10px 0 15px rgba(0,0,0,0.25)' }} >
        <a
          onClick={didCloseList}
          style={{
            color: 'white',
            position: 'absolute',
            top: '15px',
            right: '15px',
            height: '20px',
            width: '20px',
            cursor: 'pointer'
          }}>
          <i className='fa fa-times'></i>
        </a>
        <h5>Channels</h5>
        All
        <h5 className='mt-5'>Members</h5>
        <Nav vertical onSelect={this.onSelect}>
          {userList}
        </Nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.data.users.records
});

export default connect(
  mapStateToProps, {}
)(UserList);
