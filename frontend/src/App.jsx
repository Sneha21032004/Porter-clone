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


function App() {
  const [login, setlogin] = useState(localStorage.getItem('token') ? true : false);
  return (
    <BrowserRouter>
      <div className="min-h-screen text-[#05060d] font-sans">
        <div className="relative z-10">
          <Navbar login={login}/>
          <main className="pt-16">
          <ScrolltoTop />
            <Routes>
              <Route path="/" element={<Home login={login}  />} />
              <Route path="/enterprise" element={<Enterprise />} />
              <Route path="/packers-movers" element={<DriverPartners />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/login" element={<Login setlogin={setlogin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/driver-page" element={<DriverPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
