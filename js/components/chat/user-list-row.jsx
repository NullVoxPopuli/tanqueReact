import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesome as Icon } from 'react-fontawesome';

export default class UserListRow extends Component {
  constructor(props) {
    super(props);
    this.user = props.user;
  }

  isOnline() {
    return this.user.status === 'ONLINE';
  }

  onlineStatus() {
    return null;
    // if (this.isOnline()) {
    //   return <Icon name='circle' />;
    // }
    //
    // return <Icon name='circle-o' />;
  }

  handleUserSelect(user) {
    this.props.handleUserSelect(user);
  }

  render() {
    const status = this.onlineStatus();
    return (
      <Row onClick={this.handleUserSelect.bind(this, this.user)}>
        <Col xs={2}> {status} </Col>
        <Col xs={10}>
          {this.user.alias}
        </Col>
      </Row>
    );
  }
}
