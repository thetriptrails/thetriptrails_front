import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const GOLD_DARK = "#A6832A";
const TEXT_DARK = "#2D2D2D";
const WHITE = "#FFFFFF";

export default function HomeCTA() {
  const navigate = useNavigate();

  return (
    <section
      className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-24 text-center relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DARK} 100%)` 
      }}
    >
      {/* Optional: Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} 
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <span
          className="text-xs tracking-[4px] uppercase font-bold block mb-6"
          style={{ color: WHITE }}
        >
          Start Your Journey
        </span>

        <h2
          className="text-4xl md:text-6xl font-semibold leading-tight mb-6"
          style={{ fontFamily: "'Georgia', serif", color: WHITE }}
        >
          Your Dream Trip is
          <br />
          <span className="italic">One Click Away</span>
        </h2>

        <p
          className="text-base font-medium leading-relaxed mb-12"
          style={{ color: "rgba(255, 255, 255, 0.9)" }}
        >
          Call us today for a free consultation — no obligations, just expert advice.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate("/packages")}
            className="px-10 py-4 text-sm font-bold rounded-full transition-all hover:scale-105 shadow-xl"
            style={{ 
              background: WHITE, 
              color: GOLD_DARK,
            }}
          >
            Plan My Trip →
          </button>
          
          <a
            href="tel:+919876543210"
            className="px-10 py-4 text-sm font-bold rounded-full transition-all border-2 hover:bg-white/10"
            style={{ borderColor: WHITE, color: WHITE }}
          >
            +91 98765 43210
          </a>
        </div>
      </div>
    </section>
  );
}