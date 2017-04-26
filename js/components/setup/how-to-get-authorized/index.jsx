import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBlock, CardText, Button } from 'reactstrap';

export default class HowToGetAuthorized extends Component {
  static propTypes = {
    next: PropTypes.func.isRequired
  }

  render() {
    const { next } = this.props;

    return (
      <div>
        <h1 className='display-4'>How to get authorized</h1>

        <Card>
          <CardBlock>
            <ul className='pt-3 pb-3 mr-3'>
              <li>
                Start with opening your chat client.
                If you're reading this, you're doing great so far!
                <br /><br />
              </li>
              <li>
                In order to become a member of an existing network,
                you must know someone who is already on the network.
                <br /><br />
              </li>
              <li>
                Once you locate someone who is already on the network,
                you'll need to give them you're identity file.
                <br /><br />
              </li>
              <li>
                This person will import your identity file to their client,
                and your identity will be propagated throughout the network.
                <br /><br />
              </li>
              <li>
                Your friend on the network whom you've given your identity file to
                will then connect to your client.
                <br /> <br />
              </li>
              <li>
                That's it! You've now fully exchanged public keys with your friend, and
                can now communicate freely within the network.
              </li>
            </ul>
            <Button block size='lg' color='success' onClick={next}>Done! Let's chat!</Button>
          </CardBlock>
        </Card>
      </div>
    );
  }
}
