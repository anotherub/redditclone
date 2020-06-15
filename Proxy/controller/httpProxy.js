const { createProxyMiddleware } = require('http-proxy-middleware')
const { proxyErrorHandler } = require('./proxyErrorHandler')
const config = require('../config')

const {
  serviceUrls: { frontendService, backendService }
} = config

const frontendProxy = createProxyMiddleware({
  target: frontendService,
  onError: (err, req, res) => proxyErrorHandler('frontend', err, req, res)
})

const backendProxy = createProxyMiddleware({
  target: backendService,
  onError: (err, req, res) => proxyErrorHandler('Backend', err, req, res)
})

module.exports = { frontendProxy, backendProxy }
