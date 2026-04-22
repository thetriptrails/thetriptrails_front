import { Target, Eye } from "lucide-react";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const cards = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To make India's diverse destinations accessible to every traveler — through authentic, personalized, and responsibly managed travel experiences that celebrate culture.",
    accentColor: NAVY,
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To become the most trusted and loved travel brand across India — delivering exceptional journeys for explorers, families, and adventure seekers with excellence.",
    accentColor: GOLD,
  },
];

export default function MissionVision() {
  return (
    <section className="w-full bg-white px-4 sm:px-8 md:px-16 lg:px-24 pt-0 pb-12 md:pb-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Reduced spacing for laptop/desktop */}
        <div className="text-center mb-8 md:mb-12">
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
          >
            Mission <span style={{ color: GOLD }}>&</span> Vision
          </h2>
        </div>

        {/* Cards - Mobile first (1 col), Desktop (2 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="p-6 md:p-8 transition-all duration-300 hover:shadow-xl"
                style={{
                  background: "#FAFAF7",
                  border: "1px solid #E5E0D5",
                  borderLeft: `5px solid ${card.accentColor}`,
                  borderRadius: "0 16px 16px 0",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-sm"
                  style={{ background: card.accentColor }}
                >
                  <Icon size={22} color="#fff" />
                </div>
                
                <h3
                  className="text-xl md:text-2xl font-semibold mb-3"
                  style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
                >
                  {card.title}
                </h3>
                
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-light">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}