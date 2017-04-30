import { createAction } from 'redux-actions';
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

const BEGIN_HANDLE_INPUT = 'input-handler/BEGIN_HANDLE_INPUT';
const BEGIN_HANDLE_COMMAND = 'input-handler/BEGIN_HANDLE_COMMAND';
const beginHandleInput = createAction(BEGIN_HANDLE_INPUT);
const beginHandleCommand = createAction(BEGIN_HANDLE_COMMAND);


export const handleInput = input => dispatch => {
  dispatch(beginHandleInput(input));
  if (input.startsWith(COMMAND)) return dispatch(handleCommand(input));

  dispatch(sendToAll(input, CHAT));
};

export const handleCommand = input => dispatch => {
  dispatch(beginHandleCommand(input));
  if (input.startsWith(COMMAND_EMOTE)) return handleEmote(input);
  if (input.startsWith(COMMAND_WHISPER)) return handleWhisper(input);
  if (input.startsWith(COMMAND_PING)) return handlePing(input);
  if (input.startsWith(COMMAND_PING_ALL)) return dispatch(pingAll());

  toastError('Command not recognized.');
};

function handleEmote(input) {
  const matches = input.match(SELF_REGEX);
  const message = matches[1];

  redux.dispatch(sendToAll(message, EMOTE));
}

function handleWhisper(input) {
  const matches = input.match(WHISPER_REGEX);
  // the first entry in matches is the input
  const userString = matches[3] || matches[2];
  const message = matches[4];
  redux.dispatch(whisper(userString, message));
}

function handlePing(input) {
  const matches = input.match(SELF_REGEX);
  const userString = matches[1];

  redux.dispatch(ping(userString));
}
