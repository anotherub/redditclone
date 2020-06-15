const expressJwt = require('express-jwt')
const config = require('./config.json')
const userService = require('../services/userService')

module.exports = jwt

function jwt() {
  const secret = config.secret
  return expressJwt({
    secret,
    getToken: function fromHeaderOrQuerystring(req) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1]
      } else if (req.query && req.query.token) {
        return req.query.token
      } else if (req.cookies['jwtToken']) {
        return req.cookies['jwtToken']
      }
      console.log('no token found')
      return null
    }
  }).unless({
    path: [
      // public routes that don't require authentication
      '/api/v1/users/authenticate',
      '/api/v1/users/register',
      '/api/v1/about'
    ]
  })
}

// async function isRevoked(req, payload, done) {
//   const user = await userService.getById(payload.sub)

//   // revoke token if user no longer exists
//   if (!user) {
//     return done(null, true)
//   }

//   done()
// }
