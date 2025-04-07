import React from 'react';

export default function About() {
  return (
    <div>
      {/* First Section */}
      <section className="relative bg-black text-white py-20 px-10 bg-gradient-to-r from-[#4F2A7F] to-black">
        <div className="text-center mb-16 mt-12">
          <h2 className="text-4xl font-bold text-red-600">
            Get To Know <span className="text-white">Who We Are ?</span>
          </h2>
          <p className="mt-4 text-lg text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae dolor elit nam ac libero eget purus in.
            Proin integer in malesuada in et egestas adipiscing lacinia. Accumsan molestie enim, risus, at et.
          </p>
        </div>

        {/* Grid Section for Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="relative">
            <img
              src="/path-to-image1.jpg" // Replace with your actual image path
              alt="About Us"
              className="w-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex justify-center items-center text-center">
              <p className="text-2xl font-bold text-white">Lorem ipsum dolor sit amet</p>
            </div>
          </div>

          <div className="relative">
            <img
              src="/path-to-image2.jpg" // Replace with your actual image path
              alt="About Us"
              className="w-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex justify-center items-center text-center">
              <p className="text-2xl font-bold text-white">Lorem ipsum dolor sit amet</p>
            </div>
          </div>

          <div className="relative">
            <img
              src="/path-to-image3.jpg" // Replace with your actual image path
              alt="About Us"
              className="w-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex justify-center items-center text-center">
              <p className="text-2xl font-bold text-white">Lorem ipsum dolor sit amet</p>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="text-center mt-12 mb-16">
          <p className="text-lg text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae dolor elit nam ac libero eget purus in. Proin
            integer in malesuada in et egestas adipiscing lacinia. Accumsan molestie enim, risus, at et. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Call to Action Button */}
        <div className="text-center">
          <a href="#contact" className="py-3 px-6 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
            Get In Touch
          </a>
        </div>
      </section>

      {/* Second Section */}
      <section className="relative bg-black text-white py-20 px-10 bg-gradient-to-r from-[#4F2A7F] to-black">
        {/* Title and Description Section */}
        <div className="text-center mb-16 mt-12">
          <h2 className="text-4xl font-bold text-red-600">
            We Make People <span className="text-white">Feel Safe</span>
          </h2>
          <p className="mt-4 text-lg text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae dolor elit nam ac libero eget purus in. Proin
            integer in malesuada in et egestas adipiscing lacinia. Accumsan molestie enim, risus, at et.
          </p>
        </div>

        {/* Grid Section for Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Box 1 */}
          <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <div className="text-red-600 mb-4">
              <i className="fas fa-lightbulb fa-3x"></i> {/* Replace with an actual icon */}
            </div>
            <h3 className="text-xl font-semibold">Lorem ipsum dolor sit amet</h3>
            <p className="mt-2 text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae dolor elit nam ac libero eget purus in.
            </p>
          </div>

          {/* Box 2 */}
          <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <div className="text-red-600 mb-4">
              <i className="fas fa-shield-alt fa-3x"></i> {/* Replace with an actual icon */}
            </div>
            <h3 className="text-xl font-semibold">Lorem ipsum dolor sit amet</h3>
            <p className="mt-2 text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae dolor elit nam ac libero eget purus in.
            </p>
          </div>

          {/* Box 3 */}
          <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <div className="text-red-600 mb-4">
              <i className="fas fa-users fa-3x"></i> {/* Replace with an actual icon */}
            </div>
            <h3 className="text-xl font-semibold">Lorem ipsum dolor sit amet</h3>
            <p className="mt-2 text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae dolor elit nam ac libero eget purus in.
            </p>
          </div>
        </div>

        {/* Description Section */}
        <div className="text-center mt-12 mb-16">
          <p className="text-lg text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae dolor elit nam ac libero eget purus in. Proin
            integer in malesuada in et egestas adipiscing lacinia. Accumsan molestie enim, risus, at et. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Call to Action Button */}
        <div className="text-center">
          <a href="#contact" className="py-3 px-6 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
