import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Form, FormGroup,
  Card, CardBlock,
  Input, Label, Button
} from 'reactstrap';

import { base64ToHex } from 'utility';
import { isStoredConfigValid } from 'actions/identity/config';
import { mutCreator } from 'components/state-helpers';
import DangerModal from 'components/-components/danger-modal';

export default class Genesis extends Component {
  static propTypes = {
    alias: PropTypes.string,

    abort: PropTypes.func.isRequired,
    updateAlias: PropTypes.func.isRequired,
    setUid: PropTypes.func.isRequired,
    regenerateKeys: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    const alreadyValid = isStoredConfigValid();

    this.state = { alias: props.alias, alreadyValid };
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
    const { abort } = this.props;
    const { alias, alreadyValid } = this.state;
    const mut = this.mut;

    return (
      <div>
        <h1 className="display-4">What would you like to be called?</h1>

        <DangerModal
          title='WARNING'
          open={alreadyValid}
          proceedButtonText='Proceed'
          onAbort={abort}>
          <h4>You already have a valid configuration.</h4>
          If you proceed, you will lose your identifying information
          (uid, publicKey, and privateKey) and you will no longer be able
          to connect to the network you were previously on.
          <br /><br />
          <h5><em>You have been warned.</em></h5>
        </DangerModal>
        <Card>
          <CardBlock>
            <Form onSubmit={this.didSubmit}>
              <FormGroup>
                <Label size='lg'>Your Alias</Label>
                <Input type='text'
                  size='lg'
                  value={alias}
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
