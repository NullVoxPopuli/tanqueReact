import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentWrapper from '../content-wrapper';
import parseUrl from 'url-parse';
import { parse as parseQuery } from 'query-string';

export default class ImageContent extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  }

  emberUrlFor(url) {
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

    const emberUrl = this.emberUrlFor(url);

    return <ContentWrapper>
      <iframe
        allowFullscreen
        width='560' height='315'
        frameBorder='0'
        src={emberUrl}>
      </iframe>
    </ContentWrapper>;
  }
}
