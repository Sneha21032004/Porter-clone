import express from 'express';
import db from '../db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { pickup, drop, vehicle, price, method, upiId, phone, email } = req.body;

  try {
    await db.execute(
      'INSERT INTO payments (pickup, drop_location, vehicle, price, method, upi_id, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [pickup, drop, vehicle, price, method, upiId, phone, email]
    );

    res.status(200).json({ message: 'Payment recorded' });
  } catch (err) {
    console.error('Payment error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
