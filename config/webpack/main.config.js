const webpack = require('webpack');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssEntryPlugin = require("css-entry-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

const sourcePath = process.cwd();
const globalStylesPath = path.join(sourcePath, 'css');
const jsSourcePath = path.join(sourcePath, 'js');
const testsSourcePath = path.join(sourcePath, 'test');

const assetPath = '/assets';
const buildPath = path.join(sourcePath, `dist/${assetPath}`);
const imgPath = path.join(sourcePath, 'images');

const babelSettings = {
  extends: path.join(sourcePath, '.babelrc')
};

// Common plugins
const plugins = [
  new CopyWebpackPlugin([
    { from: 'images', to: 'images'},
  ]),
  new ExtractTextPlugin({
    filename: '[name]-[hash].css',
    allChunks: true
  }),
  // new CssEntryPlugin({
  //   entries: ['styles'],
  //   output: {
  //     filename: 'assets/[name]-[hash].css'
  //   }
  // }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor-[hash].js'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
    },
  }),
  new webpack.NamedModulesPlugin(),
  // TODO: this HtmlWebpackPlugin is mostly for proper building.
  //       webpack-dev-server uses another HtmlWebpackPlugin that
  //       puts the index from ../ to ./
  new HtmlWebpackPlugin({
    template: path.join(sourcePath, 'index.ejs'),
    inject: 'body',
    path: buildPath,
    // this needs to be up a directory, because
    // the build directory is /assets
    // that's fine for everything but the index.html, as
    // index is not an asset
    filename: '../index.html',
    NODE_ENV: process.env.NODE_ENV,
    processEnv: JSON.stringify({
      CURRENT_ENV:     process.env.NODE_ENV || 'development',
      ROUTER_BASE_PATH: process.env.ROUTER_BASE_PATH || ''
    })
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      context: sourcePath,
      postcss: [
        autoprefixer({
          browsers: [
            'last 3 version',
            'ie >= 10',
          ],
        }),
      ],
    },
  }),
];

// Common rules
const rules = [
  {
    // http://www.rubular.com/r/uoNoTK116U
    test: /^\.?[a-zA-z0-9\/_-]*(?!\.spec)\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader?' + JSON.stringify(babelSettings)
  },
  {
    test: /\.(png|gif|jpg|svg|html)$/,
    include: imgPath,
    use: 'url-loader?limit=20480&name=assets/[name]-[hash].[ext]',
  },
  {
    test: /\.scss$/,
    exclude: /node_modules/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        'sass-loader'
      ]
    })
  },
  {
    test: /\.css$/,
    use: ['css-loader']
  },
  {
    test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
    loader: 'file-loader?name=fonts/[name].[ext]'
  }
];

module.exports = {
  devtool: isProduction ? 'eval' : 'source-map',
  context: sourcePath,
  entry: {
    main: './js/main.js',
    // styles: './css/application.scss',
    vendor: [
      // TODO: move more 3rd party libs into here
      //       they'll likely not change very often.
      // TODO: figure out how to get [hash] to based on
      //       file contents, instead of whatever it is now.
      //       - this would be required for vendor.js to even
      //         be capable of providing an advantage
      'babel-polyfill',
      'react-dom',
      'react-redux',
      'react-router',
      'react',
      'redux-thunk',
      'redux',
      'actioncable'
    ],
  },
  output: {
    path: buildPath,
    // publicPath between the host and file url.
    // if assets live at the root, they should be at /
    publicPath: `${assetPath}/`,
    filename: '[name]-[hash].js',
  },
  module: {
    rules,
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx', '.css', '.scss'],
    modules: [
      path.resolve(sourcePath, 'node_modules'),
      jsSourcePath,
    ],
    alias: {
      js: jsSourcePath,
      components: path.join(jsSourcePath, 'components'),
      actions: path.join(jsSourcePath, 'actions'),
      utility: path.join(jsSourcePath, 'utility'),
      css: globalStylesPath,
      testHelpers: path.join(testsSourcePath, 'helpers')
    }
  },
  plugins
};
