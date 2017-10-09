import * as React from 'react';
import { bindActionCreators } from 'redux';
import { FormGroup, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';

import wrapState from 'react-state-helpers';
import FileChooser from 'components/-components/file-chooser';
import SimpleModal from 'components/-components/simple-modal';
import QRScanner from 'components/-components/qr-scanner';

import { toastSuccess, toastError } from 'js/utility/toast';

import { data } from 'js/actions';
import { isUserIdentityValid } from 'js/actions/data/users';

const placeholder = `{
  "alias": "some alias",
  "publickey": "fakeNaClpublickey",
  "uid": "AUniqueIdentifier"
}`;

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  importUser: bindActionCreators(data.users.importUser, dispatch)
});

@wrapState
@connect(mapStateToProps, mapDispatchToProps)
export default class ImportModal
  extends React.Component<{
    importUser: Function,
    tagName: string,
    toggle: Function,
    mut: Function,
    values: any
  }, {
    identity?: string|null,
    importDisabled: boolean,
    Tag: string
  }> {

  constructor(props) {
    super(props);

    this.state = {
      identity: null,
      importDisabled: true,
      Tag: props.tagName || 'li'
    };

    this.didClickImport = this.didClickImport.bind(this);
    this.didSelectFile = this.didSelectFile.bind(this);
    this.identityChanged = this.identityChanged.bind(this);
    this.onScan = this.onScan.bind(this);
    this.onScannerError = this.onScannerError.bind(this);
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
      const json = this.props.mut('identity')(e);
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


  onScan(content) {
    const { toggle } = this.props;

    this.didSelectFile(content);

    toggle('scanning')();
  }

  onScannerError(error) {
    const { toggle } = this.props;
    const { name, message } = error;

    console.error(error);

    switch (name) {
    case 'TrackStartError':
      toastError(`Camera might be in use. ${name}`);
      break;
    case 'NoCameraError':
      toastError('No Cameras Found');
      break;
    default:
      toastError(name ? `${name}: ${message}` : message);
    }


    toggle('scanning')();
  }

  // TODO: add validation
  render() {
    const {
      didClickImport, didSelectFile,
      identityChanged,
      onScan, onScannerError,
      state: { identity, importDisabled, Tag },
      props: { toggle, values: { scanning } }
    } = this;

    return (
      <Tag>
        <SimpleModal
          title='Import Identity'
          buttonText='Import Identity'
          onConfirm={didClickImport}
          confirmText='Import'
          confirmDisabled={importDisabled}
          additionalFooterButtons={
            <span className='d-flex flex-row'>
              <FileChooser
                onChange={didSelectFile}
                buttonText={'Select File'} />

              <Button onClick={toggle('scanning')}>
                <i className='fa fa-qrcode'></i>
              </Button>
            </span>

          }>

          { scanning && <QRScanner onScan={onScan} onError={onScannerError} /> }

          { !scanning && <span>
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
          </span>}

        </SimpleModal>
      </Tag>
    );
  }
}
