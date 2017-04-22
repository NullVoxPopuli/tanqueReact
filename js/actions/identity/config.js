import { createAction } from 'redux-actions';
import Promise from 'bluebird';

import * as NaCl from "tweetnacl";

export const SET_ALIAS = 'identity/config/SET_ALIAS';
export const SET_KEYS = 'identity/config/SET_KEYS';
export const SET_UID = 'identity/config/SET_UID';
export const REGENERATE_UID = 'identity/config/REGENERATE_UID';
export const REGENERATE_KEYS = 'identity/config/REGENERATE_KEYS';

export const setAlias = createAction(SET_ALIAS);
export const setKeys = createAction(SET_KEYS);
export const setUid = createAction(SET_UID);

export function regenerateUid() {
  return dispatch => {
    const newUid = Math.random().toString(16).slice(2) +
      Math.random().toString(16).slice(2);

    dispatch(setUid(newUid));

    return Promise.resolve();
  };
}

export function regenerateKeys() {
  return dispatch => {
    const newKeys = NaCl.box.keyPair();
    const algorithm = 'nacl';

    // convert from a Uint8Array to base64 string
    const publicKey = btoa(String.fromCharCode.apply(null, newKeys.publicKey));
    const privateKey = btoa(String.fromCharCode.apply(null, newKeys.secretKey));

    dispatch(setKeys({ algorithm, publicKey, privateKey }));

    return Promise.resolve();
  };
}

export function updateAlias(alias) {
  return dispatch => {
    dispatch(setAlias(alias));
  };
}
