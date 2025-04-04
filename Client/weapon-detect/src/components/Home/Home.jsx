import React from 'react';

const Home = () => {
  return (
    <div>
      <section 
        className="relative w-full h-screen bg-cover bg-center flex flex-col justify-center"
        style={{ 
          backgroundImage: "url('/src/assets/Home1.jpg')", // Using the image from the assets folder
          backgroundSize: 'cover',   // Ensures image covers the whole section
          backgroundPosition: 'center', // Centers the image
        }}
      >
        {/* Overlay (darkens the background image for readability) */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
        
        <div className="relative z-10 text-left text-white px-8 py-4 h-1/2">
  <h1 className="text-5xl font-bold mb-4">Private Investigation Services</h1>
  <p className="text-lg mb-6">
    We are experts in helping you find a solution to your problem. Our team includes <br></br> male & female investigators possessing many years of experience. There are very <br></br>few situations that we haven’t seen before, and more importantly, whatever your <br></br> circumstances we are here to understand your situation.
  </p>

  <a
    href="/contact"
    className="bg-red-500 text-white px-8 py-3 rounded-full text-xl hover:bg-red-600"
  >
    Contact Us
  </a>
</div>


      </section>
    </div>
  );
};

export default Home;
