import React, { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/src/assets/logo.png" alt="Recon Eye" className="w-10 h-10" />
            <span className="text-white font-extrabold tracking-wide text-lg">
              Recon <span className="text-red-500">Eye</span>
            </span>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { href: "/", label: "Home" },
              { href: "#about", label: "About" },
              { href: "#services", label: "Services" },
              { href: "/blog", label: "Blog" },
              { href: "#contact", label: "Contact" },
              { href: "/Login", label: "Login" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-white/90 hover:text-white transition relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-red-500 hover:after:w-full after:transition-all"
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://play.google.com/store/apps/details?id=com.kiloo.subwaysurf&hl=en"
              className="ml-2 inline-flex items-center bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
            >
              Download App
            </a>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-3 grid gap-3">
            {[
              { href: "/", label: "Home" },
              { href: "#about", label: "About" },
              { href: "#services", label: "Services" },
              { href: "/blog", label: "Blog" },
              { href: "#contact", label: "Contact" },
              { href: "/Login", label: "Login" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-white/90 hover:text-white py-2"
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://play.google.com/store/apps/details?id=com.kiloo.subwaysurf&hl=en"
              onClick={() => setIsOpen(false)}
              className="inline-flex justify-center items-center bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
            >
              Download App
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
