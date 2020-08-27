const express = require('express')
const router = express.Router()
const likes = require('../../routes/likes')
const post = require('../../routes/post')
// const comment = require('../../routes/comment')
const auth = require('../../routes/auth')

router.get('/about', (req, res) => {
  res.send('home')
})
router.use(likes)
router.use(post)
router.use(auth)
// router.use(comment) to do later, Remove comment from post

module.exports = router
