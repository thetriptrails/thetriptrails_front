import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home",        href: "/"             },
  { label: "About",       href: "about"         },
  { label: "Services",    href: "services"      },
  { label: "Destination", href: "destinations"  },
  { label: "Packages",    href: "packages"      },
  { label: "Blog",        href: "blog"          },
  { label: "Contact",     href: "contact"       },
];

const BRAND_GOLD = "#BFA13B";
const BRAND_DARK = "#8e7421";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const [active, setActive] = useState(() => {
    // Check if window is defined (for SSR safety)
    if (typeof window !== "undefined") {
      const path = window.location.pathname.replace("/", "");
      const currentLink = NAV_LINKS.find(link => link.href === (path || "/"));
      return currentLink ? currentLink.label : "Home";
    }
    return "Home";
  });

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.replace("/", "");
      const currentLink = NAV_LINKS.find(link => link.href === (path || "/"));
      if (currentLink) setActive(currentLink.label);
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div
          className="h-0.5 w-full"
          style={{ background: `linear-gradient(to right, transparent, ${BRAND_GOLD}, ${BRAND_DARK}, ${BRAND_GOLD}, transparent)` }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <a href="/" className="flex items-center shrink-0 group" onClick={() => setActive("Home")}>
              <img
                src="/Logo.svg"
                alt="Logo"
                className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            {/* Desktop Links */}
            <ul className="hidden lg:flex items-center gap-1" role="list">
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = active === label;
                return (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={() => setActive(label)}
                      className="relative px-4 py-2 text-sm font-bold tracking-wide rounded-lg transition-all duration-200 group flex items-center gap-1"
                      style={{ color: isActive ? BRAND_GOLD : "#ffffff" }}
                    >
                      <span className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="relative">{label}</span>
                      {isActive && (
                        <span className="relative w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: BRAND_GOLD }} />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Desktop Booking Button */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="/booking"
                className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-bold shadow-lg hover:shadow-[0_0_20px_rgba(191,161,59,0.4)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 overflow-hidden group border border-white/20"
                style={{ background: `linear-gradient(135deg, ${BRAND_GOLD}, ${BRAND_DARK})` }}
              >
                <span className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10 font-bold">Book Now</span>
                <svg className="relative z-10 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Toggle Menu"
            >
              <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="bg-black/95 backdrop-blur-2xl border-t border-white/10 px-4 py-8 shadow-2xl">
            <ul className="space-y-2 mb-8" role="list">
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = active === label;
                return (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={() => { setActive(label); setMenuOpen(false); }}
                      className="flex items-center justify-between px-6 py-4 rounded-2xl text-lg font-bold transition-all border border-transparent"
                      style={{ 
                        color: isActive ? BRAND_GOLD : "#ffffff", 
                        backgroundColor: isActive ? "rgba(191,161,59,0.15)" : "transparent",
                        borderColor: isActive ? "rgba(191,161,59,0.3)" : "transparent"
                      }}
                    >
                      <span>{label}</span>
                      {isActive && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND_GOLD }} />}
                    </a>
                  </li>
                );
              })}
            </ul>
            <a
              href="/booking"
              className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl text-white text-lg font-black shadow-2xl active:scale-[0.98] transition-all border border-white/10"
              style={{ background: `linear-gradient(to right, ${BRAND_GOLD}, ${BRAND_DARK})` }}
              onClick={() => setMenuOpen(false)}
            >
              Book Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16 md:h-20" />
    </>
  );
}