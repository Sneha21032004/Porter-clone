import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material';

const PaymentPage = () => {
  const { id: bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [upiId, setUpiId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`/api/bookings/${bookingId}`);
        setBooking(res.data);
      } catch (err) {
        setError('Failed to load booking details');
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  const handlePayment = async () => {
  if ((paymentMethod === 'UPI' || paymentMethod === 'GPay') && !upiId) {
    setError('Please enter a valid UPI ID.');
    return;
  }

  try {
    await axios.post('/api/payments/confirm', {
      booking_id: bookingId,
      payment_method: paymentMethod,
      upi_id: upiId || null,
    });

    // ✅ Redirect to confirmation
    navigate(`/confirmed/${bookingId}`);
  } catch (err) {
    setError('Payment failed. Please try again.');
  }
};


  if (loading) return <Box textAlign="center" p={4}><CircularProgress /></Box>;
  if (!booking) return <Box textAlign="center" p={4}><Typography color="error">{error}</Typography></Box>;

  return (
    <Box maxWidth={600} mx="auto" p={3}>
      <Typography variant="h5" gutterBottom>
        💳 Complete Your Payment
      </Typography>

      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography><strong>Pickup:</strong> {booking.pickup}</Typography>
          <Typography><strong>Drop:</strong> {booking.drop_location}</Typography>
          <Typography><strong>Vehicle:</strong> {booking.vehicle_type}</Typography>
          <Typography sx={{ mt: 1 }} color="green"><strong>Fare:</strong> ₹{booking.fare}</Typography>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <FormControl component="fieldset">
            <Typography variant="subtitle1" gutterBottom>Payment Method</Typography>
            <RadioGroup
              row
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
              <FormControlLabel value="GPay" control={<Radio />} label="GPay" />
              <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
            </RadioGroup>
          </FormControl>

          {(paymentMethod === 'UPI' || paymentMethod === 'GPay') && (
            <TextField
              label="Enter your UPI ID"
              fullWidth
              margin="normal"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          )}

          {error && <Typography color="error" mt={2}>{error}</Typography>}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handlePayment}
            sx={{ mt: 2 }}
          >
            {paymentMethod === 'Cash' ? 'Confirm Booking' : 'Pay Now'}
          </Button>

        </CardContent>
      </Card>
    </Box>
  );
};

export default PaymentPage;
