const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config');
const webpackHot = require('webpack-hot-middleware');

const app = express();


app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, '/publicServed')));
app.use(webpackMiddleware(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
}));
app.use(webpackHot(webpack(webpackConfig), {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 1 * 1000,
}));
// app.use(express.static(path.join(__dirname, 'node_modules')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(app.get('port'));
console.log('Listening to port... ', app.get('port'));
