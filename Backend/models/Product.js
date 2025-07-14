const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  image: String,
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // Add more fields as needed
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
