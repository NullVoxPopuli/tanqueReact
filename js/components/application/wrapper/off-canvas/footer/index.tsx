import * as React from 'react';
import { withRouter } from 'react-router';
import {
  Nav,
  NavItem,
  Button
} from 'reactstrap';

import ImportModal from 'components/utility/import-modal';
import ExportModal from 'components/utility/export-modal';

@withRouter
export default class OffCanvasFooter
  extends React.Component<{
    navClasses: string,
    closeOffCanvas: Function,
    history: any
  }, any> {

  constructor(props) {
    super(props);

    this.didClickSettings = this.didClickSettings.bind(this);
  }

  didClickSettings(): void {
    const { closeOffCanvas, history } = this.props;

    closeOffCanvas();

    history.push('/settings');
  }

  render() {
    const { navClasses } = this.props;
    return (
      <Nav vertical className={navClasses}>
        <NavItem className='d-flex flex-row justify-content-between'>
          <ImportModal tagName='div'/>&nbsp;
          <ExportModal tagName='div'/>
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
