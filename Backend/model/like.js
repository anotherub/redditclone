const mongoose = require('mongoose')
const Schema = mongoose.Schema

let like = new Schema({
  username: {
    type: String
  },
  parentPostId: {
    type: Schema.Types.ObjectId,
    default: null
  },
  parentCommentId: {
    type: Schema.Types.ObjectId,
    default: null
  },
  time: {
    type: Date,
    default: Date.now
  },
  like: {
    type: Boolean
  }
})

module.exports = mongoose.model('likes', like)
