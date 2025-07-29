// ✅ Step 1: Add imports
import express from 'express';
import http from 'http'; // ✅ Required for Socket.IO
import { Server } from 'socket.io'; // ✅ Required for Socket.IO
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import bookingsRoutes from './routes/bookingsRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
import driverDeliveriesRoutes from './routes/driverDeliveries.js';
import pendingBookingsRoutes from './routes/PendingBookingsRoutes.js';
import './db.js'; // Database connection

dotenv.config();

const app = express();
const server = http.createServer(app); // ✅ Step 2: Wrap Express with HTTP server

const io = new Server(server, {
  cors: {
    origin: '*', // 🔐 Change this to your frontend origin in production
    methods: ['GET', 'POST', 'PUT'],
  }
});

// ✅ Step 3: Store io instance for access in routes
app.set('io', io);

// 🔌 Step 4: Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('🧑‍🔌 A client connected');

  socket.on('join-driver-room', (driverId) => {
    socket.join(`driver-${driverId}`);
    console.log(`Driver ${driverId} joined room`);
  });

  socket.on('disconnect', () => {
    console.log('❌ A client disconnected');
  });
});

// 🔹 Global Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/hello', (req, res) => {
  console.log('📍 /hello endpoint hit');
  return res.json({ message: 'Hello from bookingsRoutes!' });
  
});
// 🔹 Route Handlers
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingsRoutes(io));
app.use('/api/upload', uploadRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/driver', driverRoutes);
app.use('/api/driver', driverDeliveriesRoutes(io));
app.use('/api', pendingBookingsRoutes);


// 🔹 Root Endpoint
app.get('/', (req, res) => {
  res.send('🚚 MoveEasy backend is running...');
});

// ✅ Final Step: Start both Express + Socket.IO server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
