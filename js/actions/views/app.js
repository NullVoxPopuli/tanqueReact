import { createAction } from 'redux-actions';

import { default as createNotification } from 'utility/create-notification';

export const TOGGLE_LEFT_BAR = 'views/app/TOGGLE_LEFT_BAR';
export const TOGGLE_ALLOW_NOTIFICATIONS = 'views/app/TOGGLE_ALLOW_NOTIFICATIONS';
export const ATTEMPT_NOTIFICATION = 'views/app/ATTEMPT_NOTIFICATION';

export const toggleLeftBar = createAction(TOGGLE_LEFT_BAR);
export const toggleAllowNotifications = createAction(TOGGLE_ALLOW_NOTIFICATIONS);
export const attemptNotification = createAction(ATTEMPT_NOTIFICATION);

export function notify(messagePayload) {
  return (dispatch, getState) => {
    const state = getState();
    const allowNotifications = state.views.app.allowNotifications;

    if (!allowNotifications) return;

    const title = `${messagePayload.sender.name} sent you a message!`;
    const options = {
      body: messagePayload.message
      // icon: ''
    };

    dispatch(attemptNotification({ title, options }));

    createNotification(title, options);
  };
}
