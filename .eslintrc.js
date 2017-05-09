module.exports = {
  root: true,
  "extends": [
    "airbnb-base",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  plugins: [
    'react',
    'import',
    'babel',
    'jest'
  ],
  settings: {
    "import/parser": "webpack",
    // "import/parser": "babel-eslint",
    'import/resolver': {
      "node": {"extensions": [".js", ".jsx"]},
      'webpack': {
        config: './config/webpack/main.config.js'
      }
    }
  },
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  ecmaFeatures: {
    modules: true
  },
  "env": {
    "node": true,
    "es6": true,
    "jest": true,
    "jest/globals": true,
    "browser": true
  },
  "maxWarnings": 1,
  "rules": {
    // -------------------------------
    // general rules
    // -------------------------------
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "no-use-before-define": ["error", { "functions": false, "classes": true }],

    "no-underscore-dangle": ["error", { "allow": ["__meta__"] }],

    // treat undefined as valid in function
    // http://eslint.org/docs/rules/consistent-return#treatundefinedasunspecified
    "consistent-return": ["warn", { "treatUndefinedAsUnspecified": true }],
    // allow single arg functions to not have parenthesis
    // http://eslint.org/docs/rules/arrow-parens#as-needed
    "arrow-parens": ["error", "as-needed"],
    // have an arrow on both sides of the phat-arrow / hash-rocket
    // http://eslint.org/docs/rules/arrow-spacing
    "arrow-spacing": ["error", { "before": true, "after": true }],
    // No spaces before function parethesis
    // http://eslint.org/docs/rules/space-before-function-paren
    "space-before-function-paren": ["error", "never"],
    // Enforce spaces around curly braces in deconstruction and imports
    // http://eslint.org/docs/rules/object-curly-spacing#always
    'object-curly-spacing': ["error", "always"],
    // Allow singleline if blocks
    // http://eslint.org/docs/rules/curly
    'curly': ["error", "multi-line"],
    // Linter was incorrectly assuming that a method that didn't use `this` was a class method
    // http://eslint.org/docs/rules/class-methods-use-this
    'class-methods-use-this': ["off"],
    // In Ember, everything is a dev dep, cause we deploy compiled version
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    "import/no-extraneous-dependencies": [
      0, {
        "devDependencies": false,
        "optionalDependencies": false,
        "peerDependencies": false}],
    "comma-dangle": ["error", "never"],
    // http://eslint.org/docs/rules/one-var-declaration-per-line
    "one-var-declaration-per-line": ["error", "always"],
    // http://eslint.org/docs/rules/object-property-newline
    "object-property-newline": ["error", { "allowMultiplePropertiesPerLine": true }],
    // http://eslint.org/docs/rules/newline-per-chained-call
    "newline-per-chained-call": ["error", { "ignoreChainWithDepth": 3}],
    // http://eslint.org/docs/rules/newline-before-return
    "newline-before-return": 0,
    "eol-last": ["error", "always"],
    "indent": ["error", 2],
    "no-mixed-spaces-and-tabs": "error",
    "no-console": 1,
    "no-warning-comments": ["warn"],
    "complexity": ["warn", 3],
    "no-else-return": ["error"],
    "quotes": [2, 'single'],

    // -------------------------
    // eslint-plugin-react rules
    // -------------------------
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-vars.md
    "react/jsx-uses-vars": [2],
    "react/prop-types": 1
  }
};
