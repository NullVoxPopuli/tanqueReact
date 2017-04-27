import { createAction } from 'redux-actions';

export const APPEND_MESSAGE = 'data/messages/APPEND_MESSAGE';

export const appendMessage = createAction(APPEND_MESSAGE);
