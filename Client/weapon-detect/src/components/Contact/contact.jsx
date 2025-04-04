import React from 'react';

export default function Contact() {
  return (
    <div className="relative flex items-top justify-center min-h-[700px] bg-gradient-to-r from-[#482566]   to-black sm:items-center sm:pt-0">
      <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
        
        {/* Title and Description Section */}
        <div className="text-center mb-16 mt-12">
          <h2 className="text-4xl font-bold text-red-600">
            How to <span className="text-white">Contact Us</span>
          </h2>
          <p className="mt-4 text-lg text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae dolor elit nam ac libero eget purus in.
            Proin integer in malesuada in et egestas adipiscing lacinia. Accumsan molestie enim, risus, at et.
          </p>
        </div>

        {/* Main Content Section */}
        <div className="mt-8 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {/* Left Column - Contact Info */}
            <div className="p-6 bg-gradient-to-r from-[#4F2A7F] to-black sm:rounded-lg">
              <h1 className="text-3xl sm:text-4xl text-white font-extrabold tracking-tight">
                Get in touch:
              </h1>
              <p className="text-lg sm:text-xl font-medium text-gray-300 mt-2">
                Fill in the form to start a conversation
              </p>

              <div className="flex items-center mt-8 text-gray-300">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-red-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div className="ml-4 text-md tracking-wide font-semibold">
                  Islamabad, G-10/4 , 4000
                </div>
              </div>

              <div className="flex items-center mt-4 text-gray-300">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-red-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div className="ml-4 text-md tracking-wide font-semibold">
                  +92 1234567890
                </div>
              </div>

              <div className="flex items-center mt-2 text-gray-300">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-red-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div className="ml-4 text-md tracking-wide font-semibold">
                  adeel.techpro@gmail.com
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="flex justify-center">
              <form className="bg-gray-800 p-8 rounded-lg w-full max-w-lg">
                <div className="mb-4">
                  <label htmlFor="name" className="text-gray-400">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 mt-2 bg-black text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Your Name"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="text-gray-400">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 mt-2 bg-black text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Your Email"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="subject" className="text-gray-400">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full p-3 mt-2 bg-black text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Subject"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="text-gray-400">Message</label>
                  <textarea
                    id="message"
                    className="w-full p-3 mt-2 bg-black text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
                    rows="5"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 mt-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
