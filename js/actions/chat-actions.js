export const CHAT_SEND_MESSAGE = 'CHAT_SEND_MESSAGE';

function chatSendMessage(msg, to) {
  return {
    type: CHAT_SEND_MESSAGE,
    message: msg,
    to
  };
}
