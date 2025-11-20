import React from "react";

export default function Privacy() {
  return (
    <section className="min-h-screen bg-white text-black pt-24 pb-16 px-4">
      <div className="mx-auto max-w-6xl space-y-8">
        <h1 className="text-3xl font-extrabold">Privacy Policy</h1>
        <p className="text-gray-700">We respect your privacy. Video feeds are processed only for safety and detection purposes.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold">Data Sources</h2>
            <p className="text-sm text-gray-700">Admin-configured camera streams. Optional alert images may be stored when enabled.</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold">Purpose</h2>
            <p className="text-sm text-gray-700">For real-time weapon detection and timely notifications.</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold">Storage & Retention</h2>
            <p className="text-sm text-gray-700">Metadata and images are retained per policy. Retention is configurable by admins.</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold">Access Control</h2>
            <p className="text-sm text-gray-700">Role-based access is provided to authorized users. Logs are kept for audit.</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold">Security Measures</h2>
            <p className="text-sm text-gray-700">Secure transport, limited access, and regular reviews are implemented.</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold">Your Choices</h2>
            <p className="text-sm text-gray-700">Per organization policies, options may include access requests, correction, and deletion.</p>
          </div>
        </div>
      </div>
    </section>
  );
}