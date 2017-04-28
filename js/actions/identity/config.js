import PropTypes from 'prop-types';
import { createAction } from 'redux-actions';

import { generateNewKeys } from 'utility';
import { loadState } from 'js/local-storage';

export const SET_ALIAS = 'identity/config/SET_ALIAS';
export const SET_URL = 'identity/config/SET_URL';
export const SET_KEYS = 'identity/config/SET_KEYS';
export const SET_UID = 'identity/config/SET_UID';
export const SET_CONFIG = 'identity/config/SET_CONFIG';
export const REGENERATE_UID = 'identity/config/REGENERATE_UID';
export const REGENERATE_KEYS = 'identity/config/REGENERATE_KEYS';
export const IMPORT_SETTINGS_BEGIN = 'identity/config/IMPORT_SETTINGS_BEGIN';
export const IMPORT_SETTINGS_SUCCESS = 'identity/config/IMPORT_SETTINGS_SUCCESS';
export const IMPORT_SETTINGS_FAILURE = 'identity/config/IMPORT_SETTINGS_FAILURE';

export const setAlias = createAction(SET_ALIAS);
export const setUrl = createAction(SET_URL);
export const setKeys = createAction(SET_KEYS);
export const setUid = createAction(SET_UID);
export const setConfig = createAction(SET_CONFIG);
export const importSettingsBegin = createAction(IMPORT_SETTINGS_BEGIN);
export const importSettingsSuccess = createAction(IMPORT_SETTINGS_SUCCESS);
export const importSettingsFailure = createAction(IMPORT_SETTINGS_FAILURE);

export function importSettings(settings) {
  return dispatch => {
    dispatch(importSettingsBegin());
    let settingsObject = settings;

    if (typeof settings === 'string') {
      try { settingsObject = JSON.parse(settings); }
      catch (e) { return dispatch(importSettingsFailure(e)); }
    }

    dispatch(setConfig(settingsObject));

    dispatch(importSettingsSuccess());
  };
}

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
    const keys = generateNewKeys();

    dispatch(setKeys({ algorithm, ...keys }));

    return keys;
  };
}

export function updateAlias(alias) {
  return dispatch => {
    dispatch(setAlias(alias));
  };
}

export function updateUrl(url) {
  return dispatch => {
    dispatch(setUrl(url));
  };
}

export function updateSafeSettings(settings) {
  return dispatch => {
    dispatch(setAlias(settings.alias));
    dispatch(setUrl(settings.url));
  };
}

export const configPropTypes = {
  alias: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  publicKey: PropTypes.string.isRequired,
  privateKey: PropTypes.string.isRequired,
  relays: PropTypes.array.isRequired
};

export function isConfigValid(config) {
  const result = PropTypes.checkPropTypes(
    configPropTypes,
    config || {}
  );

  console.log(result);
  return result;
}

export function isStoredConfigValid() {
  const state = loadState() || {};
  const identity = state.identity || {};
  const config = identity || {};

  return isConfigValid(config);
}
