"use strict";

const RollbarSourceMapPlugin = require('rollbar-sourcemap-webpack-plugin')
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const _ = require('lodash');

let config = require('./main.config.js');

config.output = _.extend(config.output, {
  path: path.join(config.context, '..', 'backend', 'build', 'public', 'assets')
});

config.plugins.push(
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    sourceMap: true
  })
);

config.plugins.push(
  new RollbarSourceMapPlugin({
    accessToken: process.env.ROLLBAR_POST_SERVER_ITEM,
    version: process.env.ROLLBAR_VERSION,
    publicPath: `${process.env.API_HOST}/assets`
  })
)

config.devtool = 'source-map';
config.output.sourceMapFilename = '[file].map';

module.exports = config;
