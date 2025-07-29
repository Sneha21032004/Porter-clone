import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Divider,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";

const DriverDashboard = () => {
  const navigate = useNavigate();
  const [driver, setDriver] = useState({});
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [newRequests, setNewRequests] = useState([]);
  const [ongoingDeliveries, setOngoingDeliveries] = useState([]);

  const token = localStorage.getItem('token');
  const driver_id = localStorage.getItem('user_id');

  const fetchNewRequests = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/driver/new-requests/${driver_id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setNewRequests(data.requests || []);
    } catch (err) {
      console.error('❌ Failed to fetch delivery requests:', err);
    }
  };

  const fetchOngoingDeliveries = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/driver/deliveries/${driver_id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setOngoingDeliveries(
        (data.deliveries || []).filter((d) =>
          ['Accepted', 'Assigned', 'PickedUp', 'InTransit'].includes(d.delivery_status)
        )
      );
    } catch (err) {
      console.error('❌ Failed to fetch ongoing deliveries:', err);
    }
  };

  const handleAccept = async (booking_id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/driver/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ booking_id, driver_id }),
      });

      if (res.ok) {
        setNewRequests((prev) => prev.filter((r) => r.id !== booking_id));
        fetchOngoingDeliveries();
      } else {
        const data = await res.json();
        console.error('❌ Accept failed:', data.message);
      }
    } catch (err) {
      console.error('❌ Accept error:', err);
    }
  };

  const handleReject = async (booking_id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/driver/reject-booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ booking_id, driver_id }),
      });

      if (res.ok) {
        setNewRequests((prev) => prev.filter((r) => r.id !== booking_id));
      } else {
        const data = await res.json();
        console.error('❌ Reject failed:', data.message);
      }
    } catch (err) {
      console.error('❌ Reject error:', err);
    }
  };

  const handleMarkDelivered = async (booking_id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/driver/mark-delivered`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ booking_id }),
      });

      if (res.ok) {
        setOngoingDeliveries((prev) => prev.filter((d) => d.booking_id !== booking_id));
      } else {
        const text = await res.text();
        console.error('❌ Mark delivered failed:', text);
      }
    } catch (err) {
      console.error('❌ Mark delivered error:', err);
    }
  };

  useEffect(() => {
    const fetchDriverDashboard = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/driver/dashboard/${driver_id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setDriver(data);
        setStats(data.stats || {});
      } catch (err) {
        console.error('❌ Error loading driver dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDriverDashboard();
    fetchNewRequests();
    fetchOngoingDeliveries();

    const socket = io(SOCKET_URL, { transports: ['websocket'] });
    if (driver.city) {
      socket.emit('join-city', driver.city);
    }
    socket.on('booking-accepted', fetchNewRequests);
    socket.on('new_booking_alert', fetchNewRequests);

    return () => socket.disconnect();
  }, [driver_id, token]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Welcome, {driver.name}
      </Typography>

      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                <AssignmentIcon fontSize="small" /> Total Deliveries
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {stats.totalDeliveries || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                <LocalShippingIcon fontSize="small" /> Pending Deliveries
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {stats.pendingDeliveries || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                <MonetizationOnIcon fontSize="small" /> Earnings
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                ₹{stats.earnings || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mb={3}>
        <Button
          variant="contained"
          startIcon={<PersonIcon />}
          onClick={() => navigate('/driver/profile')}
        >
          Update Profile
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" fontWeight={600} gutterBottom>
        New Delivery Requests
      </Typography>

      {newRequests.length === 0 ? (
        <Typography>No new requests right now.</Typography>
      ) : (
        <Grid container spacing={2}>
          {newRequests.map((req) => (
            <Grid item xs={12} md={6} key={req.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography><strong>Pickup:</strong> {req.pickup}</Typography>
                  <Typography><strong>Drop:</strong> {req.drop_location}</Typography>
                  <Typography><strong>Fare:</strong> ₹{req.fare} | <strong>Distance:</strong> {req.distance_km} km</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Vehicle: {req.vehicle_type}
                  </Typography>
                  <Box display="flex" gap={2} mt={2}>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<CheckIcon />}
                      onClick={() => handleAccept(req.id)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<CloseIcon />}
                      onClick={() => handleReject(req.id)}
                    >
                      Reject
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" fontWeight={600} gutterBottom>
        Ongoing Deliveries
      </Typography>

      {ongoingDeliveries.length === 0 ? (
        <Typography>No ongoing deliveries right now.</Typography>
      ) : (
        <Grid container spacing={2}>
          {ongoingDeliveries.map((delivery) => (
            <Grid item xs={12} md={6} key={delivery.booking_id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography><strong>Pickup:</strong> {delivery.pickup}</Typography>
                  <Typography><strong>Drop:</strong> {delivery.drop_location}</Typography>
                  <Typography><strong>Status:</strong> {delivery.delivery_status}</Typography>
                  <Typography><strong>Fare:</strong> ₹{delivery.fare} | <strong>Distance:</strong> {delivery.distance_km} km</Typography>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleMarkDelivered(delivery.booking_id)}
                    >
                      Mark as Delivered
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default DriverDashboard;
