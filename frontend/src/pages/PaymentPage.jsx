import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  const [method, setMethod] = useState('UPI');
  const [upiId, setUpiId] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  if (!bookingData) {
    navigate('/');
    return null;
  }

  const handlePayment = async () => {
    try {
      await axios.post('http://localhost:5000/api/payment', {
        pickup: bookingData.pickup,
        drop: bookingData.drop,
        vehicle: bookingData.vehicle,
        price: bookingData.price,
        method,
        upiId,
        phone,
        email,
      });

      alert('Payment successful!');
      navigate('/my-bookings');
    } catch (err) {
      console.error(err);
      alert('Payment failed');
    }
  };

  const renderFields = () => {
    switch (method) {
      case 'UPI':
      case 'GPay':
        return (
          <>
            <label className="block text-sm font-medium mt-4">UPI ID</label>
            <input
              type="text"
              value={upiId}
              onChange={e => setUpiId(e.target.value)}
              className="border w-full p-2 rounded-md"
              placeholder="yourname@upi"
            />
          </>
        );
      case 'Phone':
        return (
          <>
            <label className="block text-sm font-medium mt-4">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="border w-full p-2 rounded-md"
              placeholder="9999999999"
            />
          </>
        );
      default:
        return <p className="mt-4 text-gray-600">You will pay in cash during pickup.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT: Payment Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Complete Your Payment</h2>

          <h3 className="font-semibold mb-2">Payment Method</h3>
          <div className="flex flex-col gap-3">
            {['UPI', 'Cash', 'Phone', 'GPay'].map(opt => (
              <label key={opt} className={`flex items-center border rounded-md px-4 py-2 cursor-pointer ${method === opt ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                <input
                  type="radio"
                  value={opt}
                  checked={method === opt}
                  onChange={() => setMethod(opt)}
                  className="mr-2"
                />
                {opt} <span className="ml-2 text-sm text-gray-500">{opt === 'UPI' ? 'Pay using UPI ID or QR' : opt === 'Cash' ? 'Cash on delivery or pickup' : opt === 'Phone' ? 'Pay via phone banking' : 'Google Pay wallet'}</span>
              </label>
            ))}
          </div>

          {renderFields()}

          {method !== 'Cash' && (
            <>
              <label className="block text-sm font-medium mt-4">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border w-full p-2 rounded-md"
                placeholder="john@example.com"
              />
            </>
          )}

          <button
            onClick={handlePayment}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
          >
            Complete Payment
          </button>

          <div className="mt-6 text-xs text-center text-gray-500">
            <div className="flex justify-center items-center gap-4">
              <span>🔒 SSL Secured</span>
              <span>✅ 256-bit Encryption</span>
              <span>🛡️ PCI Compliant</span>
            </div>
            <p className="mt-2">Your payment information is secure and encrypted.</p>
          </div>
        </div>

        {/* RIGHT: Summary */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
          <h3 className="text-lg font-bold mb-4">Transaction Summary</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li><strong>Pickup:</strong> {bookingData.pickup}</li>
            <li><strong>Drop:</strong> {bookingData.drop}</li>
            <li><strong>Vehicle:</strong> {bookingData.vehicle}</li>
            <li><strong>Subtotal:</strong> ₹{bookingData.price.toFixed(2)}</li>
            <li><strong>Processing Fee:</strong> ₹2.97</li>
            <li className="font-semibold text-blue-700 mt-2">Total: ₹{(bookingData.price + 2.97).toFixed(2)}</li>
          </ul>

          <div className="mt-6 border-t pt-4 text-sm text-gray-600">
            <p className="mb-1">Need Help?</p>
            <p>Email: <a href="mailto:support@swiftpay.com" className="text-blue-600">support@swiftpay.com</a></p>
            <p>Phone: <a href="tel:1800-SWIFT-PAY" className="text-blue-600">1-800-SWIFT-PAY</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
