import * as React from 'react';
import stateHelpers from 'react-state-helpers';

import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

@stateHelpers
export default class SimpleModal
  extends React.Component<{
    title: string,
    buttonText: string,
    additionalFooterButtons?: any,
    confirmText: string,
    confirmDisabled?: boolean,
    cancelText?: string,
    onConfirm: Function,
    toggle: Function,
    values?: any
    }, any> {

  render() {
    const {
      title, buttonText, children,
      additionalFooterButtons,
      confirmDisabled,
      confirmText, cancelText,
      onConfirm,
      toggle, values: { show }
    } = this.props;

    const toggleFn = toggle('show');
    const didConfirm = () => {
      onConfirm();
      toggleFn();
    };

    return (
      <div>
        <Button onClick={toggleFn}>
          {buttonText}
        </Button>
        <Modal
          isOpen={show}
          toggle={toggleFn}>
          <ModalHeader toggle={toggleFn}>{title}</ModalHeader>
          <ModalBody>
            {children}
          </ModalBody>
          <ModalFooter>
            <Button onClick={toggleFn}>{cancelText || 'Cancel'}</Button>
            {additionalFooterButtons}
            <Button
              color="success"
              disabled={confirmDisabled || false}
              onClick={didConfirm}>
              {confirmText}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
