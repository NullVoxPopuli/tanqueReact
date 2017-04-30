import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toastSuccess, toastError } from 'utility/toast';

import { mutCreator } from 'components/state-helpers';
import { objectToDataURL } from 'utility';
import { identity } from 'actions';

import SettingsPresentation from './presentation';

class Settings extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    updateSafeSettings: PropTypes.func.isRequired,

    regenerateUid: PropTypes.func.isRequired,
    regenerateKeys: PropTypes.func.isRequired,
    importSettings: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = { config: props.config };
    this.mut = mutCreator(this);

    this.saveSafeSettings = this.saveSafeSettings.bind(this);
    this.importSettings = this.importSettings.bind(this);
    this.regenerateKeys = this.regenerateKeys.bind(this);
    this.regenerateUid = this.regenerateUid.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ config: nextProps.config });
  }

  importSettings(data) {
    this.props.importSettings(data)
      .then(() => toastSuccess('Settings have been imported.'))
      .catch(toastError);
  }

  regenerateKeys() {
    this.props.regenerateKeys()
      .then(() => toastSuccess('Keys have been regenerated. Please Re-Authorize to a network.'));
  }

  regenerateUid() {
    this.props.regenerateUid()
      .then(() => toastSuccess('UID has been regenerated.'));
  }

  saveSafeSettings() {
    const { updateSafeSettings } = this.props;
    const { alias, url } = this.state.config;

    updateSafeSettings({ alias, url })
      .then(() => toastSuccess('Settings have been saved!'));
  }

  render() {
    const { config, users } = this.props;
    const { alias, url, uid, publicKey } = this.state.config;

    const settingsForDownload = {
      config,
      members: users
    };

    const mut = this.mut;
    const settingsDataUrl = objectToDataURL(settingsForDownload);

    return (
      <SettingsPresentation
        alias={alias}
        onAliasChange={mut('config.alias')}
        saveSafeSettings={this.saveSafeSettings}
        url={url}
        onUrlChange={mut('config.url')}
        uid={uid}
        regenerateUid={this.regenerateUid}
        publicKey={publicKey}
        regenerateKeys={this.regenerateKeys}
        settingsDataUrl={settingsDataUrl}
        importSettings={this.importSettings} />
    );
  }
}

const mapStateToProps = state => ({
  users: state.data.users.records,
  config: state.identity.config,
  importFailure: state.identity.config.importSettingsFailure,
  importSuccess: state.identity.config.importSettingsSuccess
});

const mapDispatchToProps = dispatch => ({
  regenerateUid: bindActionCreators(identity.config.regenerateUid, dispatch),
  regenerateKeys: bindActionCreators(identity.config.regenerateKeys, dispatch),
  updateSafeSettings: bindActionCreators(identity.config.updateSafeSettings, dispatch),
  importSettings: bindActionCreators(identity.config.importSettings, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
