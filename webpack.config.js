const path = require('path');
const assign = require('object-assign');
const webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
};

const common = {
  entry: PATHS.src,
  output: {
    path: PATHS.dist,
    publicPath: '/dist/assets/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        include: PATHS.app,
        loaders: ['style', 'css']
      },
      {
        test: /\.js$/,
        include: PATHS.app,
        loaders: ['babel?cacheDirectory']
      }
    ]
  }
};

if(TARGET === 'start' || !TARGET) {
  module.exports = assign({}, common, {
    devtool: 'eval-source-map',
    devServer: {
      contentBase: PATHS.src,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: '0.0.0.0', //process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

if(TARGET === 'build') {
  module.exports = assign({}, common, {});
}
