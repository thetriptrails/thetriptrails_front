const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const reviews = [
  {
    stars: 5,
    quote:
      "The Char Dham Yatra was beyond my expectations. Every detail was perfectly arranged — from hotel stays to VIP darshan passes.",
    name: "Vikram Malhotra",
    location: "Delhi, India",
    initials: "VM",
    bg: NAVY,
  },
  {
    stars: 5,
    quote:
      "Our adventure trek was thrilling yet completely safe. Amit our guide was incredibly knowledgeable. Will definitely book again!",
    name: "Ananya Kapoor",
    location: "Mumbai, India",
    initials: "AK",
    bg: GOLD,
  },
  {
    stars: 5,
    quote:
      "A luxurious yet affordable hill station retreat. The team's 24/7 support gave us complete peace of mind throughout.",
    name: "Rajesh Gupta",
    location: "Pune, India",
    initials: "RG",
    bg: NAVY,
  },
];

export default function Testimonials() {
  return (
    <section
      className="w-full py-20 px-6 md:px-16 lg:px-24"
      style={{ background: GOLD }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="text-xs tracking-[3px] uppercase font-medium block mb-3"
            style={{ color: "#F5E6C0" }}
          >
            What They Say
          </span>
          <h2
            className="text-4xl font-semibold"
            style={{ fontFamily: "'Georgia', serif", color: "#fff" }}
          >
            Client <span style={{ color: NAVY }}>Reviews</span>
          </h2>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="bg-white rounded-xl p-6"
              style={{ border: "0.5px solid #E5E0D5" }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: r.stars }).map((_, i) => (
                  <span key={i} style={{ color: GOLD, fontSize: "14px" }}>
                    ★
                  </span>
                ))}
              </div>
              <p
                className="text-sm italic leading-relaxed mb-5"
                style={{ color: NAVY }}
              >
                "{r.quote}"
              </p>
              <div
                className="w-full mb-4"
                style={{ height: "0.5px", background: "#E5E0D5" }}
              />
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                  style={{ background: r.bg, fontFamily: "sans-serif" }}
                >
                  {r.initials}
                </div>
                <div>
                  <p
                    className="text-xs font-semibold"
                    style={{ color: NAVY }}
                  >
                    {r.name}
                  </p>
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