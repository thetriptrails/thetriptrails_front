import { ShieldCheck, MapPin, SlidersHorizontal, Headphones } from "lucide-react";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const features = [
  { icon: ShieldCheck, title: "Trusted Partner", desc: "15+ years crafting unforgettable journeys with full transparency.", bg: GOLD },
  { icon: MapPin, title: "Expert Guides", desc: "Certified local guides who know every trail and temple intimately.", bg: NAVY },
  { icon: SlidersHorizontal, title: "Custom Trips", desc: "Fully personalized itineraries matching your budget and style.", bg: GOLD },
  { icon: Headphones, title: "24/7 Support", desc: "Round-the-clock assistance throughout your entire journey.", bg: NAVY },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-white px-4 sm:px-8 md:px-16 lg:px-24 py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[3px] uppercase font-medium block mb-3" style={{ color: GOLD }}>
            Experience Excellence
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold" style={{ color: NAVY, fontFamily: "'Georgia', serif" }}>
            Why Thousands <span style={{ color: GOLD }}>Trust Us</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="text-center rounded-xl p-6 transition-transform duration-300 hover:-translate-y-1"
                style={{ background: "#FAFAF7", border: "0.5px solid #E5E0D5", borderTop: `3px solid ${GOLD}` }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: f.bg }}>
                  <Icon size={18} color="#fff" />
                </div>
                <h3 className="text-sm font-semibold mb-2" style={{ color: NAVY }}>{f.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
