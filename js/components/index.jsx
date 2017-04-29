import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

export default class Index extends Component {
  static propTypes = {
    toChat: PropTypes.func.isRequired
  }

  render() {
    const { toChat } = this.props;

    return (
      <div>
        <h3 className='display-3 text-center'>Welcome to tanqueRéact!</h3>
        <br />
        <hr style={{ width: '50%' }} />
        <br />
        <p className='text-center' style={{ fontSize: '1.3em' }}>
          The <em>open source</em> p2p encrypted chat client that operates over <br />
          <em>open source</em> mesh nodes on free-tier cloud services. <br />
          Deploy your own 'members-only' chat in minutes!
        </p>

        <div className='mx-auto mt-5' style={{ display: 'table' }}>
          <Button
            size='lg'
            color='success'
            onClick={toChat}>
            Begin Chatting
          </Button>
        </div>

        <br />
        <h3>TODO</h3>
        File Uploads <br />
         - over chat <br />
        Inline Images <br />
        Expanding Image links <br />
      </div>
    );
  }
}
