const path = require('path');
const plugins = require('./plugins');
const rules = require('./rules');

module.exports = {
  entry: {
    common: '@src/js/common.js',
    index: '@src/js/index.js',
    detail: '@src/js/list.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: "[name].[hash:8].js"
  },
  devServer: {
    inline: true,
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '..'),
      '@src': path.join(__dirname, '..', 'src')
    }
  },
  module: {
    rules
  },
  plugins
}
