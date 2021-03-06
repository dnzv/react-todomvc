const path = require('path');
const assign = require('object-assign');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;
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
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        include: PATHS.src,
        loader: "style-loader!css-loader!postcss-loader"
      },
      {
        test: /\.jsx?$/,
        include: PATHS.src,
        loaders: ['babel?cacheDirectory']
      }
    ]
  },
  postcss: function () {
    return [autoprefixer, precss];
  }
};

if(TARGET === 'start' || !TARGET) {
  module.exports = assign({}, common, {
    devtool: 'eval-source-map',
    devServer: {
      contentBase: PATHS.dist,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
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
