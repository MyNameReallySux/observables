const path = require('path');
const fs = require('fs');

const webpack = require('webpack')
const webpack_dev_server = require('webpack-dev-server')
const config = require('../webpack.config.js')

const env = require('../config/environment')
const paths = env.paths
const main_path = paths.main

module.exports = ()=>{
  let bundle_start = undefined
  const compiler = webpack(config)

  compiler.plugin('compile', ()=>{
    console.log('Bundling...')
    bundle_start = Date.now()
  })

  compiler.plugin('done', ()=>{
    console.log('Bundled in ' + (Date.now() - bundle_start) + 'ms!')
  })

  const bundler = new webpack_dev_server(compiler, {
    publicPath: '/build/',
    hot: true,
    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    }
  })

  bundler.listen(8080, 'localhost', ()=>{
    console.log('bundling project, please wait...')
  })
}
