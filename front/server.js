const webpack = require('webpack');
const express = require('express');
const path = require('path');

const dev = require('webpack-dev-middleware');
const hot = require('webpack-hot-middleware');
const webpackConfig = require('./webpack/webpack.dev');

const compiler = webpack(webpackConfig);
const app = express();

app.use(dev(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(hot(compiler));

app.use('*', (req, res, next) => {
  const fileName = path.join(compiler.outputPath, 'index.html');
  compiler.outputFileSystem.readFile(fileName, (err, result) => {
    if (err) {
      next(err);
      return;
    }

    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
