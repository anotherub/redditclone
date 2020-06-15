const express = require('express')
const router = express.Router()
const { Comment, Post, Like } = require('../_helpers/db')

router.post('/user/posts/post', (req, res) => {
  const {
    body: { post },
    user: { username }
  } = req
  let query = new Post({
    username,
    post
  })
  query
    .save()
    .then((doc) => {
      return res.status(200).json({ data: doc, status: true })
    })
    .catch((error) => {
      console.log('error is', error)
      return res.status(500).json({ data: error, status: false })
    })
})

router.get('/user/posts/:postId/get', (req, res) => {
  let result = null
  const {
    params: { postId }
  } = req
  Post.findOne({ _id: postId })
    .then((doc) => {
      result = JSON.parse(JSON.stringify(doc))
      Comment.find({ parentPostId: postId })
        .sort({ time: 'desc' })
        .then((doc) => {
          result.comments = doc
          result.totalComments = doc.length

          Like.find({ parentPostId: postId })
            .sort({ time: 'desc' })
            .then((doc) => {
              result.likes = {}
              result.likes = doc
              result.totalLikes = doc.filter((data) => data.like === true).length
              result.totalDislikes = doc.filter((data) => data.like === false).length
              return res.status(200).json({ result })
            })
        })
    })
    .catch((error) => {
      console.log('error ', error)
      res.status(500).json({ data: error })
    })
})

router.get('/user/posts/getall', (req, res) => {
  Post.find({})
    .limit(5)
    .sort({ time: 'desc' })
    .then((doc) => {
      res.status(200).json({ data: doc })
    })
    .catch((error) => {
      console.log('error ', error)
      res.status(500).json({ data: error })
    })
})

router.post('/user/posts/:id/comment', (req, res) => {
  const {
    params: { id },
    body: { comment, parentCommentId = null },
    user: { username }
  } = req

  let query = Comment({ parentPostId: id, parentCommentId, comment, username })
  query
    .save()
    .then((doc) => {
      res.status(200).json({ data: doc })
    })
    .catch((error) => {
      console.log('error ', error)
      res.status(500).json({ data: error })
    })
})
router.delete('/user/posts/:id/delete', (req, res) => {
  const {
    params: { id },
    user: { username }
  } = req
  Post.deleteOne({ _id: id, username })
    .then((doc) => {
      if (doc && doc.deletedCount == 1) {
        return res.status(200).json({ data: doc, status: true })
      } else {
        return res.status(200).json({ data: 'Unauthorized or Resource doesnt not exist', status: false })
      }
    })
    .catch((error) => {
      console.log('error ', error)
      res.status(500).json({ data: error, status: false })
    })
})
module.exports = router
