import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const GOLD = "#C9A84C";
const TEXT_DARK = "#1A1A1A"; 

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full py-12 px-6 overflow-hidden bg-white">
      
      {/* Subtle Depth Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-[#FAF9F6] via-white to-white"></div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        
        {/* Header */}
        <div className="space-y-1 mb-4">
          <h2
            className="text-3xl md:text-5xl font-light leading-[1.1] tracking-tight"
            style={{ fontFamily: "'Georgia', serif", color: TEXT_DARK }}
          >
            Ready to Explore <br />
            <span className="italic" style={{ color: GOLD }}>India?</span>
          </h2>
        </div>

        {/* Divider */}
        <div className="flex justify-center mb-4">
          <div className="h-px w-10 bg-black/10"></div>
        </div>

        {/* Description */}
        <p className="text-sm md:text-base leading-relaxed mb-6 max-w-lg mx-auto text-black/60">
          From serene beaches and royal palaces to spiritual temples and vibrant cities — 
          let us craft your perfect journey across India.
        </p>

        {/* CTA Button (Important 🔥) */}
        <button
          onClick={() => navigate("/packages")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
          style={{ background: GOLD, color: "#000" }}
        >
          Explore Packages
          <ArrowRight size={16} />
        </button>

      </div>
    </section>
  );
}