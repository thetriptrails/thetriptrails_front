import { MessageCircle, Clock, Tag, Headphones } from "lucide-react";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const features = [
  {
    icon: MessageCircle,
    title: "Free Consultation",
    description: "No charges for trip planning consultation — ever.",
    bg: GOLD,
  },
  {
    icon: Clock,
    title: "2-Hour Response",
    description: "Our team replies within 2 hours on all working days.",
    bg: NAVY,
  },
  {
    icon: Tag,
    title: "Custom Quotes",
    description: "Get personalized pricing built around your group size.",
    bg: GOLD,
  },
  {
    icon: Headphones,
    title: "24/7 On-Trip Support",
    description: "We're with you throughout every step of your journey.",
    bg: NAVY,
  },
];

export default function WhyContactUs() {
  return (
    <section className="w-full bg-white px-4 sm:px-8 md:px-16 lg:px-24 py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="text-xs tracking-[3px] uppercase font-medium block mb-3"
            style={{ color: GOLD }}
          >
            Why Reach Out
          </span>
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
          >
            We're Here to <span style={{ color: GOLD }}>Help</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="text-center rounded-xl p-6 transition-transform duration-300 hover:-translate-y-1"
                style={{
                  background: "#FAFAF7",
                  border: "0.5px solid #E5E0D5",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-4"
                  style={{ background: f.bg }}
                >
                  <Icon size={17} color="#fff" />
                </div>
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ color: NAVY }}
                >
                  {f.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
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