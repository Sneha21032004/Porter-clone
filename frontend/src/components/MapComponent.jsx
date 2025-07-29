// components/MapComponent.jsx
import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.2090,
};

const MapComponent = ({ pickupCoords, dropCoords, onMapClick }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (pickupCoords && dropCoords) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: pickupCoords,
          destination: dropCoords,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
          } else {
            console.error("Directions request failed:", status);
          }
        }
      );
    }
  }, [pickupCoords, dropCoords]);

  const handleClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    onMapClick({ lat, lng });
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={pickupCoords || dropCoords || defaultCenter}
      zoom={13}
      onClick={handleClick}
    >
      {pickupCoords && <Marker position={pickupCoords} label="P" />}
      {dropCoords && <Marker position={dropCoords} label="D" />}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  ) : (
    <p>Loading map...</p>
  );
};

export default MapComponent;
