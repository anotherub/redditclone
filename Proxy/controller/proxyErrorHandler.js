const proxyErrorHandler = (proxyName, err, req, res) => {
  console.log(`${proxyName} service proxy error: req ${req.originalUrl}`, err)
  return res.status(500).send({ status: false, data: 'Please try again after sometime.' })
}

module.exports = { proxyErrorHandler }
