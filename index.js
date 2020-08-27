const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
const path = require('path')

const corsOptions = {
  origin: 'http://localhost:3002',
  methods: 'GET,HEAD,POST,PATCH,DELETE,OPTIONS',
  credentials: true, // required to pass
  allowedHeaders: 'Content-Type, X-Requested-With'
}
app.use(cors(corsOptions))
app.use(cookieParser())

const bodyParser = require('body-parser')
const apiV1 = require('./api/v1/index')
const jwt = require('./_helpers/jwt')
const errorHandler = require('./_helpers/error-handler')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(jwt())
app.use('/api/v1', apiV1)
app.use(errorHandler)

app.use(express.static(path.join(__dirname, 'build')))
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.listen(3001, () => {
  console.log('Service is up and running')
})
