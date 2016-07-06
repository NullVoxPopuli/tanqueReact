'use strict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = module.exports = {
  // The base path for resolving entrypoints
  context: process.cwd(),
  node_modules: path.join(process.cwd(), 'node_modules'),
};

// The entry points for the application. Each entry point
// results in a different output (combined) JS file.
// For now, we only have one for all of the JS on the site.
// Eventually we might split it into "public" and "authenticated",
// to avoid making public pages download all app JS.
config.entry = {
  main: './frontend/js/main.js',
};

config.output = {
  // webpack supports code-splitting and, if enabled, this is where it'll download bundles
  publicPath: '/assets/build',
};

config.resolve = {
  root: [
    config.node_modules,
    /*
    allow referencing application scripts witha an absolute path
    'javascripts/utils/validation'
    vs relative paths from current module (ie from javascripts/funds/components
    which would require the following grossness)
    '../../utils/validation'
    */
    path.resolve('./frontend'),
  ],
  // List of which extensions should be auto-searched when resolving modules,
  // so that we can say `require('./foo')` instead of `require('./foo.js')`
  extensions: ['', '.js', '.jsx', '.css', '.scss', '.sass'],
  alias: {
    config$: path.resolve('./frontend/js/config', process.env.NODE_ENV || 'development'),
  },
};

config.resolveLoader = {
  root: path.join(config.node_modules),
  modulesDirectories: [config.node_modules],
};

// Loaders are used to pre-process code before webpack gets it,
// for example to transpile ES6 or JSX files using Babel: https://github.com/babel/babel-loader
config.module = {
  loaders: [
    {
      test: /\.jsx?$/,
      include: [
        path.resolve('./frontend/js'),
      ],
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-2'],
      },
    },
    {
      test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
      // loader: 'url?limit=10000'
      loader: 'url',
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap!autoprefixer!resolve-url?sourceMap&fail!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true!import-glob-loader'),
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap!autoprefixer!resolve-url?sourceMap&fail'),
    },
  ],
};

// This is where webpack plugins go
config.plugins = [
  // The provide plugin makes the specified module available in all modules using the
  // specified variable name.
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    _: 'lodash',
  }),
];

// CSS/SCSS

config.postcss = [
  autoprefixer({
    browsers: ['last 2 versions'],
  }),
];
