const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const CompressionPlugin = require('compression-webpack-plugin');

const dev = {
  mode: 'production',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: false,
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]'
    })
  ],
};

module.exports = merge(baseConfig, dev);
