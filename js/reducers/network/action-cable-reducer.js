import { handleActions } from 'redux-actions';

import {
  ACTION_CABLE_CONNECTED,
  ACTION_CABLE_DISCONNECTED,
  ACTION_CABLE_REJECTED
} from 'js/actions/network/action-cable';

const initialState = {
  status: ACTION_CABLE_DISCONNECTED,
  lastMessageReceived: null,
  channel: null
};

export default handleActions({
  [ACTION_CABLE_CONNECTED]: (state, action) => ({
    ...state,
    status: ACTION_CABLE_CONNECTED,
    channel: action.payload.subscriptions.subscriptions[0]
  }),
  [ACTION_CABLE_DISCONNECTED]: state => ({
    ...state,
    status: ACTION_CABLE_DISCONNECTED
  }),
  [ACTION_CABLE_REJECTED]: (state, action) => ({
    ...state,
    status: ACTION_CABLE_REJECTED,
    reason: action.payload
  })
}, initialState);
