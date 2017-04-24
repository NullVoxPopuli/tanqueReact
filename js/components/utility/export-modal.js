import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button, Modal } from 'reactstrap';
import { connect } from 'react-redux';

import SimpleModal from 'components/-components/simple-modal';

import { objectToDataURL } from 'utility';

class ExportModal extends React.Component {
  static propTypes = {
    config: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = { showModal: false };
    this.didClickDownload = this.didClickDownload.bind(this);
  }

  identityAsFormattedJson() {
    const { config } = this.props;
    const { alias, publicKey: publickey, uid } = (config || {});
    const json = { alias, publickey, uid };

    return JSON.stringify(json, null, '  ');
  }

  didClickDownload() {
    this.refs.downloadIdentity.click();
  }

  dataUrl() {
    const string = this.identityAsFormattedJson();
    return `data:text/json;base64,${string}`;
  }

  render() {
    const { config } = this.props;

    // don't show the export functionality when
    // we haven't set ourselves up yet.
    if (_.isEmpty(config)) return null;

    const identity = this.identityAsFormattedJson();
    const filename = `${config.alias}.json`
    const dataUrl = this.dataUrl();

    return (
      <li>
        <a
          style={{display: 'none'}}
          ref='downloadIdentity'
          href={dataUrl}
          download={filename}
          target='_blank'></a>
        <SimpleModal
          title='Export Identity'
          buttonText='Export Identity'
          confirmText='Download'
          onConfirm={this.didClickDownload}>
            <h4>Copy and Paste this to a file</h4>
            <pre>
              {identity}
            </pre>
          </SimpleModal>
      </li>
    );
  }
}


const mapStateToProps = state => ({
  config: state.identity.config
});

export default connect(mapStateToProps, {})(ExportModal);
