import { CHAT_SEND_MESSAGE } from 'js/actions/chat-actions';
import { sendMessageToCable } from 'js/actions/action-cable-actions';
import dataStore, { defaultChat } from 'js/data/store';

export default (state, action) => {
  switch (action.type) {
    case CHAT_SEND_MESSAGE: {
      if (action.to === defaultChat) {
        dataStore.getAll('users').each(user => {
          sendMessageToCable(user.id, action.message);
        });
      } else {
        sendMessageToCable(action.to, action.message);
      }

      break;
    }
  }

  return state;
};
