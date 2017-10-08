import * as React from 'react';
import PropTypes from 'prop-types';
import ContentWrapper from '../content-wrapper';

export default class ImageContent
  extends React.Component<{ tags: IMetadataTag }, any> {

  render() {
    const { tags } = this.props;

    const titleLink = (
      <a href={tags.url} target='_blank'>
        <strong>{tags.title}</strong><br />
      </a>
    );

    return <ContentWrapper closedText={titleLink}>
      <div className='d-flex justify-content-start'>
        <img src={tags.image} style={{ maxHeight: '100px' }}/>
        <span className='ml-2'>
          {titleLink}
          <em>{tags.description}</em>
        </span>
      </div>
    </ContentWrapper>;
  }
}
