import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';
import FontAwesome from 'react-fontawesome';
import { toggleCreator } from 'react-state-helpers';

import { setWhisperToUser } from 'actions/data/users';

import UserList from './user-list';
import OffCanvasFooter from './footer';

import './styles.scss';

class OffCanvas extends Component {
  static propTypes = {
    users: PropTypes.array,
    whisperingToUser: PropTypes.any,
    setWhisper: PropTypes.func
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
      state: { open },
      props: { whisperingToUser, users, showUserList }
    } = this;

    const offCanvasStyles = {
      bmBurgerButton: {
        zIndex: '1035',
        position: 'absolute',
        top: '13px',
        left: '17px',
        padding: '0px',
        margin: '0px'
      },
      bmMenuWrap: {
        zIndex: '1036'
      },
      bmOverlay: {
        zIndex: '1034'
      },
      bmMenu: {
        overflow: 'hidden'
      }
    };

    const burger = (
      <FontAwesome
        className='navbar-toggler'
        name='bars'
        onClick={toggle('open')} />
    );

    const cross = (
      <FontAwesome
        name='times'
        onClick={toggle('open')} />
    );

    return (
      <Menu
        isOpen={open}
        onStateChange={updateOpen}
        customBurgerIcon={burger}
        customCrossIcon={cross}
        styles={offCanvasStyles}
        pageWrapId={'app-container'}
        outerContainerId={'app-wrapper'}>
        <div style={{ flexGrow: '1' }}>
          {showUserList && <UserList
            whisperingToUser={whisperingToUser}
            users={users}
            handleUserSelect={handleUserSelect}/>}
        </div>

        {/* hidden-md-up  ? */}
        <OffCanvasFooter navClasses='align-self-end w-100'/>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  users: state.data.users.records,
  whisperingToUser: state.data.users.whisperingToUser
});

const mapDispatchToProps = dispatch => ({
  setWhisper: bindActionCreators(setWhisperToUser, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OffCanvas);
