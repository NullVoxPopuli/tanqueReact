export * from 'jest-enzyme';

const localStorageMock = (function() {
  let store = {};
  return {
    getItem(key) {
      return store[key];
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      store[key] = undefined;
    },
    clear() {
      store = {};
    }
  };
}());

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
