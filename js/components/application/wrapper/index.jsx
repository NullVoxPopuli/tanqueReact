import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigation from 'components/application/navigation';

export default class Wrapper extends Component {
  static propTypes = {
    children: PropTypes.isRequired
  }

  render() {
    return (
      <div>
        <Navigation />
        <div className='content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
