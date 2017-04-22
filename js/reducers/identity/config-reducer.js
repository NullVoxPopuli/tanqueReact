import {
  CONFIG_CHANGE_ALIAS, CHANGE_KEYS, CHANGE_UID,
  CONFIG_REGENERATE_UID, CONFIG_REGENERATE_KEYS,
} from 'js/actions/config-actions';

const defaultConfig = {
  privateKey: 'Not Yet Generated',
  publicKey: 'Not Yet Generated',
  alias: 'initial alias',
  uid: '123',
  url: 'ws://mesh-relay-in-us-1.herokuapp.com',
};

export default (state = defaultConfig, action) => {
  switch (action.type) {
    case CONFIG_CHANGE_ALIAS: {
      state = { ...state, alias: action.alias };
      break;
    }

    case CHANGE_KEYS: {
      state = {
        ...state,
        privateKey: action.payload.privateKey,
        publicKey: action.payload.publickey,
      };
      break;
    }

    case CHANGE_UID: {
      state = { ...state, uid: action.payload };
      break;
    }

    case CONFIG_REGENERATE_UID: {
      let newUid = Math.random().toString(16).slice(2) +
        Math.random().toString(16).slice(2);
      state = { ...state, uid: newUid };
      break;
    }

    case CONFIG_REGENERATE_KEYS: {
      state = { ...state, };
      break;
    }

  }

  return state;
};
