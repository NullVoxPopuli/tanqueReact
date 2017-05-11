import { handleActions } from 'redux-actions';

import {
  TOGGLE_LEFT_BAR,
  TOGGLE_ALLOW_NOTIFICATIONS
} from 'actions/views/app';

const initialState = {
  isLeftBarShown: false,
  allowNotifications: true
};

export default handleActions({
  [TOGGLE_LEFT_BAR]: state => ({
    ...state,
    isLeftBarShown: !state.isLeftBarShown
  }),
  [TOGGLE_ALLOW_NOTIFICATIONS]: state => ({
    ...state,
    allowNotifications: !state.allowNotifications
  })
}, initialState);
