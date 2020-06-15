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
  console.log('info is ', parentPostId, req.user)
  Post.findOne({ _id: parentPostId })
    .then((doc) => {
      console.log('post is ', doc)
      if (doc && doc._id) {
        Like.findOne({ parentPostId, parentCommentId, username })
          .then((doc) => {
            console.log('finding details of this posts like in db', doc)

            if (doc && doc._id) {
              console.log('**8', doc)
              const likeDoc = doc

              console.log('either liked/unliked')
              Like.findOne({ parentPostId, parentCommentId, username, like: false }).then((doc) => {
                console.log('finding details of this posts like in db', doc)
                if (doc && doc._id) {
                  console.log('Already unliked')

                  Like.findOneAndUpdate({ parentPostId, parentCommentId, username, like: false }, { like: true }).then(
                    (doc) => {
                      return res.status(200).json({ status: true, data: doc })
                    }
                  )
                } else {
                  console.log('Removing Like')
                  Like.findOneAndDelete({ parentPostId, parentCommentId, username, like: true }).then((doc) => {
                    console.log('removed sucessfully like', doc)
                  })
                  return res.status(200).json({ status: false, data: likeDoc })
                }
              })
            } else {
              console.log('case when never been liked/unliked')
              query.save().then((doc) => {
                return res.status(200).json({ status: true, data: doc })
              })
            }
          })
          .catch((error) => {
            console.log('Error is ', error)
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
  console.log('query params are', parentPostId)
  let query = new Like({
    username,
    parentPostId,
    parentCommentId,
    like: false
  })
  Post.findOne({ _id: parentPostId })
    .then((doc) => {
      console.log('post is ', doc)
      if (doc && doc._id) {
        Like.findOne({ parentPostId, parentCommentId, username })
          .then((doc) => {
            console.log('finding details of this posts like in db', doc)

            if (doc && doc._id) {
              console.log('**8', doc)
              const unlikeDoc = doc

              console.log('either liked/unliked')
              Like.findOne({ parentPostId, parentCommentId, username, like: true }).then((doc) => {
                console.log('111', doc)
                if (doc && doc._id) {
                  console.log('Already liked')

                  Like.findOneAndUpdate({ parentPostId, parentCommentId, username, like: true }, { like: false }).then(
                    (doc) => {
                      return res.status(200).json({ status: true, data: doc })
                    }
                  )
                } else {
                  console.log('Removing UnLike')
                  Like.findOneAndDelete({ parentPostId, parentCommentId, username, like: false }).then((doc) => {
                    console.log('removed sucessfully unlike', doc)
                  })

                  return res.status(200).json({ status: false, data: unlikeDoc })
                }
              })
            } else {
              console.log('case when never been liked/unliked')
              query.save().then((doc) => {
                return res.status(200).json({ status: true, data: doc })
              })
            }
          })
          .catch((error) => {
            console.log('Error is ', error)
            res.status(500).json({ error })
          })
      } else return res.status(200).json({ error: 'Not a valid post ID' })
    })
    .catch((error) => {
      res.status(500).json({ error })
    })
})

module.exports = router
