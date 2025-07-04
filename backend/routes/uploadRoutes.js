import express from 'express';
import { upload } from '../middleware/cloudinary.js';
import { verifyToken } from '../middleware/auth.js';
import db from '../db.js';

const router = express.Router();

router.post(
  '/upload-verification',
  verifyToken,
  upload.fields([
    { name: 'license', maxCount: 1 },
    { name: 'aadhar', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      // ✅ Check and log file presence
      if (!req.files || !req.files['license'] || !req.files['aadhar']) {
        return res.status(400).json({ message: 'Both license and aadhar files are required.' });
      }

      const licenseUrl = req.files['license'][0]?.path;
      const aadharUrl = req.files['aadhar'][0]?.path;

      if (!licenseUrl || !aadharUrl) {
        return res.status(400).json({ message: 'File upload failed or missing file URLs.' });
      }

      console.log('✅ Uploading docs for user:', req.user.id);
      console.log('📄 License URL:', licenseUrl);
      console.log('📄 Aadhar URL:', aadharUrl);

      // ✅ Save to database with status "Pending"
      await db.execute(
        `INSERT INTO driver_documents (user_id, license_url, aadhar_url, status) 
         VALUES (?, ?, ?, ?)`,
        [req.user.id, licenseUrl, aadharUrl, 'Pending']
      );

      res.status(200).json({ message: 'Documents uploaded successfully. Status: Pending' });
    } catch (err) {
      console.error('❌ Upload Error:', err);
      res.status(500).json({ message: 'Failed to upload documents', error: err.message });
    }
  }
);

export default router;
