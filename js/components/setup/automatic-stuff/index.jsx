import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FormGroup, Card, CardBlock, CardHeader, CardText, Input, Label, Row, Col, Button } from 'reactstrap';

export default class AutomaticStuff extends Component {
  static propTypes = {
    publicKey: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    relays: PropTypes.array.isRequired,

    next: PropTypes.func.isRequired
  }

  render() {
    const { uid, publicKey, relays, next } = this.props;
    return (
      <div>
        <h1 className='display-4'>These were generated for you</h1>
        <Card>
          <CardBlock>
            <CardHeader>Unique Identifier (UID)- Deprecated</CardHeader>
            <CardText>
              {uid}
            </CardText>
          </CardBlock>
        </Card>
      </div>
    );
  }
}
