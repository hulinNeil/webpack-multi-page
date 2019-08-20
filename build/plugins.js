const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const TransfromAssets = require('./transfromAssets');
const path = require('path');
const nav = require(`../src/data.js`).nav;
const plugins = [];

nav.forEach(value => {
  plugins.push(
    new HtmlWebpackPlugin({
      filename: `${value.path}.html`,
      template: path.resolve(__dirname, '../src', `${value.path}.ejs`),
      inject: true,
      chunks: ['common', value.path],
      favicon: './src/assets/img/favicon.ico',
      title: value.text === '首页' ? '四川万泰和兴科技有限公司' : `${value.text}_四川万泰和兴科技有限公司`,
      path:value.path,
      minify: {
        collapseWhitespace: true
      }
    })
  )
})

const otherPlugins = [
  new MiniCssExtractPlugin({
    filename: '[name].[hash:8].css',
    chunkFilename: '[id].css',
  }),
  new optimizeCss({
    assetNameRegExp: /\.css$/g,
    cssProcessor: require('cssnano'),
    cssProcessorOptions: {
      discardComments: {
        removeAll: true
      }
    },
    canPrint: true
  }),
  new TransfromAssets()
];

plugins.splice(nav.length, 0, ...otherPlugins);

module.exports = plugins;
