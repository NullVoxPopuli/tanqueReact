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
      <Navbar inverse fixed='true' toggleable
        className='bg-inverse navbar-toggleable-sm'>
        <NavbarToggler right onClick={this.toggle} />
        <Link className='navbar-brand' to='/'>tanqueRéact</Link>

        <Collapse className='' isOpen={true}>
          <Nav>
           <NavItem><Link className='nav-link' to='/chat'>Chat</Link></NavItem>
           <NavItem><Link className='nav-link' to='/settings'>Settings</Link></NavItem>
          </Nav>
          <Nav className='pull-right'>
            <ImportModal />
            <ExportModal />
          </Nav>
        </Collapse>
       </Navbar>
    );
  }
}
