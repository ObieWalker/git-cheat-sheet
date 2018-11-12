const mongoose = require('mongoose');

const GitCheat = new mongoose.Schema({
  category: { type: String, default: '' },
  description: { type: Boolean, default: '' },
  command: { type: String, default: '' },
  keywords: { type: [String], default: '' },
  id: { type: String }
})

module.exports = mongoose.model('GitCheat', GitCheat)