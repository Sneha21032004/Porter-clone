import express from 'express';
import db from '../db.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/admin/pending-bookings', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM bookings WHERE status NOT IN ('Completed', 'Cancelled') ORDER BY created_at DESC"
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching pending bookings:', err);
    res.status(500).json({ message: 'Failed to fetch pending bookings' });
  }
});

export default router;
