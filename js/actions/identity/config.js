import { createAction } from 'redux-actions';

import { generateNewKeys } from 'utility';

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
  };
}

export function regenerateKeys() {
  return dispatch => {
    const algorithm = 'nacl';

    dispatch(setKeys({ algorithm, ...generateNewKeys() }));
  };
}

export function updateAlias(alias) {
  return dispatch => {
    dispatch(setAlias(alias));
  };
}
