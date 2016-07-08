import { IDENTITY_IMPORT, IDENTITY_EXPORT } from 'js/actions/identity-actions';
import dataStore from 'js/data/store';

export default (state = {}, action) => {
  switch (action.type) {
    case IDENTITY_IMPORT: {
      let stringifiedJson = action.stringifiedJson;
      let json = JSON.parse(stringifiedJson);

      dataStore.add('user', {
        alias: json.alias,
        publicKey: json.publickey,
        id: json.uid,
      });

      break;
    }

    case IDENTITY_EXPORT: {
      break;
    }
  }

  return state;
};
