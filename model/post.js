const mongoose = require('mongoose')
const Schema = mongoose.Schema

let post = new Schema({
  username: {
    type: String
  },
  post: {
    type: String
  },
  time: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('posts', post)
