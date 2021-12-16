const mongoose = require("mongoose")

const messageScema = new mongoose.Schema({
  user: String,
  message: String,
  date: Date
})

const message = mongoose.model('message', messageScema)

module.exports = message