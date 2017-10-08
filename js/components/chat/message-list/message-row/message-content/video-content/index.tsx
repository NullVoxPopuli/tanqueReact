import * as React from 'react';
import PropTypes from 'prop-types';
import * as parseUrl from 'url-parse';
import { parse as parseQuery } from 'query-string';

import ContentWrapper from '../content-wrapper';

export default class ImageContent
  extends React.Component<{ url: string }, any> {

  embedUrlFor(url: string): string {
    // for youtube, the pattern is:
    // https://www.youtube.com/watch?v=BIvezCVcsYs
    //   to
    // https://www.youtube.com/embed/BIvezCVcsYs
    const urlParts = parseUrl(url);
    const queryString = urlParts.query;
    const query = parseQuery(queryString);
    const video = query.v;

    return `https://youtube.com/embed/${video}`;
  }

  render() {
    const { url } = this.props;

    const embedUrl = this.embedUrlFor(url);

    const iframeProps = {
      allowFullscreen: true,
      width: '560',
      height:'315',
      frameBorder: '0',
      src: embedUrl
    };

    return <ContentWrapper>
      <iframe { ...iframeProps }/>
    </ContentWrapper>;
  }
}
