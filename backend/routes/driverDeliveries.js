// File: routes/driverDeliveries.js
import express from 'express';
import db from '../db.js';
import { verifyToken } from '../middleware/auth.js';

export default (io) => {
  const router = express.Router();

  // ✅ Get ongoing deliveries for driver using drivers.id
  router.get('/deliveries/:driverId', verifyToken, async (req, res) => {
    const driverId = req.params.driverId;

    try {
      // Get user_id for this driver
      const [driverInfo] = await db.execute(
        'SELECT user_id FROM drivers WHERE id = ?',
        [driverId]
      );
      if (driverInfo.length === 0) {
        return res.status(404).json({ message: 'Driver not found' });
      }
      const userId = driverInfo[0].user_id;

      const [rows] = await db.execute(`
        SELECT 
          b.id AS booking_id,
          b.pickup,
          b.drop_location,
          b.fare,
          b.vehicle_type,
          b.distance_km,
          b.receiver_name,
          b.receiver_phone,
          b.status AS booking_status,
          db.status AS delivery_status,
          b.updated_at
        FROM driver_bookings db
        JOIN bookings b ON db.booking_id = b.id
        WHERE db.driver_id = ?
        ORDER BY b.updated_at DESC
      `, [userId]);

      res.json({ deliveries: rows });
    } catch (err) {
      console.error('❌ Error fetching deliveries:', err);
      res.status(500).json({ message: 'Error fetching deliveries' });
    }
  });

  // GET /api/driver/new-requests/:driverId

router.get('/new-requests/:driverId', verifyToken, async (req, res) => {
  try {
    const { driverId } = req.params;

    // 1️⃣ Get driver info (user_id and city)
    const [[driver]] = await db.execute(
      'SELECT user_id, city FROM drivers WHERE id = ?',
      [driverId]
    );
    if (!driver) return res.status(404).json({ error: 'Driver not found' });

    const driverCity = driver.city?.trim().toLowerCase();
    const userId = driver.user_id;

    // 2️⃣ Check if driver is already handling an active booking
    const [[{ cnt }]] = await db.execute(
      `SELECT COUNT(*) AS cnt FROM driver_bookings 
       WHERE driver_id = ? AND status IN ('Accepted', 'Assigned', 'PickedUp', 'InTransit')`,
      [userId]
    );
    if (cnt > 0) {
      return res.json({ requests: [] }); // Occupied, skip
    }

    // 3️⃣ Get all pending bookings
    const [pendingBookings] = await db.execute(`
      SELECT * FROM bookings 
      WHERE status = 'Pending'
        AND id NOT IN (
          SELECT booking_id FROM driver_bookings
        )
        AND id NOT IN (
          SELECT booking_id FROM rejected_bookings WHERE driver_id = ?
        )
    `, [userId]);

    // 4️⃣ Filter by driver's city
    const matchingRequests = pendingBookings.filter(b =>
      b.city?.trim().toLowerCase() === driverCity
    );

    return res.json({ requests: matchingRequests });

  } catch (err) {
    console.error('❌ Error fetching new requests:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});



  // ✅ Accept a booking
  router.post('/accept', verifyToken, async (req, res) => {
    const { booking_id, driver_id } = req.body;

    if (!booking_id || !driver_id)
      return res.status(400).json({ message: 'Missing booking_id or driver_id' });

    // Convert driver_id (drivers.id) → user_id
    const [driverRows] = await db.execute(
      'SELECT user_id FROM drivers WHERE id = ?',
      [driver_id]
    );
    if (driverRows.length === 0)
      return res.status(404).json({ message: 'Driver not found' });

    const userId = driverRows[0].user_id;

    // Check if driver is busy
    const [active] = await db.execute(`
      SELECT COUNT(*) AS cnt FROM driver_bookings
      WHERE driver_id = ? AND status IN ('Accepted', 'Assigned', 'PickedUp', 'InTransit')
    `, [userId]);
    if (active[0].cnt > 0)
      return res.status(403).json({ message: 'Driver is currently occupied.' });

    // Prevent double acceptance
    const [existing] = await db.execute(
      'SELECT * FROM driver_bookings WHERE booking_id = ?', [booking_id]
    );
    if (existing.length > 0)
      return res.status(400).json({ message: 'Booking already accepted.' });

    // Accept booking
    await db.execute(`
      INSERT INTO driver_bookings (driver_id, booking_id, status, updated_at)
      VALUES (?, ?, 'Accepted', NOW())
    `, [userId, booking_id]);

    await db.execute(
      'UPDATE bookings SET status = "Confirmed" WHERE id = ?',
      [booking_id]
    );

    io.emit('booking-accepted', { driverId: userId, bookingId: booking_id });
    res.json({ message: 'Booking accepted.' });
  });

  // ✅ Reject booking
  router.post('/reject-booking', verifyToken, async (req, res) => {
    const { booking_id } = req.body;
    const driver_id = req.user.id;

    if (!booking_id)
      return res.status(400).json({ message: 'Missing booking_id' });

    await db.execute(
      'INSERT INTO rejected_bookings (driver_id, booking_id) VALUES (?, ?)',
      [driver_id, booking_id]
    );

    res.json({ message: 'Booking rejected successfully' });
  });

  // ✅ Mark delivery completed
  router.post('/mark-delivered', verifyToken, async (req, res) => {
    const { booking_id } = req.body;
    const driver_id = req.user.id;

    if (!booking_id || !driver_id)
      return res.status(400).json({ message: 'Missing booking_id or driver_id' });

    await db.execute(`
      UPDATE driver_bookings SET status = 'Delivered', updated_at = NOW()
      WHERE booking_id = ? AND driver_id = ?
    `, [booking_id, driver_id]);

    await db.execute(`
      UPDATE bookings SET status = 'Completed', updated_at = NOW()
      WHERE id = ?
    `, [booking_id]);

    io.emit('delivery-completed', { bookingId: booking_id });
    res.json({ message: 'Delivery marked as completed' });
  });  // ✅ Get online drivers in the same city as booking and emit alert
  router.get('/booking/:booking_id/drivers', async (req, res) => {
    const booking_id = req.params.booking_id;

    try {
      // 1. Fetch booking's city
      const [[booking]] = await db.query(
        'SELECT city FROM bookings WHERE id = ?',
        [booking_id]
      );
      if (!booking) return res.status(404).json({ error: 'Booking not found' });

      // 2. Find online drivers in that city
      const [drivers] = await db.query(
        'SELECT id, name, city, online_status FROM drivers WHERE city = ? AND online_status = "online"',
        [booking.city]
      );

      // 3. Emit alert to all drivers in the city room
      io.to(booking.city).emit('new_booking_alert', {
        booking_id,
        city: booking.city,
        message: 'New booking available in your city.',
      });

      // 4. Return result
      res.json({ success: true, city: booking.city, drivers });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });


  // ✅ WebSocket listeners
  io.on('connection', (socket) => {
    socket.on('join-driver', (driverId) => {
      socket.join(`driver_${driverId}`);
    });

    // ✅ Join city room
    socket.on('join-city', (city) => {
      socket.join(city); // enable city-based alerts
    });
  });

  return router;
};
