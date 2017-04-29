import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

export default class SimpleModal extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    // children: PropTypes.any.isRequired,
    additionalFooterButtons: PropTypes.any,
    confirmText: PropTypes.string.isRequired,
    confirmDisabled: PropTypes.bool,
    cancelText: PropTypes.string,
    onConfirm: PropTypes.func.isRequired
  }


  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

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
  }

  didOpen() {
    this.toggle()
  }

  didConfirm() {
    this.props.onConfirm();
    this.toggle();
  }

  render() {
    const {
      title, buttonText, children,
      additionalFooterButtons,
      confirmDisabled,
      confirmText, cancelText
    } = this.props;

    return (
      <div>
        <Button onClick={this.didOpen}>
          {buttonText}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
          <ModalBody>
            {children}
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.didClose}>{cancelText || 'Cancel'}</Button>
            {additionalFooterButtons}
            <Button
              color="success"
              disabled={confirmDisabled || false}
              onClick={this.didConfirm}>
              {confirmText}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
