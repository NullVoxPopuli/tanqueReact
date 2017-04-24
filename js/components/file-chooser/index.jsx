import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';


export default class FileChooser extends Component {
  static propTypes = {
    buttonText: PropTypes.string.isRequired,
    buttonClasses: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.didClickButton = this.didClickButton.bind(this);
    this.didChangeSelectedFile = this.didChangeSelectedFile.bind(this);
  }

  didClickButton(event) {
    event.stopPropagation();
    this.refs.fileChooser.click();
  }

  didChangeSelectedFile() {
    const { onChange } = this.props;
    const { files } = this.refs.fileChooser;
    const file = files[0];
    const reader = new FileReader();

    reader.onload = e => {
      const data = e.target.result;

      onChange(data);
    }

    reader.readAsText(file);
  }

  render() {
    const { buttonText, buttonClasses } = this.props;
    const { didClickButton, didChangeSelectedFile } = this;

    return (
      <Button
        className={buttonClasses}
        onClick={didClickButton}>
        <input
          onChange={didChangeSelectedFile}
          type='file'
          ref='fileChooser'
          style={{ display: 'none' }} />
          {buttonText}
      </Button>
    );
  }
}
