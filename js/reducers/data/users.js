import { IMPORT_USER, EXPORT_USER } from 'js/actions/data/users';
import { initialState, hydrate, removeFromState } from './../helpers';

export default (state = initialState, action) => {
  Object.freeze(state);

  switch (action.type) {
  case IMPORT_USER:
    action.json.id = action.json.uid;

    return {
      ...state,
      records: hydrate(action.json)
    };
  case EXPORT_USER:
    return state;
  default:
    return state;
  }
};
