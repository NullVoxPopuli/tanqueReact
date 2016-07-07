"use strict";

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const _ = require('lodash');
let config = module.exports = require('./main.config.js');

config = _.extend(config, {
  debug: true,
  displayErrorDetails: true,
  outputPathinfo: true,
  devtool: 'sourcemap'
});

config.output = _.extend(config.output, {
  // app/assets/javascripts/build which enables hooking into Sprockets
  path: path.join(config.context, 'frontend', 'assets', 'build'),
  // compiled bundle filename
  filename: '[name].js',
  // Settings to better support source map file paths
  devtoolModuleFilenameTemplate: '[resourcePath]',
  devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]',
});

// Adjust the CSS configuration by specifying the extract text plugin settings
config.plugins.push(
  new ExtractTextPlugin('[name].css', { allChunks: true })
);

// Babel-specific development time configuration
let babelLoader = _.find(config.module.loaders, function(loader) { return loader.loader === 'babel'; });
if (babelLoader) {
  babelLoader.query.cacheDirectory = process.env.BABEL_CACHE_DIR || '';
}

config.devServer = {
  contentBase:'./frontend',
  publicPath: '/assets/build',
  proxy: {
    "*" : "http://sample-replace.docker:3000"
  },
  historyApiFallback: {
    index: '/'
  }
};
