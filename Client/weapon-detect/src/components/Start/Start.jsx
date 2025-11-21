import React from "react";

export default function Start() {
  return (
    <section className="min-h-screen bg-white text-black pt-24 pb-16 px-4">
      <div className="mx-auto max-w-6xl space-y-8">
        <h1 className="text-3xl font-extrabold flex justify-center mt-10 mb-6">How to Start</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-xl backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 text-white border border-white/20 p-5">
            <h2 className="text-lg  text-black font-semibold">Step 1: Install</h2>
            <p className="text-sm text-white">Mount cameras, keep power and network stable. Prepare RTSP or USB streams.</p>
          </div>
          <div className="rounded-xl backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 text-white border border-white/20 p-5">
            <h2 className="text-lg text-black  font-semibold">Step 2: Configure</h2>
            <p className="text-sm text-white">Add stream URLs in the dashboard, verify live preview, and select zones.</p>
          </div>
          
          <div className="rounded-xl backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 text-white border border-white/20 p-5">
            <h2 className="text-lg text-black  font-semibold">Step 4: Alerts</h2>
            <p className="text-sm text-white">Assign users, configure notifications, and generate test alerts.</p>
          </div>
          <div className="rounded-xl backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 text-white border border-white/20 p-5">
            <h2 className="text-lg  text-black  font-semibold">Step 5: Monitor</h2>
            <p className="text-sm text-white">Monitor detections, review history, and refine camera placement.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-xl backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 text-white border border-white/20 p-5">
            <h2 className="text-lg text-black  font-semibold">Hardware & Camera Tips</h2>
            <ul className="list-disc list-inside text-sm text-white space-y-1">
              <li>Resolution 1080p or higher.</li>
              <li>FPS 20–30; minimize motion blur.</li>
              <li>Keep lighting consistent; reduce shadows.</li>
              <li>Camera angle should focus on the subject’s front/side.</li>
            </ul>
          </div>
          <div className="rounded-xl backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 text-white border border-white/20 p-5">
            <h2 className="text-lg text-black  font-semibold">Safety & Compliance</h2>
            <ul className="list-disc list-inside text-sm text-white space-y-1">
              <li>Follow local laws and privacy requirements.</li>
              <li>Monitor only authorized areas.</li>
              <li>Train staff on alert response procedures.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}