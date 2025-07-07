import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';


import './db.js'; // Database connection

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Global Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🔹 Route Handlers
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin', adminRoutes);

// 🔹 Root Endpoint
app.get('/', (req, res) => {
  res.send('🚚 MoveEasy backend is running...');
});

// 🔹 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
