import React from 'react';
import { NavItem, Button, Modal, FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';

class ExportModal extends React.Component {

  getInitialState() {
    return { showModal: false, identity: null, };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    let identity = `{
  "alias": "${this.props.config.alias}",
  "publickey": "${this.props.config.publicKey}",
  "uid": "${this.props.config.uid}"
}`;

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

function mapStateToProps(state) {
  return {
    config: state.config,
  };
}

export default connect(
  mapStateToProps,
  { }
)(ExportModal);
