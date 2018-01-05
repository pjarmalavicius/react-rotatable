'use strict';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  __DEV__: false
};

const webpack = require('webpack');

const plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin(GLOBALS)
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = {
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }]
  },
  output: {
    library: 'react-rotatable',
    libraryTarget: 'umd'
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js']
  }
};
