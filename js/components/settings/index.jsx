import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { mutCreator } from 'components/state-helpers';
import { convertObjectToBase64String } from 'utility';
import { identity } from 'actions';

import SettingsPresentation from './presentation';

class Settings extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    updateAlias: PropTypes.func.isRequired,

    regenerateUid: PropTypes.func.isRequired,
    regenerateKeys: PropTypes.func.isRequired,
    importSettings: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = { config: props.config };
    this.mut = mutCreator(this);

    this.saveAlias = this.saveAlias.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ config: nextProps.config });
  }

  saveAlias() {
    const { updateAlias } = this.props;
    const { alias } = this.state.config;

    updateAlias(alias);
  }

  settingsToDataUrl() {
    const { config } = this.props;
    const string = convertObjectToBase64String(config);

    return `data:text/json;base64,${string}`;
  }

  // this is a lot of markup for so little output :-\
  // TODO: look into some sort of templating shorthand, like slim
  render() {
    const { regenerateUid, regenerateKeys, importSettings } = this.props;
    const { alias, uid, publicKey } = this.state.config;

    const mut = this.mut;
    const settingsDataUrl = this.settingsToDataUrl();

    return (
      <SettingsPresentation
        alias={alias}
        onAliasChange={mut('config.alias')}
        saveAlias={this.saveAlias}
        uid={uid}
        regenerateUid={regenerateUid}
        publicKey={publicKey}
        regenerateKeys={regenerateKeys}
        settingsDataUrl={settingsDataUrl}
        importSettings={importSettings}
        />
    );
  }
}

const mapStateToProps = state => ({
  config: state.identity.config,
  importFailure: state.identity.config.importSettingsFailure,
  importSuccess: state.identity.config.importSettingsSuccess
});

const mapDispatchToProps = dispatch => ({
  regenerateUid: bindActionCreators(identity.config.regenerateUid, dispatch),
  regenerateKeys: bindActionCreators(identity.config.regenerateKeys, dispatch),
  updateAlias: bindActionCreators(identity.config.updateAlias, dispatch),
  importSettings: bindActionCreators(identity.config.importSettings, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
