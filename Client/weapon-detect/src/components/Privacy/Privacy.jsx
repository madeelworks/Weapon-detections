import React from "react";

export default function Privacy() {
  return (
    <section className="min-h-screen bg-white text-black pt-24 pb-16 px-4">
      <div className="mx-auto max-w-6xl space-y-8">
        <h1 className="text-3xl font-extrabold flex justify-center mt-10 mb-6">Privacy Policy</h1>
        <p className="text-gray-700 flex justify-center mt-10 mb-6">We respect your privacy. Video feeds are processed only for safety and detection purposes.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-xl backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 text-white border border-white/20 p-5">
            <h2 className="text-lg font-semibold text-black">Data Sources</h2>
            <p className="text-sm text-white">Admin-configured camera streams. Optional alert images may be stored when enabled.</p>
          </div>
          <div className="rounded-xl backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 text-white border border-white/20 p-5">
            <h2 className="text-lg font-semibold text-black">Purpose</h2>
            <p className="text-sm text-white">For real-time weapon detection and timely notifications.</p>
          </div>
          <div className="rounded-xl backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 text-white border border-white/20 p-5">
            <h2 className="text-lg font-semibold text-black">Storage & Retention</h2>
            <p className="text-sm text-white">Metadata and images are retained per policy. Retention is configurable by admins.</p>
          </div>
          <div className="rounded-xl backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 text-white border border-white/20 p-5">
            <h2 className="text-lg font-semibold text-black">Access Control</h2>
            <p className="text-sm text-white">Role-based access is provided to authorized users. Logs are kept for audit.</p>
          </div>
          <div className="rounded-xl backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 text-white border border-white/20 p-5">
            <h2 className="text-lg font-semibold text-black">Security Measures</h2>
            <p className="text-sm text-white">Secure transport, limited access, and regular reviews are implemented.</p>
          </div>
          <div className="rounded-xl backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 text-white border border-white/20 p-5">
            <h2 className="text-lg font-semibold text-black">Your Choices</h2>
            <p className="text-sm text-white">Per organization policies, options may include access requests, correction, and deletion.</p>
          </div>
        </div>
      </div>
    </section>
  );
}