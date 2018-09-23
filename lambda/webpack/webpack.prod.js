const Webpack = require('webpack');
const path = require('path');
const baseConfig = require('./webpack.base');
const merge = require('webpack-merge');

const config = {
  mode: 'production',
  output: {
    filename: '[name].mins.js',
    path: path.resolve(__dirname, '../dist/prod'),
  },
  plugins: [
    new Webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: false
    })
  ],
}

const merged = merge(baseConfig, config);

module.exports = merged;
