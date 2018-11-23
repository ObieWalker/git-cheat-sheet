const mongoose = require('mongoose');

const Category = new mongoose.Schema({
  name: { type: String, required: true},
  command: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Command'
    }
  ],
  userId: { type: String, default: null}
})

module.exports = mongoose.model('Category', Category)