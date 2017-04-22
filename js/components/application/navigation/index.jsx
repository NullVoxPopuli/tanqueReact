import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import ImportModal from 'components/utility/import-modal';
import ExportModal from 'components/utility/export-modal';

export default class Navigation extends Component {
  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">tanqueRéact</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
           <li><Link to='/chat'>Chat</Link></li>
           <li><Link to='/settings'>Settings</Link></li>
          </Nav>
          <Nav pullRight>
            <ImportModal />
            <ExportModal />
          </Nav>
        </Navbar.Collapse>
       </Navbar>
    );
  }
}
