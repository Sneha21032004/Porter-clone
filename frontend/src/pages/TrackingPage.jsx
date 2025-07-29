import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // ✅ import navigate
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress
} from '@mui/material';

const TrackingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ added navigate

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`/api/bookings/${id}`);
        setBooking(res.data);
      } catch (err) {
        setError('Failed to load booking details.');
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  // ✅ Redirect only if cancelled
  useEffect(() => {
    if (cancelled) {
      const timer = setTimeout(() => {
        navigate('/book');
      }, 5000); // 5 seconds
      return () => clearTimeout(timer);
    }
  }, [cancelled, navigate]);

  const handleCancel = async () => {
    try {
      await axios.post(`/api/bookings/cancel/${id}`);
      setBooking(prev => ({ ...prev, status: 'Cancelled' }));
      setCancelled(true); // ✅ mark cancelled
    } catch (err) {
      setError('Cancellation failed. Try again.');
    }
  };

  if (loading) return <Box p={4}><CircularProgress /></Box>;
  if (!booking) return <Box p={4}><Typography color="error">{error}</Typography></Box>;

  return (
    <Box maxWidth={600} mx="auto" p={3}>
      <Typography variant="h4" gutterBottom>📍 Delivery Tracking</Typography>

      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography><strong>Status:</strong> {booking.status}</Typography>
          <Typography><strong>Pickup:</strong> {booking.pickup}</Typography>
          <Typography><strong>Drop:</strong> {booking.drop}</Typography>
          <Typography><strong>Vehicle:</strong> {booking.vehicle_type}</Typography>
          <Typography><strong>Fare:</strong> ₹{booking.fare}</Typography>
        </CardContent>
      </Card>

      {/* ✅ Only show cancel if still pending */}
      {booking.status === 'Pending' && !cancelled && (
        <Button variant="outlined" color="error" onClick={handleCancel}>
          Cancel Ride
        </Button>
      )}

      {cancelled && (
        <Typography color="error" mt={2}>
          ❌ Booking cancelled. Redirecting to booking page...
        </Typography>
      )}
    </Box>
  );
};

export default TrackingPage;
