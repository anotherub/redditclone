const config = require('./config.json')
const mongoose = require('mongoose')
const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions)
mongoose.Promise = global.Promise
mongoose.connection.once('open', function () {
  console.log('MongoDB database connection established successfully')
})
module.exports = {
  User: require('../model/user'),
  Comment: require('../model/comment'),
  Post: require('../model/post'),
  Like: require('../model/like')
}
