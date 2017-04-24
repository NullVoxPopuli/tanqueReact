import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarHeader,
  NavbarToggler,
  Nav,
  NavItem, NavLink
} from 'reactstrap';

import ImportModal from 'components/utility/import-modal';
import ExportModal from 'components/utility/export-modal';

export default class Navigation extends Component {
  constructor(props) {
  super(props);

  this.toggle = this.toggle.bind(this);
  this.state = {
    isOpen: false
  };
}
toggle() {
  this.setState({
    isOpen: !this.state.isOpen
  });
}
  render() {
    return (
      <Navbar inverse fixed toggleable>
        <NavbarToggler right onClick={this.toggle} />
        <Link className='navbar-brand' to='/'>tanqueRéact</Link>

        <Collapse isOpen={this.state.isOpen}>
          <Nav>
           <li><Link to='/chat'>Chat</Link></li>
           <li><Link to='/settings'>Settings</Link></li>
          </Nav>
          <Nav right>
          hi
            <NavItem>Import</NavItem>
            <NavItem>Export</NavItem>
          </Nav>
        </Collapse>
       </Navbar>
    );
    // <ImportModal />
    // <ExportModal />
  }
}
