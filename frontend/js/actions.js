import { defaultChat } from 'js/data/store';

export const WHISPER_TO = 'WHISPER_TO';
export const SET_ALL_CHAT = 'SET_ALL_CHAT';
export const SEND_MESSAGE_TO = 'SEND_MESSAGE_TO';

export function whisperTo(userId) {
  return { type: WHISPER_TO, userId };
}

export function setAllChat() {
  return { type: SET_ALL_CHAT, defaultChat };
}

export function sendMessageTo(userId, message) {
  return {
     type: SEND_MESSAGE_TO,
     userId: to,
     message: message,
   },
}
