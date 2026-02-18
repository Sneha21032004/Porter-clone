import express from 'express';
import db from '../db.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard/:id', verifyToken, async (req, res) => {
  const driverId = req.params.id;

  try {
    // ✅ 1. Get driver name
    const [userRows] = await db.execute(
      'SELECT name FROM users WHERE id = ? AND usertype = "driver"',
      [driverId]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    // ✅ 2. Check document verification status
    const [docRows] = await db.execute(
      'SELECT status FROM driver_documents WHERE user_id = ? ORDER BY uploaded_at DESC LIMIT 1',
      [driverId]
    );

    // ✅ 3. Get delivery stats
    const [deliveryStats] = await db.execute(`
      SELECT 
        COUNT(db.id) AS totalDeliveries,
        SUM(CASE WHEN db.status IN ('PickedUp', 'Assigned') THEN 1 ELSE 0 END) AS pendingDeliveries,
        SUM(b.fare) AS earnings
      FROM driver_bookings db
      JOIN bookings b ON db.booking_id = b.id
      WHERE db.driver_id = ?
    `, [driverId]);

    // ✅ 4. (Optional) Get last 5 deliveries — remove ORDER BY if column not available
    const [recentDeliveries] = await db.execute(`
      SELECT b.pickup, b.drop_location, b.receiver_name, db.status
      FROM bookings b
      JOIN driver_bookings db ON b.id = db.booking_id
      WHERE db.driver_id = ?
      -- ORDER BY b.delivered_at DESC -- ❌ Uncomment if column exists
      
    `, [driverId]);

    // ✅ 5. Return full dashboard data
    res.status(200).json({
      name: userRows[0]?.name || 'Driver',
      verified: docRows.length > 0 && docRows[0].status === 'Approved',
      stats: {
        totalDeliveries: deliveryStats[0]?.totalDeliveries || 0,
        pendingDeliveries: deliveryStats[0]?.pendingDeliveries || 0,
        earnings: deliveryStats[0]?.earnings || 0,
        recentDeliveries: recentDeliveries || []
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load dashboard', error: err.message });
  }
});

// PATCH /api/driver/update-profile/:id
// PATCH /api/driver/update-profile/:id
router.patch('/update-profile/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { phone, vehicle, experience } = req.body;

  try {
    // Check if user exists
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update profile
    await db.execute(
      `UPDATE users 
       SET phoneno = ?, vehicle = ?, experience = ? 
       WHERE id = ?`,
      [phone, vehicle, experience, id]
    );

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('❌ Update error:', err);
    res.status(500).json({ message: 'Failed to update profile', error: err.message });
  }
});



export default router;
