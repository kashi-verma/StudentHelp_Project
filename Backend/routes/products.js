const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const router = express.Router();

// Create Product
router.post('/', auth, async (req, res) => {
  try {
    const product = new Product({ ...req.body, seller: req.user.id });
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get All Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('seller', 'name email');
    res.json(products);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get Products by User
router.get('/my', auth, async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get Single Product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller', 'name email');
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update Product
router.put('/:id', auth, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    if (product.seller.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete Product
router.delete('/:id', auth, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    if (product.seller.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    await Product.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Product removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
