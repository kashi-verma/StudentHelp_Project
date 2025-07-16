import express from 'express';
import multer from 'multer';
import Product from '../models/Product.js';

const router = express.Router();

// Set up Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // create uploads/ folder
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// POST product with image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, contact, price } = req.body;

    const newProduct = new Product({
      name,
      description,
      contact,
      price,
      image: req.file ? req.file.filename : null,
    });

    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add product' });
  }
});

export default router;
