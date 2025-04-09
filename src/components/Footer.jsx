import React from "react";
import { Link } from "react-router-dom";
// Optional: If you have react-icons installed
// import { FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  // Using standard Tailwind colors as approximation
  // bg-gray-100 or bg-orange-50 for cream-100
  // text-gray-800 or text-red-800 for burgundy-800
  // text-gray-600 or text-red-600 for burgundy-600
  // border-gray-200 or border-red-200 for burgundy-200

  return (
    <footer className="bg-[#F9EBE7] text-[#AA1B2A] mt-auto w-full">
      <div className="container mx-auto px-6 py-10 md:py-12">
        {" "}
        {/* Increased padding */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {" "}
          {/* Increased gap */}
          {/* Brand Column */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              SLNVK Matrimony
            </h3>
            <p className="text-sm leading-relaxed">
              Find your perfect match with our dedicated matrimonial platform,
              combining tradition and technology.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {" "}
              {/* Increased spacing */}
              {[
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms of Service", path: "/terms" },
                { name: "Pricing", path: "/pricing" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm hover:underline hover:text-[#881521] transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Features */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900">
              Features
            </h4>
            <ul className="space-y-2.5">
              {" "}
              {/* Increased spacing */}
              {[
                "Advanced Search",
                "AI Matchmaking",
                "Video Profiles",
                "Privacy Controls",
              ].map((item) => (
                <li key={item}>
                  {/* Linking to # for now, update paths as needed */}
                  <Link
                    to="#"
                    className="text-sm hover:underline hover:text-[#881521] transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Connect With Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900">
              Connect With Us
            </h4>
            <div className="flex space-x-4">
              {/* Using Text Links - Replace with actual icons if available */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#881521] transition-colors duration-200 text-sm"
              >
                Twitter
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#881521] transition-colors duration-200 text-sm"
              >
                LinkedIn
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#881521] transition-colors duration-200 text-sm"
              >
                Facebook
              </a>
            </div>
            {/* If using react-icons:
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900"><FaTwitter size={24} /></a>
              <a href="#" className="text-gray-600 hover:text-gray-900"><FaLinkedin size={24} /></a>
              <a href="#" className="text-gray-600 hover:text-gray-900"><FaFacebook size={24} /></a>
            </div>
            */}
          </div>
        </div>
        {/* Copyright */}
        <div className="mt-10 pt-8 border-t border-gray-200 text-center">
          {" "}
          {/* Subtle border, increased margin */}
          <p className="text-xs text-[#AA1B2A]/80">
            &copy; {new Date().getFullYear()} SLNVK Matrimony. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
