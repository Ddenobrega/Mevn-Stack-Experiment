const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  code: String,
  ip: String,
  date: Date
})

const User = mongoose.model('user', userSchema)

module.exports = User;
