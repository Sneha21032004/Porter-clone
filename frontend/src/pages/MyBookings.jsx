import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Button,
  Chip,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user_id = localStorage.getItem('user_id');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`/api/bookings/user/${user_id}`);
        setBookings(res.data);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user_id) fetchBookings();
  }, [user_id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'warning';
      case 'Confirmed': return 'info';
      case 'Completed': return 'success';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (bookings.length === 0) {
    return (
      <Box textAlign="center" p={4}>
        <Typography>No bookings found.</Typography>
      </Box>
    );
  }

  return (
    <Box maxWidth="800px" mx="auto" p={3}>
      <Typography variant="h4" gutterBottom>📂 My Bookings</Typography>

      <Stack spacing={3}>
        {bookings.map((booking) => (
          <Card key={booking.id} variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Pickup:</strong> {booking.pickup}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Drop:</strong> {booking.drop}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Vehicle: {booking.vehicle_type} | Fare: ₹{booking.fare}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date: {new Date(booking.created_at).toLocaleString()}
              </Typography>
              <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                <Chip
                  label={booking.status}
                  color={getStatusColor(booking.status)}
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => navigate(`/tracking/${booking.id}`)}
                >
                  Track
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default MyBookings;
