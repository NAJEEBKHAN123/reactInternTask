// models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: 'text'
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Books', 'Clothing', 'Home', 'Sports']
  },
  price: {
    type: Number,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Item', itemSchema);