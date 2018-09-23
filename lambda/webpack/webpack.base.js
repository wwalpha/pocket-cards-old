const Webpack = require('webpack');
const HappyPack = require('happypack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  target: 'node',
  entry: {
    'add-words': './src/add-words/app.ts',
    'image-to-word': './src/image-to-word/app.ts',
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ]
  },
  externals: ['aws-sdk'],
  resolve: {
    extensions: [
      '.ts', '.dict'
    ],
  },
  plugins: [
    new HappyPack({
      loaders: ['ts-loader'],
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '..'),
    }),
    new Webpack.NoEmitOnErrorsPlugin(),
    new Webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],
  bail: true,
}
