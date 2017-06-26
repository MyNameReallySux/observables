// Node Modules
const path = require('path')

// Installed Packages
const Webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// Local Packages
const env = require('./config/environment')
const paths = env.paths

const config = {
  // Makes sure errors in console map to the correct file
  // and line number
  devtool: 'eval',
  entry: [
    paths.main
  ],
  devServer: {
    hot: true,
    open: true,
    inline: true,
    overlay: true,
    compress: true,
    port: 4000,
    contentBase: path.resolve(__dirname, 'public')


  },
  output: {
    path: paths.build,
    filename: 'js/app.bundle.js'
  },
  module: {
    loaders: [{
      enforce: 'pre',
      test: /\.js$/,
      exclude: [paths.node_modules],
      loader: 'eslint-loader'
    }, {
      test: /\.js$/,
      exclude: [paths.node_modules],
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new CopyWebpackPlugin([{
      from: "./dist/js/app.bundle.js",
      to: "../public/js/app.bundle.js"
    }])
  ],
  resolve: {
    alias: {
      Classes: path.resolve('./app/js/classes'),
      Mixins: path.resolve('./app/js/mixins')
    }
  }
}

module.exports = config
