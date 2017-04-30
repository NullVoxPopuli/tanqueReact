import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

export default class UserListRow extends Component {
  static propTypes = {
    handleUserSelect: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
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
    const { user } = this.props;
    const status = this.onlineStatus();
    return (
      <Row
        style={{ cursor: 'pointer' }}
        onClick={this.handleUserSelect}>
        <Col xs={2}> {status} </Col>
        <Col xs={10}>
          {user.alias}
        </Col>
      </Row>
    );
  }
}
