import React from 'react';
import { connect } from 'react-redux';

import { sendMessageToCable, received } from 'js/actions/action-cable-actions';
import { Row, Col, FormGroup, Input } from 'reactstrap';


class TextEntry extends React.Component {
  constructor(props) {
    super(props);

    // which room / person do we send to?
    this.currentRoomId = props.currentRoomId;

    // setup which variables are going to be bound to changes
    this.state = {
      messageToSend: '',
    };

    // set up appropriate context bindings for actions
    this._onKeyPress = this._onKeyPress.bind(this);
    this._onChange   = this._onChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  _onKeyPress(e) {
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  }

  _onChange(e) {
    this.setState({ messageToSend: e.target.value });
  }

  sendMessage() {
    console.log('sendMessage');

    if (this.currentRoomId === defaultChat) {
      let onlineUsers = store.filter('user', {
        status: ONLINE,
      });

      onlineUsers.forEach(user => {
        this.props.sendMessageToCable(user.id, this.state.messageToSend);
      });
    } else {
      this.props.sendMessageToCable(this.currentRoomId, this.state.messageToSend);
    }

    // call received so that we can display our own chat messages
    // so that other people's replies have context
    this.props.received({ uid: this.props.myAlias, message: this.state.messageToSend });
    this.setState({ messageToSend: '' });
  }

  render() {
    return (
      <Row className='fixed-bottom p-2'>
        <Col sm={12}>
          <Input
            placeholder='Send a message...'
            className='p-2 full-width'
            type='text'
            value={this.state.messageToSend}
            onKeyPress={this._onKeyPress}
            onChange={this._onChange}
          />
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    store: state.dataStore,
    myAlias: state.identity.config.alias,
    lastMessageReceived: state.network.actionCable.lastMessageReceived
  };
}

export default connect(
  mapStateToProps,
  { sendMessageToCable, received }
)(TextEntry);
