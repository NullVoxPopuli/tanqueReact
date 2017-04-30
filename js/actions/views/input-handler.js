import { toastError } from 'utility/toast';
import { CHAT, EMOTE } from 'actions/data/messages';

import redux from 'js/redux-store';

import {
  sendToAll,
  whisper,
  ping,
  pingAll
} from '../network/message-dispatch';

const COMMAND = '/';
const COMMAND_EMOTE = '/me';
const COMMAND_WHISPER = '/w';
const COMMAND_PING = '/p';
const COMMAND_PING_ALL = '/pa';
const WHISPER_REGEX = /\/(\w+) (\w+|"(.+)") (.+)$/;
const SELF_REGEX = /\/(\w+) (.+)$/;

export function handleInput(input) {
  return dispatch => {
    if (input.startsWith(COMMAND)) {
      return dispatch(handleCommand(input));
    }

    dispatch(sendToAll(input, CHAT));
  };
}

export function handleCommand(input) {
  return dispatch => {
    if (input.startsWith(COMMAND_EMOTE)) return handleEmote(input);
    if (input.startsWith(COMMAND_WHISPER)) return handleWhisper(input);
    if (input.startsWith(COMMAND_PING)) return handlePing(input);
    if (input.startsWith(COMMAND_PING_ALL)) return dispatch(pingAll());

    // error?
    toastError('Command not recognized.');
  };
}

function handleEmote(input) {
  const matches = input.match(SELF_REGEX);
  const message = matches[1];

  redux.dispatch(sendToAll(message, EMOTE));
}

function handleWhisper(input) {
  const matches = input.match(WHISPER_REGEX);
  const userString = matches[2] || matches[1];
  const message = matches[3];

  redux.dispatch(whisper(userString, message));
}

function handlePing(input) {
  const matches = input.match(SELF_REGEX);
  const userString = matches[1];

  redux.dispatch(ping(userString));
}
