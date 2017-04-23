import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import FileChooser from 'components/file-chooser';

export default class SettingsPresentation extends Component {
  static propTypes = {
    alias: PropTypes.string,

  }

  render() {
    const {
      alias, onAliasChange, saveAlias,
      uid, regenerateUid,
      publicKey, regenerateKeys,
      settingsDataUrl, importSettings
    } = this.props;

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
                  onChange={onAliasChange}
                  value={alias} />
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <button
                  onClick={saveAlias}
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
              <Col sm={7}>{uid}</Col>
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
              <pre>{publicKey}</pre>
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
          <a
            href={settingsDataUrl}
            download='settings.tanqueReact'
            target='_blank'
            className='btn btn-default'>Export Settings</a>
          <FileChooser
            onChange={importSettings}
            buttonClasses={'btn btn-default'}
            buttonText={'Import Settings'} />
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
