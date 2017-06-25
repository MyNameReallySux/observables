// // Node Modules
// const path = require('path')
//
// // Installed Packages
// const Webpack = require('webpack')
//
// // Local Packages
// const env = require('./config/environment')
// const paths = env.paths
//
// const config = (function(build){
//   let common = require('./config/webpack.common.config')
//   let additional = undefined
//   if(build == 'production') {
//     additional = require('./config/webpack.production.config')
//   } else {
//     additional = require('./config/webpack.development.config')
//   }
//   //return Object.assign({}, additional, common)
//   return common
// })(env.build)
//
// module.exports = config

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
    new CopyWebpackPlugin([
			//{ from: "./dist/css/app.css", to: "../demo/public/css/app.css" },
			//{ from: "./dist/js/radiance.jquery.js", to: "../demo/public/js/radiance.jquery.js"},
			{ from: "./dist/js/app.bundle.js", to: "../public/js/app.bundle.js"}
		])
  ],
  resolve: {
      alias: {
        Classes: path.resolve('./app/js/classes'),
        Mixins: path.resolve('./app/js/mixins'),
      }
  },
}

module.exports = config
