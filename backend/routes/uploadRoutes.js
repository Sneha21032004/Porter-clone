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

      // Step 1: Check if record already exists for this user
      const [existingRows] = await db.execute(
        'SELECT id FROM driver_documents WHERE user_id = ?',
        [req.user.id]
      );

      if (existingRows.length > 0) {
        // Step 2: UPDATE existing record
        await db.execute(
          `UPDATE driver_documents 
           SET license_url = ?, aadhar_url = ?, status = 'Pending', uploaded_at = NOW() 
           WHERE user_id = ?`,
          [licenseUrl, aadharUrl, req.user.id]
        );
      } else {
        // Step 3: INSERT new record
        await db.execute(
          `INSERT INTO driver_documents (user_id, license_url, aadhar_url, status, uploaded_at)
           VALUES (?, ?, ?, 'Pending', NOW())`,
          [req.user.id, licenseUrl, aadharUrl]
        );
      }

      res.status(200).json({ message: 'Documents uploaded successfully. Status set to Pending.' });
    } catch (err) {
      console.error('❌ Upload Error:', err);
      res.status(500).json({ message: 'Failed to upload documents', error: err.message });
    }
  }
);

export default router;
