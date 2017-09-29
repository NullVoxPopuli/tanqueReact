import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import * as Instascan from 'instascan';

import { NoCameraError } from './errors';

export default class QRScanner extends Component {
  static propTypes = {
    onScan: PropTypes.func.isRequired,
    onError: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {};
    this.didSelectCamera = this.didSelectCamera.bind(this);
  }

  componentDidMount() {
    this.mountScanner();
  }

  mountScanner() {
    const { onError } = this.props;
    const scanner = this.newScanner();

    this.setState({ scanner }, async () => {
      this.addListeners();

      try {
        await this.getCameras();
        await this.startDefaultCamera();
      } catch(e) {
        onError(e);
      }
    });

  }

  newScanner() {
    const scanner = new Instascan.Scanner({
      video: document.getElementById('preview'),
      mirror: false,
      continuous: true
    });

    return scanner;
  }

  addListeners() {
    const { onScan } = this.props;
    const { scanner } = this.state;

    scanner.addListener('scan', content => {
      scanner.stop();

      onScan(content);
    });
  }

  async getCameras() {
    const cameras = await Instascan.Camera.getCameras();

    if (cameras.length === 0) throw new NoCameraError();

    this.setState({ cameras });
  }

  async startDefaultCamera() {
    const { cameras, scanner } = this.state;

    const backCamera = cameras.find(c => c.name.toLowerCase().includes('back'));
    const defaultCamera = backCamera || cameras[0];

    this.setState({ activeCamera: defaultCamera.name });

    await scanner.stop();
    await scanner.start(defaultCamera);
  }

  didSelectCamera(camera) {
    const { scanner } = this.state;

    return async _e => {
      this.setState({ activeCamera: camera.name });

      await scanner.stop();
      await scanner.start(camera);
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
    const {
      didSelectCamera, nameForCamera,
      state: { cameras, activeCamera }
    } = this;

    return (
      <div>
        <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
          <video id="preview" style={{ width: '100%' }} autoPlay="autoplay"></video>
        </div>

        <span className='d-flex justify-content-between'>
          { cameras && cameras.map(c => (
            <Button key={c.id} active={activeCamera === c.name} onClick={didSelectCamera(c)}>
              {nameForCamera(c.name)}
            </Button>
          )) }
        </span>
      </div>
    );
  }
}
