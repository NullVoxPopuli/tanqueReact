import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Metascraper from 'metascraper';

import _ from 'lodash';

import ImageContent from './image-content';
import UrlContent from './url-content';

// http://stackoverflow.com/a/17773849
const URL_REGEX = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;
const IS_IMAGE_REGEX = /(jpg|png|gif)$/;
const imageTester = new RegExp(IS_IMAGE_REGEX);

export default class MessageContent extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);

    const message = props.message;
    const url = this.firstURL(message);
    const isImage = this.isImage(url);

    this.state = {
      isImage,
      firstUrl: url,
      showHiFiContent: true,
      tags: {},
      hasTags: false
    };

    if (!isImage && !_.isEmpty(url)) this.getTags(url);
  }

  firstURL(message) {
    const matches = message.match(URL_REGEX);
    return (matches || [])[0];
  }

  isImage(url) {
    return imageTester.test(url || '');
  }

  getTags(url) {
    Metascraper
      .scrapeUrl(url)
      .then(metadata => {
        const hasTags = !_.isEmpty(metadata);
        this.setState({ tags: metadata, hasTags });
      });
  }

  render() {
    const { message } = this.props;
    const { firstUrl, isImage, tags, hasTags } = this.state;

    const hasExtraContent = !_.isEmpty(firstUrl);

    let extraContent = '';

    if (hasExtraContent) {
      if (isImage) {
        extraContent = <ImageContent url={firstUrl} />;
      } else if (hasTags) {
        extraContent = <UrlContent tags={tags} />;
      }
    }

    return (
      <span>
        {message}
        {extraContent}
      </span>
    );
  }
}
