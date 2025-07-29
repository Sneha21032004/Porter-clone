import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ConfirmedPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const timer = setTimeout(() => {
      navigate(`/tracking/${id}`);
    }, 4000);

    return () => clearTimeout(timer);
  }, [id, navigate]);

  if (!id) {
    return (
      <Box p={4}>
        <Typography color="error">❌ Invalid confirmation. No ID provided.</Typography>
      </Box>
    );
  }

  return (
    <Box textAlign="center" p={4}>
      <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'green', mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        Booking Confirmed!
      </Typography>
      <Typography variant="h6" gutterBottom>
        📦 Tracking ID: <strong>#{id}</strong>
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Thank you! Your booking has been confirmed. A driver will be assigned soon.
      </Typography>
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/book')}
          sx={{ mr: 2 }}
        >
          Book Another Delivery
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(`/tracking/${id}`)}
        >
          Track Delivery
        </Button>
      </Box>
    </Box>
  );
};

export default ConfirmedPage;
