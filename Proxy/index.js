const express = require('express')
const http = require('http')
const { frontendProxy } = require('./controller/httpProxy')
const api = require('./api')

const app = express()
const server = http.createServer(app)

app.use(/^(?!\/api\/)/, frontendProxy)
app.use(api)

app.use('*', (req, res, next) => res.status(404).send('NOT FOUND'))
process.on('unhandledRejection', (reason, promise) => {
  console.log('Global unhandledRejection Handler', reason.stack)
})
process.on('uncaughtException', (error) => {
  console.log('Global uncaughtException Handler', error)
  // process.exit(1)
})
server.listen(3000, () => {
  // Function to load up the error manager
  console.log('Proxy is running')
})
