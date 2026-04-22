import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

export default function ServicesCTA() {
  const navigate = useNavigate();

  return (
    <section
      className="w-full py-16 px-6 md:px-16 lg:px-24"
      style={{ background: GOLD }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Text */}
        <div>
          <h2
            className="text-2xl md:text-3xl font-semibold text-white mb-2"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Not sure which service fits you?
          </h2>
          <p
            className="text-sm italic"
            style={{ color: "#F5E6C0" }}
          >
            Talk to our travel expert — we'll plan the perfect trip for you,
            free of charge.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 flex-wrap flex-shrink-0">
          <button
            onClick={() => navigate("/contact")}
            className="px-7 py-3 text-sm font-medium rounded text-white transition-opacity hover:opacity-90"
            style={{ background: NAVY }}
          >
            Talk to Expert →
          </button>
          <button
            onClick={() => navigate("/packages")}
            className="px-7 py-3 text-sm font-medium rounded transition-colors hover:bg-white/10"
            style={{ border: "1.5px solid #fff", color: "#fff" }}
          >
            View Packages
          </button>
        </div>
      </div>
    </section>
  );
}