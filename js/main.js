import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import reduxStore from './redux-store';
import AppWrapper from './components/application/wrapper';

import CSS from '../css/application';


ReactDOM.render(
  <Provider store={reduxStore}>
    <Router history={browserHistory}>
      <AppWrapper />
    </Router>
  </Provider>,
  document.getElementById('app')
);
