import React, { useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.2090,
};

function SingleMapRoutePicker({ pickup, drop, setPickup, setDrop, activeField }) {
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        const address = results[0].formatted_address;
        const locationData = { address, lat, lng };

        if (activeField === "pickup") {
          setPickup(locationData);
        } else {
          setDrop(locationData);
        }
      } else {
        alert("Could not get address");
      }
    });
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={pickup?.lat ? { lat: pickup.lat, lng: pickup.lng } : defaultCenter}
      zoom={13}
      onClick={handleMapClick}
      onLoad={(map) => (mapRef.current = map)}
    >
      {pickup && <Marker position={{ lat: pickup.lat, lng: pickup.lng }} label="P" />}
      {drop && <Marker position={{ lat: drop.lat, lng: drop.lng }} label="D" />}
    </GoogleMap>
  ) : (
    <p>Loading map...</p>
  );
}

export default SingleMapRoutePicker;
