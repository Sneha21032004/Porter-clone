import express from 'express';
import db from '../db.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// ✅ 1. Get all available bookings (not yet assigned)
router.get('/available-bookings', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT id, pickup, drop_location, vehicle_type, fare, receiver_name, receiver_phone
      FROM bookings
      WHERE status = 'Pending'
      ORDER BY created_at DESC
    `);
    res.json({ bookings: rows });
  } catch (err) {
    console.error('Error fetching available bookings:', err);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

// ✅ 2. Driver accepts a booking
router.post('/accept-booking', verifyToken, async (req, res) => {
  const { bookingId, driverId } = req.body;

  try {
    // Check if booking is still pending
    const [[booking]] = await db.execute(
      'SELECT status FROM bookings WHERE id = ?',
      [bookingId]
    );

    if (!booking || booking.status !== 'Pending') {
      return res.status(400).json({ message: 'Booking already accepted or not found' });
    }

    // Insert into driver_bookings
    await db.execute(
      'INSERT INTO driver_bookings (driver_id, booking_id, status, updated_at) VALUES (?, ?, ?, NOW())',
      [driverId, bookingId, 'Assigned']
    );

    // Update booking status + assign driver
    await db.execute(
      'UPDATE bookings SET status = "Confirmed", updated_at = NOW() WHERE id = ?',
      [bookingId]
    );

    // Optional: notify users/admin via socket
    const io = req.app.get('io');
    io.emit('booking-accepted', { bookingId, driverId });

    res.status(200).json({ message: 'Booking accepted successfully' });
  } catch (err) {
    console.error('Error accepting booking:', err);
    res.status(500).json({ message: 'Failed to accept booking', error: err.message });
  }
});

export default router;
