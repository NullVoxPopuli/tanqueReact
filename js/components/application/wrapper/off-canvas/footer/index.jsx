import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  Nav,
  NavItem,
  Button
} from 'reactstrap';

import ImportModal from 'components/utility/import-modal';
import ExportModal from 'components/utility/export-modal';

class OffCanvasFooter extends Component {
  static propTypes = {
    navClasses: PropTypes.string,
    closeOffCanvas: PropTypes.func.isRequired,
    history: PropTypes.any.isRequired
  }


  constructor(props) {
    super(props);

    this.didClickSettings = this.didClickSettings.bind(this);
  }

  didClickSettings() {
    const { closeOffCanvas, history } = this.props;

    closeOffCanvas();
    return history.push('/settings');
  }

  render() {
    const { navClasses } = this.props;
    return (
      <Nav vertical className={navClasses}>
        <NavItem className='d-flex flex-row justify-content-between'>
          <ImportModal />&nbsp;
          <ExportModal />
        </NavItem>
        <NavItem>
          <Button
            onClick={this.didClickSettings}
            className='w-100 nav-link btn-info mt-3'>
            Settings
          </Button>
        </NavItem>
      </Nav>
    );
  }
}

export default withRouter(OffCanvasFooter);
