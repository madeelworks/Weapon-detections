import React, { Component } from 'react';

export class Services extends Component {
  render() {
    return (
      <div>
        <section className=" text-black py-20 px-10 ">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-red-600">
              How We Provide Our Services
            </h2>
            <p className="mt-4 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae dolor elit nam ac libero eget purus in. Proin integer in malesuada in et egestas adipiscing lacinia.
            </p>
          </div>


<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
          {/* Left Section: Image */}
         <div className="w-full md:w-6/12 lg:w-6/12 flex justify-center">
  <img
    src="/src/assets/Artificials-1.jpg"
    alt="React development"
    className="object-contain rounded-xl max-w-xs "
  />
</div>

          {/* Right Section: Text */}
          <div className="w-full md:w-7/12 lg:w-7/12 text-center md:text-left">
            <h2 className="text-4xl font-bold mb-4 text-red-600">
              Get To Know Who We Are ?
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







          
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="service-item bg-gray-800 p-6 rounded-lg shadow-lg">
              <img
                src="/src/assets/Service1.png"
                alt="Effective"
                className="w-full h-58 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-red-600">Effective</h3>
              <p className="text-gray-400 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae dolor elit nam ac libero eget purus in. Proin integer in malesuada in et egestas adipiscing lacinia.
              </p>
            </div>
            <div className="service-item bg-gray-800 p-6 rounded-lg shadow-lg">
              <img
                src="/src/assets/Service2.png"
                alt="Professional"
                className="w-full h-58 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-red-600">Professional</h3>
              <p className="text-gray-400 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae dolor elit nam ac libero eget purus in. Proin integer in malesuada in et egestas adipiscing lacinia.
              </p>
            </div>
            <div className="service-item bg-gray-800 p-6 rounded-lg shadow-lg">
              <img
                src="/src/assets/Service3.png"
                alt="Diverse"
                className="w-full h-58 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-red-600">Diverse</h3>
              <p className="text-gray-400 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae dolor elit nam ac libero eget purus in. Proin integer in malesuada in et egestas adipiscing lacinia.
              </p>
            </div>
          </div> */}
        </section>

        {/* section for service types */}
        <section className=" text-black py-20 px-10 ">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-red-600">
              Take A Look At Services We Provide
            </h2>
            <p className="mt-4 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae dolor elit nam ac libero eget purus in. Proin integer in malesuada in et egestas adipiscing lacinia.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="service-item bg-gradient-to-r from-[#4F2A7F] to-black p-6 rounded-lg shadow-lg text-center">
              <img
                src="/src/assets/Service4.png" 
                alt="Private Investigation Services"
                className="w-20 h-20 object-cover rounded-full mb-4 mx-auto"
              />
              <h3 className="text-xl font-semibold text-red-600">Private Investigation Services</h3>
              <p className="text-white mt-2">
                We can help you find legal and efficient solutions to your problems using expert private investigators.
              </p>
              <button className="mt-4 bg-red-600 text-white py-2 px-6 rounded-md">Know More</button>
            </div>
            <div className="service-item bg-gradient-to-r from-[#4F2A7F] to-black p-6 rounded-lg shadow-lg text-center">
              <img
                src="/src/assets/Service5.png" 
                alt="Personal Investigation Services"
                className="w-20 h-20 object-cover rounded-full mb-4 mx-auto"
              />
              <h3 className="text-xl font-semibold text-red-600">Personal Investigation Services</h3>
              <p className="text-white mt-2">
                Personal affairs, missing family members, and matrimonial investigations. Affordable and legal.
              </p>
              <button className="mt-4 bg-red-600 text-white py-2 px-6 rounded-md">Know More</button>
            </div>
            <div className="service-item bg-gradient-to-r from-[#4F2A7F] to-black p-6 rounded-lg shadow-lg text-center">
              <img
                src="/src/assets/Service6.png" 
                alt="Armed Security Guard"
                className="w-20 h-20 object-cover rounded-full mb-4 mx-auto"
              />
              <h3 className="text-xl font-semibold text-red-600">Armed Security Guard</h3>
              <p className="text-white mt-2">
                We assess each client’s security needs and match skilled professional security officers to accommodate their requirements.
              </p>
              <button className="mt-4 bg-red-600 text-white py-2 px-6 rounded-md">Know More</button>
            </div>
            <div className="service-item bg-gradient-to-r from-[#4F2A7F] to-black p-6 rounded-lg shadow-lg text-center">
              <img
                src="/src/assets/Service7.png" 
                alt="Event Security"
                className="w-20 h-20 object-cover rounded-full mb-4 mx-auto"
              />
              <h3 className="text-xl font-semibold text-red-600">Event Security</h3>
              <p className="text-white mt-2">
                NSG Security Services have operated event security services at events and venues from small to large scale.
              </p>
              <button className="mt-4 bg-red-600 text-white py-2 px-6 rounded-md">Know More</button>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Services;
