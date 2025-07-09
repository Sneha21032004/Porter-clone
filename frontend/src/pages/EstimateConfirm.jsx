import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bike, Car, Truck } from 'lucide-react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';

const vehicleIcons = {
  bike: <Bike className="w-8 h-8 text-blue-600" />,
  car: <Car className="w-8 h-8 text-green-600" />,
  truck: <Truck className="w-8 h-8 text-orange-600" />,
};

const EstimateConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const [confirmed, setConfirmed] = useState(false);
  const [directions, setDirections] = useState(null);

  if (!data) {
    // If no data, redirect back to estimate section
    navigate('/');
    return null;
  }

  const { pickup, drop, vehicle, price, distance } = data;

  // Default center (Mumbai)
  const mapCenter = {
    lat: 19.0760,
    lng: 72.8777
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const handleConfirm = () => {
    setConfirmed(true);
    // Optionally, store booking in localStorage for demo
    // localStorage.setItem('lastBooking', JSON.stringify(data));
  };

  const onMapLoad = (map) => {
    // You can add custom map styling or other configurations here
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[var(--primary-bg)] via-[var(--white)] to-[var(--secondary-bg)] py-12 px-4">
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-4xl w-full flex flex-col gap-6">
        {confirmed ? (
          <>
            <h2 className="text-3xl font-bold text-center mb-2 text-green-600">Booking Confirmed!</h2>
            {/* Google Map */}
            <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
              <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={mapCenter}
                  zoom={12}
                  onLoad={onMapLoad}
                >
                  {/* Pickup Marker */}
                  <Marker
                    position={mapCenter}
                    label={{
                      text: "Pickup",
                      className: "marker-label"
                    }}
                    icon={{
                      url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
                    }}
                  />
                  
                  {/* Drop Marker */}
                  <Marker
                    position={{
                      lat: mapCenter.lat + 0.01,
                      lng: mapCenter.lng + 0.01
                    }}
                    label={{
                      text: "Drop",
                      className: "marker-label"
                    }}
                    icon={{
                      url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                    }}
                  />
                  
                  {directions && (
                    <DirectionsRenderer
                      directions={directions}
                      options={{
                        suppressMarkers: true,
                        polylineOptions: {
                          strokeColor: "#3B82F6",
                          strokeWeight: 5
                        }
                      }}
                    />
                  )}
                </GoogleMap>
              </LoadScript>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Pickup:</span>
                <span>{pickup}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Drop:</span>
                <span>{drop}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Distance:</span>
                <span>{distance} km</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Vehicle:</span>
                <span className="flex items-center gap-2">{vehicleIcons[vehicle]} {vehicle.charAt(0).toUpperCase() + vehicle.slice(1)}</span>
              </div>
              <div className="flex justify-between items-center text-lg mt-2">
                <span className="font-bold">Estimated Price:</span>
                <span className="font-bold text-green-600">₹{price}</span>
              </div>
            </div>
            <button
              className="mt-6 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white rounded-xl px-6 py-3 font-semibold text-lg shadow hover:scale-105 transition"
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center mb-2">Confirm Your Estimate</h2>
            {/* Google Map */}
            <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
              <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={mapCenter}
                  zoom={12}
                  onLoad={onMapLoad}
                >
                  {/* Pickup Marker */}
                  <Marker
                    position={mapCenter}
                    label={{
                      text: "Pickup",
                      className: "marker-label"
                    }}
                    icon={{
                      url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
                    }}
                  />
                  
                  {/* Drop Marker */}
                  <Marker
                    position={{
                      lat: mapCenter.lat + 0.01,
                      lng: mapCenter.lng + 0.01
                    }}
                    label={{
                      text: "Drop",
                      className: "marker-label"
                    }}
                    icon={{
                      url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                    }}
                  />
                  
                  {directions && (
                    <DirectionsRenderer
                      directions={directions}
                      options={{
                        suppressMarkers: true,
                        polylineOptions: {
                          strokeColor: "#3B82F6",
                          strokeWeight: 5
                        }
                      }}
                    />
                  )}
                </GoogleMap>
              </LoadScript>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Pickup:</span>
                <span>{pickup}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Drop:</span>
                <span>{drop}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Distance:</span>
                <span>{distance} km</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Vehicle:</span>
                <span className="flex items-center gap-2">{vehicleIcons[vehicle]} {vehicle.charAt(0).toUpperCase() + vehicle.slice(1)}</span>
              </div>
              <div className="flex justify-between items-center text-lg mt-2">
                <span className="font-bold">Estimated Price:</span>
                <span className="font-bold text-green-600">₹{price}</span>
              </div>
            </div>
            <button
              className="mt-6 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white rounded-xl px-6 py-3 font-semibold text-lg shadow hover:scale-105 transition"
              onClick={handleConfirm}
            >
              Confirm Booking
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EstimateConfirm; 