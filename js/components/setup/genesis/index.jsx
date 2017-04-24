import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

import { FormGroup, Card, CardBlock, CardHeader, CardText, Input, Label, Row, Col, Button } from 'reactstrap';

import { mutCreator } from 'components/state-helpers';

export default class Genesis extends Component {
  static propTypes = {
    alias: PropTypes.string,

    updateAlias: PropTypes.func.isRequired,
    regenerateUid: PropTypes.func.isRequired,
    regenerateKeys: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { alias: props.alias };
    this.didSubmit = this.didSubmit.bind(this);
    this.mut = mutCreator(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ alias: nextProps.alias });
  }

  didSubmit() {
    const { updateAlias, regenerateKeys, regenerateUid } = this.props;
    const { alias } = this.state;

    updateAlias(alias);
    regenerateUid();
    regenerateKeys();

    return <Redirect to="/setup/automatic-stuff" />;
  }

  render() {
    const { alias } = this.state;
    const mut = this.mut;

    return (
      <div>
        <h1 className="display-4">What would you like to be called?</h1>

        <Card>
          <CardBlock>
            <FormGroup>
              <Label size='lg'>Your Alias</Label>
              <Input type='text'
                size='lg'
                value={alias}
                onChange={mut('alias')} />
            </FormGroup>
            <Button block
              color='success'
              size='lg'
              className='float-right'
              onClick={this.didSubmit}>
              Next
            </Button>
          </CardBlock>
        </Card>
      </div>
    );
  }
}
