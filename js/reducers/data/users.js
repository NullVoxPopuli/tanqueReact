import { IMPORT, EXPORT } from 'js/actions/data/users';
import { initialState, hydrate, removeFromState } from './../helpers';

export default (state = initialState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case IMPORT: {
      action.json.id = action.json.uid;

      return {
        ...state
        records: hydrate(action.json);
      };
    }
  }
}
