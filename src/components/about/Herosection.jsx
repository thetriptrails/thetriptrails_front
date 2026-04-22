import { useEffect, useRef } from "react";

const GOLD = "#C9A84C";
const TEXT_MAIN = "#1A1A1A"; 

export default function HeroSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll("[data-animate]");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(10px)";
      el.style.transition = `all 0.6s ease-out ${i * 0.08}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 50);
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white px-4 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
        
        {/* RIGHT CONTENT - Image Section (Mobile First) */}
        <div data-animate className="lg:col-span-6 relative mt-4 lg:mt-0 order-1 lg:order-2 lg:py-6">
          <div className="relative p-1 border border-gray-100">
            {/* IMAGE */}
            <div className="relative aspect-video lg:aspect-[16/10] w-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200" 
                alt="India Travel" 
                className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000"
              />
            </div>
            {/* GOLD CORNER */}
            <div 
              className="absolute -top-1 -right-1 w-6 h-6 lg:w-10 lg:h-10 border-t-2 border-r-2" 
              style={{ borderColor: GOLD }}
            ></div>
          </div>

          {/* FLOATING RATING - Smaller on mobile */}
          <div className="absolute -bottom-2 right-4 lg:bottom-10 lg:right-4 bg-white p-2 lg:p-4 shadow-xl border border-gray-50 z-20">
            <div className="text-[6px] lg:text-[8px] uppercase tracking-widest text-gray-400 mb-0.5">
              Rating
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg lg:text-2xl font-serif italic" style={{ color: TEXT_MAIN }}>
                4.9
              </span>
              <span className="text-[8px] lg:text-[10px]" style={{ color: GOLD }}>
                ★★★★★
              </span>
            </div>
          </div>
        </div>

        {/* LEFT CONTENT - Text Section */}
        <div className="lg:col-span-6 z-10 pt-2 pb-8 lg:py-12 order-2 lg:order-1">
          <h1
            data-animate
            className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif leading-[1.1] mb-3 lg:mb-5 tracking-tighter"
            style={{ color: TEXT_MAIN }}
          >
            Discover <br className="hidden lg:block" /> 
            <span style={{ color: GOLD }}>Incredible India.</span>
          </h1>

          <p
            data-animate
            className="text-[11px] sm:text-sm lg:text-[15px] leading-relaxed mb-6 lg:mb-8 max-w-sm lg:max-w-md text-gray-500 font-light"
          >
            From royal palaces of Rajasthan and serene Kerala backwaters 
            to Himalayan adventures and sacred spiritual journeys — 
            explore India through curated luxury experiences.
          </p>

          {/* STATS - Scaled down for laptop elegance */}
          <div data-animate className="flex gap-6 lg:gap-10 border-t border-gray-100 pt-5">
            {[
              { v: "15Y+", l: "Experience" },
              { v: "50+", l: "Destinations" },
              { v: "10K+", l: "Travelers" }
            ].map((s, i) => (
              <div key={i}>
                <div className="text-sm lg:text-lg font-medium" style={{ color: TEXT_MAIN }}>{s.v}</div>
                <div className="text-[7px] lg:text-[9px] uppercase tracking-widest text-gray-400 font-bold">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}