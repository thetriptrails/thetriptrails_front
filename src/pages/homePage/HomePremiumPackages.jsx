import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const packages = [
  {
    rating: "4.9", duration: "10 Days",
    title: "Divine Char Dham Yatra",
    includes: ["Kedarnath", "Badrinath", "VIP Darshan", "All Meals"],
    price: "₹45,000",
  },
  {
    rating: "4.8", duration: "7 Days",
    title: "Adventure Seeker Trek",
    includes: ["River Rafting", "Camping", "All Gear", "Instructors"],
    price: "₹32,000",
  },
  {
    rating: "4.7", duration: "5 Days",
    title: "Hill Station Retreat",
    includes: ["Nainital", "Mussoorie", "Luxury Stay", "Boating"],
    price: "₹25,000",
  },
];

export default function HomePremiumPackages() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-[#FAFAF7] px-4 sm:px-8 md:px-16 lg:px-24 py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs tracking-[3px] uppercase font-medium block mb-2" style={{ color: GOLD }}>
              Exclusive Selection
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold" style={{ color: NAVY, fontFamily: "'Georgia', serif" }}>
              Premium <span style={{ color: GOLD }}>Packages</span>
            </h2>
          </div>
          <button
            onClick={() => navigate("/packages")}
            className="text-sm font-medium px-5 py-2.5 rounded self-start sm:self-auto transition-colors hover:bg-amber-50 flex-shrink-0"
            style={{ border: `1.5px solid ${GOLD}`, color: GOLD }}
          >
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {packages.map((pkg) => (
            <div
              key={pkg.title}
              className="bg-white rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1"
              style={{ border: "0.5px solid #E5E0D5" }}
            >
              <div className="px-4 py-4" style={{ background: GOLD }}>
                <p className="text-[10px] mb-1" style={{ color: "#F5E6C0" }}>
                  ★ {pkg.rating} · {pkg.duration}
                </p>
                <h3 className="text-sm font-semibold text-white">{pkg.title}</h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-y-1 mb-3">
                  {pkg.includes.map((item) => (
                    <div key={item} className="flex items-center gap-1 text-xs text-gray-500">
                      <span style={{ color: GOLD }}>✓</span> {item}
                    </div>
                  ))}
                </div>
                <div className="w-full my-3" style={{ height: "0.5px", background: "#E5E0D5" }} />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] text-gray-400">Starts from</p>
                    <p className="text-lg font-semibold" style={{ color: NAVY, fontFamily: "sans-serif" }}>
                      {pkg.price}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("/contact")}
                    className="text-xs font-medium px-4 py-2 rounded text-white transition-opacity hover:opacity-90"
                    style={{ background: NAVY }}
                  >
                    Enquire →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}