export default function notify(msg) {
  const title = `${msg.sender.name} sent you a message!`;
  const options = {
    body: msg.decryptedMessage,
    icon: ''
  };

  // Let's check if the browser supports notifications
  if (!('Notification' in window)) {
    // alert("This browser does not support desktop notification");
  } else if (Notification.permission === 'granted') {
    // If it's okay let's create a notification
    new Notification(title, options);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(permission => {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        new Notification(title, options);
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}
