import { createAction } from 'redux-actions';
import { decryptFrom } from 'utility/nacl';
import { receiveMessage } from 'js/actions/data/messages';


export const DECRYPTING_MESSAGE = 'message-processor/DECRYPTING_MESSAGE';
export const DECRYPTION_COMPLETE = 'message-processor/DECRYPTION_COMPLETE';

export const decryptingMessage = createAction(DECRYPTING_MESSAGE);
export const decryptionComplete = createAction(DECRYPTION_COMPLETE);

export const APP_NAME = 'tanqueRéact';
export const APP_VERSION = '0.1';

export function processMessage(messagePayload) {
  return (dispatch, getState) => {
    const state = getState();
    const { publicKey, privateKey } = state.identity.config;
    const encryptedMessage = messagePayload.message;

    dispatch(decryptingMessage(messagePayload));

    // TODO: lookup their public Key
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
    dispatch(receiveMessage(decrypted));

    return decrypted;
  };
}
