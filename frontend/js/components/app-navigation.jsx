import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import ImportModal from './utility/import-modal';
import ExportModal from './utility/export-modal';

export default class extends React.Component {
  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">tanqueRéact</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
           <li><Link to={'/chat'}>Chat</Link></li>
           <li><Link to={'/settings'}>Settings</Link></li>
          </Nav>
          <Nav pullRight>
            <ImportModal />
            <ExportModal />
            <NavDropdown eventKey={3} title="Destructive Things" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Delete Identity</MenuItem>
              <MenuItem eventKey={3.2}>Clear User List</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
       </Navbar>

    );
  }
}
