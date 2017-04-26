"use strict";

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const _ = require('lodash');

const sourcePath = process.cwd();

let config = require('./main.config.js');
// webpack dev server can't find anything otherwise.
// there doesn't seem to be a way to have
// assets go to assets/
// and index to /
// and still have webpack-dev-server be able to find both.
config.output.publicPath = '/';
config.output.path = path.join(process.cwd(), 'dist');

config.plugins.push(
  new webpack.HotModuleReplacementPlugin()
);

config.plugins.push(
  new HtmlWebpackPlugin({
    template: path.join(sourcePath, 'index.ejs'),
    inject: 'body',
    path: config.output.path,
    // this needs to be up a directory, because
    // the build directory is /assets
    // that's fine for everything but the index.html, as
    // index is not an asset
    filename: 'index.html',
    NODE_ENV: process.env.NODE_ENV,
    processEnv: JSON.stringify({
      CURRENT_ENV:     process.env.NODE_ENV || 'development'
    })
  })
)

config.devServer = {
  stats: {
    // Config for minimal console.log mess.
    assets: true,
    colors: true,
    hash: true,
    timings: true,
    chunks: false,
    chunkModules: false,
    children: false,
    version: true
  },
  hot: true,
  host: '0.0.0.0',
  port: 4201,
  // opens browser
  open: false,
  historyApiFallback: true,
  publicPath: '/'
};

module.exports = config;
