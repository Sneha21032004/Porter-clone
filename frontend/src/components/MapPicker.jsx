import React, { useEffect, useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.2090,
};

const MapPicker = ({ pickup, drop, setPickup, setDrop }) => {
  const mapRef = useRef(null);
  const activeFieldRef = useRef("pickup"); // Which field user is editing

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const handleMapClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        const address = results[0].formatted_address;
        const locationObj = { address, lat, lng };

        if (activeFieldRef.current === "pickup") {
          setPickup(locationObj);
        } else {
          setDrop(locationObj);
        }
      } else {
        alert("Failed to fetch address.");
      }
    });
  };

  const handleFieldFocus = (field) => {
    activeFieldRef.current = field;
  };

  const center = pickup?.lat ? { lat: pickup.lat, lng: pickup.lng } : defaultCenter;

  return isLoaded ? (
    <>
      {/* invisible inputs to track focus (used by parent) */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onClick={handleMapClick}
        onLoad={(map) => (mapRef.current = map)}
      >
        {pickup?.lat && <Marker position={{ lat: pickup.lat, lng: pickup.lng }} label="P" />}
        {drop?.lat && <Marker position={{ lat: drop.lat, lng: drop.lng }} label="D" />}
      </GoogleMap>
    </>
  ) : (
    <p>Loading map...</p>
  );
};

export default MapPicker;
