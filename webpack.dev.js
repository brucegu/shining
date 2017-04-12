var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.js');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(baseConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': 'development'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
})
