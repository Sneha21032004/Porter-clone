import React, { useEffect, useRef, useState } from 'react';

const LocationAutocomplete = ({ value, onChange, placeholder }) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Load Google Maps script if not already loaded
    if (window.google && window.google.maps && window.google.maps.places) {
      setLoaded(true);
      return;
    }

    const existingScript = document.querySelector('#google-maps-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setLoaded(true);
      script.onerror = () => console.error('Failed to load Google Maps script');
      document.body.appendChild(script);
    } else {
      existingScript.addEventListener('load', () => setLoaded(true));
    }
  }, []);

  useEffect(() => {
    if (!loaded || !inputRef.current || autocompleteRef.current) return;

    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['geocode'],
    });

    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current.getPlace();
      if (!place.geometry) return;
      onChange({
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    });
  }, [loaded]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      value={typeof value === 'string' ? value : value?.address || ''}
      onChange={(e) =>
        onChange(typeof value === 'string' ? e.target.value : { ...value, address: e.target.value })
      }
      style={{
        width: '100%',
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '16px',
        boxSizing: 'border-box',
      }}
    />
  );
};

export default LocationAutocomplete;
