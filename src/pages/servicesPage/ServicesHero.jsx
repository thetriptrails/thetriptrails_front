import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const TEXT_DARK = "#1A1208";
const IMG_MAIN = "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200";

export default function ServicesHero() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll("[data-animate]");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px) scale(0.98)";
      el.style.transition = `all 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0) scale(1)";
      }, 100);
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white pt-0 pb-6 md:pb-10 px-4 md:px-12 overflow-hidden" // Spacing removed (pt-0)
    >
      {/* Background Watermark */}
      <div className="absolute top-0 right-0 text-[25vw] md:text-[20vw] font-serif italic text-gray-50 opacity-40 select-none pointer-events-none leading-none -mr-10 -mt-10">
        Gold
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-center">
        
        {/* RIGHT: Visual (Mobile-first order) */}
        <div data-animate className="lg:col-span-7 order-1 lg:order-2 relative px-2 pt-6 lg:pt-10">
          <div className="relative group">
            <div className="aspect-[4/3] md:aspect-video overflow-hidden rounded-sm border border-gray-50 shadow-sm">
              <img
                src={IMG_MAIN}
                alt="Premium View"
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
              />
            </div>

            <div className="absolute -bottom-4 -left-2 md:-bottom-6 md:-left-10 bg-white/90 backdrop-blur-md p-4 md:p-6 border border-white shadow-xl z-30 max-w-[180px] md:max-w-[220px]">
              <div className="text-[8px] md:text-[9px] uppercase tracking-widest text-[#C9A84C] font-bold mb-1 md:mb-2">Heritage</div>
              <p className="text-[10px] md:text-[11px] leading-tight text-gray-600 italic">
                "A journey that redefines the meaning of peaks."
              </p>
            </div>

            <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 border-t border-r -mt-2 -mr-2" style={{ borderColor: GOLD }}></div>
          </div>
        </div>

        {/* LEFT: Text Content */}
        <div className="lg:col-span-5 z-20 order-2 lg:order-1 flex flex-col items-start pt-4 lg:pt-10">
          <h1
            data-animate
            className="text-3xl sm:text-6xl md:text-7xl lg:text-[5rem] font-serif leading-tight tracking-tighter mb-4 whitespace-nowrap"
            style={{ color: TEXT_DARK }}
          >
            Timeless <span style={{ color: GOLD }} className="italic font-light">India.</span>
          </h1>

          <p
            data-animate
            className="text-sm md:text-base text-gray-500 font-light max-w-sm leading-relaxed mb-6 border-l-2 border-gray-100 pl-6"
          >
            <span className="text-lg md:text-xl text-black font-semibold block mb-2">
              Refined luxury for the modern explorer.
            </span>
            Discover India through a lens of curated excellence — from royal palaces to spiritual retreats, where every journey is crafted to perfection.
          </p>
        </div>

      </div>
    </section>
  );
}