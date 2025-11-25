import React from "react";

const posts = [
  {
    title: "Are CCTV Cameras Enough to Keep Us Safe?",
    href: "https://medium.com/@adeel.techpro/are-cctv-cameras-enough-to-keep-us-safe-20845a763c9c",
    image: "/src/assets/blog11.png",
    excerpt: "Explores the limits of traditional CCTV and why smart analytics are essential for proactive safety.",
  },
  {
    title: "Doing More With Less: How AI Reduces Security Costs",
    href: "https://medium.com/@adeel.techpro/doing-more-with-less-how-ai-reduces-security-costs-e97a85435293",
    image: "/src/assets/blog12.png",
    excerpt: "How AI automation lowers monitoring overhead while improving detection accuracy and response times.",
  },
  {
    title: "ReconEye: Indoor vs Outdoor Camera Deployment",
    href: "https://medium.com/@adeel.techpro/reconeye-optimizing-security-a-guide-to-indoor-vs-outdoor-camera-deployment-e3574fc7e752",
    image: "/src/assets/blog22.png",
    excerpt: "A practical guide for choosing the right camera setup for indoor and outdoor environments.",
  },
  {
    title: "ReconEye: AI-Powered Weapon Detection",
    href: "https://medium.com/@adeel.techpro/reconeye-ai-powered-weapon-detection-for-a-safer-tomorrow-365862fe6d50",
    image: "/src/assets/blog14.png",
    excerpt: "An overview of ReconEye’s AI-powered solution that detects weapons in real time across video feeds.",
  },
  {
    title: "AI-Based Weapon Detection Transforming Surveillance",
    href: "https://medium.com/@adeel.techpro/revolusionizing-security-how-ai-based-weapon-detection-is-transforming-surveillance-systems-462fd7df6386",
    image: "/src/assets/blog15.png",
    excerpt: "Why modern surveillance relies on intelligent models to identify threats faster and more reliably.",
  },
  {
    title: "The Silent Guardian: Reinventing Public Safety",
    href: "https://medium.com/@adeel.techpro/the-silent-guardian-how-ai-is-reinventing-public-safety-ai-based-weapon-detection-system-af20a11abda6",
    image: "/src/assets/blog16.png",
    excerpt: "How AI quietly safeguards public spaces by monitoring risk and alerting security teams in time.",
  },
];

export default function Blog() {
  return (
    <section className="min-h-screen bg-white text-black pt-24 pb-16 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight">ReconEye Blog</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="group rounded-xl bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition flex flex-col h-full"
            >
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="p-4 flex flex-col gap-2 flex-1">
                <h2 className="text-base font-semibold leading-tight text-gray-900">{post.title}</h2>
                <p className="text-xs text-gray-700 min-h-16">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-1 mt-auto">
                  <a
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Read more: ${post.title}`}
                    className="inline-flex items-center bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold transition"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}