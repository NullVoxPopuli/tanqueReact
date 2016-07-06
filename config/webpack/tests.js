"use strict";

var webpack = require('webpack');

var config = {
    entry:  './spec/tests.webpack.js',
    output:{
        path: './tmp',
        filename: 'testBundle.js'
    },
    //setting a resolve root of 'app/frontend' allows libs to be referenced as 'javascripts/.../module' from spec files.
    resolve:{
        root: ['frontend', 'node_modules']
    },
    module:{
        loaders:[{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query:{
                presets:['react','es2015']
            }
        }]
    },
    target: 'node',
    devtool: 'inline-source-map',
    plugins: [
      // The provide plugin makes the specified module available in all modules using the
      // specified variable name.
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        _: 'lodash',
        expect: 'expect'
      })
    ]
};

module.exports = config;
