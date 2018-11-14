const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: { type: String, default: '' },
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  id: { type: String }
},
{ timestamps: true }
)

module.exports = mongoose.model('User', User)