import { DataStore } from 'js-data';
import { HttpAdapter } from 'js-data-http';

const store = new DataStore();

store.registerAdapter('http', new HttpAdapter(), { default: true });

import User from './models/user';
import Chat from './models/chat-room';
import Message from './models/message';

store.defineMapper('user', User);
store.defineMapper('chatRoom', Chat);
store.defineMapper('message', Message);


// There MUST be an 'all-chat'
store.add('chatRoom', {
  id: 'all-chat'
});

export var defaultChat = 'all-chat';
export default store;
