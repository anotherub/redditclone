const mongoose = require('mongoose')
const Schema = mongoose.Schema
let comment = new Schema({
  username: {
    type: String
  },
  parentPostId: {
    type: Schema.Types.ObjectId,
    default: null
  },
  comment: {
    type: String
  },
  parentCommentId: {
    type: Schema.Types.ObjectId,
    default: null
  },

  time: {
    type: Date,
    default: Date.now
  }
})
module.exports = mongoose.model('comments', comment)
