import React from "react";

export default function Terms() {
  return (
    <section className="min-h-screen bg-white text-black pt-24 pb-16 px-4">
      <div className="mx-auto max-w-6xl space-y-8">
        <h1 className="text-3xl font-extrabold flex justify-center mt-10 mb-6">Terms Of Use</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
          <div className="rounded-xl backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 text-white border border-white/20 p-5">
            <h2 className="text-lg font-semibold text-black">Acceptable Use</h2>
            <p className="text-sm text-white">Use ReconEye only for lawful safety monitoring. Unauthorized surveillance is prohibited.</p>
          </div>
          <div className="rounded-xl backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 text-white border border-white/20 p-5">
            <h2 className="text-lg font-semibold text-black">Responsibilities</h2>
            <p className="text-sm text-white">Maintain camera compliance, inform stakeholders, and handle alerts responsibly.</p>
          </div>
         
          <div className="rounded-xl backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 text-white border border-white/20 p-5">
            <h2 className="text-lg font-semibold text-black">Liability</h2>
            <p className="text-sm text-white">Security Personnel control alerts and responses. Decisions should rely on professional judgment.</p>
          </div>
          <div className="rounded-xl backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 text-white border border-white/20 p-5">
            <h2 className="text-lg font-semibold text-black">Changes</h2>
            <p className="text-sm text-white">Terms may be updated. Continued use indicates acceptance of the latest terms.</p>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 items-center gap-8 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60">
          <div className="flex justify-center">
            <img
              src="/src/assets/logo.png"
              alt="ReconEye AI"
              className="w-42 h-44 object-cover  shadow"
            />
          </div>
          <div className="text-center md:text-left ">
         
            <h2 className="text-2xl font-extrabold">Ready For More Information?</h2>
            <p className="text-sm text-gray-700">Add ReconEye’s proactive weapon detection to protect your patrons.</p>
            <a
              href="/contact"
              className="inline-flex items-center bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold mt-4"
            >
              Schedule a Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}