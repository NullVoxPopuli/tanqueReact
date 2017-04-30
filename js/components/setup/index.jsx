import React, { Component } from 'react';
import { Route, withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { identity } from 'actions';

import { Row, Col } from 'reactstrap';

import Genesis from './genesis';
import AutomaticStuff from './automatic-stuff';
import HowToGetAuthorized from './how-to-get-authorized';

class Setup extends Component {
  render() {
    const {
      config, updateAlias, setUid,
      regenerateKeys, importSettings,
      history
     } = this.props;
    const { alias, uid, publicKey, relays } = config;

    return (
      <Row className='upper-vertical-center'>
        <Col xl={6} lg={8} md={10} sm={12}>
        <Route exact={true} path="/setup/"
          render={() => <Genesis
            alias={alias}
            updateAlias={updateAlias}
            regenerateKeys={regenerateKeys}
            importSettings={importSettings}
            setUid={setUid}
            didImportSettings={() => history.push('/chat')}
            abort={() => history.push('/')}
            next={() => history.push('/setup/automatic-stuff')} />
        } />

        <Route path="/setup/automatic-stuff"
          render={() => <AutomaticStuff
            publicKey={publicKey}
            uid={uid}
            alias={this.props.config.alias}
            relays={relays}
            next={() => history.push('/setup/how-to-get-authorized')}/>
        } />

        <Route path="/setup/how-to-get-authorized"
          render={() => <HowToGetAuthorized
            next={() => history.push('/chat')}/>
          } />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  config: state.identity.config
});

const mapDispatchToProps = dispatch => ({
  setUid: uid => dispatch(identity.config.setUid(uid)),
  regenerateKeys: bindActionCreators(identity.config.regenerateKeys, dispatch),
  updateAlias: bindActionCreators(identity.config.updateAlias, dispatch),
  importSettings: bindActionCreators(identity.config.importSettings, dispatch)
});

const connected = connect(
  mapStateToProps, mapDispatchToProps
)(Setup);

export default withRouter(connected);
