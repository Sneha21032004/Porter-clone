// utils/socket.js
let ioInstance;

export const initSocket = async (server) => {
  const { Server } = await import('socket.io');
  ioInstance = new Server(server, {
    cors: {
      origin: '*', // Use your frontend origin in production
      methods: ['GET', 'POST', 'PUT'],
    },
  });

  ioInstance.on('connection', (socket) => {
    console.log('🧑‍🔌 A client connected');

    socket.on('join-driver-room', (driverId) => {
      socket.join(`driver-${driverId}`);
      console.log(`Driver ${driverId} joined room`);
    });

    socket.on('disconnect', () => {
      console.log('❌ A client disconnected');
    });
  });

  return ioInstance;
};

export const getIO = () => {
  if (!ioInstance) {
    throw new Error('Socket.io not initialized!');
  }
  return ioInstance;
};
