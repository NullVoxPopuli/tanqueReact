import { createAction } from 'redux-actions';
import * as ActionCable from 'actioncable/lib/assets/compiled/action_cable';

import { receiveMessage } from 'js/actions/data/messages';

export const ACTION_CABLE_CONNECT = 'ACTION_CABLE_CONNECT';
export const ACTION_CABLE_DISCONNECT = 'ACTION_CABLE_DISCONNECT';

export const ACTION_CABLE_CONNECTED = 'ACTION_CABLE_CONNECTED';
export const ACTION_CABLE_DISCONNECTED = 'ACTION_CABLE_DISCONNECTED';
export const ACTION_CABLE_REJECTED = 'ACTION_CABLE_REJECTED';
export const ACTION_CABLE_RECEIVED = 'ACTION_CABLE_RECEIVED';
export const ACTION_CABLE_SEND_MESSAGE = 'ACTION_CABLE_SEND_MESSAGE';


const RELAY_CHANNEL = 'MeshRelayChannel';

export const connect = createAction(ACTION_CABLE_CONNECT);
export const disconnect = createAction(ACTION_CABLE_DISCONNECT);
export const connected = createAction(ACTION_CABLE_CONNECTED);
export const disconnected = createAction(ACTION_CABLE_DISCONNECTED);
export const rejected = createAction(ACTION_CABLE_REJECTED);
export const received = createAction(ACTION_CABLE_RECEIVED);
export const sendMessage = createAction(ACTION_CABLE_SEND_MESSAGE);

function cableConnected(path, dispatch) {
  return () => {
    dispatch(connected());
  };
}

function cableDisconnected(dispatch) {
  return data => {
    dispatch(disconnected(data));
  };
}

function cableRejected(dispatch) {
  return data => {
    dispatch(rejected(data));
  };
}

function cableReceived(dispatch) {
  return data => {
    dispatch(received(data));

    if (data.error) {
      
    }
    dispatch(receiveMessage(data));
  };
}

export function send(to, data) {
  return dispatch => {
    dispatch(sendMessage(to, data));

    window.actionCableChannel.send({
      to, message: data, action: 'chat'
    });
  };
}

export function connectToCable() {
  return (dispatch, getState) => {
    const state = getState();
    if (state.network.actionCable.status === ACTION_CABLE_CONNECTED) {
      return;
    }
    dispatch(connect());

    const { publicKey, url } = state.identity.config;

    const path = `${url}?uid=${publicKey}`;

    const cable = ActionCable.createConsumer(path);
    const channel = cable.subscriptions.create({ channel: RELAY_CHANNEL }, {
      connected: cableConnected(path, dispatch),
      disconnected: cableDisconnected(dispatch),
      rejected: cableRejected(dispatch),
      received: cableReceived(dispatch)
    });

    window.actionCableChannel = channel;
  };
}
