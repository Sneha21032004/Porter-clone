import React, { useState } from "react";
import Navbar from "./components/Navbar";

import Footer from "./components/Footer";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SupportPage from "./pages/Support";
import Enterprise from "./pages/Enterprise";
import DriverPartners from "./pages/DriverPartners";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ScrolltoTop from "./components/ScrolltoTop";
import DriverPage from './pages/DriverPage';
import EstimateConfirm from './pages/EstimateConfirm';
import { useNavigate } from 'react-router-dom';
import PaymentPage from './pages/PaymentPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminDrivers from './pages/admin/AdminDrivers';
import AdminPayments from './pages/admin/AdminPayments';

function LogoutPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">You have been logged out.</h2>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        onClick={() => navigate('/login')}
      >
        Go to Login
      </button>
    </div>
  );
}

function App() {
  const [login, setlogin] = useState(localStorage.getItem('token') ? true : false);
  return (
    <BrowserRouter>
      <div className="min-h-screen text-[#05060d] font-sans">
        <div className="relative z-10">
          <Navbar login={login} setlogin={setlogin} />
          <main className="pt-16">
            <ScrolltoTop />
            <Routes>
              <Route path="/" element={<Home login={login} />} />
              <Route path="/enterprise" element={<Enterprise />} />
              <Route path="/packers-movers" element={<DriverPartners />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/login" element={<Login setlogin={setlogin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/driver-page" element={<DriverPage />} />
              <Route path="/estimate/confirm" element={<EstimateConfirm />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/drivers" element={<AdminDrivers />} />
              <Route path="/admin/payments" element={<AdminPayments />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
