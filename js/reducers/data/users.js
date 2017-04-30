import { IMPORT_USER, SET_WHISPER_TO_USER } from 'js/actions/data/users';
import { initialState, hydrate } from './../helpers';

export default (state = initialState, action) => {
  Object.freeze(state);

  switch (action.type) {
  case IMPORT_USER:
    action.json.id = action.json.uid;

    return {
      ...state,
      records: hydrate(state.records, [action.json])
    };
  case SET_WHISPER_TO_USER:
    return {
      ...state,
      whisperingToUser: action.uid
    }
  default:
    return state;
  }
};
