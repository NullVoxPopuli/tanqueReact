// a helper for merging data with a react component's state.
// - because calling this.setState({...}) doesn't deep merge objects
import merge from 'deepmerge';

// --------------------------------
// using ember-inspired mut helper
// --------------------------------
// usage:
//   in constructor:
//     this.mut = mutCreator(this);
//
//  in render:
//     const mut = this.mut;
//     ...
//     onChange={mut('property')}
export function mutCreator(context) {
  return property => e => {
    const value = findValue(e);
    updateNestedStateForProperty(property, value, context);

    return value;
  };
}

// -----------------------
// various helpers
// -----------------------
function findValue(e) {
  if (e === undefined || e === null) return null;
  if (e.target && (e.target.value || e.target.value === '')) return e.target.value;
  if (e.value) return e.value;

  return e;
}

function digIntoState(property, state) {
  const properties = property.split('.');
  const firstProperty = properties[0];
  const others = properties.slice(1)[0];

  if (others === undefined) return state[firstProperty];

  return digIntoState(others, state[firstProperty]);
}

function updateNestedStateForProperty(property, value, context) {
  const newPartialState = propertyToObject(property, value);
  updateNestedState(newPartialState, context);
}

export function updateNestedState(newPartialState, context) {
  const currentState = context.state;
  const nextState = merge(currentState, newPartialState);

  context.setState(nextState);
}

// converts a.property.path, targetValue to
// { a: { property: { path: targetValue}}
function propertyToObject(propertyPath, targetValue) {
  const properties = propertyPath.split('.');
  const lastProperty = properties[properties.length - 1];

  return properties.reduceRight((accumulator, key) => {
    const o = {};
    o[key] = accumulator;

    if (key === lastProperty) o[key] = targetValue;

    return o;
  }, {});
}
