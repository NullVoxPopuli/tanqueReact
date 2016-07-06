const BUTTON_CLICK = 'reducers/reducer-test/button_click'

export default function TestReducer(state = {count: 0}, action){
  switch(action.type){
    case BUTTON_CLICK:
        return { count: state.count + 1 };
    default:
      return state
  }
}

export const actions = {
  buttonClicked(){
    return { type: BUTTON_CLICK }
  }
};
