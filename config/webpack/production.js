"use strict";

const path = require('path');
const webpack = require('webpack');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const _ = require('lodash');
let config = module.exports = require('./main.config.js');

config.output = _.extend(config.output, {
  path: path.join(config.context, 'public', 'assets', 'build'),
  filename: '[name]-[chunkhash].js',
  chunkFilename: '[id]-[chunkhash].js',
});

config.plugins.push(
  // Adjust the CSS configuration by specifying the extract text plugin settings
  new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),
  new ChunkManifestPlugin({
    filename: 'webpack-common-manifest.json',
    manfiestVariable: 'webpackBundleManifest',
  }),
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.optimize.OccurenceOrderPlugin()
);
