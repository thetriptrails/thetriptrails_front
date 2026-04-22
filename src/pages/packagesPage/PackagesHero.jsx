import { useEffect, useRef } from "react";

const GOLD = "#C9A84C";
const filters = ["All", "Heritage", "Coastal", "Wildlife", "Adventure", "Pilgrimage"];

export default function PackagesHero({ activeFilter, setActiveFilter }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll("[data-animate]");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(15px)";
      el.style.transition = `opacity 0.8s ease-out ${i * 0.1}s, transform 0.8s ease-out ${i * 0.1}s`;
      
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 50);
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-20 pb-12 px-4 md:px-6 overflow-hidden min-h-[550px] md:min-h-[700px] flex items-center justify-center"
    >
      {/* Background with optimized overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://wallpaperaccess.com/full/1315566.jpg" 
          alt="Incredible India Heritage"
          className="w-full h-full object-cover scale-105"
        />
        {/* Darker top for nav visibility, subtle bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/20"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 w-full text-center">
        {/* Headline: Responsive sizes from 3xl to 7xl */}
        <h1
          data-animate
          className="text-3xl md:text-7xl font-medium leading-[1.15] mb-4 text-white tracking-tight"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Discover <span className="italic text-[#D4AF37]">Incredible</span> India
        </h1>

        <p data-animate className="text-white/90 text-sm md:text-lg font-medium mb-10 max-w-md md:max-w-2xl mx-auto px-4 leading-relaxed">
          From the golden peaks of the north to the azure waters of the south—your bespoke journey awaits.
        </p>

        {/* MOBILE SCROLLABLE TRACK: Improved touch-target and spacing */}
        <div
          data-animate
          className="w-full overflow-x-auto overflow-y-hidden snap-x no-scrollbar flex flex-nowrap md:flex-wrap md:justify-center gap-2 md:gap-3 px-2 mb-8"
        >
          {filters.map((f) => {
            const isActive = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`flex-shrink-0 snap-center px-5 py-2.5 rounded-full text-[11px] font-medium uppercase tracking-[0.15em] transition-all duration-300 border
                  ${isActive 
                    ? 'text-white border-transparent shadow-xl scale-105' 
                    : 'text-white/90 border-white/20 bg-black/30 backdrop-blur-md hover:bg-black/50'}`}
                style={isActive ? { background: GOLD } : {}}
              >
                {f}
              </button>
            );
          })}
        </div>
        
        {/* Footer Accent: Tighter spacing */}
        <div data-animate className="flex items-center justify-center gap-4">
          <div className="h-[1px] w-8 bg-white/30"></div>
          <p className="text-[10px] uppercase tracking-[3px] text-white/70 font-medium">
            {activeFilter === "All" ? "Pan-India" : activeFilter} Gateways
          </p>
          <div className="h-[1px] w-8 bg-white/30"></div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}