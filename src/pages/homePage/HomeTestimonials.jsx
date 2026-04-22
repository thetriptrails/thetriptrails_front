const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const reviews = [
  {
    stars: 5,
    quote: "The Char Dham trip was beyond magical. Every detail was perfectly handled. Will book again!",
    name: "Vikram Malhotra",
    location: "Delhi · June 2025",
    initials: "VM",
    bg: NAVY,
  },
  {
    stars: 5,
    quote: "Our adventure trek was thrilling yet completely safe. The guide Amit was outstanding!",
    name: "Ananya Kapoor",
    location: "Mumbai · May 2025",
    initials: "AK",
    bg: GOLD,
  },
  {
    stars: 5,
    quote: "Luxury Nainital retreat at an unbeatable price. 24/7 support gave us total peace of mind.",
    name: "Rajesh Gupta",
    location: "Pune · Apr 2025",
    initials: "RG",
    bg: NAVY,
  },
];

export default function HomeTestimonials() {
  return (
    <section style={{ background: NAVY }} className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[3px] uppercase font-medium block mb-3" style={{ color: GOLD }}>
            Real Experiences
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold" style={{ fontFamily: "'Georgia', serif" }}>
            <span className="text-white">What Our </span>
            <span style={{ color: GOLD }}>Travelers Say</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="bg-white rounded-xl p-6"
              style={{ border: "0.5px solid #E5E0D5" }}
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: r.stars }).map((_, i) => (
                  <span key={i} style={{ color: GOLD, fontSize: "13px" }}>★</span>
                ))}
              </div>
              <p className="text-sm italic leading-relaxed mb-5" style={{ color: NAVY }}>
                "{r.quote}"
              </p>
              <div className="w-full mb-4" style={{ height: "0.5px", background: "#E5E0D5" }} />
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                  style={{ background: r.bg, fontFamily: "sans-serif" }}
                >
                  {r.initials}
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: NAVY }}>{r.name}</p>
                  <p className="text-[10px] text-gray-400">{r.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}