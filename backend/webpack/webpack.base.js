const Webpack = require('webpack');
const HappyPack = require('happypack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const root = path.join(__dirname, '../src');

const entry = {
  'appsync/add-new-words/index': './src/appsync/add-new-words/index.ts',
  'appsync/image-to-word/index': './src/appsync/image-to-word/index.ts',
  'appsync/word-to-speech/index': './src/appsync/word-to-speech/index.ts',
  'appsync/study-history/index': './src/appsync/study-history/index.ts',
  'appsync/study-set/index': './src/appsync/study-set/index.ts',
};

module.exports = {
  target: 'node',
  entry,
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
      }
    ]
  },
  externals: ['aws-sdk'],
  resolve: {
    extensions: [
      '.js', '.ts'
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
    }),
    new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  bail: true,
}
