import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push as Menu } from 'react-burger-menu';
import FontAwesome from 'react-fontawesome';
import { toggleCreator } from 'react-state-helpers';

import { setWhisperToUser } from 'actions/data/users';
import { app } from 'actions/views';

import UserList from './user-list';
import OffCanvasFooter from './footer';
import OffCanvasNavigation from './navigation';

import './styles.scss';

class OffCanvas extends Component {
  static propTypes = {
    users: PropTypes.array,
    whisperingToUser: PropTypes.any,
    setWhisper: PropTypes.func,
    toggleLeftBar: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = { open: false };

    this.toggle = toggleCreator(this);
    this.handleUserSelect = this.handleUserSelect.bind(this);
    this.updateOpen = this.updateOpen.bind(this);
  }

  handleUserSelect(user) {
    const { setWhisper } = this.props;

    setWhisper(user);
    this.setState({ open: false });
  }

  // needed to keep this component's open state
  // in-sync with the Menu's open value
  updateOpen(state) {
    this.setState({ open: state.isOpen });
  }

  render() {
    const {
      toggle,
      updateOpen, handleUserSelect,
      props: {
        whisperingToUser, users, showUserList,
        isLeftBarShown, toggleLeftBar
      }
    } = this;

    const offCanvasStyles = {
      bmBurgerButton: { zIndex: '-1' },
      bmMenuWrap: { zIndex: '1036' },
      bmOverlay: { zIndex: '1034' },
      bmMenu: { overflow: 'hidden' }
    };

    const cross = (
      <FontAwesome
        name='times'
        onClick={toggleLeftBar} />
    );

    return (
      <Menu
        noOverlay
        isOpen={isLeftBarShown}
        onStateChange={updateOpen}
        customBurgerIcon={null}
        customCrossIcon={cross}
        styles={offCanvasStyles}
        pageWrapId={'app-container'}
        outerContainerId={'app-wrapper'}>
        <div style={{ flexGrow: '1' }}>
          {showUserList &&
            <UserList
              whisperingToUser={whisperingToUser}
              users={users}
              handleUserSelect={handleUserSelect} />}

            {!showUserList &&
              <OffCanvasNavigation
                closeOffCanvas={toggleLeftBar} />}
        </div>

        {/* hidden-md-up  ? */}
        <OffCanvasFooter
          closeOffCanvas={toggleLeftBar}
          navClasses='align-self-end w-100'/>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  users: state.data.users.records,
  whisperingToUser: state.data.users.whisperingToUser
});

const mapDispatchToProps = dispatch => ({
  setWhisper: bindActionCreators(setWhisperToUser, dispatch),
  toggleLeftBar: bindActionCreators(app.toggleLeftBar, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OffCanvas);
