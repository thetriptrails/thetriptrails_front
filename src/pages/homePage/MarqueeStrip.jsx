const GOLD = "#C9A84C";

const items = [
  "Char Dham Yatra",
  "Kedarnath Trek",
  "Rishikesh Rafting",
  "Nainital Retreat",
  "Valley of Flowers",
  "Jim Corbett Safari",
  "Mussoorie Escape",
  "Auli Ski Resort",
  "Haridwar Aarti",
  "Badrinath Darshan",
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
          animation: "marquee 28s linear infinite",
          width: "max-content",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-[10px] uppercase tracking-[2px] flex-shrink-0"
            style={{ color: "#F5E6C0", fontFamily: "sans-serif" }}
          >
            ✦ {item}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}