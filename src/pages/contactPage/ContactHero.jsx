import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";

const GOLD = "#C9A84C";

export default function ContactHero() {
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const els = ref.current?.querySelectorAll("[data-animate]");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(15px)";
      el.style.transition = `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 50);
    });
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[60vh] flex items-center px-4 md:px-12 py-12 md:py-16 overflow-hidden bg-black"
    >
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop" 
          alt="Himalayan Mist"
          className="w-full h-full object-cover opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side: Editorial Content */}
          <div className="space-y-6">
            <div data-animate>
              <h1
                className="text-5xl md:text-8xl font-light leading-[0.9] text-white tracking-tighter"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Begin Your <br />
                <span className="italic font-normal text-[#D4AF37]">Odyssey.</span>
              </h1>
            </div>

            <p
              data-animate
              className="text-sm md:text-lg text-white/60 max-w-md leading-relaxed font-light"
            >
              Beyond the maps and the trails lies a story waiting to be written. 
              Our specialists are ready to curate your <span className="text-white italic">private escape</span> into the wild.
            </p>

            <div data-animate className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-3 bg-[#D4AF37] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-black transition-all active:scale-95 flex items-center gap-2">
                Talk to an Expert <MessageCircle size={14} />
              </button>
            </div>
          </div>

          {/* Right Side: Visual Accent Card */}
          <div data-animate className="hidden lg:flex justify-end relative">
            <div className="w-72 h-96 rounded-2xl border border-white/10 overflow-hidden relative group shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700"
                alt="Portrait"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[3px] mb-1">Local Wisdom</p>
                <p className="text-white text-xs italic">"We don't just show you the path; we show you the soul of the mountains."</p>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -top-6 -right-6 w-32 h-32 border border-[#D4AF37]/20 rounded-full animate-pulse"></div>
          </div>

        </div>
      </div>

      {/* Vertical Side Text */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:block">
        <span className="text-[10px] uppercase tracking-[1em] text-white/10 font-bold rotate-90 block whitespace-nowrap">
          ESTABLISHED 2010
        </span>
      </div>
    </section>
  );
}