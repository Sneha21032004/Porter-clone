// backend/middleware/cloudinary.js

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config(); // load .env variables

// Configure cloudinary with env variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// Storage config for Multer + Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'driver_documents', // 📁 folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'], // allowed file types
  },
});

export const upload = multer({ storage }); // you will import `upload` in routes
