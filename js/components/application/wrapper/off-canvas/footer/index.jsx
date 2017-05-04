import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Nav,
  NavItem
} from 'reactstrap';

import ImportModal from 'components/utility/import-modal';
import ExportModal from 'components/utility/export-modal';

export default class OffCanvasFooter extends Component {
  render() {
    const { navClasses } = this.props;
    return (
      <Nav vertical className={navClasses}>
        <NavItem>
          <Link className='nav-link' to='/settings'>Settings</Link>
        </NavItem>
        <div className='d-flex flex-row justify-content-between'>
          <ImportModal />&nbsp;
          <ExportModal />
        </div>
      </Nav>
    );
  }
}
