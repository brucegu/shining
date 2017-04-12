var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.js');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(baseConfig, {
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': 'production'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
});
