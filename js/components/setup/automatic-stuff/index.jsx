import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReadMore from 'components/-components/read-more';

import {
  Card, CardBlock, CardHeader,
  CardSubtitle, CardText, CardTitle,
  Button
} from 'reactstrap';

export default class AutomaticStuff extends Component {
  static propTypes = {
    publicKey: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    relays: PropTypes.array.isRequired,

    next: PropTypes.func.isRequired
  }

  onKeyPress(target) {
    if (target.charCode == 13) {
      this.props.next();
    }
  }

  render() {
    const { alias, uid, publicKey, relays, next } = this.props;
    return (
      <div>
        <h1 className='display-4'>Generated for <em>You</em></h1>
        <h5>Specific to <em>{alias}</em></h5>
        <Card>
          <CardBlock>
            <CardTitle>Public Key</CardTitle>
            <CardSubtitle className='text-wrap mb-3'>{publicKey}</CardSubtitle>
            <CardText>
              <ReadMore lines={2}>
                This is known to all members of the network so that each member can encrypt a message specifically for you.
                With the combination of your public key, and their private key, the message is only known between you and the sender.
                Likewise, you'll use other network member's public keys to encrypt a message specifically for your intended recipient.
                Also,this is used to identify you as a person to other members of the network.
                <br />
                For more on public-key cryptography,&nbsp;
                <a href='https://en.wikipedia.org/wiki/Public-key_cryptography' target='_blank'>
                  wikipedia has a good article on it.
                </a>
              </ReadMore>
            </CardText>
          </CardBlock>
        </Card>
        <br /><br />
        <Card>
          <CardBlock>
            <CardTitle>Unique Identifier (UID)</CardTitle>
            <CardSubtitle className='text-wrap mb-3'>{uid}</CardSubtitle>
            <CardText>
              <ReadMore lines={2}>
                This is used for identifying members of the network.
                It must be unique, as it it used to lookup members of the network on each client
                for the purposes of sending messages. It can be a hex version of the publicKey,
                as the publicKey must also be unique per member of the network.
              </ReadMore>
            </CardText>
          </CardBlock>
        </Card>
        <br />
        <br />
        <Button size='lg' block color='success' onClick={next}>
          Next
        </Button>
        <br /><br /><br />
      </div>
    );
  }
}
