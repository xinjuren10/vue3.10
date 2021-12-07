const { merge } = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.conf')

module.exports = merge(webpackConfigBase(false), {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  module: {},
  plugins: [],
  devServer: {
    hot: true
  }
})
