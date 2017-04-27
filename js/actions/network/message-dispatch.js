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

export function sendTo(theirUid, unencryptedString, type = 'chat') {
  return (dispatch, getState) => {

    dispatch(messageDispatch({ theirUid, unencryptedString }));
    const state = getState();
    const config = state.identity.config;
    const users = state.data.users;

    const { alias, uid, publicKey, privateKey } = config;

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

    // we want to view our own messages
    dispatch(appendMessage({
      ...payload,
      decryptedMessage: unencryptedString
    }));

    dispatch(encryptingMessage({ preMessage: payload }));

    // change to be for the target
    const encryptedMessage = encryptFor(unencryptedString, publicKey, privateKey);
    payload.message = encryptedMessage;

    dispatch(encryptionComplete({ encryptedMessage: payload }));

    dispatch(send(theirUid, payload));
  };
}
