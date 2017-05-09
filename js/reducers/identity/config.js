import { handleActions } from 'redux-actions';

import {
  SET_ALIAS,
  SET_URL_FOR_RELAY,
  SET_KEYS,
  SET_UID,
  SET_CONFIG
} from 'actions/identity/config';

const DEFAULT_RELAYS = {
  [0]: { url: 'wss://mesh-relay-in-us-1.herokuapp.com/socket' },
  [1]: { url: 'wss://mesh-relay-in-us-2.herokuapp.com/socket' },
  [2]: { url: 'ws://localhost:4301/socket' },
  [3]: { url: '' }
};

const defaultConfig = {
  privateKey: 'Not Yet Generated',
  publicKey: 'Not Yet Generated',
  alias: '',
  uid: '',
  relays: DEFAULT_RELAYS
};

export default handleActions({
  [SET_ALIAS]: (state, action) => ({
    ...state,
    alias: action.payload
  }),
  [SET_URL_FOR_RELAY]: (state, action) => ({
    ...state,
    relays: {
      ...state.relays,
      [action.payload.relayPosition]: {
        ...state.relays[action.payload.relayPosition],
        url: action.payload.value
      }
    }
  }),
  [SET_KEYS]: (state, action) => ({
    ...state,
    ...action.payload
  }),
  [SET_UID]: (state, action) => ({
    ...state,
    uid: action.payload
  }),
  [SET_CONFIG]: (state, action) => ({
    ...action.payload
  })
}, defaultConfig);
