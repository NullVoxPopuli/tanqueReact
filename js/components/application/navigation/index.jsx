import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { toggleCreator } from 'react-state-helpers';

import {
  Collapse,
  Navbar,
  Nav,
  NavItem
} from 'reactstrap';

import ImportModal from 'components/utility/import-modal';
import ExportModal from 'components/utility/export-modal';

import './styles.scss';

export default class Navigation extends Component {
  static propTypes = {
    toggleLeftBar: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.toggle = toggleCreator(this);
    this.state = {
      isOpen: false
    };
  }

  render() {
    const {
      toggle,
      state: { isOpen },
      props: { toggleLeftBar }
    } = this;

    const navStyle = isOpen ? { display: 'block' } : {};
    return (
      <Navbar inverse fixed='true' toggleable
        className='sticky-top navbar-dark navbar-toggleable-md bg-inverse'>
        {/* className='navbar-toggler'
          this causes the icon to hide on larger screens.
          in order to use this, the sidebar would need to be present
          on larger screens as well...
          */}
        <div className='d-flex flex-row flex-nowrap'>
          <FontAwesome
            className='mr-2 d-flex align-items-center'
            name='bars'
            onClick={toggleLeftBar} />
          <Link className='navbar-brand m-0' to='/'>tanqueRéact</Link>
        </div>


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
