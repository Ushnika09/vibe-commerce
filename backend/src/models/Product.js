const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/300'
  },
  stock: {
    type: Number,
    default: 100
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);