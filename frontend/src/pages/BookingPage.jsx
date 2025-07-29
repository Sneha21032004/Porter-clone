import React, { useState, useEffect } from 'react';
import {
  Grid, Card, Button, TextField, RadioGroup,
  FormControlLabel, Radio, Typography, Box, CircularProgress, Tooltip
} from '@mui/material';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from 'axios';
import LocationAutocomplete from '../components/LocationAutocomplete';
import InteractiveMap from '../components/InteractiveMap';

// ❌ Removed MapPicker
import SingleMapRoutePicker from '../components/SingleMapRoutePicker';
import { useNavigate } from 'react-router-dom';

const vehicles = [
  { id: 'bike', name: 'Bike' },
  { id: 'mini_truck', name: 'Mini Truck' },
  { id: 'truck', name: 'Truck' }
];
// ADD THIS FUNCTION AT THE TOP
function extractCityFromAddress(address) {
  if (!address) return '';
  const parts = address.split(',');
  // This example: city is the third-last part. Adjust as needed!
  // Example: "123 Main St, Andheri West, Mumbai, Maharashtra, India"
  // → "Mumbai"
  if (parts.length >= 3) {
    return parts[parts.length - 3].trim();
  }
  return '';
}
function BookingPage() {
  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);
  const [vehicleType, setVehicleType] = useState('');
  const [schedule, setSchedule] = useState('now');
  const [receiverName, setReceiverName] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [instructions, setInstructions] = useState('');
  const [fare, setFare] = useState(0);
  const [distance, setDistance] = useState(0);
  const [canBook, setCanBook] = useState(false);
  const [loadingFare, setLoadingFare] = useState(false);
  const [activeField, setActiveField] = useState('pickup');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();


  useEffect(() => {
    const estimateFare = async () => {
      if (pickup?.address && drop?.address && vehicleType) {
        setLoadingFare(true);
        setError('');
        try {
          const response = await axios.post('/api/bookings/estimate', {
            pickup: pickup.address,
            drop_location: drop.address,
            vehicle_type: vehicleType,
          });
          setDistance(response.data.distance_km);
          setFare(response.data.fare);
        } catch {
          setError('Failed to estimate fare. Please try again.');
          setDistance(0);
          setFare(0);
        } finally {
          setLoadingFare(false);
        }
      } else {
        setDistance(0);
        setFare(0);
      }
    };
    estimateFare();
  }, [pickup, drop, vehicleType]);

  useEffect(() => {
    if (
      pickup?.address &&
      drop?.address &&
      vehicleType &&
      receiverName &&
      /^\d{10}$/.test(receiverPhone) &&
      fare > 0
    ) {
      setCanBook(true);
    } else {
      setCanBook(false);
    }
  }, [pickup, drop, vehicleType, receiverName, receiverPhone, fare]);

  const handleBooking = async () => {
    setError('');
    try {
      const user_id = localStorage.getItem('user_id');
      if (!user_id) {
        setError('User not logged in.');
        return;
      }
      const city = extractCityFromAddress(pickup.address);
      const response = await axios.post('/api/bookings/create', {
        user_id,
        pickup: pickup.address,
        city,
        drop_location: drop.address,
        vehicle_type: vehicleType,
        distance_km: distance,
        fare: fare,
        receiver_name: receiverName,
        receiver_phone: receiverPhone,
        instructions,
        schedule
      });

      const bookingId = response.data.booking_id;
      if (bookingId) {
        navigate(`/payment/${bookingId}`);
      } else {
        setError('Booking created but no booking ID returned.');
      }
    } catch (err) {
      console.error('❌ Booking error:', err);
      setError('Failed to create booking. Please try again.');
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const geocoder = new window.google.maps.Geocoder();

          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === "OK" && results[0]) {
              const fullAddress = results[0].formatted_address;
              setPickup({
                address: fullAddress,
                lat,
                lng,
              });
            } else {
              alert("Failed to get address from coordinates.");
            }
          });
        } catch (error) {
          console.error("Geocoder failed:", error);
          alert("Geocoder error");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to retrieve your location.");
      }
    );
  };

  return (
    <Box>
      <Box mt={4} sx={{ height: '500px', borderRadius: 3, overflow: 'hidden' }}>
        <InteractiveMap
          pickup={pickup}
          drop={drop}
          setPickup={setPickup}
          setDrop={setDrop}
          activeField={activeField}
        />
      </Box>

      <Card sx={{ maxWidth: 1100, mx: 'auto', p: 4, borderRadius: 5, boxShadow: 6 }}>
        <Typography variant="h4" align="center" color="primary" sx={{ fontWeight: 800, mb: 1 }}>
          Book Your Delivery
        </Typography>
        <Typography align="center" color="textSecondary" sx={{ mb: 4 }}>
          Fast, reliable delivery service at your fingertips.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box mb={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center' }}>
                <DirectionsBikeIcon color="primary" sx={{ mr: 1 }} />
                Pickup Location
              </Typography>
              <LocationAutocomplete
                value={pickup}
                onChange={setPickup}
                onFocus={() => setActiveField("pickup")}
                placeholder="Enter pickup location"
              />
              <Button variant="outlined" onClick={handleUseCurrentLocation} sx={{ mb: 2 }}>
                📍 Use My Current Location
              </Button>
            </Box>

            <Box mb={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center' }}>
                <LocalMallIcon color="primary" sx={{ mr: 1 }} />
                Drop Location
              </Typography>
              <LocationAutocomplete
                value={drop}
                onChange={setDrop}
                onFocus={() => setActiveField("drop")}
                placeholder="Enter drop location"
              />
            </Box>
            <Box mb={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocalShippingIcon color="primary" sx={{ mr: 1 }} />
                Choose Vehicle Type
              </Typography>
              <Grid container spacing={2}>
                {vehicles.map(v => (
                  <Grid item xs={4} key={v.id}>
                    <Button
                      fullWidth
                      variant={vehicleType === v.id ? 'contained' : 'outlined'}
                      onClick={() => setVehicleType(v.id)}
                      startIcon={
                        v.id === 'bike' ? <DirectionsBikeIcon /> :
                          v.id === 'mini_truck' ? <LocalShippingIcon /> :
                            <LocalMallIcon />
                      }
                      sx={{
                        py: 2,
                        borderRadius: 3,
                        fontWeight: 600,
                        background: vehicleType === v.id ? 'linear-gradient(90deg,#1976d2, #42a5f5)' : '#fff'
                      }}
                    >
                      {v.name}
                    </Button>
                    <Typography variant="caption" align="center" sx={{ display: 'block', mt: 1 }}>
                      {v.id === 'bike' && "Fastest for small parcels"}
                      {v.id === 'mini_truck' && "Ideal for medium loads"}
                      {v.id === 'truck' && "Best for bulk delivery"}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center' }}>
                <InfoOutlinedIcon color="primary" sx={{ mr: 1 }} />
                When do you need this?
              </Typography>
              <RadioGroup value={schedule} onChange={e => setSchedule(e.target.value)} row>
                <FormControlLabel value="now" control={<Radio />} label="Now" />
                <FormControlLabel value="later" control={<Radio />} label="Schedule Later" />
              </RadioGroup>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box mb={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center' }}>
                <InfoOutlinedIcon color="primary" sx={{ mr: 1 }} />
                Receiver Details
              </Typography>
              <TextField
                fullWidth
                label="Receiver Name"
                value={receiverName}
                onChange={e => setReceiverName(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Receiver Phone"
                value={receiverPhone}
                onChange={e => setReceiverPhone(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Box>

            <Box mb={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center' }}>
                <InfoOutlinedIcon color="primary" sx={{ mr: 1 }} />
                Special Instructions
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
              />
            </Box>

            <Box textAlign="center" p={2} bgcolor="#e3f2fd" borderRadius={3} mb={3} sx={{ boxShadow: 1 }}>
              {loadingFare
                ? <CircularProgress size={24} />
                : <Typography variant="h6">Estimated Fare: ₹{fare}</Typography>
              }
              <Tooltip title="Based on distance & vehicle type">
                <InfoOutlinedIcon sx={{ color: 'grey.600' }} />
              </Tooltip>
            </Box>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={!canBook || loadingFare}
              onClick={handleBooking}
            >
              {loadingFare ? <CircularProgress size={24} color="inherit" /> : "Book Delivery"}
            </Button>

            {error && <Typography color="error" align="center" sx={{ mt: 2 }}>{error}</Typography>}
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default BookingPage;
