import { handleActions } from 'redux-actions';

import {
  SET_ALIAS,
  SET_URL,
  SET_KEYS,
  SET_UID,
  SET_CONFIG
} from 'actions/identity/config';

const DEFAULT_RELAYS = [
  'wss://mesh-relay-in-us-1.herokuapp.com',
  'wss://mesh-relay-in-us-2.herokuapp.com'
];

const defaultConfig = {
  privateKey: 'Not Yet Generated',
  publicKey: 'Not Yet Generated',
  alias: '',
  uid: '',
  url: DEFAULT_RELAYS[0],
  // TODO: support multiple relays
  relays: DEFAULT_RELAYS
};

export default handleActions({
  [SET_ALIAS]: (state, action) => ({
    ...state,
    alias: action.payload
  }),
  [SET_URL]: (state, action) => ({
    ...state,
    url: action.payload
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
