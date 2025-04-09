import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useAuth, API_URL } from "../context/AuthContext";

// If API_URL is not exported, define it (ensure it matches context):
// const BACKEND_URL = "http://localhost:5000"; // No /api needed for static files

const Navbar = () => {
  // Remove scroll state and effect
  // const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Use auth context
  const { user, isAuthenticated, logout } = useAuth();

  // Construct the full image URL
  // Use BACKEND_URL if API_URL includes /api
  const backendBaseUrl = API_URL.replace("/api", ""); // Simple way to get base URL
  const profileImageUrl = user?.profilePicture
    ? `${backendBaseUrl}${user.profilePicture}`
    : null;

  // Remove scroll effect
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrolled(window.scrollY > 20);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Search", path: "/search" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <>
      {/* Remove conditional background based on scroll, set directly */}
      <header className="fixed top-0 w-full z-50 transition-all duration-300 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/logo.jpeg" alt="Logo" className="w-36 object-contain" />
            {/* <span className="text-xl font-bold text-gray-800">SLNVK</span> */}{" "}
            {/* Removed text */}
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-base font-medium transition-all ${
                  location.pathname === link.path
                    ? "text-[#d42a3c]"
                    : "text-gray-800 hover:text-[#d42a3c]"
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute bottom-[-2px] left-0 w-full h-0.5 bg-gradient-to-r from-[#d42a3c] to-yellow-400 scale-x-100 transition-transform duration-300" />
                )}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons or User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated() ? (
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="flex items-center cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-[#fdf2f4] flex items-center justify-center overflow-hidden border-2 border-[#d42a3c]">
                      {profileImageUrl ? (
                        <img
                          src={profileImageUrl}
                          alt={user.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-semibold text-[#d42a3c]">
                          {user?.name?.charAt(0) || "U"}
                        </span>
                      )}
                    </div>
                    <span className="ml-2 text-gray-800 font-medium">
                      {user?.name?.split(" ")[0] || "User"}
                    </span>
                  </div>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#fdf2f4] hover:text-[#d42a3c]"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/search"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#fdf2f4] hover:text-[#d42a3c]"
                    >
                      Search Matches
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#fdf2f4] hover:text-[#d42a3c]"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="border border-[#d42a3c] text-[#d42a3c] hover:bg-[#fdf2f4] font-medium py-1.5 px-4 rounded-md transition-all"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#d42a3c] hover:bg-[#b21e2f] text-white font-medium py-1.5 px-4 rounded-md shadow-md hover:shadow-lg transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#d42a3c] hover:bg-[#fdf2f4] p-2 rounded"
            >
              {mobileMenuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden px-6 pb-4 border-t border-gray-200 bg-white">
            <div className="flex flex-col space-y-3 pt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-base font-medium ${
                    location.pathname === link.path
                      ? "text-[#d42a3c]"
                      : "text-gray-800 hover:text-[#d42a3c]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-100 mt-4 pt-4 flex flex-col space-y-3">
              {isAuthenticated() ? (
                <>
                  <div className="flex items-center space-x-3 p-2 bg-[#fdf2f4] rounded-md">
                    <div className="h-8 w-8 rounded-full bg-[#fdf2f4] flex items-center justify-center overflow-hidden border-2 border-[#d42a3c]">
                      {profileImageUrl ? (
                        <img
                          src={profileImageUrl}
                          alt={user.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-semibold text-[#d42a3c]">
                          {user?.name?.charAt(0) || "U"}
                        </span>
                      )}
                    </div>
                    <span className="text-gray-800 font-medium">
                      {user?.name || "User"}
                    </span>
                  </div>
                  <Link
                    to="/profile"
                    className="text-gray-800 hover:text-[#d42a3c] px-4 py-2 rounded-md text-center"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/search"
                    className="text-gray-800 hover:text-[#d42a3c] px-4 py-2 rounded-md text-center"
                  >
                    Search Matches
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-[#d42a3c] hover:bg-[#fdf2f4] px-4 py-2 rounded-md text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="border border-[#d42a3c] text-[#d42a3c] px-4 py-2 rounded-md text-center"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-[#d42a3c] text-white px-4 py-2 rounded-md text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
      {/* Remove spacer div - padding is handled in App.jsx */}
      {/* <div className="h-20" /> */}
    </>
  );
};

export default Navbar;
