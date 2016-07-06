import React, { Component } from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import { actions as sampleActions } from 'js/sample/ducks';

class ReduxTest extends Component{
  render() {
    let { buttonClicked, clickCount } = this.props;
    return (
      <div>
        <p>Hello, redux.
          <br/>
        <button onClick={buttonClicked}>Click me</button>
          <br/>
        click count: <b>{clickCount}</b>
        </p>
        <br />
        <Link to="/foo">Foo</Link>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    clickCount: state.sample.count,
  };
};

let mapDispatchToProps = {
  buttonClicked: sampleActions.buttonClicked,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTest);
