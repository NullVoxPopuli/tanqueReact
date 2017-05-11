import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toastSuccess, toastError } from 'utility/toast';

import { mutCreator, findValue } from 'react-state-helpers';
import { objectToDataURL } from 'utility';
import { identity, views } from 'actions';

import SettingsPresentation from './presentation';

class Settings extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,

    regenerateUid: PropTypes.func.isRequired,
    regenerateKeys: PropTypes.func.isRequired,
    importSettings: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.mut = mutCreator(this);

    this.updateRelay = this.updateRelay.bind(this);
    this.importSettings = this.importSettings.bind(this);
    this.regenerateKeys = this.regenerateKeys.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ config: nextProps.config });
  }

  updateRelay(relayPosition) {
    const { setUrlForRelay } = this.props;
    return e => {
      const value = findValue(e);

      setUrlForRelay({ value, relayPosition });
    };
  }

  importSettings(data) {
    this.props.importSettings(data)
      .then(() => toastSuccess('Settings have been imported.'))
      .catch(toastError);
  }

  regenerateKeys() {
    const { regenerateKeys, regenerateUid } = this.props;

    regenerateKeys()
      .then(regenerateUid)
      .then(() => toastSuccess('Keys and UID have been regenerated. Please Re-Authorize to a network.'));
  }

  render() {
    const {
      config,
      users, setAlias,
      allowNotifications, toggleAllowNotifications,
      config: { relays, alias, uid, publicKey }
    } = this.props;

    const settingsForDownload = {
      config,
      members: users
    };

    const mut = this.mut;
    const settingsDataUrl = objectToDataURL(settingsForDownload);

    return (
      <SettingsPresentation
        alias={alias}
        onAliasChange={mut('_alias', setAlias)}
        relays={relays}
        onRelayUpdate={this.updateRelay}
        uid={uid}
        publicKey={publicKey}
        regenerateKeys={this.regenerateKeys}

        allowNotifications={allowNotifications}
        onToggleAllowNotifications={toggleAllowNotifications}

        settingsDataUrl={settingsDataUrl}
        importSettings={this.importSettings} />
    );
  }
}

const mapStateToProps = state => ({
  allowNotifications: state.views.app.allowNotifications,
  users: state.data.users.records,
  config: state.identity.config,
  importFailure: state.identity.config.importSettingsFailure,
  importSuccess: state.identity.config.importSettingsSuccess
});

const mapDispatchToProps = dispatch => ({
  toggleAllowNotifications: bindActionCreators(views.app.toggleAllowNotifications, dispatch),
  regenerateUid: bindActionCreators(identity.config.regenerateUid, dispatch),
  regenerateKeys: bindActionCreators(identity.config.regenerateKeys, dispatch),
  setAlias: bindActionCreators(identity.config.setAlias, dispatch),
  importSettings: bindActionCreators(identity.config.importSettings, dispatch),
  setUrlForRelay: bindActionCreators(identity.config.setUrlForRelay, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
