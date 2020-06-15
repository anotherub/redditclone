const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()

app.use(cors())
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

app.listen(3001, () => {
  console.log('Service is up and running')
})
