import React from 'react';

const Header = () => {
  return (
    <header className="relative flex justify-between items-center p-4 bg-gradient-to-r from-[#4F2A7F] to-black">
      {/* Gradient background for header */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#482566]   to-black opacity-60"></div>

      <div className="flex items-center space-x-3 px-6 relative z-10">
        {/* Update the src to use the local image in the 'assets' folder */}
        <img
          src="/src/assets/logo.png"  // Use local image from the assets folder
          alt="Logo"
          className="w-16 h-auto"
        />
      </div>

      <nav className="relative z-10">
        <ul className="flex space-x-8">
          <li><a href="/" className="text-white hover:text-red-500">Home</a></li>
          <li><a href="/services" className="text-white hover:text-red-500">Our Services</a></li>
          <li><a href="/about" className="text-white hover:text-red-500">About Us</a></li>
          <li><a href="/contact" className="text-white hover:text-red-500">Contact Us</a></li>
          <li><a href="/blogs" className="text-white hover:text-red-500">Blogs</a></li>
          <li><a href="/Login" className="text-white hover:text-red-500">Login</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
