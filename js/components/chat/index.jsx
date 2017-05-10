import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import hotkey from 'react-shortcut-key'

import { actionCable } from 'actions/network';
import { inputHandler } from 'actions/views';
import { WHISPER } from 'actions/data/messages';

import TextEntry from './entry';
import MessageList from './message-list';

import './sticky-chat-entry.scss';

const keymap = {
  'ctrl+k': e => {
    e.preventDefault();
    console.log(e)
  },
  'ctrl+p': e => {
    e.preventDefault();
    console.log(e);
  }
};

class ChatIndex extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,

    handleInput: PropTypes.func.isRequired,
    connect: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.props.connect();
    this.didEnterMessage = this.didEnterMessage.bind(this);
  }

  didEnterMessage(message) {
    const { handleInput } = this.props;

    handleInput(message);
  }

  relevantMessages() {
    const { messages, config, whisperingToUser: to } = this.props;
    const myUid = config.uid;

    // we only filter on whispers
    if (to && to.uid) {
      return messages.filter(m => (
        m.type === WHISPER &&
        // from the to, or to the to
        (m.sender.uid === to.uid || m.to === to.uid)
      ));
    }

    return messages;
  }

  render() {
    const { whisperingToUser } = this.props;
    const messages = this.relevantMessages();

    return (
      <Row style={{
        position: 'fixed',
        bottom: '0px',
        top: '70px',
        left: '0px',
        right: '0px'
      }}>
        <Col className='d-flex h-100 flex-column'>
          <div
            id='chat-wrapper'
            className='h-100 d-flex flex-column'>
            <MessageList
              messages={messages} />
            <TextEntry
              whisperingToUser={whisperingToUser}
              onSendText={this.didEnterMessage}
              currentRoomId={this.currentRoomId}/>
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  config: state.identity.config,
  messages: state.data.messages.records,
  whisperingToUser: state.data.users.whisperingToUser
});

const mapDispatchToProps = dispatch => ({
  handleInput: bindActionCreators(inputHandler.handleInput, dispatch),
  connect: bindActionCreators(actionCable.connectToCable, dispatch)
});

export default hotkey(keymap)(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatIndex));
