import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const TEXT_DARK = "#1A1A1A";

const BLOG_HERO_IMG = "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=1200&auto=format&fit=crop";

export default function BlogHero({ activeFilter, setActiveFilter }) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const filters = ["All", "Pilgrimage", "Adventure", "Tips & Guides", "Hill Stations"];

  useEffect(() => {
    const els = ref.current?.querySelectorAll("[data-animate]");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = `all 0.8s cubic-bezier(0.2, 1, 0.3, 1) ${i * 0.1}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 100);
    });
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full bg-white pt-12 pb-10 px-6 md:px-16 lg:px-24 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Content (7 Columns) */}
        <div className="lg:col-span-7 z-10">
          <div data-animate className="flex items-center gap-3 mb-6">
            <span className="text-[10px] tracking-[4px] uppercase font-bold" style={{ color: GOLD }}>
              The Journal
            </span>
            <div className="h-px w-12" style={{ background: GOLD }}></div>
          </div>

          <h1
            data-animate
            className="text-5xl md:text-7xl font-bold leading-tight mb-6"
            style={{ fontFamily: "'Georgia', serif", color: TEXT_DARK }}
          >
            Stories from the <br />
            <span className="italic font-light" style={{ color: GOLD }}>Golden Land</span>
          </h1>

          <p
            data-animate
            className="text-base md:text-lg text-gray-500 max-w-xl mb-10 leading-relaxed"
          >
            Expertly curated guides, spiritual insights, and hidden Himalayan 
            tales—crafted for the conscious traveler.
          </p>

          {/* Luxury Filter Bar - More Compact & Integrated */}
          <div 
            data-animate
            className="flex flex-wrap gap-3"
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border"
                style={
                  activeFilter === f
                    ? { background: GOLD, color: "#FFF", borderColor: GOLD, boxShadow: `0 10px 20px -5px rgba(201, 168, 76, 0.3)` }
                    : { background: "transparent", color: "#888", borderColor: "#EEE" }
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Editorial Image Card (5 Columns) */}
        <div data-animate className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-4/3 group">
            <img 
              src={BLOG_HERO_IMG} 
              alt="Himalayas" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
            />
            {/* Elegant Golden Border Overlay */}
            <div className="absolute inset-4 border border-white/30 rounded-xl pointer-events-none"></div>
          </div>
          
          {/* Floating Gold Element */}
          <div 
            className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full flex items-center justify-center border-4 border-white shadow-xl z-20"
            style={{ background: GOLD }}
          >
             <span className="text-white text-[10px] font-bold uppercase tracking-widest rotate-12">Newest</span>
          </div>
        </div>

      </div>

      {/* Compact Breadcrumb at the very bottom left */}
      <div data-animate className="max-w-7xl mx-auto mt-12 flex items-center gap-2 text-[9px] uppercase tracking-[2px] text-gray-400">
         <span className="hover:text-gold cursor-pointer" onClick={() => navigate("/")}>Home</span>
         <span style={{ color: GOLD }}>/</span>
         <span style={{ color: GOLD }} className="font-bold">Journal</span>
      </div>
    </section>
  );
}