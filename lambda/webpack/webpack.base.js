const Webpack = require('webpack');
const HappyPack = require('happypack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  target: 'node',
  entry: {
    'appsync/add-new-words/app': './src/appsync/add-new-words/app.ts',
    'appsync/image-to-word/app': './src/appsync/image-to-word/app.ts',
    'appsync/word-to-speech/app': './src/appsync/word-to-speech/app.ts',
    'appsync/study-history/app': './src/appsync/study-history/app.ts',
    'appsync/study-set/app': './src/appsync/study-set/app.ts',
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
      {
        test: /\.dict$/,
        use: 'raw-loader'
      }
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
      loaders: ['ts-loader', 'raw-loader'],
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
