import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import ImportModal from 'components/utility/import-modal';
import ExportModal from 'components/utility/export-modal';

import './styles.scss';

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
    const { isOpen } = this.state;

    const navStyle = isOpen ? { display: 'block' } : {};
    return (
      <Navbar inverse fixed='true' toggleable
        className='sticky-top navbar-dark navbar-toggleable-md bg-inverse'>
        <FontAwesome
          style={{ fontSize: '28px' }}
          className='navbar-toggler navbar-toggler-right'
          name='bars'
          onClick={this.toggle} />
        <Link className='navbar-brand' to='/'>tanqueRéact</Link>

        <Collapse className='navbar-collapse' isOpen={isOpen}>
          <Nav style={navStyle} className='mr-auto'>
           <NavItem><Link className='nav-link' to='/chat'>Chat</Link></NavItem>
           <NavItem><Link className='nav-link' to='/settings'>Settings</Link></NavItem>
          </Nav>
          <br className="hidden-md"></br>
          <Nav style={navStyle} className='float-md-right'>
            <ImportModal />&nbsp;
            <ExportModal />
          </Nav>
        </Collapse>
       </Navbar>
    );
  }
}
