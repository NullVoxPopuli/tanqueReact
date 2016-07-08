import { CHANGE_ALIAS, CHANGE_KEYS, CHANGE_UID } from 'js/actions/config-actions';
import dataStore from 'js/data/store';

const defaultConfig = {
  privateKey: undefined,
  publicKey: undefined,
  alias: 'initial alias',
  uid: '123',
  url: 'ws://mesh-relay-in-us-1.herokuapp.com',
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

  // let me = dataStore.get('user', state.uid);
  // if (me === undefined) {
  //   dataStore.add('user', state);
  // } else {
  //   dataStore.update('user', state.uid, state);
  // }

  return state;
};
