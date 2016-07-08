export const ACTION_CABLE_CONNECT = 'ACTION_CABLE_CONNECT';
export const ACTION_CABLE_DISCONNECT = 'ACTION_CABLE_DISCONNECT';

export const ACTION_CABLE_CONNECTED = 'ACTION_CABLE_CONNECTED';
export const ACTION_CABLE_DISCONNECTED = 'ACTION_CABLE_DISCONNECTED';
export const ACTION_CABLE_REJECTED = 'ACTION_CABLE_REJECTED';
export const ACTION_CABLE_RECEIVED = 'ACTION_CABLE_RECEIVED';
export const ACTION_CABLE_SEND_MESSAGE = 'ACTION_CABLE_SEND_MESSAGE';

import * as ActionCable from 'actioncable/lib/assets/compiled/action_cable';

function connect(uid, url) {
  return {
    type: ACTION_CABLE_CONNECT,
    uid: uid,
    url: url,
  };
}

function disconnect() {
  return {
    type: ACTION_CABLE_DISCONNECT,
  };
}

function connected(cable, channel) {
  return {
    type: ACTION_CABLE_CONNECTED,
    cable: cable,
    channel: channel,
    connectedAt: Date.now(),
  };
}

function disconnected(data) {
  return {
    type: ACTION_CABLE_DISCONNECTED,
    data: data,
    disconnectedAt: Date.now(),
  };
}

function rejected(data) {
  return {
    type: ACTION_CABLE_REJECTED,
    data: data,
    rejectedAt: Date.now(),
  };
}

export function received(data) {
  return {
    type: ACTION_CABLE_RECEIVED,
    data: data,
    receivedAt: Date.now(),
  };
}

export function sendMessageToCable(to, msg) {
  return {
    type: ACTION_CABLE_SEND_MESSAGE,
    to: to,
    msg: msg,
    sentAt: Date.now(),
  };
}

export function connectToCable() {
  return (dispatch, getState) => {
    let state = getState();
    if (state.cable.status === ACTION_CABLE_CONNECTED) {
      return;
    }

    let { uid, url } = state.config;

    let path = `${url}?uid=${uid}`;

    let cable = ActionCable.createConsumer(path);
    let channel = cable.subscriptions.create({ channel: 'MeshRelayChannel', }, {
      connected: () => dispatch(connected(cable)),
      disconnected: data => dispatch(disconnected(data)),
      rejected: data => dispatch(rejected(data)),
      received: data => dispatch(received(data)),
    });
  };
}
