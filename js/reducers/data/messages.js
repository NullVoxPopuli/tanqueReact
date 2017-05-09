import { handleActions } from 'redux-actions';

import {
  APPEND_MESSAGE,
  SET_MESSAGE_AS_SENT,
  SET_MESSAGE_AS_ERRORED
} from 'js/actions/data/messages';
import { hydrate } from './../helpers';

const initialState = {
  records: []
};

function setTransmissionStatus(records, id, status = {}) {
  const newRecords = Array.from(records);
  const index = newRecords.findIndex(message => message.id === id);

  if (index !== -1) {
    newRecords[index].__meta__ = {
      ...newRecords[index].__meta__,
      transmissionStatus: status
    };
  }

  return newRecords;
}

export default handleActions({
  [APPEND_MESSAGE]: (state, action) => ({
    ...state,
    records: hydrate(state.records, [action.payload], 'time_sent')
  }),
  [SET_MESSAGE_AS_SENT]: (state, action) => ({
    ...state,
    records: setTransmissionStatus(state.records, action.payload.id, {
      status: 'success'
    })
  }),
  [SET_MESSAGE_AS_ERRORED]: (state, action) => ({
    ...state,
    records: setTransmissionStatus(
      state.records,
      action.payload.id, {
        ...action.payload.error,
        status: 'error'
      }
    )
  })
}, initialState);
