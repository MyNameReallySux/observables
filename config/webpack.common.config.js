// Node Modules
const path = require('path')

// Installed Packages
const Webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// Local Packages
const env = require('./environment')
const paths = env.paths

const config = {
  // Makes sure errors in console map to the correct file
  // and line number
  devtool: 'eval',
  entry: [
    paths.main
  ],
  devServer: {
    inline: true,
    contentBase: paths.public
  },
  output: {
    path: paths.build,
    publicPath: paths.public,
    filename: 'js/app.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [paths.node_modules],
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }]
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin()
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new CopyWebpackPlugin([
			//{ from: "./dist/css/app.css", to: "../demo/public/css/app.css" },
			//{ from: "./dist/js/radiance.jquery.js", to: "../demo/public/js/radiance.jquery.js"},
			{ from: "./dist/js/app.bundle.js", to: "../public/js/app.bundle.js"}
		])
  ]
}

module.exports = config
