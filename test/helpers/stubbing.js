import sinon from 'sinon';
import * as _ from 'lodash';

// https://github.com/airbnb/enzyme/issues/586#issue-175851483
export function stubMethod(wrapper, method, returnValue) {
  const component = wrapper.instance();
  const func = _.isFunction(returnValue) ? returnValue : () => returnValue;
  const meth = sinon.stub(component, method).callsFake(func);

  // Force the component and wrapper to update so that the stub is used
  // ONLY works when both of these are present
  component.forceUpdate();
  wrapper.update();

  return meth;
}

export function stubQueryParams(string) {
  Object
    .defineProperty(
      window.location,
      'search', {
        writable: true,
        value: `?${string}`
      });
}
