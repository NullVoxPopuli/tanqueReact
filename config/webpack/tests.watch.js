"use strict";

var WebPackOnBuildPlugin = require('on-build-webpack');
var spawn = require('child_process').spawn;

process.on('SIGINT', () => {
  console.log('\nGoodbye');
  process.exit(0);
});

var fireOffMocha = new WebPackOnBuildPlugin((stats) => {
    let ps = spawn('node_modules/.bin/mocha', ['--require', 'source-map-support/register','./tmp/testBundle.js'], {
        stdio: 'inherit'
    });
    ps.on('exit', () => {});
});

var config = Object.assign({}, require('./tests'));

config.plugins.push(fireOffMocha);

module.exports = config;
