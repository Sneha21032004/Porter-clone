import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Pagination,
  Chip,
} from '@mui/material';
import DirectionsIcon from '@mui/icons-material/Directions';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import io from 'socket.io-client';

const socket = io(); // connect to backend

const DriverDeliveries = ({ driverId }) => {
  const token = localStorage.getItem('token');
  const [deliveries, setDeliveries] = useState([]);
  const [filter, setFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [perPage] = useState(5); // entries per page

  useEffect(() => {
    fetchDeliveries();

    socket.on('new-delivery-assigned', ({ driverId: incomingDriverId }) => {
      if (String(incomingDriverId) === String(driverId)) {
        fetchDeliveries();
      }
    });

    socket.on('booking-delivered', () => fetchDeliveries());
    socket.on('booking-picked-up', () => fetchDeliveries());

    return () => {
      socket.off('new-delivery-assigned');
      socket.off('booking-delivered');
      socket.off('booking-picked-up');
    };
  }, [driverId]);

  const fetchDeliveries = async () => {
    try {
      const res = await fetch(`/api/driver/deliveries/${driverId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setDeliveries(data.deliveries || []);
    } catch (err) {
      console.error('Error fetching deliveries:', err);
    }
  };

  const updateStatus = async (bookingId, status) => {
    try {
      const res = await fetch(`/api/driver/update-status`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingId, status, driverId }),
      });
      if (res.ok) fetchDeliveries();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const filteredDeliveries = deliveries.filter((d) => {
    if (filter === 'All') return true;
    return d.status === filter;
  });

  const paginated = filteredDeliveries.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filteredDeliveries.length / perPage);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        My Deliveries
      </Typography>

      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(e, value) => value && setFilter(value)}
        sx={{ mb: 3 }}
      >
        {['All', 'Assigned', 'PickedUp', 'Delivered', 'Cancelled'].map((status) => (
          <ToggleButton key={status} value={status}>
            {status}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Grid container spacing={2}>
        {paginated.map((delivery) => (
          <Grid item xs={12} key={delivery.booking_id}>
            <Card variant="outlined">
              <CardContent>
                <Typography>
                  <strong>Pickup:</strong> {delivery.pickup}
                </Typography>
                <Typography>
                  <strong>Drop:</strong> {delivery.drop_location}
                </Typography>
                <Typography>
                  <strong>Receiver:</strong> {delivery.receiver_name} | 📞{' '}
                  {delivery.receiver_phone}
                </Typography>
                <Typography>
                  <strong>Fare:</strong> ₹{delivery.fare}
                </Typography>

                <Box mt={2} display="flex" alignItems="center" gap={1}>
                  <Chip label={delivery.status} color="primary" variant="outlined" />

                  <Button
                    variant="outlined"
                    startIcon={<DirectionsIcon />}
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                      delivery.drop_location
                    )}`}
                    target="_blank"
                  >
                    Maps
                  </Button>

                  {delivery.status === 'Assigned' && (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => updateStatus(delivery.booking_id, 'PickedUp')}
                    >
                      Mark Picked Up
                    </Button>
                  )}

                  {delivery.status === 'PickedUp' && (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<CheckCircleOutlineIcon />}
                      onClick={() => updateStatus(delivery.booking_id, 'Delivered')}
                    >
                      Mark Delivered
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default DriverDeliveries;
