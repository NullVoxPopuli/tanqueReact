import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  Form, FormGroup,
  Card, CardBlock,
  Input, Label, Button
} from 'reactstrap';

import { base64ToHex } from 'utility';
import { isStoredConfigValid } from 'actions/identity/config';
import { mutCreator } from 'react-state-helpers';
import DangerModal from 'components/-components/danger-modal';
import FileChooser from 'components/-components/file-chooser';

import { toastSuccess, toastError } from 'utility/toast';

export default class Genesis extends Component {
  static propTypes = {
    alias: PropTypes.string,

    abort: PropTypes.func.isRequired,
    setUid: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,

    updateAlias: PropTypes.func.isRequired,
    regenerateKeys: PropTypes.func.isRequired,
    importSettings: PropTypes.func.isRequired,
    didImportSettings: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    const alreadyValid = isStoredConfigValid();

    this.state = { alias: props.alias, alreadyValid };
    this.mut = mutCreator(this);

    this.didSubmit = this.didSubmit.bind(this);
    this.importSettings = this.importSettings.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ alias: nextProps.alias });
  }

  importSettings(data) {
    const { importSettings, didImportSettings } = this.props;

    importSettings(data)
      .then(() => {
        toastSuccess('Settings have been imported.');
        didImportSettings();
      })
      .catch(toastError);
  }

  didSubmit() {
    const { updateAlias, regenerateKeys, setUid, next } = this.props;
    const { alias } = this.state;

    updateAlias(alias);

    regenerateKeys().then(keys => {
      const longUid = base64ToHex(keys.publicKey);
      const uid = longUid.slice(0, 32);

      setUid(uid);

      next();
    });
  }

  render() {
    const { abort } = this.props;
    const { alias, alreadyValid } = this.state;
    const mut = this.mut;

    const aliasMissing = _.isEmpty(alias);

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
                  placeholder='e.g.: Captain Jack Harkness'
                  onChange={mut('alias')} />
              </FormGroup>

              <Button block
                disabled={aliasMissing}
                color='success'
                size='lg'
                onClick={this.didSubmit}>
                Next
              </Button>
            </Form>
          </CardBlock>
        </Card>
        <FileChooser
          onChange={this.importSettings}
          buttonTag={'a'}
          buttonClasses={'mt-3 float-right'}
          buttonText={'Import Settings'} />
      </div>
    );
  }
}
