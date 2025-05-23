import React, { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
 

  return (
    <header className="relative flex justify-between items-center p-4 bg-gradient-to-r from-[#4F2A7F] to-black">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#482566] to-black opacity-60"></div>

      <div className="flex items-center space-x-3 px-6 relative z-10">
        <img
          src="/src/assets/logo.png"
          alt="Logo"
          className="w-16 h-auto"
        />
      </div>

      {/* Hamburger button - shown on small screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-20 block md:hidden text-white focus:outline-none"
        aria-label="Toggle menu"
      >
        <div className={`w-6 h-0.5 bg-white mb-1 transition-transform ${isOpen ? "rotate-45 translate-y-1.5" : ""}`}></div>
        <div className={`w-6 h-0.5 bg-white mb-1 transition-opacity ${isOpen ? "opacity-0" : "opacity-100"}`}></div>
        <div className={`w-6 h-0.5 bg-white transition-transform ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></div>
      </button>

      {/* Navigation */}
      <nav
        className={`absolute top-full left-0 w-full bg-gradient-to-r from-[#4F2A7F] to-black md:static md:bg-transparent md:w-auto md:flex md:space-x-8 transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}
          md:max-h-full md:opacity-100 md:overflow-visible
        `}
        style={{ zIndex: 10 }}
      >
        <ul className="flex flex-col md:flex-row md:space-x-8 p-4 md:p-0">
          <li>
            <a
              href="/"
              className="block text-white hover:text-red-500 py-2 md:py-0"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
          </li>
             <li>
            <a
              href="/about"
              className="block text-white hover:text-red-500 py-2 md:py-0"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="/services"
              className="block text-white hover:text-red-500 py-2 md:py-0"
              onClick={() => setIsOpen(false)}
            >
              Our Services
            </a>
          </li>
       
          <li>
            <a
              href="/contact"
              className="block text-white hover:text-red-500 py-2 md:py-0"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </a>
          </li>
          <li>
            <a
              href="/Login"
              className="block text-white hover:text-red-500 py-2 md:py-0"
              onClick={() => setIsOpen(false)}
            >
              Login
            </a>
          </li>
            <li>
            <a
              href="https://play.google.com/store/apps/details?id=com.kiloo.subwaysurf&hl=en"
              className="inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-lg font-semibold transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Download App
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
