// Node Modules
const path = require('path')

// Installed Packages
const Webpack = require('webpack')

// Local Packages
const env = require('./environment')
const paths = env.paths

const config = {
  devtool: 'source-map',
}

module.exports = config
