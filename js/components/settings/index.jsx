import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { mutCreator } from 'components/state-helpers';

import { identity } from 'actions';

class Settings extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    updateAlias: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = { config: props.config };
    this.mut = mutCreator(this);
  }

  saveAlias() {
    const { updateAlias } = this.props;
    const { alias } = this.state.config;

    updateAlias(alias);
  }

  // this is a lot of markup for so little output :-\
  // TODO: look into some sort of templating shorthand, like slim
  render() {
    const { regenerateUid, regenerateKeys, config } = this.props;
    const { alias } = this.state.config;
    const mut = this.mut;

    return (
      <div>
        <h2>Settings</h2>
        <hr />
        <Row>
          <Col md={6}>
            <h4>Safe Settings</h4>
            <Row>
              <Col sm={2}>
                <label className='control-label'>Alias</label><br/>
              </Col>
              <Col sm={10}>
                <input
                  className='form-control'
                  type='text'
                  onChange={mut('config.alias')}
                  value={alias} />
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <button
                  onClick={this.saveAlias.bind(this)}
                  className='pull-right btn btn-default'>Save</button>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <h4>Potentially Destructive Settings</h4>
            <Row>
              <Col sm={2}>
              <label className='control-label'>UID</label>
              </Col>
              <Col sm={7}>{config.uid}</Col>
              <Col sm={3}>
                <button
                  onClick={regenerateUid}
                  className='form-control btn btn-default'>Re-Generate</button>
              </Col>
            </Row>
              <p className='bg-danger padding-5'>
                Note that re-generating your UID will prevent people from being
                able to send you messages, and they will no longer be able to
                decrypt messages you send to them.
              </p>
            <br />
            <hr />
            <br />

            <div className='form-group'>
              <label>Public Key</label><br/>
              <pre>{config.publicKey}</pre>
              <label>Private Key Hidden</label><br />
              <button
                onClick={regenerateKeys}
                className='btn btn-default'>Re-Generate Keys</button>
              <br />
              <br />
              <p className='bg-success padding-5'>* Uses NaCl algorithms.</p>
              <p className='bg-danger padding-5'>
                Note that re-generating your keys will require you to be
                re-authorized to the network.
                You will not be able to decrypt any messages sent to you until
                re-authorization.
              </p>
              <br/><br/>
              <hr/><br/>
            </div>
          </Col>
        </Row>
        <div className='btn-group'>
          <button className='btn btn-default'>Export Settings</button>
          <button className='btn btn-default'>Import Settings</button>
        </div>
        <p className='padding-5'>
          Importing previously saved settings is
          the only way you can use the same account on multiple devices.
        </p>
        <br />
      </div>
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
  mapStateToProps,
  mapDispatchToProps
)(Settings);
