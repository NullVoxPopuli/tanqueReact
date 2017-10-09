import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Metascraper from 'metascraper';

import * as _ from 'lodash';

import ImageContent from './image-content';
import UrlContent from './url-content';
import VideoContent from './video-content';

// http://stackoverflow.com/a/17773849
const URL_REGEX = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;
const IS_IMAGE_REGEX = /(jpg|png|gif)$/;
const IS_VIDEO_REGEX = /(youtube)/;
const imageTester = new RegExp(IS_IMAGE_REGEX);
const videoTester = new RegExp(IS_VIDEO_REGEX);

export default class MessageContent extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    className: PropTypes.string
  }

  constructor(props) {
    super(props);

    const message = props.message;
    const url = this.firstURL(message);
    const isImage = this.isImage(url);
    const isVideo = this.isVideo(url);

    this.state = {
      isImage,
      isVideo,
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

  isVideo(url) {
    return videoTester.test(url || '');
  }

  getTags(url) {
    Metascraper
      .scrapeUrl(url)
      .then(metadata => {
        const hasTags = !_.isEmpty(metadata);
        this.setState({ tags: metadata, hasTags });
      })
      .catch(console.info);
  }

  hasExtraContent() {
    const { firstUrl } = this.state;
    return !_.isEmpty(firstUrl);
  }

  extraContent() {
    const { firstUrl, isVideo, isImage, tags, hasTags } = this.state;

    if (isVideo) {
      return <VideoContent url={firstUrl} />;
    } else if (isImage) {
      return <ImageContent url={firstUrl} />;
    } else if (hasTags) {
      return <UrlContent tags={tags} />;
    }
  }

  render() {
    const { message, className } = this.props;
    const hasExtraContent = this.hasExtraContent();

    return (
      <span className={className}>
        {!hasExtraContent && message}
        {hasExtraContent && this.extraContent()}
      </span>
    );
  }
}
