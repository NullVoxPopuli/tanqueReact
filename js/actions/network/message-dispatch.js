import { createAction } from 'redux-actions';
import { send } from './action-cable';

import { encryptFor } from 'utility/nacl';
import { appendMessage } from 'js/actions/data/messages';

export const MESSAGE_DISPATCH = 'message-dispatch/MESSAGE_DISPATCH';
export const ENCRYPTING_MESSAGE = 'message-dispatch/ENCRYPTING_MESSAGE';
export const ENCRYPTION_COMPLETE = 'message-dispatch/ENCRYPTION_COMPLETE';

export const messageDispatch = createAction(MESSAGE_DISPATCH);
export const encryptingMessage = createAction(ENCRYPTING_MESSAGE);
export const encryptionComplete = createAction(ENCRYPTION_COMPLETE);

export const APP_NAME = 'tanqueRéact';
export const APP_VERSION = '0.1';

export function sendToAll(unencryptedString, type = 'chat') {
  return (dispatch, getState) => {
    const state = getState();
    const users = state.data.users.records;
    const config = state.identity.config;

    const payload = buildPayload(config, type);
    sendToSelf(payload, unencryptedString, dispatch);

    users.forEach(user => {
      dispatch(sendTo(user.uid, payload, unencryptedString, config, dispatch));
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

export function sendToOne(theirUid, unencryptedString, type = 'chat') {
  return (dispatch, getState) => {
    // TODO: needed?
  };
}

export function sendTo(theirUid, payload, unencryptedString, config, dispatch) {
  dispatch(messageDispatch({ theirUid, unencryptedString }));

  const { publicKey, privateKey } = config;

  dispatch(encryptingMessage({ preMessage: payload }));

  // change to be for the target
  const encryptedMessage = encryptFor(unencryptedString, publicKey, privateKey);
  payload.message = encryptedMessage;

  dispatch(encryptionComplete({ encryptedMessage: payload }));

  dispatch(send(theirUid, payload));
}
