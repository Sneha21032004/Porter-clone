// routes/auth.js
import express from 'express';
import db from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/auth.js'; // Make sure this is already imported

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password, phoneno, usertype } = req.body;

  try {
    const [existing] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute(
      'INSERT INTO users (name, email, password, phoneno, usertype) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, phoneno, usertype]
    );

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [userResult] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = userResult[0];

    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role: user.usertype },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ message: 'Login successful', token, role: user.usertype });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});
router.get('/me', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT id, name, email, phoneno, usertype FROM users WHERE id = ?',
      [req.user.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user data' });
  }
});
export default router;
