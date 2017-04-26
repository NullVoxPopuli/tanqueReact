"use strict";

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const _ = require('lodash');

let config = require('./main.config.js');

module.exports = config;
