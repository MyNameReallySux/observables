const HttpProxy = require('http-proxy')
const proxy = HttpProxy.createProxyServer()

module.exports = function(app, isProd){
  return function(req, res, next){
    if(!isProd){
      const bundle = require('./bundle.js')
      bundle()

      app.all('/build/*', function(req, res){
        proxy.web(req, res, {
          target: 'http://localhost:8080'
        })
      })
    }

    proxy.on('error', function(err){
      console.log('Could not connect to proxy, please try again...')
    })
  }
}
