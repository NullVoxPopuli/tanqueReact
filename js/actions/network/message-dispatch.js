import { createAction } from 'redux-actions';
import { toastError } from 'utility/toast';
import _ from 'lodash';

import redux from 'js/redux-store';
import { encryptFor } from 'utility/nacl';

import {
  WHISPER,
  PING,
  appendMessage
} from 'actions/data/messages';

import { send } from './action-cable';

export const MESSAGE_DISPATCH = 'message-dispatch/MESSAGE_DISPATCH';
export const ENCRYPTING_MESSAGE = 'message-dispatch/ENCRYPTING_MESSAGE';
export const ENCRYPTION_COMPLETE = 'message-dispatch/ENCRYPTION_COMPLETE';

export const messageDispatch = createAction(MESSAGE_DISPATCH);
export const encryptingMessage = createAction(ENCRYPTING_MESSAGE);
export const encryptionComplete = createAction(ENCRYPTION_COMPLETE);

export const APP_NAME = 'tanqueRéact';
export const APP_VERSION = '0.1';

export const whisper = (userString, message) => (dispatch, getState) => {
  const state = getState();
  const users = state.data.users.records;
  const user = findUser(userString, users);

  if (_.isEmpty(user)) return toastError('Member not found.');
  dispatch(sendToUser(user, message, WHISPER));
};

export const ping = userString => (dispatch, getState) => {
  const state = getState();
  const users = state.data.users.records;
  const user = findUser(userString, users);

  if (_.isEmpty(user)) return toastError('Member not found.');
  dispatch(sendToUser(user, '', PING));
};

export function pingAll() {
  return dispatch => {
    dispatch(sendToAll('', PING));
  };
}

function findUser(str, users) {
  return users.find(u => (u.uid === str || u.alias === str));
}

export function sendToAll(unencryptedString, type = 'chat') {
  return (dispatch, getState) => {
    const state = getState();
    const users = state.data.users.records;
    const config = state.identity.config;

    const payload = buildPayload(config, type);
    sendToSelf(payload, unencryptedString, dispatch);

    users.forEach(user => {
      sendTo(user.uid, payload, unencryptedString, config);
    });
  };
}

function sendToSelf(payload, unencryptedString, dispatch) {
  dispatch(appendMessage({
    ...payload,
    decryptedMessage: unencryptedString
  }));
}

function buildPayload(config, type = 'chat') {
  const { alias, uid, publicKey } = config;

  const payload = {
    type,
    client: APP_NAME,
    client_version: APP_VERSION,
    time_sent: new Date(),
    message: null,
    sender: {
      name: alias,
      location: 'web',
      uid,
      public_key: publicKey
    }
  };

  return payload;
}

export function sendToUser(user, message, type) {
  return (dispatch, getState) => {
    const state = getState();
    const config = state.identity.config;
    const payload = buildPayload(config, type);

    sendTo(user.uid, payload, message, config);
  };
}

export function sendTo(theirUid, payload, unencryptedString, config) {
  redux.dispatch(messageDispatch({ theirUid, unencryptedString }));

  const { publicKey, privateKey } = config;

  redux.dispatch(encryptingMessage({ preMessage: payload }));

  // change to be for the target
  const encryptedMessage = encryptFor(unencryptedString, publicKey, privateKey);
  payload.message = encryptedMessage;

  redux.dispatch(encryptionComplete({ encryptedMessage: payload }));

  redux.dispatch(send(theirUid, payload));
}
