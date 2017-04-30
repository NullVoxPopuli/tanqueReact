import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';

import { mutCreator } from 'components/state-helpers';
import FileChooser from 'components/file-chooser';
import SimpleModal from 'components/-components/simple-modal';

import { toastSuccess } from 'utility/toast';

import { data } from 'js/actions';
import { isUserIdentityValid } from 'js/actions/data/users';

const placeholder = `{
  "alias": "some alias",
  "publickey": "fakeNaClpublickey",
  "uid": "AUniqueIdentifier"
}`;

class ImportModal extends Component {
  static propTypes = {
    importUser: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = { identity: null, importDisabled: true };
    this.mut = mutCreator(this);

    this.didClickImport = this.didClickImport.bind(this);
    this.didSelectFile = this.didSelectFile.bind(this);
    this.identityChanged = this.identityChanged.bind(this);
  }

  didClickImport() {
    const identityToImport = this.state.identity;
    const identityJson = JSON.parse(identityToImport);

    this.props.importUser(identityJson);
    // TODO: make a .then of a promise
    toastSuccess(`${identityJson.alias} has been imported.`);
  }

  identityChanged(e) {
    try {
      const json = this.mut('identity')(e);
      const object = JSON.parse(json);
      const importDisabled = !isUserIdentityValid(object);

      this.setState({ importDisabled });
    } catch (err) {
      console.error(e.message);
    }
  }

  didSelectFile(fileString) {
    const object = JSON.parse(fileString);
    const prettyJson = JSON.stringify(object, null, 2);
    const importDisabled = !isUserIdentityValid(object);

    this.setState({ identity: prettyJson, importDisabled });
  }

  // TODO: add validation
  render() {
    const { identity, importDisabled } = this.state;
    const { didClickImport, didSelectFile, identityChanged } = this;

    return (
      <li>
        <SimpleModal
          title='Import Identity'
          buttonText='Import Identity'
          onConfirm={didClickImport}
          confirmText='Import'
          confirmDisabled={importDisabled}
          additionalFooterButtons={
            <FileChooser
              onChange={didSelectFile}
              buttonText={'Select Identity File'} />}>
          <h4>Paste Identity File Here</h4>

          <FormGroup>
            <Input
              type='textarea'
              rows={5}
              onChange={identityChanged}
              value={identity || ''}
              placeholder={placeholder} />
          </FormGroup>

          <p>
            This should contain the keys&nbsp;
            <em><strong>alias</strong></em>,&nbsp;
            <em><strong>publickey</strong></em>, and&nbsp;
            <em><strong>uid</strong></em>
          </p>

        </SimpleModal>
      </li>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  importUser: bindActionCreators(data.users.importUser, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportModal);
