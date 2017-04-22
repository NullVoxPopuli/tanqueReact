import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import CSS from '../css/application';

import reduxStore from './redux-store';
import AppWrapper from './components/application/wrapper';

render(
  <Provider store={reduxStore}>
    <Router history={browserHistory}>
      <AppWrapper />
    </Router>
  </Provider>,
  document.getElementById('app')
);
