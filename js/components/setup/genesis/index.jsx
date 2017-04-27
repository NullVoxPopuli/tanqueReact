import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';

import {
  Form, FormGroup,
  Card, CardBlock, CardHeader, CardText,
  Input, Label, Row, Col, Button
} from 'reactstrap';

import { base64ToHex } from 'utility';

import { mutCreator } from 'components/state-helpers';

export default class Genesis extends Component {
  static propTypes = {
    alias: PropTypes.string,

    updateAlias: PropTypes.func.isRequired,
    setUid: PropTypes.func.isRequired,
    regenerateKeys: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { alias: props.alias };
    this.didSubmit = this.didSubmit.bind(this);
    this.mut = mutCreator(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ alias: nextProps.alias });
  }

  didSubmit() {
    const { updateAlias, regenerateKeys, setUid, next } = this.props;
    const { alias } = this.state;

    updateAlias(alias);

    const keys = regenerateKeys();
    const uid = base64ToHex(keys.publicKey);
    setUid(uid);

    next();
  }

  render() {
    const { alias } = this.state;
    const mut = this.mut;

    return (
      <div>
        <h1 className="display-4">What would you like to be called?</h1>

        <Card>
          <CardBlock>
            <Form onSubmit={this.didSubmit}>
              <FormGroup>
                <Label size='lg'>Your Alias</Label>
                <Input type='text'
                  size='lg'
                  value={alias}
                  onEnter={this.didSubmit}
                  onChange={mut('alias')} />
              </FormGroup>

              <Button block
                color='success'
                size='lg'
                className='float-right'
                onClick={this.didSubmit}>
                Next
              </Button>
            </Form>
          </CardBlock>
        </Card>
      </div>
    );
  }
}
