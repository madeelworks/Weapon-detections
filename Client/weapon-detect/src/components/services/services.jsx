import React, { Component } from "react";

export class Services extends Component {
  render() {
    return (
      <div>
        <section className=" text-black py-20 px-10 ">
         

          <div id="services" className=" container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                <h2 className="text-4xl font-bold text-red-600">
              How We Provide Our Services
            </h2>
                <p className="mt-6 text-black text-base ">
                  Our weapon detection system uses advanced AI to provide
                  real-time surveillance and instant alerts. 
                </p>
                <p className="mt-4  text-black">
                  Continuous Monitoring: AI-powered video analytics monitor
                  surveillance feeds in real time to detect weapons.<br></br> Instant
                  Threat Detection: The system immediately identifies weapons
                  and sends precise alerts to security teams.<br></br> Real-Time Alerts:
                  Security personnel receive instant notifications with threat
                  details for quick action. <br></br>Seamless Integration: Our solution
                  integrates easily with existing security infrastructure
                  without disruption. <br></br>Scalable Solutions: We offer flexible,
                  scalable systems tailored to any environment, from small
                  businesses to large public spaces.<br></br> Constant Updates: Our
                  system continuously improves through updates to enhance
                  detection accuracy and adapt to new threats.
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




<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-28">
  <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
    {/* Left Section: Text */}
    <div className="w-full md:w-7/12 lg:w-7/12 text-center md:text-left order-2 md:order-1">
      <h2 className="text-4xl font-bold text-red-600">
        Get to Know How it Works
      </h2>
      <p className="mt-6 text-black text-base">
        Our system effectively monitors and detects weapons within the camera's field of view, even in dynamic environments with moving backgrounds, high-traffic areas, and varying conditions. It is fully compatible with mobile and web.
      </p>

      <p className="mt-6 text-black text-base">
        Our system enables accurate weapon detection over long distances, fully leveraging the capabilities of ultra-high-resolution cameras. Our advanced, patented video-optimized object detection algorithm ensures extremely low false-positive rates, even in busy environments like production areas.
      </p>

      <p className="mt-6 text-black text-base">
        Our weapon detection technology can be easily integrated into existing video surveillance setups through one- and two-way I/O protocols, ensuring smooth interoperability with current security systems.
      </p>

      <p className="mt-6 text-black text-base">
        When a weapon is detected, an immediate alert is generated, including a detection frame and a short video clip. This alert is displayed on the native dashboard and integrated monitoring systems. Additionally, the mobile app sends real-time notifications, complete with all relevant information for quick action.
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
    <div className="w-full md:w-8/12 lg:w-8/12 flex justify-center order-1 md:order-2 mt-6">
      <img
        src="/src/assets/work1.jpg"
        alt="React development"
        className="object-contain rounded-xl max-w-xl md:max-w-2xl lg:max-w-2xl"
      />
    </div>
  </div>
</div>


        
        </section>

        {/* section for service types */}
       <section className="text-black py-20 px-12">
  <div className="text-center mb-16">
    <h2 className="text-4xl font-bold text-red-600">
      Take A Look At Services We Provide
    </h2>
    <p className="mt-4 text-lg">
      Recon Eye is AI-based weapon detection systems delivering real-time threat identification and alerts. We offer seamless integration with existing security setups, ensuring proactive protection for public spaces, transportation hubs, and corporate offices. Explore our reliable, scalable solutions to enhance your security with cutting-edge technology.
    </p>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
    <div className="service-item bg-black p-6 rounded-lg shadow-lg text-center flex flex-col justify-between">
      <img
        src="/src/assets/Service4.png"
        alt="Private Investigation Services"
        className="w-20 h-20 object-cover rounded-full mb-4 mx-auto"
      />
      <h3 className="text-xl font-semibold text-red-600">
        Seamless Security Integration
      </h3>
      <p className="text-white mt-2">
        Our weapon detection system integrates effortlessly with existing security infrastructure, enhancing current setups with real-time alerts and detection capabilities.
      </p>
      <a href="/support" className="inline-flex mt-4 bg-red-600 text-white py-2 px-6 rounded-md self-center">
        Know More
      </a>
    </div>
    <div className="service-item bg-black p-6 rounded-lg shadow-lg text-center flex flex-col justify-between">
      <img
        src="/src/assets/Service5.png"
        alt="Personal Investigation Services"
        className="w-20 h-20 object-cover rounded-full mb-4 mx-auto"
      />
      <h3 className="text-xl font-semibold text-red-600">
        Personal Investigation Services
      </h3>
      <p className="text-white mt-2">
        Our system can be used to monitor sensitive areas, detecting potential threats in personal spaces, ensuring security for private affairs, and preventing unauthorized access.
      </p>
      <a href="/support" className="inline-flex mt-4 bg-red-600 text-white py-2 px-6 rounded-md self-center">
        Know More
      </a>
    </div>
    <div className="service-item bg-black p-6 rounded-lg shadow-lg text-center flex flex-col justify-between">
      <img
        src="/src/assets/Service6.png"
        alt="Armed Security Guard"
        className="w-20 h-20 object-cover rounded-full mb-4 mx-auto"
      />
      <h3 className="text-xl font-semibold text-red-600">
        Armed Security Integration
      </h3>
      <p className="text-white mt-2">
        We provide real-time weapon detection to complement armed security personnel, enhancing the safety of your facilities by offering immediate alerts for any detected threats.
      </p>
      <a href="/support" className="inline-flex mt-4 bg-red-600 text-white py-2 px-6 rounded-md self-center">
        Know More
      </a>
    </div>
    <div className="service-item bg-black p-6 rounded-lg shadow-lg text-center flex flex-col justify-between">
      <img
        src="/src/assets/Service7.png"
        alt="Event Security"
        className="w-20 h-20 object-cover rounded-full mb-4 mx-auto"
      />
      <h3 className="text-xl font-semibold text-red-600">
        Event Security
      </h3>
      <p className="text-white mt-2">
        We offer weapon detection services for events of all sizes, ensuring that any potential threats are identified and mitigated before they escalate, providing peace of mind to event organizers and attendees.
      </p>
      <a href="/support" className="inline-flex mt-4 bg-red-600 text-white py-2 px-6 rounded-md self-center">
        Know More
      </a>
    </div>
  </div>
</section>

      </div>
    );
  }
}

export default Services;
