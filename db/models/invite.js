const mongoose = require("mongoose")

const inviteSchema = new mongoose.Schema({
  code: String
})

const invite = mongoose.model('invite', inviteSchema);

module.exports = invite;