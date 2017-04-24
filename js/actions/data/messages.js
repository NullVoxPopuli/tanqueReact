import { createAction } from 'redux-actions';

export const RECEIVE_MESSAGE = 'data/messages/RECEIVE_MESSAGE';

export const receiveMessage = createAction(RECEIVE_MESSAGE);
