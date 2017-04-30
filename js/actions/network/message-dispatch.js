import { createAction } from 'redux-actions';
import { toastError } from 'utility/toast';
import _ from 'lodash';

import redux from 'js/redux-store';
import { encryptFor } from 'utility/nacl';
import { findUser } from 'actions/data/users';

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

export function sendToAll(unencryptedString, type = 'chat') {
  return (dispatch, getState) => {
    const state = getState();
    const users = state.data.users.records;
    const config = state.identity.config;

    const payload = buildPayload(config, type);
    sendToSelf(payload, unencryptedString, dispatch);

    users.forEach(user => {
      sendTo(user, payload, unencryptedString, config);
    });
  };
}

// the to field is for filtering whispers later.
// we need to know what whispers _we_ send in order to group them
// in to the appropriate whisper channel chat.
function sendToSelf(payload, unencryptedString, dispatch, to = '') {
  dispatch(appendMessage({
    ...payload,
    to,
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

// Only for sending to a single, targeted user.
// Not for sendToAll or any batch sending.
// as this function also appends our own message
// to the message array. (So we can see what we said)
export function sendToUser(user, message, type) {
  return (dispatch, getState) => {
    const state = getState();
    const config = state.identity.config;
    const payload = buildPayload(config, type);

    // send to ourselves, so we know what we whispered
    sendToSelf(payload, message, dispatch, user.uid);
    // actually send to the other person
    sendTo(user, payload, message, config);
  };
}

export function sendTo(user, payload, unencryptedString, config) {
  const { uid: theirUid, publickey: theirPublicKey } = user
  redux.dispatch(messageDispatch({ theirUid, unencryptedString }));

  const { privateKey } = config;

  redux.dispatch(encryptingMessage({ preMessage: payload }));

  // change to be for the target
  const encryptedMessage = encryptFor(unencryptedString, theirPublicKey, privateKey);
  payload.message = encryptedMessage;

  redux.dispatch(encryptionComplete({ encryptedMessage: payload }));

  redux.dispatch(send(theirUid, payload));
}
