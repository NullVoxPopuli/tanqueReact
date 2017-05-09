import { createAction } from 'redux-actions';

export const CHAT = 'chat';
export const EMOTE = 'emote';
export const WHISPER = 'whisper';
export const DISCONNECT = 'disconnect';
export const NODE_LIST_HASH = 'nodelisthash';
export const NODE_LIST = 'nodelist';
export const NODE_LIST_DIFF = 'nodelistdiff';
export const PING = 'ping';
export const PING_REPLY = 'pingreply';


export const APPEND_MESSAGE = 'data/messages/APPEND_MESSAGE';
export const SET_MESSAGE_AS_SENT = 'data/messages/SET_MESSAGE_AS_SENT';
export const SET_MESSAGE_AS_ERRORED = 'data/messages/SET_MESSAGE_AS_ERRORED';

export const appendMessage = createAction(APPEND_MESSAGE);
export const setMessageAsSent = createAction(SET_MESSAGE_AS_SENT);
export const setMessageAsErrored = createAction(SET_MESSAGE_AS_ERRORED);
