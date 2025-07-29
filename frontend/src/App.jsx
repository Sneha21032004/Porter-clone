import React, { useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useLocation
} from "react-router-dom";

import Navbar from "./components/Navbar";
import UserNavbar from "./components/UserNavbar"; // ✅ New simplified navbar
import Footer from "./components/Footer";
import ScrolltoTop from "./components/ScrolltoTop";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import SupportPage from "./pages/Support";
import Enterprise from "./pages/Enterprise";
import DriverPartners from "./pages/DriverPartners";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DriverPage from "./pages/DriverPage";
import DriverDashboard from './pages/DriverDashboard';
import DriverDeliveries from './pages/DriverDeliveries';
import DriverProfile from "./pages/DriverProfile";

 // ✅ New driver profile page

import PaymentPage from "./pages/PaymentPage";
import BookingPage from "./pages/BookingPage";
import ConfirmedPage from "./pages/ConfirmedPage";
import TrackingPage from "./pages/TrackingPage";
import MyBookings from "./pages/MyBookings";


import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminDrivers from "./pages/admin/AdminDrivers";
import AdminPayments from "./pages/admin/AdminPayments";

// 🔒 Logout page component
function LogoutPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">You have been logged out.</h2>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        onClick={() => navigate("/login")}
      >
        Go to Login
      </button>
    </div>
  );
}

// ✅ Main App Component
function AppWrapper() {
  const [login, setlogin] = useState(localStorage.getItem("token") ? true : false);
  const location = useLocation();

  // ✅ Show UserNavbar on protected pages only
  const showUserNavbar =
    location.pathname.startsWith("/book") ||
    location.pathname.startsWith("/my-bookings") ||
    location.pathname.startsWith("/tracking") ||
    location.pathname.startsWith("/confirmed") ||
    location.pathname.startsWith("/payment");

  return (
    <div className="min-h-screen text-[#05060d] font-sans">
      <div className="relative z-10">
        {showUserNavbar ? (
          <UserNavbar />
        ) : (
          <Navbar login={login} setlogin={setlogin} />
        )}

        <main className="pt-16">
          <ScrolltoTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home login={login} />} />
            <Route path="/enterprise" element={<Enterprise />} />
            <Route path="/packers-movers" element={<DriverPartners />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/login" element={<Login setlogin={setlogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/driver-page" element={<DriverPage />} />
            <Route path="/driver/dashboard" element={<DriverDashboard />} />
            <Route path="/driver/deliveries" element={<DriverDeliveries />} />
            <Route path="/driver/profile" element={<DriverProfile />} />
            <Route path="/logout" element={<LogoutPage />} />

            {/* User Pages */}
            <Route path="/payment/:id" element={<PaymentPage />} />
            <Route path="/confirmed/:id" element={<ConfirmedPage />} />
            <Route path="/tracking/:id" element={<TrackingPage />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            
            <Route
              path="/book"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />

            {/* Admin Panel */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/drivers" element={<AdminDrivers />} />
            <Route path="/admin/payments" element={<AdminPayments />} />
            
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

// ⛓️ Wrap App in BrowserRouter
export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}
