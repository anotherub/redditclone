const express = require('express')
const router = express.Router()
const userService = require('../services/userService')
// routes
router.post('/users/authenticate', authenticate)
router.post('/users/register', register)
router.get('/users/', getAll)
router.get('/users/current', getCurrent)
router.get('/users/:id', getById)
router.put('/users/:id', update)
router.delete('/users/:id', _delete)

module.exports = router

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then((user) =>
      user
        ? res.status(200).cookie('jwtToken', user.token, { httpOnly: true }).json({ data: user, status: true })
        : res.status(200).json({ data: 'Username or password is incorrect', status: false })
    )
    .catch((err) => next(err))
}

function register(req, res, next) {
  userService
    .create(req.body)
    .then(() => res.json({ status: true, message: `${req.body.username} created successfully` }))
    .catch((err) => next(err))
}

function getAll(req, res, next) {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch((err) => next(err))
}

function getCurrent(req, res, next) {
  userService
    .getById(req.user.sub)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err))
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err))
}

function update(req, res, next) {
  userService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err))
}

function _delete(req, res, next) {
  userService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err))
}
