import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Truncate from 'react-truncate';

export default class ReadMore extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    lines: PropTypes.number
  }

  constructor(props) {
    super(props);

    this.state = { lines: props.lines };
    this.didClick = this.didClick.bind(this);
  }

  didClick() {
    this.setState({ lines: false })
  }

  render() {
    const { children } = this.props;
    const { lines } = this.state;

    const ending = <span>
      ... <a href='#' onClick={this.didClick}>Read more</a>
    </span>;

    return (
      <Truncate
        lines={lines}
        ellipsis={ending}>
        {children}
      </Truncate>
    );
  }
}
