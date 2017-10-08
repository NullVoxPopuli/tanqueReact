import * as React from 'react';
import PropTypes from 'prop-types';
import ContentWrapper from '../content-wrapper';

export default class ImageContent
  extends React.Component<{ url: string, children: Element }, any> {

  render() {
    const { children, url } = this.props;

    return (
      <ContentWrapper>
        <a href={url} target='_blank'>
          <img src={url}style={{ maxHeight: '150px' }} />
        </a>
      </ContentWrapper>
    );
  }
}
