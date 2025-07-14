// routes/products.js
import express from 'express';
import Product from '../models/Product.js';
import auth from '../middleware/auth.js';

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

// Get User's Products (Sell History)
router.get('/my', auth, async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

export default router;