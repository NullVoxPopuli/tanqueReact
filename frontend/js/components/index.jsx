import React from 'react';
import { render } from 'react-dom';
import Chat from './chat/index';
import { Row, Col } from 'react-bootstrap';

class App extends React.Component {
  render () {
    return (
      <div>
        <Chat />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
