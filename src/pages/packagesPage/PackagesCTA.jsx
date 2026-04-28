import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

export default function PackagesCTA() {
  const navigate = useNavigate();

  return (
    <section
      className="w-full py-0 px-4 sm:px-8 md:px-16 lg:px-24"
      style={{ background: GOLD }}
    >
      {/* Content wrapper with internal padding to maintain visual balance without external spacing */}
      <div className="max-w-7xl mx-auto py-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        
        <div className="max-w-xl">
          <h2
            className="text-2xl md:text-4xl font-semibold text-white mb-3"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Your Dream India <span className="italic">Tailored</span>
          </h2>
          <p className="text-sm md:text-base font-medium" style={{ color: "#FDF4DB" }}>
            Can't find the perfect itinerary? We specialize in 100% bespoke journeys across the subcontinent.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto justify-center md:justify-end">
          <button
            onClick={() => navigate("/contact")}
            className="group px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-full text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
            style={{ background: NAVY }}
          >
            Build Custom Plan
          </button>
        </div>

      </div>
    </section>
  );
}