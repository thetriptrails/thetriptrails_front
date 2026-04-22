const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const team = [
  {
    name: "Rahul Sharma",
    role: "Founder & CEO",
    bio: "15+ years guiding pilgrims and adventurers across Uttarakhand's sacred peaks and valleys.",
    initials: "RS",
    bg: NAVY,
  },
  {
    name: "Priya Negi",
    role: "Head of Operations",
    bio: "Ensures every trip runs flawlessly — from first enquiry to your safe return home.",
    initials: "PN",
    bg: GOLD,
  },
  {
    name: "Amit Rawat",
    role: "Lead Trek Guide",
    bio: "Certified mountaineer with 200+ successful high-altitude treks completed across the Himalayas.",
    initials: "AR",
    bg: NAVY,
  },
  {
    name: "Sunita Bisht",
    role: "Customer Relations",
    bio: "Your first point of contact — always warm, helpful, and ready to craft your perfect journey.",
    initials: "SB",
    bg: GOLD,
  },
];

export default function TeamSection() {
  return (
    <section className="w-full bg-white py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="text-xs tracking-[3px] uppercase font-medium block mb-3"
            style={{ color: GOLD }}
          >
            The People Behind
          </span>
          <h2
            className="text-4xl font-semibold"
            style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
          >
            Meet the <span style={{ color: GOLD }}>Team</span>
          </h2>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-xl p-6 text-center transition-transform duration-300 hover:scale-[1.03] cursor-default"
              style={{ border: "0.5px solid #E5E0D5" }}
            >
              {/* Avatar */}
              <div
                className="w-[72px] h-[72px] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-semibold text-lg"
                style={{
                  background: member.bg,
                  border: `3px solid ${member.bg === GOLD ? NAVY : GOLD}`,
                  fontFamily: "sans-serif",
                }}
              >
                {member.initials}
              </div>
              <h3
                className="text-sm font-semibold mb-1"
                style={{ color: NAVY }}
              >
                {member.name}
              </h3>
              <p
                className="text-xs font-medium mb-3"
                style={{ color: GOLD }}
              >
                {member.role}
              </p>
              <div
                className="w-full mb-3"
                style={{ height: "0.5px", background: "#E5E0D5" }}
              />
              <p className="text-xs text-gray-400 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}