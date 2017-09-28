import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { FormGroup, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import * as Instascan from 'instascan';

import { mutCreator } from 'react-state-helpers';
import FileChooser from 'components/file-chooser';
import SimpleModal from 'components/-components/simple-modal';

import { toastSuccess, toastError } from 'utility/toast';

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

@connect(mapStateToProps, mapDispatchToProps)
export default class ImportModal extends Component {
  static propTypes = {
    importUser: PropTypes.func.isRequired,
    tagName: PropTypes.string
  }

  constructor(props) {
    super(props);

    this.state = {
      scanning: false,
      identity: null,
      importDisabled: true,
      Tag: props.tagName || 'li'
    };
    this.mut = mutCreator(this);

    this.didClickImport = this.didClickImport.bind(this);
    this.didSelectFile = this.didSelectFile.bind(this);
    this.identityChanged = this.identityChanged.bind(this);
    this.didClickScanQRCode = this.didClickScanQRCode.bind(this);
  }
  //
  // componentDidMount() {
  //   let scanner = new Instascan.Scanner({
  //     video: document.getElementById('preview'),
  //     mirror: false,
  //     continuous: true
  //   });
  //
  //   scanner.addListener('scan', content => {
  //     alert(content);
  //   });
  //
  //   Instascan.Camera.getCameras()
  //     .then(cameras => {
  //       if (cameras.length > 0) {
  //         scanner.start(cameras[0]);
  //       } else {
  //         toastError('No Cameras Found');
  //       }
  //     }).catch(e => {
  //       toastError(e);
  //     });
  //
  // }


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

  async didClickScanQRCode() {
    this.setState({ scanning: true });

    const scanner = new Instascan.Scanner({
      video: document.getElementById('preview'),
      mirror: false,
      continuous: true
    });

    scanner.addListener('scan', content => {
      this.setState({ identity: content });
    });


    try {
      const cameras = await Instascan.Camera.getCameras();

      if (cameras.length > 0) {
        await scanner.start(cameras[0]);
      } else {
        toastError('No Cameras Found');
        this.setState({ scanning: false });
      }
    } catch (e) {
      toastError(e.message);
      this.setState({ scanning: false });
    }
  }

  // TODO: add validation
  render() {
    const { identity, importDisabled, Tag, scanning } = this.state;
    const { didClickImport, didSelectFile, identityChanged, didClickScanQRCode } = this;

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
              <Button onClick={didClickScanQRCode}>
                <i className='fa fa-qrcode'></i>
              </Button>
            </span>

          }>

          { scanning && <video id="preview" autoPlay="autoplay"></video> }
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
