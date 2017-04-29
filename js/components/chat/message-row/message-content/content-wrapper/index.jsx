import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, CardBlock, Collapse, Button } from 'reactstrap';

export default class ContentWrapper extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  constructor(props) {
    super(props);

    this.state = { show: true };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const { children, closedText } = this.props;
    const { show } = this.state;

    const caretDirection = show ? 'down' : 'right';
    const buttonIconClass = `fa fa-caret-${caretDirection}`;
    return (
      <div className='d-flex justify-content-start'>
        <Button onClick={this.toggle}>
          <i className={buttonIconClass}></i>
        </Button>
        <Collapse isOpen={!show}>
          <span style={{ paddingLeft: '1.25rem', lineHeight: '2.25rem' }}>
            {closedText}
          </span>
        </Collapse>
        <Collapse isOpen={show}>
          <Card>
            <CardBlock>{children}</CardBlock>
          </Card>
        </Collapse>
      </div>
    );
  }
}
