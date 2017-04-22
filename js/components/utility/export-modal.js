import React from 'react';
import PropTypes from 'prop-types';
import { NavItem, Button, Modal, FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';

class ExportModal extends React.Component {
  static propTypes = {
    config: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = { showModal: false };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  identityAsFormattedJson() {
    const { config } = this.props;
    const { alias, publicKey: publickey, uid } = (config || {});
    const json = { alias, publickey, uid };

    return JSON.stringify(json, null, '  ');
  }

  render() {
    const identity = this.identityAsFormattedJson();

    return (
      <li>
        <a
          role='button'
          onClick={this.open}>
          Export Identity
        </a>

        <Modal show={this.state.showModal} onHide={this.close}>
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
            <Button onClick={this.close}>Close</Button>
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
