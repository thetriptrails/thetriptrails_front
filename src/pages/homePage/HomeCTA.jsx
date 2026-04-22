import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

export default function HomeCTA() {
  const navigate = useNavigate();

  return (
    <section
      style={{ background: NAVY }}
      className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-24 text-center"
    >
      <div className="max-w-2xl mx-auto">
        <span
          className="text-xs tracking-[3px] uppercase font-medium block mb-5"
          style={{ color: GOLD }}
        >
          Start Your Journey
        </span>

        <h2
          className="text-4xl md:text-5xl font-semibold leading-tight mb-4"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          <span className="text-white">Your Dream Trip is</span>
          <br />
          <span style={{ color: GOLD }}>One Click Away</span>
        </h2>

        <p
          className="text-sm italic leading-relaxed mb-10"
          style={{ color: "#8a9bbf" }}
        >
          Call us today — free consultation, no obligations
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate("/packages")}
            className="px-8 py-3.5 text-sm font-medium rounded text-white transition-opacity hover:opacity-90"
            style={{ background: GOLD }}
          >
            Plan My Trip →
          </button>
          <a
            href="tel:+919876543210"
            className="px-8 py-3.5 text-sm font-medium rounded transition-colors hover:bg-white/10"
            style={{ border: "1.5px solid #fff", color: "#fff" }}
          >
            +91 98765 43210
          </a>
        </div>
      </div>
    </section>
  );
}