const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dev = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new HtmlWebpackPlugin({
      title: 'PocketCards',
      filename: 'index.html',
      template: path.join(__dirname, '../mobile.ejs'),
      minify: false,
      hash: true,
      inject: 'body',
    }),
  ],
};

module.exports=merge(baseConfig, dev);
