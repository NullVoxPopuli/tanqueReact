import { CHANGE_ALIAS, CHANGE_KEYS, CHANGE_UID } from 'js/actions/config-actions';

const defaultConfig = {
  privateKey: undefined,
  publicKey: undefined,
  alias: undefined,
  uid: undefined,
};

export default (state = defaultConfig, action) => {
  switch (action.type) {
    case CHANGE_ALIAS: {
      state = { ...state, alias: action.payload };
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

  }

  return state;
};
