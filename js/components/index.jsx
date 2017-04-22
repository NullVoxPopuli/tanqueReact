import React, { Component } from 'react';

export default class Index extends Component {
  render() {
    return (
      <div>
        <h2>Welcome to tanqueRéact!</h2>
        <h5>
          The <em>open source</em> p2p encrypted chat client that operates over <br />
          <em>open source</em> mesh nodes on free-tier cloud services. <br />
          Deploy your own 'members-only' chat in minutes!
        </h5>

        <br />
        <h3>TODO</h3>
        Check for valid config <br />
         - if one doesn't exist, show a welcoming thing asking to guide through that process. <br />
         - if one does exist, present a card showing the user, with a button saying "Start Chatting" <br />
        File Uploads <br />
         - over chat <br />
         - for importing users <br />
        Inline Images <br />
        Expanding Image links <br />
      </div>
    );
  }
}
