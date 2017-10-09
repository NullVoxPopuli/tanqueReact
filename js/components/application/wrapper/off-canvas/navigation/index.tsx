import * as React from 'react';
import { withRouter } from 'react-router';
import { Nav, NavItem } from 'reactstrap';

class OffCanvasNavigation
  extends React.Component<{ history: any, closeOffCanvas: Function }, any> {

  constructor(props) {
    super(props);

    this.didClickLink = this.didClickLink.bind(this);
  }

  didClickLink(path) {
    const { history, closeOffCanvas } = this.props;
    return () => {
      closeOffCanvas();
      history.push(path);
    };
  }

  render() {
    const { didClickLink } = this;

    return (
      <div>
        <Nav vertical>
          <NavItem>
            <a
              className='nav-link'
              onClick={didClickLink('/')}>Welcome</a>
          </NavItem>

          <NavItem>
            <a
              className='nav-link'
              onClick={didClickLink('/chat')}>Chat</a>
          </NavItem>

          <NavItem>
            <a
              className='nav-link'
              onClick={didClickLink('/settings')}>Settings</a>
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default withRouter(OffCanvasNavigation);
