import React, { useState } from "react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { Instagram, Twitter, Facebook } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {/* Header Section */}
      <header className="fixed top-0 left-0 w-full p-5 flex justify-between items-center z-50 bg-white shadow-md">
        {/* Logo and Name */}
        <div className="flex items-center space-x-3">
          <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center">
            <img src="/bbark.png" alt="BeeBark Logo" className="h-12 w-auto" />
            <span className="text-2xl font-bold text-black">BeeBark</span>
          </Link>
        </div>

        {/* Menu Icon */}
        {/* <div
          className="flex items-center justify-center w-12 h-12 rounded-full cursor-pointer border-2 border-black bg-black"
          onClick={toggleMenu}
        >
          {menuOpen ? (
            <XMarkIcon className="w-8 h-8 text-white" />
          ) : (
            <Bars3Icon className="w-8 h-8 text-white" />
          )}
        </div> */}
      </header>

      {/* Fixed Full-Screen Menu */}
      <motion.div
        className={`fixed top-0 left-0 w-full h-full bg-white text-black p-6 z-40 ${menuOpen ? "transform translate-x-0" : "transform -translate-x-full"}`}
        initial={{ x: "-100%" }}
        animate={{ x: menuOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex flex-row h-full">
          {/* Menu Items */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-center md:text-left flex-1">
            <div className="flex flex-col justify-center items-start h-full md:mx-10">
              <ul className="space-y-7 text-xl md:text-5xl font-bold font-montserrat text-left md:mx-12">
                <li>
                  <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-gray-700">
                    Home
                  </Link>
                </li>
                <li>
                  <a href="#services" onClick={() => setMenuOpen(false)} className="hover:text-gray-700">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#client" onClick={() => setMenuOpen(false)} className="hover:text-gray-700">
                    Client
                  </a>
                </li>
                <li>
                  <a href="#aboutus" onClick={() => setMenuOpen(false)} className="hover:text-gray-700">
                    About Us
                  </a>
                </li>
                <li>
                  <Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:text-gray-700">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/pro" onClick={() => setMenuOpen(false)} className="hover:text-gray-700">
                    For Pro's
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info and Social Media Icons */}
          <div className="hidden md:flex flex-col items-start space-y-5 justify-center mx-12 mt-10">
            <div className="text-xl underline font-bold text-green-700 font-poppins">info@thebeebark.com</div>
            <div className="text-xl underline font-bold text-green-700 font-poppins">+91 7701858312</div>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.facebook.com/profile.php?id=61560873622756" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-6 h-6 text-black hover:text-gray-700" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-6 h-6 text-black hover:text-gray-700" />
              </a>
              <a href="https://www.instagram.com/thebeebark/" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-6 h-6 text-black hover:text-gray-700" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
