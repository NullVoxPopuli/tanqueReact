import * as React from 'react';
import PropTypes from 'prop-types';
import stateHelpers from 'react-state-helpers';

import { Card, CardBlock, Collapse, Button } from 'reactstrap';

@stateHelpers
export default class ContentWrapper
  extends React.Component<{
    closedText?: string|JSX.Element, toggle?: any, values?: any }, any> {

  render() {
    const {
      children, closedText,
      toggle, values: { show }
    } = this.props;

    const caretDirection = show ? 'down' : 'right';
    const buttonIconClass = `fa fa-caret-${caretDirection}`;

    return (
      <div className='d-flex justify-content-start'>
        <Button onClick={toggle('show')}>
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
