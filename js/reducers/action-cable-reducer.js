import {
  ACTION_CABLE_CONNECT,
  ACTION_CABLE_DISCONNECT,
  ACTION_CABLE_CONNECTED,
  ACTION_CABLE_DISCONNECTED,
  ACTION_CABLE_REJECTED,
  ACTION_CABLE_RECEIVED,
  ACTION_CABLE_SEND_MESSAGE,
} from 'js/actions/action-cable-actions';

const defaultConfig = {
  status: 'disconnected',
  lastMessageReceived: null,
  cable: null,
  channel: null,
};

export default (state = defaultConfig, action) => {
  switch (action.type) {
    case ACTION_CABLE_CONNECTED: {
      state = {
        ...state,
        status: ACTION_CABLE_CONNECTED,
        cable: action.cable,
        channel: action.cable.subscriptions.subscriptions[0],
      };
      break;
    }

    case ACTION_CABLE_DISCONNECTED: {
      state = { ...state, status: ACTION_CABLE_DISCONNECTED };
      break;
    }

    case ACTION_CABLE_REJECTED: {
      console.log('Cable Rejected: ');
      console.log(action.data);
      state = { ...state, status: ACTION_CABLE_REJECTED };
      break;
    }

    case ACTION_CABLE_RECEIVED: {
      // TODO: maybe this should trigger a different action
      // because:
      // - we need to update the sender's information
      // - we need to decrypt the message
      //
      // use this library for NaCl https://github.com/tonyg/js-nacl
      dataStore.add('message', {
        id: action.receivedAt,
        content: action.data,
        userId: action.data.uid,
      });
      state = { ...state, lastMessageReceived: action.receivedAt };
      break;
    }

    case ACTION_CABLE_SEND_MESSAGE: {
      // only send if we have a channel to send to
      if (state.channel) {
        state.channel.send({
          to: action.to,
          message: action.msg,
          action: 'chat',
        });
      }

      break;
    }
  }

  return state;
};
