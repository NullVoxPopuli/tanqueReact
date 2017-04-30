import { createAction } from 'redux-actions';
import { decryptFrom } from 'utility/nacl';
import { appendMessage } from 'js/actions/data/messages';
import { findUser } from 'actions/data/users';

export const DECRYPTING_MESSAGE = 'message-processor/DECRYPTING_MESSAGE';
export const DECRYPTION_COMPLETE = 'message-processor/DECRYPTION_COMPLETE';

export const decryptingMessage = createAction(DECRYPTING_MESSAGE);
export const decryptionComplete = createAction(DECRYPTION_COMPLETE);

export const APP_NAME = 'tanqueRéact';
export const APP_VERSION = '0.1';

export function processMessage(messagePayload) {
  return (dispatch, getState) => {
    const state = getState();
    const users = state.data.users.records;
    const { privateKey } = state.identity.config;
    const encryptedMessage = messagePayload.message;

    dispatch(decryptingMessage(messagePayload));

    const sender = messagePayload.sender;
    let publicKey = sender.public_key || findUser(sender.uid, users).publickey;

    const decryptedMessage = decryptFrom(
      encryptedMessage,
      publicKey,
      privateKey
    );

    const decrypted = {
      ...messagePayload,
      decryptedMessage
    };

    dispatch(decryptionComplete(decrypted));

    // tell the UI that a message has been received
    dispatch(appendMessage(decrypted));

    return decrypted;
  };
}
