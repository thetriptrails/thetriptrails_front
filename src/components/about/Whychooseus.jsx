import { ShieldCheck, MapPin, SlidersHorizontal, Headphones } from "lucide-react";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";
const BG = "#FAFAF7";

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted Partner",
    description:
      "Delivering safe and memorable travel experiences across India for thousands of happy travelers.",
  },
  {
    icon: MapPin,
    title: "Expert Guides",
    description:
      "Experienced local guides across India ensuring authentic and seamless travel experiences.",
  },
  {
    icon: SlidersHorizontal,
    title: "Custom Itineraries",
    description:
      "Personalized travel plans tailored to your preferences, budget, and travel style.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Dedicated assistance anytime, anywhere — ensuring a smooth and stress-free journey.",
  },
];

export default function WhyChooseUs() {
  return (
    <section style={{ background: BG }} className="w-full py-12 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2
            className="text-3xl md:text-4xl font-semibold mb-2"
            style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
          >
            Why Choose <span style={{ color: GOLD }}>Us</span>
          </h2>
          <p className="text-sm text-gray-500">
            Your trusted travel partner for exploring India with comfort and confidence
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group bg-white rounded-xl p-5 text-center transition-all duration-300 hover:-translate-y-1 cursor-default"
                style={{
                  border: "0.5px solid #E5E0D5",
                  borderTop: `3px solid ${GOLD}`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: GOLD }}
                >
                  <Icon size={18} color="#fff" />
                </div>

                <h3
                  className="text-sm font-semibold mb-1"
                  style={{ color: NAVY }}
                >
                  {f.title}
                </h3>

                <p className="text-xs text-gray-500 leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}