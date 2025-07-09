import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bike, Car, Truck } from 'lucide-react';

const vehicleIcons = {
  bike: <Bike className="w-8 h-8 text-blue-600" />,
  car: <Car className="w-8 h-8 text-green-600" />,
  truck: <Truck className="w-8 h-8 text-orange-600" />,
};

const EstimateConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    // If no data, redirect back to estimate section
    navigate('/');
    return null;
  }

  const { pickup, drop, vehicle, price, distance } = data;

  const handleConfirm = () => {
    alert('Booking confirmed! (Demo)');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[var(--primary-bg)] via-[var(--white)] to-[var(--secondary-bg)] py-12 px-4">
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-lg w-full flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-center mb-2">Confirm Your Estimate</h2>
        {/* Dummy Map */}
        <div className="w-full h-56 bg-gray-200 flex items-center justify-center rounded mb-4">
          <span className="text-gray-500">[Dummy Map: {pickup} → {drop}]</span>
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
      </div>
    </div>
  );
};

export default EstimateConfirm; 