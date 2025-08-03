import express from 'express';
import Product from '../models/Product.js';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Admin-only: Get all users and products updated soon
router.get('/activity', auth, async (req, res) => {
  try {
    const adminUser = await User.findById(req.user.id);
    if (adminUser.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

    const users = await User.find();
    const products = await Product.find().populate('seller', 'name email');

    res.json({ users, products });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

export default router;
