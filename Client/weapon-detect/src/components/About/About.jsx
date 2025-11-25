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
        src="/src/assets/Adeel1.png" // Replace with your actual image path
        alt="About Us"
        className="w-full object-cover "
      />
    </div>
  </div>
</div>
    </div>
  );
}
