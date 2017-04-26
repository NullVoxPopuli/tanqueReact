import * as ActionCable from 'actioncable/lib/assets/compiled/action_cable';

const RELAY_CHANNEL = 'MeshRelayChannel';

export default class Relay {
  constructor(url, onMessageReceived, onErrorReceived, onInfo) {
    this.url = url;
    this.onMessageReceived = onMessageReceived;
    this.onErrorReceived = onErrorReceived;
    this.cable = null;
    this.channel = null;
  }

  // starts the cable
  connect() {
    this.cable = ActionCable.createConsumer(this.url);
    // would there ever be a use case for multiple channels?
    this.channel = cable.subscriptions.create({ channel: RELAY_CHANNEL }, {
      connected: cableConnected,
      disconnected: cableDisconnected,
      rejected: cableRejected,
      received: cableReceived,
      // MeshRelayChannel#chat called on server
      chat: cableReceivedChat
    });
  }

  perform(payload) {
    this.channel.send(payload);
  }

  cableConnected() {
    this.onInfo('Connected!');
  }

  cableDisconnected() {
    this.onInfo('Disconnected');
  }

  cableRejected(data) {
    this.onErrorReceived(data);
  }

  cableReceived(data) {
    this.onMessageReceived(data);
  }

  cableReceivedChat(chatData) {
    this.onMessageReceived(data);
  }


}
