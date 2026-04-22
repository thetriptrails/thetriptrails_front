import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const destinations = [
  {
    label: "Pilgrimage",
    title: "Kedarnath Temple",
    meta: "3,583m · May–Jun · 16km Trek",
    price: "₹28,000",
    rating: "4.9",
    tag: "Best Seller",
    bg: NAVY,
    textColor: GOLD,
    priceColor: GOLD,
    size: "large",
  },
  {
    label: "Adventure",
    title: "Rishikesh Rafting",
    meta: "Grade 3–4 · Oct–Mar",
    price: "₹12,000",
    rating: "4.8",
    bg: GOLD,
    textColor: "#F5E6C0",
    priceColor: "#fff",
    size: "small",
  },
  {
    label: "Hill Station",
    title: "Nainital Lakes",
    meta: "2,084m · Mar–Jun",
    price: "₹18,000",
    rating: "4.7",
    bg: NAVY,
    textColor: GOLD,
    priceColor: GOLD,
    size: "small",
  },
];

export default function FeaturedDestinations() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-[#FAFAF7] px-4 sm:px-8 md:px-16 lg:px-24 pb-14">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span
            className="text-xs tracking-[3px] uppercase font-medium block mb-3"
            style={{ color: GOLD }}
          >
            Top Picks
          </span>
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
          >
            Our Most Loved{" "}
            <span style={{ color: GOLD }}>Destinations</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Large card */}
          <div
            className="md:col-span-1 rounded-2xl p-6 flex flex-col justify-between min-h-[240px] md:min-h-[300px] transition-transform duration-300 hover:-translate-y-1 cursor-pointer relative"
            style={{ background: NAVY }}
            onClick={() => navigate("/destination")}
          >
            <div
              className="absolute top-4 right-4 text-[9px] font-medium px-2 py-0.5 rounded"
              style={{ background: GOLD, color: "#fff" }}
            >
              ★ 4.9 · Best Seller
            </div>
            <div />
            <div>
              <p
                className="text-[9px] uppercase tracking-widest mb-2"
                style={{ color: GOLD, fontFamily: "sans-serif" }}
              >
                Pilgrimage
              </p>
              <h3
                className="text-xl font-semibold text-white mb-2"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Kedarnath Temple
              </h3>
              <p
                className="text-xs mb-4"
                style={{ color: "#8a9bbf", fontFamily: "sans-serif" }}
              >
                3,583m · May–Jun · 16km Trek
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-[9px]"
                    style={{ color: "#8a9bbf", fontFamily: "sans-serif" }}
                  >
                    From
                  </p>
                  <p
                    className="text-lg font-semibold"
                    style={{ color: GOLD, fontFamily: "sans-serif" }}
                  >
                    ₹28,000
                  </p>
                </div>
                <button
                  className="text-xs font-medium px-4 py-2 rounded text-white transition-opacity hover:opacity-90"
                  style={{ background: GOLD }}
                >
                  Explore →
                </button>
              </div>
            </div>
          </div>

          {/* Right column — 2 small cards */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                category: "Adventure",
                title: "Rishikesh Rafting",
                meta: "Grade 3–4 · Oct–Mar",
                price: "₹12,000",
                rating: "4.8",
                bg: GOLD,
                labelColor: "#F5E6C0",
                priceColor: "#fff",
                btnBg: NAVY,
              },
              {
                category: "Hill Station",
                title: "Nainital Lakes",
                meta: "2,084m · Mar–Jun",
                price: "₹18,000",
                rating: "4.7",
                bg: NAVY,
                labelColor: GOLD,
                priceColor: GOLD,
                btnBg: GOLD,
              },
              {
                category: "Wildlife",
                title: "Jim Corbett Safari",
                meta: "Nov–Jun · 3 Days",
                price: "₹22,000",
                rating: "4.8",
                bg: NAVY,
                labelColor: GOLD,
                priceColor: GOLD,
                btnBg: GOLD,
              },
              {
                category: "Pilgrimage",
                title: "Badrinath Darshan",
                meta: "3,133m · May–Jun",
                price: "₹20,000",
                rating: "4.9",
                bg: GOLD,
                labelColor: "#F5E6C0",
                priceColor: "#fff",
                btnBg: NAVY,
              },
            ].map((d) => (
              <div
                key={d.title}
                className="rounded-2xl p-5 flex flex-col justify-between min-h-[140px] transition-transform duration-300 hover:-translate-y-1 cursor-pointer relative"
                style={{ background: d.bg }}
                onClick={() => navigate("/destination")}
              >
                <div
                  className="absolute top-3 right-3 text-[9px] px-1.5 py-0.5 rounded"
                  style={{ background: "rgba(0,0,0,0.25)", color: "#fff" }}
                >
                  ★ {d.rating}
                </div>
                <div>
                  <p
                    className="text-[9px] uppercase tracking-widest mb-1.5"
                    style={{ color: d.labelColor, fontFamily: "sans-serif" }}
                  >
                    {d.category}
                  </p>
                  <h3
                    className="text-sm font-semibold text-white mb-1"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {d.title}
                  </h3>
                  <p
                    className="text-[10px] mb-3"
                    style={{
                      color: d.bg === GOLD ? "#F5E6C0" : "#8a9bbf",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {d.meta}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="text-[9px]"
                      style={{
                        color: d.bg === GOLD ? "#F5E6C0" : "#8a9bbf",
                        fontFamily: "sans-serif",
                      }}
                    >
                      From
                    </p>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: d.priceColor, fontFamily: "sans-serif" }}
                    >
                      {d.price}
                    </p>
                  </div>
                  <button
                    className="text-[9px] font-medium px-3 py-1.5 rounded text-white transition-opacity hover:opacity-90"
                    style={{ background: d.btnBg }}
                  >
                    Explore →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}