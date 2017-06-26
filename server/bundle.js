const path = require('path');

const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const config = require('../webpack.config.js')

const env = require('../config/environment')
const paths = env.paths

module.exports = ()=>{
  let bundleStart
  const compiler = webpack(config)

  compiler.plugin('compile', ()=>{
    console.log('Bundling...')
    bundleStart = Date.now()
  })

  compiler.plugin('done', ()=>{
    console.log(`Bundled in '${Date.now() - bundleStart}'ms!`)
  })

  const bundler = new webpackDevServer(compiler, {
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
