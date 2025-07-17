import express from 'express';
import multer from 'multer';
import Product from '../models/Product.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// Middleware to isolate multer error
const uploadMiddleware = (req, res, next) => {
  upload.single('image')(req, res, function (err) {
    if (err) {
      console.error('📛 Multer error:', err);
      return res.status(400).json({ message: 'File upload failed', error: err.message });
    }
    next();
  });
};

// Product POST route
router.post('/', auth, uploadMiddleware, async (req, res) => {
  try {
    console.log('✅ req.body:', req.body);
    console.log('✅ req.file:', req.file);

    const { title, description, contact, price } = req.body;

    if (!title || !description || !contact || !price || !req.file) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const sellerId = req.user.id; // ✅ added

    const newProduct = new Product({
      title,
      description,
      contact,
      price: Number(price),
      image: req.file.filename,
      seller: sellerId,
    });

    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('🔥 Save error:', err);
    res.status(500).json({ message: 'Failed to save product' });
  }
});


export default router;
