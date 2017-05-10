import { handleActions } from 'redux-actions';

import {
  TOGGLE_LEFT_BAR
} from 'actions/views/app';

const initialState = { isLeftBarShown: false };

export default handleActions({
  [TOGGLE_LEFT_BAR]: (state, action) => {
    console.log('------------------------------------')
    console.log(action);

    return {...state,
    isLeftBarShown: !state.isLeftBarShown}
  }
}, initialState);
