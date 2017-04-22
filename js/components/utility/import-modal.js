import React from 'react';
import { NavItem, Button, Modal, FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { importIdentity } from 'js/actions/identity-actions';

class ImportModal extends React.Component {

  getInitialState() {
    return { showModal: false, identity: null, };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  importIdentity() {
    this.props.importIdentity(this.state.identity);
    this.close();
  }

  _onChange(e) {
    this.setState({ identity: e.target.value });
  }

  render() {
    let placeholder = `{
  "alias": "some alias",
  "publickey": "fakeNaClpublickey",
  "uid": "AUniqueIdentifier"
}
`;
    return (
      <li>
        <a
          role='button'
          onClick={this.open}>
          Import Identity
        </a>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Import Identity</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Paste Identity File Here</h4>
            <FormGroup controlId="formControlsTextarea">
              <FormControl
                componentClass="textarea"
                rows={5}
                onChange={this._onChange}
                placeholder={placeholder} />
            </FormGroup>
            <p>
              This should contain the keys&nbsp;
              <em><strong>alias</strong></em>,&nbsp;
              <em><strong>publickey</strong></em>, and&nbsp;
              <em><strong>uid</strong></em>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
            <Button
              className='btn-success'
              onClick={this.importIdentity}>Import</Button>
          </Modal.Footer>
        </Modal>
      </li>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(
  mapStateToProps,
  { importIdentity }
)(ImportModal);
