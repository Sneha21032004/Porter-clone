import express from 'express';
import db from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, phoneno, usertype } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute(
      'INSERT INTO users (name, email, password, phoneno, usertype) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, phoneno, usertype || 'user']
    );
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    let driverVerified = undefined;
    if (user.usertype === 'driver') {
      const [docs] = await db.execute(
        'SELECT status FROM driver_documents WHERE user_id = ? ORDER BY uploaded_at DESC LIMIT 1',
        [user.id]
      );
      driverVerified = docs.length > 0 && docs[0].status === 'Approved';
    }

    const token = jwt.sign(
      { id: user.id, usertype: user.usertype },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      role: user.usertype,
      id: user.id,
      driverVerified,
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

// Get current user profile (with driverVerified if driver)
router.get('/me', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT id, name, email, phoneno, usertype FROM users WHERE id = ?',
      [req.user.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const user = rows[0];

    let driverVerified = undefined;
    if (user.usertype === 'driver') {
      const [docs] = await db.execute(
        'SELECT status FROM driver_documents WHERE user_id = ? ORDER BY uploaded_at DESC LIMIT 1',
        [user.id]
      );
      driverVerified = docs.length > 0 && docs[0].status === 'Approved';
    }

    res.status(200).json({ ...user, driverVerified });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user data' });
  }
});

export default router;
