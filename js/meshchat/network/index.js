import RelayPool from './relay-pool';

export default class Network {
  constructor() {
    this.relayPool = new RelayPool();
  }

  connect() {
    this.relayPool.connect();
  }

  sendMessage(user, encryptedMessage) {
    const payload = this.payloadFor(user, encryptedMessage)

    this.relayPool.sendPayload(payload);
  }

  payloadFor(to, encryptedMessage) {
    return { to, message: encryptedMessage };
  }
}
