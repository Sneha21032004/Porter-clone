import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: 12.9716,
  lng: 77.5946, // Bengaluru
};

const InteractiveMap = ({ pickup, drop, setPickup, setDrop, activeField }) => {
  const [directions, setDirections] = useState(null);
  const mapRef = useRef(null);

  // ✅ Load Maps only once using useJsApiLoader
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  // Fetch directions when pickup/drop change
  useEffect(() => {
    const fetchRoute = () => {
      if (pickup?.lat && drop?.lat && window.google) {
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
          {
            origin: pickup,
            destination: drop,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === 'OK') {
              setDirections(result);
            } else {
              console.error('Directions request failed due to', status);
              setDirections(null);
            }
          }
        );
      } else {
        setDirections(null);
      }
    };

    fetchRoute();
  }, [pickup, drop]);

  const handleMapClick = (event) => {
    const clickedLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    if (activeField === 'pickup') {
      setPickup(clickedLocation);
    } else if (activeField === 'drop') {
      setDrop(clickedLocation);
    }
  };

  // ⏳ Show loading fallback
  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={pickup || drop || defaultCenter}
      zoom={13}
      onLoad={(map) => (mapRef.current = map)}
      onClick={handleMapClick}
    >
      {/* Markers */}
      {pickup && <Marker position={pickup} label="P" />}
      {drop && <Marker position={drop} label="D" />}

      {/* Route line */}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default InteractiveMap;
