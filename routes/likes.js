const express = require('express')
const router = express.Router()
const { Like, Post } = require('../_helpers/db')

router.post('/user/posts/:id/like', (req, res) => {
  const {
    params: { id: parentPostId, parentCommentId = null },
    user: { username }
  } = req
  let query = new Like({
    parentPostId,
    username,
    parentCommentId,
    like: true
  })
  Post.findOne({ _id: parentPostId })
    .then((doc) => {
      if (doc && doc._id) {
        Like.findOne({ parentPostId, parentCommentId, username })
          .then((doc) => {
            if (doc && doc._id) {
              const likeDoc = doc

              Like.findOne({ parentPostId, parentCommentId, username, like: false }).then((doc) => {
                if (doc && doc._id) {
                  console.log('Already unliked')

                  Like.findOneAndUpdate({ parentPostId, parentCommentId, username, like: false }, { like: true }).then(
                    (doc) => {
                      return res.status(200).json({ status: true, data: doc })
                    }
                  )
                } else {
                  Like.findOneAndDelete({ parentPostId, parentCommentId, username, like: true }).then((doc) => {})
                  return res.status(200).json({ status: false, data: likeDoc })
                }
              })
            } else {
              query.save().then((doc) => {
                return res.status(200).json({ status: true, data: doc })
              })
            }
          })
          .catch((error) => {
            res.status(500).json({ error })
          })
      } else return res.status(200).json({ error: 'Not a valid post ID' })
    })
    .catch((error) => {
      res.status(500).json({ error })
    })
})

router.delete('/user/posts/:id/unlike', (req, res) => {
  const {
    params: { id: parentPostId },
    body: { parentCommentId = null },
    user: { username }
  } = req
  let query = new Like({
    username,
    parentPostId,
    parentCommentId,
    like: false
  })
  Post.findOne({ _id: parentPostId })
    .then((doc) => {
      if (doc && doc._id) {
        Like.findOne({ parentPostId, parentCommentId, username })
          .then((doc) => {
            if (doc && doc._id) {
              const unlikeDoc = doc

              Like.findOne({ parentPostId, parentCommentId, username, like: true }).then((doc) => {
                console.log('111', doc)
                if (doc && doc._id) {
                  Like.findOneAndUpdate({ parentPostId, parentCommentId, username, like: true }, { like: false }).then(
                    (doc) => {
                      return res.status(200).json({ status: true, data: doc })
                    }
                  )
                } else {
                  Like.findOneAndDelete({ parentPostId, parentCommentId, username, like: false }).then((doc) => {})

                  return res.status(200).json({ status: false, data: unlikeDoc })
                }
              })
            } else {
              query.save().then((doc) => {
                return res.status(200).json({ status: true, data: doc })
              })
            }
          })
          .catch((error) => {
            res.status(500).json({ error })
          })
      } else return res.status(200).json({ error: 'Not a valid post ID' })
    })
    .catch((error) => {
      res.status(500).json({ error })
    })
})

module.exports = router
