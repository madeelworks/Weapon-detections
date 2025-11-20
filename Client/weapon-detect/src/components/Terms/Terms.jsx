import React from "react";

export default function Terms() {
  return (
    <section className="min-h-screen bg-white text-black pt-24 pb-16 px-4">
      <div className="mx-auto max-w-6xl space-y-8">
        <h1 className="text-3xl font-extrabold">Terms Of Use</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold">Acceptable Use</h2>
            <p className="text-sm text-gray-700">Use ReconEye only for lawful safety monitoring. Unauthorized surveillance is prohibited.</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold">Responsibilities</h2>
            <p className="text-sm text-gray-700">Maintain camera compliance, inform stakeholders, and handle alerts responsibly.</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold">Reliability</h2>
            <p className="text-sm text-gray-700">AI detections assist security teams; they are not guarantees. Human review may be required.</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold">Liability</h2>
            <p className="text-sm text-gray-700">Admins control alerts and responses. Decisions should rely on professional judgment.</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold">Changes</h2>
            <p className="text-sm text-gray-700">Terms may be updated. Continued use indicates acceptance of the latest terms.</p>
          </div>
        </div>
      </div>
    </section>
  );
}