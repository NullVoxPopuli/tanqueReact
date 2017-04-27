import { handleActions } from 'redux-actions';

import { APPEND_MESSAGE } from 'js/actions/data/messages';
import { hydrate } from './../helpers';

const initialState = {
  records: []
};

export default handleActions({
  [APPEND_MESSAGE]: (state, action) => ({
    ...state,
    records: hydrate(state.records, [action.payload], 'time_sent')
  })
}, initialState);
