import express from 'express';
import pool from '../db.js';
import getDistanceKm from '../utils/getDistance.js';
const bookingsRoutes = (io) => {
const router = express.Router();
router.get('/hello', (req, res) => {
  console.log('📍 /hello endpoint hit');
  return res.json({ message: 'Hello from bookingsRoutes!' });
  
});
// POST /api/bookings/estimate
router.post('/estimate', async (req, res) => {
  try {
    const { pickup, drop_location, vehicle_type } = req.body;
    console.log('📦 /estimate received:', { pickup, drop_location, vehicle_type });

    if (!pickup || !drop_location || !vehicle_type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const distance_km = await getDistanceKm(pickup, drop_location);
    const rate_per_km = 7;
    const fare = Math.ceil(distance_km * rate_per_km);

    res.json({ distance_km, fare });
  } catch (err) {
    console.error('❌ Error in /estimate:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/bookings/create
router.post('/create', async (req, res) => {
  try {
    const {
      user_id,
      pickup,
      drop_location,
      vehicle_type,
      distance_km,
      fare,
      receiver_name,
      receiver_phone,
      schedule,
      instructions,
      city,
    } = req.body;
    console.log('request body:', req.body); 
    // ✅ Basic validation
    if (!user_id || !pickup || !drop_location || !vehicle_type || !distance_km || !fare) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // ✅ Insert booking into DB
    const sql = `
  INSERT INTO bookings (
    user_id, pickup, drop_location, vehicle_type, distance_km, fare,
    receiver_name, receiver_phone, schedule, instructions, city,
    status, payment_status, created_at
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', 'Pending', NOW())
`;
    const values = [
      user_id,
      pickup,
      drop_location,
      vehicle_type,
      distance_km,
      fare,
      receiver_name || null,
      receiver_phone || null,
      schedule || null,
      instructions || null,
      city 
    ];

    const [result] = await pool.execute(sql, values);
    const booking_id = result.insertId;

    // ✅ Emit event to drivers (optional)
    if (io) {
      const [bookingRows] = await pool.execute('SELECT * FROM bookings WHERE id = ?', [booking_id]);
      io.emit('new-booking-request', bookingRows[0]);
      console.log('📢 bookingRows');
      console.log(bookingRows);
    }

    // ✅ Return success
    res.status(201).json({ booking_id });
  } catch (err) {
    console.error('❌ Error creating booking:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/bookings/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM bookings WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Booking not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bookings/user/:id
router.get('/user/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC', [req.params.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/bookings/cancel/:id
router.post('/cancel/:id', async (req, res) => {
  try {
    const sql = 'UPDATE bookings SET status = ? WHERE id = ?';
    await pool.execute(sql, ['cancelled', req.params.id]);
    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/bookings/feedback/:id
router.post('/feedback/:id', async (req, res) => {
  try {
    const { feedback } = req.body;
    if (!feedback) return res.status(400).json({ error: 'Feedback required' });
    const sql = 'UPDATE bookings SET feedback = ? WHERE id = ?';
    await pool.execute(sql, [feedback, req.params.id]);
    res.json({ message: 'Feedback submitted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// POST /api/bookings/cancel/:id
router.post('/cancel/:id', async (req, res) => {
  try {
    const sql = 'UPDATE bookings SET status = ? WHERE id = ?';
    await pool.execute(sql, ['Cancelled', req.params.id]);
    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
return router;
};


export default bookingsRoutes;

