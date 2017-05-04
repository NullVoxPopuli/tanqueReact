import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

export default class UserListRow extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    handleUserSelect: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    const { user } = props;

    this.handleUserSelect = this.handleUserSelect.bind(this, user);
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

  handleUserSelect(user) {
    this.props.handleUserSelect(user);
  }

  render() {
    const { user, active } = this.props;
    const status = this.onlineStatus();
    return (
      <Row
        style={{ cursor: 'pointer', fontWeight: active ? 'bold' : 'normal' }}
        onClick={this.handleUserSelect}>
        <Col xs={2}> {status} </Col>
        <Col xs={10}>
          {user.alias}
        </Col>
      </Row>
    );
  }
}
