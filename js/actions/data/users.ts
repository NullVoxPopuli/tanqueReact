import * as _ from 'lodash';
// why is this so tempting all the time...
import redux from 'js/redux-store';

export const ONLINE = 'ONLINE';
export const OFFLINE = 'OFFLINE';

export const IMPORT_USER = 'data/users/IMPORT_USER';
export const IMPORT_USERS = 'data/users/IMPORT_USERS';
export const EXPORT_USER = 'data/users/EXPORT_USER';
export const SET_WHISPER_TO_USER = 'data/users/SET_WHISPER_TO_USER';
export const SET_ONLINE_STATUS = 'data/users/SET_ONLINE_STATUS';

export const importUser = json => ({ type: IMPORT_USER, json });
export const importUsers = users => ({ type: IMPORT_USERS, users });
export const exportUser = json => ({ type: EXPORT_USER, json });
export const setWhisperToUser = uid => ({ type: SET_WHISPER_TO_USER, uid });
export const setOnlineStatus = (uid, status) => {
  const users = redux.getState().data.users.records;
  const user = findUser(uid, users);
  const updated = {
    ...user,
    status
  };

  return { type: SET_ONLINE_STATUS, user: updated };
};

export function getUserForUid(uid) {
  return (dispatch, getState) => {
    const state = getState();
    const userData = state.data.users;
    const users = userData.records;
    const user = users.find(u => u.uid === uid);

    return user;
  };
}

export function isUserIdentityValid(identityObject) {
  const config = identityObject || {};
  const result = !(
    _.isEmpty(config.alias) ||
    _.isEmpty(config.uid) ||
    _.isEmpty(config.publickey)
  );

  return result;
}

export function findUser(str, users) {
  return users.find(u => (u.uid === str || u.alias === str));
}
