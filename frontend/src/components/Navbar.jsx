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
    navigate('/');
  };
  return (
    <nav className={
      `fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${scrolled
        ? "bg-white/85 backdrop-blur-xl shadow-2xl border-b border-[#bca8f3]/30"
        : "bg-gradient-to-r from-[#ece9f7]/90 via-white/95 to-[#f3fff7]/90 shadow-sm border-b border-[#bca8f3]/10"}`
    }>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between relative">
          {/* Logo */}
          <NavLink to="/" className="group flex-shrink-0 z-10">
            <h1 className="text-2xl font-extrabold text-[#4d21b9] tracking-tight group-hover:scale-105 transition-all duration-300 drop-shadow-logo">
              MoveEasy
            </h1>
          </NavLink>

          {/* Centered Links */}
          <div className="hidden lg:flex items-center space-x-10 absolute left-1/2 transform -translate-x-1/2">
            <NavLink
              to="/enterprise"
              className="relative text-[#2e1967] font-semibold px-3 py-2 text-base group hover:text-[#3ec9a7] transition-all duration-300"
            >
              For Enterprise
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-[#4d21b9] via-[#3ec9a7] to-[#4d21b9] rounded-full transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
            <NavLink
              to="/packers-movers"
              className="relative text-[#2e1967] font-semibold px-3 py-2 text-base group hover:text-[#3ec9a7] transition-all duration-300"
            >
              Delivery Partners
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-[#3ec9a7] to-[#4d21b9] rounded-full transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-3 z-10">
            {!login && (
              <>
                <NavLink to="/login">
                  <button className="text-[#3b1769] font-medium px-4 py-2 bg-white/80 border border-[#bca8f3]/30 rounded-lg shadow hover:bg-[#ece9f7]/80 hover:text-[#4d21b9] transition-all duration-200 hover:scale-105 text-base">
                    Login
                  </button>
                </NavLink>
                <NavLink to="/register">
                  <button className="bg-gradient-to-r from-[#3ec9a7] to-[#4d21b9] text-white font-semibold px-4 py-2 rounded-lg shadow transition duration-300 hover:shadow-xl hover:scale-105 text-base focus:outline-none">
                    Register
                  </button>
                </NavLink>
              </>
            )}
            {login && (
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-[#ef4444] to-[#b91c1c] text-white font-semibold px-4 py-2 rounded-lg shadow transition-all duration-300 hover:scale-105 hover:bg-[#b91c1c] text-base focus:outline-none"
              >
                Logout
              </button>
            )}
            <NavLink to="/support">
              <button className="bg-gradient-to-r from-[#4d21b9] to-[#3ec9a7] text-white font-medium px-5 py-2 rounded-lg shadow hover:shadow-xl hover:scale-105 transition-all duration-300 text-base focus:outline-none">
                Support
              </button>
            </NavLink>
          </div>

          {/* Hamburger for mobile */}
          <button
            className="md:hidden text-[#4d21b9] p-2 rounded-lg bg-white/80 hover:bg-[#ece9f7]/90 transition-colors duration-200 focus:outline-none"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
              <span
                className={`block w-5 h-0.5 bg-[#4d21b9] transition-all duration-300 ${open ? "rotate-45 translate-y-1" : "-translate-y-1"}`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-[#4d21b9] transition-all duration-300 ${open ? "opacity-0" : "opacity-100"}`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-[#4d21b9] transition-all duration-300 ${open ? "-rotate-45 -translate-y-1" : "translate-y-1"}`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile overlay */}
        {open && (
          <div
            className="fixed inset-0 bg-[#2e1967]/30 backdrop-blur-sm md:hidden animate-fade-in z-30"
            onClick={() => setOpen(false)}
          ></div>
        )}

        {/* Mobile nav links */}
        <div
          className={`flex-col md:hidden items-center space-y-2 absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg shadow-2xl transition-all duration-300 z-40 ${
            open ? "flex animate-slide-in-up" : "hidden"
          }`}
        >
          <div className="w-full p-4 space-y-2">
            <NavLink
              to="/enterprise"
              className="block text-[#2e1967] font-medium px-4 py-3 rounded-lg hover:bg-[#bca8f3]/15 hover:text-[#3ec9a7] transition-all duration-200 text-base"
              onClick={() => setOpen(false)}
            >
              For Enterprise
            </NavLink>
            <NavLink
              to="/packers-movers"
              className="block text-[#2e1967] font-medium px-4 py-3 rounded-lg hover:bg-[#bca8f3]/15 hover:text-[#3ec9a7] transition-all duration-200 text-base"
              onClick={() => setOpen(false)}
            >
              Delivery Partners
            </NavLink>
            <div className="flex flex-col space-y-2 pt-2 border-t border-[#bca8f3]/20">
              {!login && (
                <>
                  <NavLink
                    to="/login"
                    className="block text-[#2e1967] font-medium px-4 py-3 rounded-lg hover:bg-[#bca8f3]/15 hover:text-[#3ec9a7] transition-all duration-200 text-base"
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="block bg-gradient-to-r from-[#3ec9a7] to-[#4d21b9] text-white font-medium px-4 py-3 rounded-lg shadow transition-all duration-300 hover:shadow-xl hover:scale-105 text-base"
                    onClick={() => setOpen(false)}
                  >
                    Register
                  </NavLink>
                </>
              )}
              {login && (
                <button
                  onClick={() => { setOpen(false); handleLogout(); }}
                  className="block bg-gradient-to-r from-[#ef4444] to-[#b91c1c] text-white font-semibold px-4 py-3 rounded-lg shadow transition-all duration-300 hover:scale-105 hover:bg-[#b91c1c] text-base"
                >
                  Logout
                </button>
              )}
              <NavLink to="/support" onClick={() => setOpen(false)}>
                <button className="w-full bg-gradient-to-r from-[#4d21b9] to-[#3ec9a7] text-white font-medium px-4 py-3 rounded-lg shadow hover:shadow-xl transition-all duration-200 text-base">
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
