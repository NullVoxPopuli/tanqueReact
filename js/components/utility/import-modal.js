import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { mutCreator } from 'components/state-helpers';

const placeholder = `{
  "alias": "some alias",
  "publickey": "fakeNaClpublickey",
  "uid": "AUniqueIdentifier"
}`;

class ImportModal extends Component {
  static propTypes = {
    importIdentity: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = { showModal: false, identity: null };
    this.mut = mutCreator(this);
  }

  didClose() {
    this.setState({ showModal: false });
  }

  didOpen() {
    this.setState({ showModal: true });
  }

  didClickImport() {
    this.props.importIdentity(this.state.identity);
    this.close();
  }

  _onChange(e) {
    this.setState({ identity: e.target.value });
  }

  render() {
    const { showModal } = this.state;
    const mut = this.mut;

    const close = this.didClose.bind(this);
    const open = this.didOpen.bind(this);
    const importIdentity = this.didClickImport.bind(this);

    return (
      <li>
        <a
          role='button'
          onClick={open}>
          Import Identity
        </a>

        <Modal show={showModal} onHide={close}>
          <Modal.Header closeButton>
            <Modal.Title>Import Identity</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Paste Identity File Here</h4>

            <FormGroup controlId="formControlsTextarea">
              <FormControl
                componentClass="textarea"
                rows={5}
                onChange={mut('identity')}
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
            <Button onClick={close}>Close</Button>
            <Button
              className='btn-success'
              onClick={importIdentity}>Import</Button>
          </Modal.Footer>
        </Modal>
      </li>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  importIdentity(){}
});


export default connect(mapStateToProps, mapDispatchToProps)(ImportModal);
