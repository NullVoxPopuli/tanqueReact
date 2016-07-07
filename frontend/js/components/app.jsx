import React from 'react';
import { render } from 'react-dom';

import AppNavigation from './app-navigation';

export default class extends React.Component {
  render () {
    return (
      <div>
        <AppNavigation />
        <div className='content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
