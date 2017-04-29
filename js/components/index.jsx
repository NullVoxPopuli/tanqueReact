import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';

import './footer.scss';

export default class Index extends Component {
  static propTypes = {
    toChat: PropTypes.func.isRequired
  }

  render() {
    const { toChat } = this.props;

    return (
      <div id='index-page-inner'>
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

        <footer className='w-100 bg-faded p-3'>
          <div className='container'>
            <Row>
              <Col>
                <Nav vertical>
                  <NavItem><h5>Github Projects</h5></NavItem>
                  <NavItem>
                    <NavLink href='https://github.com/NullVoxPopuli/tanqueReact/'>This Project</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href='https://github.com/NullVoxPopuli/mesh-relay/'>The Mesh Relay</NavLink>
                  </NavItem>
                </Nav>
              </Col>
              <Col>
                <Nav vertical>
                  <NavItem><h5>CLI-Based Clients</h5></NavItem>
                  <NavItem>
                    <NavLink href='https://github.com/etkirsch/pyna-colada'>PyÑa Colada</NavLink>
                  </NavItem>
                  <NavItem>
                    <span className='nav-link'>
                      <a href='https://github.com/NullVoxPopuli/spiced_rumby'>Spiced Rumby</a>
                      &nbsp;via&nbsp;
                      <a href='https://github.com/NullVoxPopuli/meshchat-core'>MeshChat Core</a>
                    </span>
                  </NavItem>
                </Nav>

              </Col>
              <Col>
                <Nav vertical>
                  <NavItem><h5></h5></NavItem>
                  <NavItem>
                    <NavLink href='https://github.com/neuravion/mesh-chat-protocol'>Want to build your own?</NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </div>
        </footer>
      </div>
    );
  }
}
