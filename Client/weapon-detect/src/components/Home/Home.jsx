import React from 'react';

const Home = () => {
  return (
    <div className="relative min-h-screen py-16 overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/src/assets/weapon.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
          {/* Right Section: Text */}
          <div className="w-full md:w-7/12 lg:w-7/12 text-center md:text-left order-2 md:order-1 mt-10">
            <h1 className="text-5xl font-bold mb-4 text-white mt-10">Weapon Detection System</h1>

            <p className="mt-8 text-white text-base ">
              Our Weapon Detection System is an advanced AI-powered solution designed to identify weapons in real-time through video feeds or surveillance footage. Designed for high-stakes environments, this solution empowers security teams to act proactively—protecting lives before incidents occur.
            </p>

            <div className="mt-6">
              <a
                href="/#contact"
                className="bg-red-500 text-white px-8 py-3 rounded-full text-xl hover:bg-red-600"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Left Section: Image */}
          <div className="w-full md:w-8/12 lg:w-8/12 flex justify-center mt-6 order-1 md:order-2">
            <img
              src="/src/assets/weapons-1.png"
              alt="React development"
              className="w-full lg:w-256 xl:w-320 h-full object-contain rounded-xl mt-6 "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
