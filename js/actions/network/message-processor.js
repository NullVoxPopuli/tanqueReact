import { createAction } from 'redux-actions';
import _ from 'lodash';

import { decryptFrom } from 'utility/nacl';
import { appendMessage } from 'js/actions/data/messages';
import { ONLINE, OFFLINE, findUser, setOnlineStatus } from 'actions/data/users';
import redux from 'js/redux-store';
import { notify } from 'actions/views/app';
import { toastError } from 'utility/toast';

export const DECRYPTING_MESSAGE = 'message-processor/DECRYPTING_MESSAGE';
export const DECRYPTION_COMPLETE = 'message-processor/DECRYPTION_COMPLETE';

export const decryptingMessage = createAction(DECRYPTING_MESSAGE);
export const decryptionComplete = createAction(DECRYPTION_COMPLETE);

export const APP_NAME = 'tanqueRéact';
export const APP_VERSION = '0.1';

export function processMessage(socketPayload) {
  return (dispatch, getState) => {
    const {
      status,
      uid: from,
      message: encryptedPayload
    } = socketPayload;

    if (_.isEmpty(socketPayload)) return;

    if (status === 404) return process404(socketPayload);

    const state = getState();

    return processChatMessage(encryptedPayload, from, state);
  };
}

function process404(messagePayload) {
  const uid = messagePayload.detail;

  redux.dispatch(setOnlineStatus(uid, OFFLINE));
}

function processChatMessage(messagePayload, fromUid, state) {
  const users = state.data.users.records;
  const { privateKey } = state.identity.config;
  const decrypted = decrypt(messagePayload, fromUid, users, privateKey);

  // tell the UI that a message has been received
  redux.dispatch(appendMessage(decrypted));

  // because we received something from somebody,
  // mark them as online.
  redux.dispatch(setOnlineStatus(decrypted.sender.uid, ONLINE));

  redux.dispatch(notify(decrypted));

  return decrypted;
}

function decrypt(encryptedPayload, fromUid, users, privateKey) {
  redux.dispatch(decryptingMessage({ from: fromUid, encryptedPayload }));
  const user = findUser(fromUid, users);

  if (user === undefined) {
    console.error('user for ', fromUid, ' not found...');
    return;
  }

  const publicKey = user.publickey;

  const decryptedPayloadJson = decryptFrom(
    encryptedPayload,
    publicKey,
    privateKey
  );

  const decryptedPayload = JSON.parse(decryptedPayloadJson);

  redux.dispatch(decryptionComplete({ decryptedPayload }));

  return decryptedPayload;
}
