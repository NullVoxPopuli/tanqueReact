import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import store from '../store';

export const Foo = React.createClass({
  render() {
    return (
      <div>
        <header>
          <Link to="/">Home</Link>
        </header>

        <p>You have landed on foo!</p>
        <button onClick={() => browserHistory.push('/')}>Go home</button>
      </div>
    );
  },
});
