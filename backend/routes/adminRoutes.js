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

// PATCH /api/admin/driver-status/:id
router.patch('/driver-status/:id', verifyToken, verifyAdmin, async (req, res) => {
  const { id } = req.params; // This should be the document's id
  const { status, reason } = req.body;

  if (!['Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const [result] = await db.execute(
      'UPDATE driver_documents SET status = ?, reason = ? WHERE id = ?',
      [status, reason || null, id]
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
  const { disable } = req.body; // true or false

  try {
    await db.execute(
      'UPDATE users SET is_login_disabled = ? WHERE id = ?',
      [disable ? 1 : 0, id]
    );
    res.json({ message: `User login has been ${disable ? 'disabled' : 'enabled'}.` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user status' });
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


export default router; 