import React from 'react';

import { Row, Col, FormGroup, Input } from 'reactstrap';

import { mutCreator } from 'components/state-helpers';

export default class TextEntry extends React.Component {
  constructor(props) {
    super(props);

    this.mut = mutCreator(this);

    // which room / person do we send to?
    this.currentRoomId = props.currentRoomId;

    // setup which variables are going to be bound to changes
    this.state = { messageToSend: '' };

    // set up appropriate context bindings for actions
    this._onKeyPress = this._onKeyPress.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  _onKeyPress(e) {
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  }

  sendMessage() {
    const { onSendText } = this.props;
    const { messageToSend } = this.state;

    onSendText(messageToSend);
    this.setState({ messageToSend: '' });
    window.scrollTo(0, document.body.scrollHeight);
  }

  render() {
    const mut = this.mut;

    return (
      <Row className='fixed-bottom p-2'>
        <Col sm={12}>
          <Input
            placeholder='Send a message...'
            className='p-2 full-width'
            type='text'
            value={this.state.messageToSend}
            onKeyPress={this._onKeyPress}
            onChange={mut('messageToSend')}
          />
        </Col>
      </Row>
    );
  }
}
