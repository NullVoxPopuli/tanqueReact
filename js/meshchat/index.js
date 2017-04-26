// core integration with the meshchat protocol
// this could/should be extracted into its own package
export default class MeshchatClient {

  // config should include the following:
  // - alias
  // - publicKey
  // - privateKey
  // - relays
  constructor(config, onMessageReceived) {
    this.config = config;
    this.users = []
    this.messages = []
  }

  // startup the connection to the relays
  connect() {

  }

  // see meshchat protocol for payload format
  sendMessage(type, data) {

  }
}
