const mongoose = require('mongoose')
const uri = 'mongodb+srv://umeshbhat:umeshbhat@cluster0-bmklf.mongodb.net/questionportal?retryWrites=true&w=majority'

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
exports.connection = mongoose.connection
