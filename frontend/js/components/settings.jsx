import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import {
  regenerateUid, regenerateKeys, changeAlias
} from 'js/actions/config-actions';

import { Row, Col } from 'react-bootstrap';


class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      aliasInputValue: this.props.config.alias,
    };
  }

  _onChange(e) {
    // this.state.aliasInputValue = e.target.value;
    this.setState({ aliasInputValue: e.target.value });
  }

  saveAlias() {
    this.props.changeAlias(this.state.aliasInputValue);
  }

  // this is a lot of markup for so little output :-\
  // TODO: look into some sort of templating shorthand, like slim
  render() {
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
                  onChange={this._onChange.bind(this)}
                  value={this.state.aliasInputValue} />
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
              <Col sm={7}>{this.props.config.uid}</Col>
              <Col sm={3}>
                <button
                  onClick={this.props.regenerateUid}
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
              <pre>{this.props.config.publicKey}</pre>
              <label>Private Key Hidden</label><br />
              <button
                onClick={this.props.regenerateKeys}
                className='btn btn-default'>Re-Generate Keys</button>
              <br />
              <br />
              <p className='bg-success padding-5'>* Uses NaCl algorithms.</p>
              <p className='bg-danger padding-5'>
                Note that re-generating your keys will require you to be re-authorized to the network.
                You will not be able to decrypt any messages sent to you until
                re-authorization.
              </p>
              <br/><br/>
              <hr/><br/>
            </div>
          </Col>
        </Row>
        <button className='btn btn-default'>Export Settings</button>
        <button className='btn btn-default'>Import Settings</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    store: state.dataStore,
    config: state.config,
  };
}

export default connect(
  mapStateToProps,
  { regenerateUid, regenerateKeys, changeAlias }
)(Settings);
