const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const dev = {
  mode: 'development',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],
};

module.exports = merge(baseConfig, dev);
