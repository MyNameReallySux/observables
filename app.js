// Node Packages

// Installed Packages
const express = require('express')

// Local Packages
const env = require('./config')
const proxy = require('./server/proxy')
const paths = env.paths

// Initialize Express
const app = express()

// Set Public Directory
// {Files in this will be served based on directory structure}
app.use(express.static(paths.public))

app.use(proxy(app, env.is_prod))

// Run Server
app.listen(env.port, ()=>{
  console.log(`Server running on port ${env.port}`)
})
