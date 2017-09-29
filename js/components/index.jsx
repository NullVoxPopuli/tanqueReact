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
      <div style={{ marginTop: '40px' }}>
        <div id='wrap'>
          <h3 className='hidden-sm-down text-center'>Welcome to tanqueRéact!</h3>
          <h4 className='hidden-md-up text-center'>Welcome to tanqueRéact!</h4>
          <br />
          <hr style={{ width: '50%' }} />
          <p className='text-center mx-auto' style={{ fontSize: '1.3em', maxWidth: '450px' }}>
            The <em>open source</em> p2p encrypted chat client that operates over
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
        </div>
      </div>
    );
  }
}
