import React, { useState } from "react";

export default function Support() {
  const faqs = [
    {
      q: "WHAT HAPPENS IF RECON DETECTS A WEAPON?",
      a: "Immediate alert with camera location and visual evidence is sent to security personnel.",
    },
    {
      q: "WHAT INFORMATION IS IN THE ALERT?",
      a: "Includes camera location, weapon type, bounding box visual, and timestamp.",
    },
    {
      q: "HOW FAST IS DETECTION?",
      a: "Near real-time, typically within 3-5 seconds of visibility.",
    },
    {
      q: "WHAT WEAPONS CAN IT DETECT?",
      a: "Visible firearms (handguns, rifles) and bladed weapons (knives).",
    },
    {
      q: "CAN IT DETECT CONCEALED WEAPONS?",
      a: "No, only visibly exposed weapons are detectable.",
    },
    {
      q: "WHAT'S THE DETECTION RANGE?",
      a: "Depends on camera quality, optimized for standard security camera distances.",
    },
    {
      q: "WHAT ABOUT NIGHT-TIME DETECTIONS?",
      a: "24/7 monitoring center verifies and escalates all alerts immediately.",
    },
  ];
  const [open, setOpen] = useState(null);
  return (
    <section className="min-h-screen bg-white text-black pt-24 pb-16 px-4">
      <div className="mx-auto max-w-6xl space-y-8">
        <h1 className="text-3xl font-extrabold flex justify-center">Support Center</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-xl backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 text-white border border-white/20 p-5">
            <h2 className="text-lg font-semibold text-black">Set Up Cameras</h2>
            <p className="text-sm text-white/80">Add RTSP/USB streams, ensure stable internet, and correct camera angles.</p>
          </div>
          <div className="rounded-xl backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 text-white border border-white/20 p-5">
            <h2 className="text-lg font-semibold text-black">Improve Accuracy</h2>
            <p className="text-sm text-white/80">Optimize lighting, distance, resolution, and frame rate.</p>
          </div>
          <div className="rounded-xl backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 text-white border border-white/20 p-5">
            <h2 className="text-lg font-semibold text-black">Alerts & Notifications</h2>
            <p className="text-sm text-white/80">Set thresholds, assign users, and enable timely notifications.</p>
          </div>
  <div class="rounded-xl backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 text-white border border-white/20 p-5 ">
    <h2 class="text-lg font-semibold text-black">Accounts & Roles</h2>
    <p class="text-sm text-white/80">Admins manage streams; users access the dashboard with assigned roles.</p>
  </div>
  
  <div class="rounded-xl backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 text-white border border-white/20 p-5 ">
    <h2 class="text-lg font-semibold text-black">Troubleshooting</h2>
    <p class="text-sm text-white/80">No feed? Verify the stream URL. Low detections? Check placement and lighting.</p>
  </div>
    <div class="rounded-xl backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 text-white border border-white/20 p-5 flex-1">
    <h2 class="text-lg font-semibold text-black">Device Compatibility</h2>
    <p class="text-sm text-white/80">Ensure the system is compatible with various devices. Test on different operating systems and hardware setups for optimal user experience.</p>
  </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold tracking-tight flex justify-center mt-24 mb-6">General FAQ'S</h2>
          {faqs.map((item, idx) => (
            <div key={idx} className="border border-gray-300 rounded-md">
              <button
                type="button"
                aria-expanded={open === idx}
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full flex items-center justify-between px-4 py-3 text-left"
              >
                <span className="text-sm font-semibold text-gray-700 tracking-wide">
                  {item.q}
                </span>
                <span
                  className={`transition-transform duration-200 inline-flex items-center justify-center w-6 h-6 border border-gray-400 rounded-sm ${
                    open === idx ? "rotate-180" : "rotate-0"
                  }`}
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 text-gray-600"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>
              {open === idx && (
                <div className="px-4 pb-4 text-sm text-gray-800">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}