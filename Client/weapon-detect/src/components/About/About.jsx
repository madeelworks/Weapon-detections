import React from "react";

export default function About() {
  return (
    <div id="about" className="relative min-h-screen py-16 overflow-hidden">
   

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
          {/* Left Section: Image */}
          <div className="w-full md:w-6/12 lg:w-6/12 flex justify-center mt-6">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full lg:w-256 xl:w-320 h-full object-contain rounded-xl "
            >
              <source src="/src/assets/detection.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          {/* Right Section: Text */}
          <div className="w-full md:w-7/12 lg:w-7/12 text-center md:text-left">
            <h2 className="text-4xl font-bold mb-4 text-red-600">
              Get To Know <span className="text-red-600">Who We Are ?</span>
            </h2>
            <p className="mt-6 text-black text-base ">
              At the forefront of security technology, we specialize in
              delivering advanced AI-powered weapon detection solutions designed
              to protect lives and safeguard environments. Our team combines
              cutting-edge artificial intelligence to provide real-time weapon
              identification, helping organizations stay proactive in threat
              detection.
            </p>
            <p className="mt-4  text-black">
              We understand the critical nature of security in today’s world,
              which is why our system is engineered for accuracy, speed, and
              reliability. Whether it's for public spaces, corporate facilities,
              transportation hubs, or critical infrastructure, our weapon
              detection technology ensures early warning by continuously
              analyzing video feeds to detect weapons before incidents occur
            </p>

            <div className="mt-6">
              <a
                href="/contact"
                className="bg-red-500 text-white px-8 py-3 rounded-full text-xl hover:bg-red-600"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>




    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-20">
  <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
    {/* Left Section: Text */}
    <div className="w-full md:w-7/12 lg:w-7/12 text-center md:text-left order-2 md:order-1">
      <h2 className="text-4xl font-bold mb-4 text-red-600">
        We Make People <span className="text-red-600">Feel Safe</span>
      </h2>
      <p className="mt-6 text-black text-base">
        We are at the cutting edge of security technology, providing a state-of-the-art weapon detection system that offers real-time alerts to identify potential threats. Our advanced AI-driven solution continuously scans video feeds to detect weapons, allowing security teams to respond instantly to prevent harm before it happens.
      </p>
      <p className="mt-4 text-black">
        In a world where safety is paramount, our system is designed to act quickly and accurately, ensuring that security personnel are always alerted to threats in time. From busy public spaces and corporate offices to transportation terminals and critical infrastructure, our technology enables proactive monitoring and early detection of potential dangers, safeguarding both people and property.
        By providing continuous, real-time surveillance with immediate alerts, we help organizations stay ahead of potential security risks, ensuring a safer environment for all.
      </p>

      <div className="mt-6">
        <a
          href="/contact"
          className="bg-red-500 text-white px-8 py-3 rounded-full text-xl hover:bg-red-600"
        >
          Contact Us
        </a>
      </div>
    </div>

    {/* Right Section: Image */}
    <div className="w-full md:w-6/12 lg:w-6/12 flex justify-center order-1 md:order-2">
      <img
        src="/src/assets/peopless.png" // Replace with your actual image path
        alt="About Us"
        className="w-full object-cover rounded-lg"
      />
    </div>
  </div>
</div>
    </div>




    //     <div>
    //       {/* First Section */}
    //       <section className="relative bg-black text-white py-20 px-10 bg-gradient-to-r from-[#4F2A7F] to-black">
    //   <div className="text-center mb-16 mt-12">
    //     <h2 className="text-4xl font-bold text-red-600">
    //       Get To Know <span className="text-white">Who We Are ?</span>
    //     </h2>
    //     <p className="mt-4 text-lg text-white">
    //      At the forefront of security technology, we specialize in delivering advanced AI-powered weapon detection solutions designed to protect lives and safeguard environments. Our team combines cutting-edge artificial intelligence to provide real-time weapon identification, helping organizations stay proactive in threat detection.
    //     </p>
    //   </div>

    //   {/* Description Section */}
    //   <div className="text-center mt-12 mb-16">
    //     <p className="mt-4 text-lg text-white">
    //      We understand the critical nature of security in today’s world, which is why our system is engineered for accuracy, speed, and reliability. Whether it's for public spaces, corporate facilities, transportation hubs, or critical infrastructure, our weapon detection technology ensures early warning by continuously analyzing video feeds to detect weapons before incidents occur
    //     </p>
    //   </div>

    //   {/* Call to Action Button */}
    //   <div className="text-center">
    //     <a href="#contact" className="py-3 px-6 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
    //       Get In Touch
    //     </a>
    //   </div>

    //   {/* Grid Section for Images */}
    //   <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
    //     {/* First Image */}
    //     <div className="relative">
    //       <img
    //         src="/src/assets/service1.png" // Replace with your actual image path
    //         alt="About Us"
    //         className="w-full object-cover rounded-lg"
    //       />
    //       <div className="absolute inset-0 flex justify-center items-center text-center">
    //         <p className="text-2xl font-bold text-white">Lorem ipsum dolor sit amet</p>
    //       </div>
    //     </div>

    //     {/* Second Image */}
    //     <div className="relative">
    //       <img
    //         src="/src/assets/service2.png" // Replace with your actual image path
    //         alt="About Us"
    //         className="w-full object-cover rounded-lg"
    //       />
    //       <div className="absolute inset-0 flex justify-center items-center text-center">
    //         <p className="text-2xl font-bold text-white">Lorem ipsum dolor sit amet</p>
    //       </div>
    //     </div>

    //     {/* Third Image */}
    //     <div className="relative">
    //       <img
    //         src="/src/assets/service3.png" // Replace with your actual image path
    //         alt="About Us"
    //         className="w-full object-cover rounded-lg"
    //       />
    //       <div className="absolute inset-0 flex justify-center items-center text-center">
    //         <p className="text-2xl font-bold text-white">Lorem ipsum dolor sit amet</p>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    //       {/* Second Section */}
    //       <section className="relative bg-black text-white py-20 px-10 bg-gradient-to-r from-[#4F2A7F] to-black">
    //   {/* Upper Section: Title and Description */}
    //   <div className="text-center mb-16 mt-12">
    //     <h2 className="text-4xl font-bold text-red-600">
    //       We Make People <span className="text-white">Feel Safe</span>
    //     </h2>
    //     <p className="mt-4 text-lg text-white">
    //       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae dolor elit nam ac libero eget purus in. Proin
    //       integer in malesuada in et egestas adipiscing lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    //       Vitae dolor elit nam ac libero eget purus in. Proin integer in malesuada in et egestas adipiscing lacinia.
    //     </p>
    //   </div>

    //   {/* Flex Section with Grid */}
    //   <div className="flex flex-col md:flex-row justify-between mt-12 mb-16">
    //     {/* Left Section - Description */}
    //     <div className="md:w-1/2 text-center mb-12 md:mb-0">
    //       <p className="mt-4 text-lg text-white">
    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae dolor elit nam ac libero eget purus in. Proin
    //         integer in malesuada in et egestas adipiscing lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    //         Vitae dolor elit nam ac libero eget purus in. Proin integer in malesuada in et egestas adipiscing lacinia.
    //       </p>
    //       <div className="text-center mt-10">
    //     <a href="#contact" className="py-3 px-6 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
    //       Contact Us
    //     </a>
    //   </div>
    //     </div>
    //      {/* Call to Action Button */}

    //     {/* Right Section - Grid of Boxes */}
    //     <div className="md:w-1/2 grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 pl-16">
    //   {/* Box 1 */}
    //   <div className="relative bg-gray-800 p-8 rounded-lg shadow-lg text-center hover:scale-105 transition-all duration-300">
    //     <div className="text-red-600 mb-4">
    //       <img
    //         src="/src/assets/About7.png"  // Replace with the actual path to your image
    //         alt="Image 1"
    //         className="w-full h-auto rounded-lg"
    //       />
    //     </div>
    //     <h3 className="text-xl font-semibold">Lorem ipsum dolor sit amet</h3>
    //     <p className="mt-2 text-gray-400">
    //       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae dolor elit nam ac libero eget purus in.
    //     </p>
    //   </div>

    //   {/* Box 2 */}
    //   <div className="relative bg-gray-800 p-8 rounded-lg shadow-lg text-center hover:scale-105 transition-all duration-300">
    //     <div className="text-red-600 mb-4">
    //       <img
    //         src="/src/assets/About8.png"  // Replace with the actual path to your image
    //         alt="Image 2"
    //         className="w-full h-auto rounded-lg"
    //       />
    //     </div>
    //     <h3 className="text-xl font-semibold">Lorem ipsum dolor sit amet</h3>
    //     <p className="mt-2 text-gray-400">
    //       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae dolor elit nam ac libero eget purus in.
    //     </p>
    //   </div>

    //   {/* Box 3 */}
    //   <div className="relative bg-gray-800 p-8 rounded-lg shadow-lg text-center hover:scale-105 transition-all duration-300">
    //     <div className="text-red-600 mb-4">
    //       <img
    //         src="/src/assets/About9.png"  // Replace with the actual path to your image
    //         alt="Image 3"
    //         className="w-full h-auto rounded-lg"
    //       />
    //     </div>
    //     <h3 className="text-xl font-semibold">Lorem ipsum dolor sit amet</h3>
    //     <p className="mt-2 text-gray-400">
    //       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae dolor elit nam ac libero eget purus in.
    //     </p>
    //   </div>
    // </div>

    //   </div>

    // </section>

    //     </div>
  );
}
