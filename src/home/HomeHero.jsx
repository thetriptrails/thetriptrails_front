import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const GOLD_DARK = "#A6832A";
const WHITE = "#FFFFFF";
const TEXT_PRIMARY = "#1A1208";
const TEXT_MUTED = "#9E8A5A";
const DIVIDER = "#EDD98A";

const images = [
  { label: "Goa Beaches", src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600" },
  { label: "Jaipur Palaces", src: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=600" },
  { label: "Kerala Backwaters", src: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=600" },
  { label: "Varanasi Ghats", src: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=80&w=600" },
  { label: "Ladakh Mountains", src: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&q=80&w=600" },
  { label: "Meghalaya Waterfalls", src: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=600" },
  { label: "Taj Mahal", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuu62HakeOCW3P3jq1Z0JVT6ulIPUHluAb7w&s" },
  { label: "Rishikesh Ganga", src: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=600" },
  { label: "Andaman Islands", src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600" },
];

const stats = [
  { value: "4.9★", label: "Google Rating" },
  { value: "10K+", label: "Happy Travelers" },
  { value: "15+", label: "Years Experience" },
];

export default function HomeHero() {
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const els = ref.current?.querySelectorAll("[data-animate]");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(15px)";
      el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 50);
    });
  }, []);

  return (
    <section
      ref={ref}
      style={{ background: WHITE, borderBottom: `1px solid ${DIVIDER}` }}
      className="w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        
        {/* Responsive Grid: Mobile stacked, Tablet/Laptop Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 pt-8 pb-12 md:pt-16 md:pb-24 items-center">

          {/* LEFT CONTENT */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            <h1
              data-animate
              className="text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight mb-4"
              style={{ fontFamily: "'Georgia', serif", color: TEXT_PRIMARY }}
            >
              Experience the<br />
              Soul of <span style={{ color: GOLD }}>India</span>
            </h1>

            <p
              data-animate
              className="text-sm md:text-base leading-relaxed mb-8 max-w-md"
              style={{ color: TEXT_MUTED }}
            >
              From serene beaches and royal palaces to spiritual temples and vibrant cities —
              discover thoughtfully curated journeys across India.
            </p>

            <div
              data-animate
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10 justify-center lg:justify-start"
            >
              <button
                onClick={() => navigate("/packages")}
                className="px-8 py-3.5 text-sm font-bold rounded shadow-lg transition-transform active:scale-95"
                style={{ background: GOLD, color: WHITE }}
              >
                Explore Packages →
              </button>

              <button
                onClick={() => navigate("/about")}
                className="px-8 py-3.5 text-sm font-bold rounded border-2 transition-colors hover:bg-orange-50"
                style={{ borderColor: GOLD, color: GOLD_DARK }}
              >
                Watch Our Story
              </button>
            </div>

            {/* STATS */}
            <div
              data-animate
              className="grid grid-cols-3 gap-2 sm:flex sm:gap-10 pt-6 w-full border-t"
              style={{ borderColor: DIVIDER }}
            >
              {stats.map((s, i) => (
                <div key={s.label} className="flex items-center">
                  <div className="text-center sm:text-left w-full">
                    <p className="text-base sm:text-lg font-bold" style={{ color: GOLD }}>
                      {s.value}
                    </p>
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-tighter sm:tracking-widest mt-0.5" style={{ color: TEXT_MUTED }}>
                      {s.label}
                    </p>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="hidden sm:block h-8 w-px ml-10" style={{ background: DIVIDER }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE GRID: Mobile-Optimized */}
          <div
            data-animate
            className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 order-1 lg:order-2"
          >
            {images.map((img, idx) => (
              <div
                key={img.label}
                className={`group relative aspect-square sm:aspect-[4/3] rounded-lg overflow-hidden shadow-sm 
                  ${idx === 2 ? 'hidden md:block' : ''} /* Mobile par 3rd image hide taki grid clean dikhe */
                `}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-0 right-0 p-1 text-center">
                  <span className="text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider drop-shadow-md">
                    {img.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}