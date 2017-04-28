import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

export default class SimpleModal extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    open: PropTypes.bool,
    // children: PropTypes.any.isRequired,
    additionalFooterButtons: PropTypes.any,
    proceedButtonText: PropTypes.string.isRequired,
    takeMeBackText: PropTypes.string,
    onAbort: PropTypes.func.isRequired
  }


  constructor(props) {
    super(props);
    this.state = { modal: props.open };

    this.toggle = this.toggle.bind(this);
    this.didClose = this.didClose.bind(this);
    this.didOpen = this.didOpen.bind(this);
    this.didConfirm = this.didConfirm.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  didClose() {
    this.toggle();
    this.props.onAbort();
  }

  didOpen() {
    this.toggle()
  }

  didConfirm() {
    this.toggle();
  }

  render() {
    const {
      title, children,
      additionalFooterButtons,
      proceedButtonText, takeMeBackText
    } = this.props;

    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}>
          <ModalHeader className='bg-danger' toggle={this.toggle}>{title}</ModalHeader>
          <ModalBody>
            {children}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.didConfirm}>
              {proceedButtonText}
            </Button>
            {additionalFooterButtons}
            <Button color='success' onClick={this.didClose}>{takeMeBackText || 'Take Me Back!'}</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
