import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  debug: true,
  devtool: 'eval-source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  noInfo: true, // set to false to see a list of every file being bundled.
  entry: [
    // must be first entry to properly set public path
    './development/webpack-public-path',
    'webpack-hot-middleware/client?reload=true',
    './development/index'
  ],
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: `${__dirname}/development`, // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
      __DEV__: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({     // Create HTML file that includes references to bundled CSS and JS.
      template: 'development/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      inject: true
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'development'),
          path.join(__dirname, 'node_modules')
        ],
        loaders: ['babel']
      },
      {test: /(\.css|\.scss)$/, loaders: ['style', 'css?sourceMap', 'sass?sourceMap']}
    ]
  }
};
