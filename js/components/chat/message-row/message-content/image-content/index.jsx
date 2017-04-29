import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentWrapper from '../content-wrapper';

export default class ImageContent extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  }

  render() {
    const { children, url } = this.props;

    return <ContentWrapper>
      <a href={url} target='_blank'>
        <img src={url}style={{ maxHeight: '150px' }} />
      </a>
    </ContentWrapper>;
  }
}
