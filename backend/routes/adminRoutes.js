import express from 'express';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';
import db from '../db.js';

const router = express.Router();
// GET /api/admin/drivers
// adminRoutes.js
router.get('/drivers', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const [drivers] = await db.execute(`
      SELECT 
        u.id AS user_id, 
        u.name, 
        u.email, 
        u.phoneno, 
        u.vehicle,
        u.experience,
        d.id AS document_id, 
        d.license_url, 
        d.aadhar_url, 
        d.status
      FROM users u
      JOIN driver_documents d ON u.id = d.user_id
      WHERE u.usertype = 'driver'
    `);
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch drivers' });
  }
});

router.patch('/driver-status/:id', verifyToken, verifyAdmin, async (req, res) => {
  const { id } = req.params; // This should be the document's id
  const { status } = req.body;

  if (!['Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const [result] = await db.execute(
      'UPDATE driver_documents SET status = ? WHERE id = ?',
      [status, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Document not found or not updated.' });
    }
    res.json({ message: `Driver document ${status.toLowerCase()} successfully.` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status.' });
  }
});


// PATCH /api/admin/disable-user/:id
router.patch('/disable-user/:id', verifyToken, verifyAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const [user] = await db.execute('SELECT is_login_disabled FROM users WHERE id = ?', [id]);
    if (!user.length) return res.status(404).json({ error: 'User not found.' });

    const newStatus = user[0].is_login_disabled ? 0 : 1;
    await db.execute('UPDATE users SET is_login_disabled = ? WHERE id = ?', [newStatus, id]);
    res.json({ message: `User login has been ${newStatus ? 'disabled' : 'enabled'}.` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user status.' });
  }
});


router.get('/users', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const [users] = await db.execute(
      'SELECT id, name, email, phoneno, usertype, is_login_disabled FROM users'
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});
// GET /api/admin/payments
router.get('/payments', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const [payments] = await db.execute('SELECT * FROM payments ORDER BY created_at DESC');
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});
router.get('/dashboard-metrics', verifyToken, async (req, res) => {
  try {
    const [[{ users }]] = await db.execute(`SELECT COUNT(*) as users FROM users`);
    const [[{ drivers }]] = await db.execute(`SELECT COUNT(*) as drivers FROM users WHERE usertype = 'driver'`);
    const [[{ pendingVerifications }]] = await db.execute(
      `SELECT COUNT(*) as pendingVerifications FROM driver_documents WHERE status = 'Pending'`
    );
    const [[{ revenue }]] = await db.execute(
      `SELECT IFNULL(SUM(fare), 0) as revenue FROM bookings WHERE payment_status = 'Paid'`
    );

    res.json({ users, drivers, pendingVerifications, revenue });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ error: 'Failed to load metrics' });
  }
});
router.get('/bookings', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const [bookings] = await db.execute('SELECT * FROM bookings ORDER BY created_at DESC');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});
router.get('/monthly-stats', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        DATE_FORMAT(created_at, '%M %Y') as month,
        COUNT(*) as bookings,
        SUM(fare) as revenue
      FROM bookings
      WHERE payment_status = 'Paid'
      GROUP BY month
      ORDER BY MIN(created_at) DESC
      LIMIT 6
    `);

    res.json(rows);
  } catch (err) {
    console.error('Error fetching monthly stats:', err);
    res.status(500).json({ error: 'Failed to fetch monthly stats' });
  }
});



export default router; 