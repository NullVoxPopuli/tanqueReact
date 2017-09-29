import React, { Component } from 'react';

import { Row, Col, Nav, NavItem, NavLink } from 'reactstrap';

import './styles.scss';

export default class Footer extends Component {
  render() {
    return (
      <footer className='w-100 bg-faded p-3'>
        <div className='container'>
          <Row>
            <Col xs={12} sm={4}>
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
            <Col xs={12} sm={4}>
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
            <Col xs={12} sm={4}>
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
    );
  }
}
