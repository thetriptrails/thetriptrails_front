const GOLD = "#C9A84C";

const items = [
  // 🏔️ North India
  "Char Dham Yatra",
  "Kedarnath Trek",
  "Manali Adventure",
  "Leh Ladakh Road Trip",
  "Kashmir Valley Tour",

  // 🛕 Spiritual India
  "Varanasi Ganga Aarti",
  "Tirupati Balaji Darshan",
  "Golden Temple Amritsar",
  "Jagannath Puri Yatra",
  "Vaishno Devi Darshan",

  // 🏝️ Beaches & Islands
  "Goa Beach Escape",
  "Andaman Island Tour",
  "Gokarna Retreat",
  "Kerala Backwaters",

  // 🏰 Heritage & Culture
  "Jaipur Royal Palaces",
  "Udaipur Lake City",
  "Hampi Heritage Walk",
  "Khajuraho Temples",
  "Mysore Palace Tour",

  // 🌿 Nature & Wildlife
  "Jim Corbett Safari",
  "Kaziranga National Park",
  "Sundarbans Mangrove Tour",
  "Meghalaya Waterfalls",
  "Coorg Hill Retreat",
];

export default function MarqueeStrip() {
  return (
    <section
      style={{ background: GOLD, overflow: "hidden" }}
      className="w-full py-3"
    >
      <div
        className="flex gap-10 whitespace-nowrap"
        style={{
          animation: "marquee 32s linear infinite",
          width: "max-content",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-[10px] uppercase tracking-[2px] shrink-0"
            style={{ color: "#F5E6C0", fontFamily: "sans-serif" }}
          >
            ✦ {item}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-15%); }
        }
      `}</style>
    </section>
  );
}