const mongoose = require('mongoose');

const Command = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  description: { type: String, default: '' },
  command: { type: String, default: '' },
  keywords: { type: [String], default: '' },
  id: { type: String },
  userId: { type: String, default: null}
})

module.exports = mongoose.model('Command', Command)