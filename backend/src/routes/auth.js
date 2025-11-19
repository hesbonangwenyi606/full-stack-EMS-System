import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const sign = (user) => jwt.sign(
  { id: user._id, email: user.email, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// Register
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });
    const user = await User.create({ name, email, password, role });
    res.status(201).json({ token: sign(user), user: { id: user._id, name, email, role: user.role } });
  } catch (e) { next(e); }
});

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await user.matchPassword(password);
    if(!match) return res.status(400).json({ message: 'Invalid credentials' });
    res.json({ token: sign(user), user: { id: user._id, name: user.name, email, role: user.role } });
  } catch (e) { next(e); }
});

export default router;
