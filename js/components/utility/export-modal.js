import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

class ExportModal extends React.Component {
  static propTypes = {
    config: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = { showModal: false };
  }

  didClose() {
    this.setState({ showModal: false });
  }

  didOpen() {
    this.setState({ showModal: true });
  }

  identityAsFormattedJson() {
    const { config } = this.props;
    const { alias, publicKey: publickey, uid } = (config || {});
    const json = { alias, publickey, uid };

    return JSON.stringify(json, null, '  ');
  }

  render() {
    const { config } = this.props;

    // don't show the export functionality when
    // we haven't set ourselves up yet.
    if (_.isEmpty(config)) return null;

    const { showModal } = this.state;
    const identity = this.identityAsFormattedJson();

    const close = this.didClose.bind(this);
    const open = this.didOpen.bind(this);

    return (
      <li>
        <a
          role='button'
          onClick={open}>
          Export Identity
        </a>

        <Modal show={showModal} onHide={close}>
          <Modal.Header closeButton>
            <Modal.Title>Export Identity</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Copy and Paste this to a file</h4>
            <pre>
              {identity}
            </pre>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </li>
    );
  }
}


const mapStateToProps = state => ({
  config: state.identity.config
});

export default connect(mapStateToProps, {})(ExportModal);
