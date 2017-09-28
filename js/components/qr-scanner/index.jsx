import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import * as Instascan from 'instascan';

export default class QRScanner extends Component {
  static propTypes = {
    onScan: PropTypes.func.isRequired,
    onError: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.didSelectCamera = this.didSelectCamera.bind(this);
  }

  componentDidMount() {
    this.mountScanner();
  }
    async mountScanner() {
      const { onError, onScan } = this.props;

      this.scanner = new Instascan.Scanner({
        video: document.getElementById('preview'),
        mirror: false,
        continuous: true
      });


      this.scanner.addListener('scan', content => {
        this.scanner.stop();

        onScan(content);
      });

      try {
        await this.startDefaultCamera();
      } catch(e) {
        onError(e);
      }
    }

    async startDefaultCamera() {
      this.cameras = await Instascan.Camera.getCameras();

      if (this.cameras.length === 0) throw new Error({ name: 'NoCameras' });

      const backCamera = this.cameras.find(c => c.name.toLowerCase().includes('back'));
      const defaultCamera = backCamera || this.cameras[0];

      await this.scanner.stop();
      await this.scanner.start(defaultCamera);
    }

    didSelectCamera(camera) {
      return async _e => {
        await this.scanner.stop();
        await this.scanner.start(camera);
      }
    }

    nameForCamera(cameraName) {
      const name = cameraName.toLowerCase();
      const isFront = name.includes('front');
      const isBack = name.includes('back');

      if (isFront) return 'Front';
      if (isBack) return 'Back';

      return cameraName;
    }

  render() {
    const { didSelectCamera, nameForCamera, cameras } = this;

    return (
      <div>
        <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
          <video id="preview" style={{ width: '100%' }} autoPlay="autoplay"></video>
        </div>

        <span>
          { cameras && cameras.map(c => <Button key={c.id} onClick={didSelectCamera(c)}>
            {nameForCamera(c.name)}
          </Button>) }
        </span>
      </div>
    );
  }
}
