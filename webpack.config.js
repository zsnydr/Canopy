
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './public/components/app.jsx'
  ],
  output: {
    path: path.resolve(__dirname, 'publicServed/'),
    publicPath: 'http://localhost:3000',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.jsx$/,
      exclude: /(node_modules)/,
      loader: 'babel', // 'babel-loader' is also a valid name to reference
      query: {
        presets: ['react', 'es2015'] //can add "es2015" to compile to es5
      },
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
