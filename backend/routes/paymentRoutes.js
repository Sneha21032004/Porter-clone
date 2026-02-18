// backend/routes/paymentRoutes.js
import express from 'express';
import pool from '../db.js'; // make sure this path is correct

const router = express.Router();

router.post('/confirm', async (req, res) => {
  const { booking_id, payment_method, upi_id } = req.body;

  if (!booking_id || !payment_method) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const status = payment_method === 'Cash' ? 'Pending (COD)' : 'Paid';

  try {
    await pool.execute(
      'UPDATE bookings SET payment_method = ?, payment_status = ? WHERE id = ?',
      [payment_method, status, booking_id]
    );
    res.json({ message: 'Payment confirmed' });
  } catch (err) {
    console.error('Payment error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
