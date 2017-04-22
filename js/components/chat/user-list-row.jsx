import React from 'react';
import { NavItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { Row, Col } from 'react-bootstrap';

export default class extends NavItem {
  constructor(props) {
    super(props);
    this.user = props.user;
  }

  isOnline() {
    return this.user.status === ONLINE;
  }

  onlineStatus() {
    if (this.isOnline()) {
      return <FontAwesome name='circle' className='online'/>;
    }

    return <FontAwesome name='circle-o' className='offline' />;
  }

  handleUserSelect(user) {
    this.props.handleUserSelect(user);
  }

  render() {
    let status = this.onlineStatus();
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
