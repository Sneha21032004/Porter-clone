import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ login, setlogin }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usertype');
    if (setlogin) setlogin(false); // If you use a login state in parent
    navigate('/logout');
  };
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-effect shadow-lg"
          : "bg-white/95 backdrop-blur-md shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between relative">
          {/* Logo */}
          <NavLink to="/" className="group flex-shrink-0 z-10">
            <h1 className="text-2xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">
              MoveEasy
            </h1>
          </NavLink>

          {/* Centered Links */}
          <div className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <NavLink
              to="/enterprise"
              className="relative text-gray-800 hover:text-blue-600 font-semibold px-3 py-2 transition-all duration-300 group text-base"
            >
              For Enterprise
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
            <NavLink
              to="/packers-movers"
              className="relative text-gray-800 hover:text-blue-600 font-semibold px-3 py-2 transition-all duration-300 group text-base"
            >
              Delivery Partners
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-3 z-10">
            {!login && (
              <>
                <NavLink to="/login">
                  <button className="text-gray-700 font-medium px-4 py-2 transition-all duration-300 hover:scale-105 text-base hover:bg-gray-100 rounded-lg">
                    Login
                  </button>
                </NavLink>
                <NavLink to="/register">
                  <button className="bg-white text-blue-600 border border-blue-600 font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-105 text-base">
                    Register
                  </button>
                </NavLink>
              </>
            )}
            {login && (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:bg-red-600 hover:scale-105 text-base"
              >
                Logout
              </button>
            )}
            <NavLink to="/support">
              <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium px-5 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 text-base">
                Support
              </button>
            </NavLink>
          </div>

          {/* Hamburger for mobile */}
          <button
            className="md:hidden text-gray-700 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
              <span
                className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${
                  open ? "rotate-45 translate-y-1" : "-translate-y-1"
                }`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${
                  open ? "-rotate-45 -translate-y-1" : "translate-y-1"
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile overlay */}
        {open && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          ></div>
        )}

        {/* Mobile nav links */}
        <div
          className={`flex-col md:hidden items-center space-y-2 absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300 z-40 ${
            open ? "flex animate-slide-in-up" : "hidden"
          }`}
        >
          <div className="w-full p-4 space-y-2">
            <NavLink
              to="/enterprise"
              className="block text-gray-800 hover:text-blue-600 font-medium px-4 py-3 rounded-lg hover:bg-blue-50 transition-all duration-200 text-base"
              onClick={() => setOpen(false)}
            >
              For Enterprise
            </NavLink>
            <NavLink
              to="/packers-movers"
              className="block text-gray-800 hover:text-blue-600 font-medium px-4 py-3 rounded-lg hover:bg-blue-50 transition-all duration-200 text-base"
              onClick={() => setOpen(false)}
            >
              Delivery Partners
            </NavLink>
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
              <NavLink
                to="/login"
                className="block text-gray-800 hover:text-blue-600 font-medium px-4 py-3 rounded-lg hover:bg-blue-50 transition-all duration-200 text-base"
                onClick={() => setOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="block text-gray-800 hover:text-blue-600 font-medium px-4 py-3 rounded-lg hover:bg-blue-50 transition-all duration-200 text-base"
                onClick={() => setOpen(false)}
              >
                Register
              </NavLink>
              <NavLink to="/support" onClick={() => setOpen(false)}>
                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium px-4 py-3 rounded-lg transition-all duration-200 hover:shadow-lg text-base">
                  Support
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
    
  );
};

export default Navbar;
