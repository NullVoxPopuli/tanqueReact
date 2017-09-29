import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Button, Tooltip } from 'reactstrap';
import CopyToClipboard from 'react-copy-to-clipboard';

import { objectToDataURL, convertObjectToQRCodeDataURL } from 'utility';

import SimpleModal from 'components/-components/simple-modal';


const mapStateToProps = state => ({
  config: state.identity.config
});

@connect(mapStateToProps, {})
export default class ExportModal extends React.Component {
  static propTypes = {
    config: PropTypes.object,
    tagName: PropTypes.string
  }

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      copied: false,
      Tag: props.tagName || 'li'
    };
    this.didClickDownload = this.didClickDownload.bind(this);
    this.didCopy = this.didCopy.bind(this);
  }

  componentWillMount() {
    this.renderQrCode();
  }

  identity() {
    const { config } = this.props;
    const { alias, publicKey: publickey, uid } = (config || {});

    return { alias, publickey, uid };
  }

  didClickDownload() {
    this.refs.downloadIdentity.click();
  }

  didCopy() {
    this.setState({ copied: true });
    setTimeout(() => {
      this.setState({ copied: false });
    }, 1000);
  }

  async renderQrCode() {
    const identity = this.identity();
    const dataUrl = await convertObjectToQRCodeDataURL(identity);

    this.setState({ qrCode: dataUrl });
  }

  render() {
    const { config } = this.props;
    const { copied, Tag, qrCode } = this.state;

    // don't show the export functionality when
    // we haven't set ourselves up yet.
    if (_.isEmpty(config)) return null;

    const identity = this.identity();
    const formattedJson = JSON.stringify(identity, null, 2);
    const dataUrl = objectToDataURL(identity);
    const filename = `${config.alias}.json`;
    const tooltipId = 'export-tooltip-copy';

    return (
      <Tag>
        <a
          style={{ display: 'none' }}
          ref='downloadIdentity'
          href={dataUrl}
          download={filename}
          target='_blank'></a>

        <SimpleModal
          title='Export Identity'
          buttonText='Export Identity'
          confirmText='Download'
          cancelText='Close'
          additionalFooterButtons={
            <CopyToClipboard
              text={formattedJson}
              onCopy={this.didCopy}>
              <Button id={tooltipId}>
                Copy
                <Tooltip
                  placement="bottom"
                  isOpen={copied}
                  autohide={true}
                  target={tooltipId}>
                  Copied!
                </Tooltip>
              </Button>
            </CopyToClipboard>
          }
          onConfirm={this.didClickDownload}>
          <div className="d-flex flex-row align-items-stretch">
            <img src={qrCode} />

            <pre style={{ marginBottom: 0 }}>
              {formattedJson}
            </pre>
          </div>
        </SimpleModal>
      </Tag>
    );
  }
}
