import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { identity } from 'actions';

import { Row, Col } from 'reactstrap';

import Genesis from './genesis';
import AutomaticStuff from './automatic-stuff';
import HowToAuthorize from './how-to-authorize';
import HowToGetAuthorized from './how-to-get-authorized';

class Setup extends Component {
  render() {
    const { config, updateAlias, regenerateUid, regenerateKeys } = this.props;
    const { alias, uid, publicKey, relays } = config;

    return (
      <Row className='upper-vertical-center'>
        <Col md={{ size: 6 }} sm={12}>
        <Route exact={true} path="/setup/"
          render={() => <Genesis
            alias={alias}
            updateAlias={updateAlias}
            regenerateKeys={regenerateKeys}
            regenerateUid={regenerateUid} />
        } />

        <Route path="/automatic-stuff"
          render={() => <AutomaticStuff publicKey={publicKey} uid={uid} relays={relays} />} />

        <Route path="/how-to-authorize"
          render={() => <HowToAuthorize />} />

        <Route path="/how-to-get-authorized"
          render={() => <HowToGetAuthorized />} />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  config: state.identity.config
});

const mapDispatchToProps = dispatch => ({
  regenerateUid: bindActionCreators(identity.config.regenerateUid, dispatch),
  regenerateKeys: bindActionCreators(identity.config.regenerateKeys, dispatch),
  updateAlias: bindActionCreators(identity.config.updateAlias, dispatch)
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(Setup);
