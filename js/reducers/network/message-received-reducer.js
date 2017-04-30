import {
  MESSAGE_CHAT,
  MESSAGE_EMOTE,
  MESSAGE_WHISPER,
  MESSAGE_DISCONNECT,
  MESSAGE_NODE_LIST_HASH,
  MESSAGE_NODE_LIST,
  MESSAGE_NODE_LIST_DIFF,
  MESSAGE_PING,
  MESSAGE_PING_REPLY
} from 'js/actions/message-received-actions';

export default (state = {}, action) => {
  switch (action.type) {
  case MESSAGE_CHAT: {
    break;
  }

  case MESSAGE_EMOTE: {
    break;
  }

  case MESSAGE_WHISPER: {
    break;
  }

  case MESSAGE_DISCONNECT: {
    break;
  }

  case MESSAGE_NODE_LIST_HASH: {
    break;
  }

  case MESSAGE_NODE_LIST: {
    break;
  }

  case MESSAGE_NODE_LIST_DIFF: {
    break;
  }

  case MESSAGE_PING: {
    break;
  }

  case MESSAGE_PING_REPLY: {
    break;
  }

  }

  return state;
};
