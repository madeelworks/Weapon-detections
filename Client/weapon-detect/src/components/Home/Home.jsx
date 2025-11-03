import React from 'react';

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background video + overlay */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover -z-10">
        <source src="/src/assets/weapon.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 -z-10" />

      {/* Hero */}
      <div className="mx-auto max-w-7xl px-4 pt-28 pb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              AI-Powered <span className="text-red-500">Weapon Detection</span>
            </h1>
            <p className="mt-5 text-white/80 text-base">
              Real-time detection from live feeds to protect people and spaces. High accuracy, low latency, and instant awareness.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#contact" className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-full font-semibold transition">
                Get a demo
              </a>
              <a href="#about" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-semibold transition">
                Learn more
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <img src="/src/assets/weapons-1.png" alt="Weapon detection" className="w-full max-w-xl rounded-xl shadow-2xl ring-1 ring-white/10" />
          </div>
        </div>
      </div>

      {/* Feature highlights */}
      <div className="bg-black/70 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Real-time analytics', desc: 'Process frames on the edge or the server and surface instant alerts.' },
            { title: 'High accuracy', desc: 'Powered by YOLO models tuned for weapon classes with confidence scoring.' },
            { title: 'Easy integration', desc: 'Stream from webcams, RTSP, or files and render overlays in your app.' },
          ].map((f) => (
            <div key={f.title} className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5 text-white">
              <div className="text-red-500 font-semibold">{f.title}</div>
              <div className="text-sm text-white/80 mt-2">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
