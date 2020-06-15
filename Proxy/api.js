const express = require('express')
const router = express.Router()
const { backendProxy } = require('./controller/httpProxy')
router.use('/api/v1', backendProxy)
module.exports = router
