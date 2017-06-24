// Node Modules
const path = require('path')

// Installed Packages
const Webpack = require('webpack')

// Local Packages
const env = require('./environment')
const paths = env.paths

const config = {
  devtool: 'eval',
  devServer: {
    hot: true,
    inline: true,
    contentBase: path.resolve(__dirname, 'dist', '../'),
    publicPath: '/'
  }
}

module.exports = config
