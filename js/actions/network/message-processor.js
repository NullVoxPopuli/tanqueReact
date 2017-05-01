import { createAction } from 'redux-actions';
import _ from 'lodash';

import { decryptFrom } from 'utility/nacl';
import { appendMessage } from 'js/actions/data/messages';
import { ONLINE, OFFLINE, findUser, setOnlineStatus } from 'actions/data/users';
import redux from 'js/redux-store';

export const DECRYPTING_MESSAGE = 'message-processor/DECRYPTING_MESSAGE';
export const DECRYPTION_COMPLETE = 'message-processor/DECRYPTION_COMPLETE';

export const decryptingMessage = createAction(DECRYPTING_MESSAGE);
export const decryptionComplete = createAction(DECRYPTION_COMPLETE);

export const APP_NAME = 'tanqueRéact';
export const APP_VERSION = '0.1';

export function processMessage(messagePayload) {
  return (dispatch, getState) => {
    if (_.isEmpty(messagePayload)) return;

    if (messagePayload.status === 404) return process404(messagePayload);

    const state = getState();

    return processChatMessage(messagePayload, state);
  };
}

function process404(messagePayload) {
  const uid = messagePayload.detail;

  redux.dispatch(setOnlineStatus(uid, OFFLINE));
}

function processChatMessage(messagePayload, state) {
  const users = state.data.users.records;
  const { privateKey } = state.identity.config;
  const decrypted = decrypt(messagePayload, users, privateKey);

  // tell the UI that a message has been received
  redux.dispatch(appendMessage(decrypted));

  // because we received something from somebody,
  // mark them as online.
  redux.dispatch(setOnlineStatus(messagePayload.sender.uid, ONLINE));

  return decrypted;
}

function decrypt(messagePayload, users, privateKey) {
  redux.dispatch(decryptingMessage(messagePayload));

  const sender = messagePayload.sender;
  const encryptedMessage = messagePayload.message;
  const publicKey = sender.public_key || findUser(sender.uid, users).publickey;

  const decryptedMessage = decryptFrom(
    encryptedMessage,
    publicKey,
    privateKey
  );

  const decrypted = {
    ...messagePayload,
    decryptedMessage
  };

  redux.dispatch(decryptionComplete(decrypted));

  return decrypted;
}
