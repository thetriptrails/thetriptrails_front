import { BadgeCheck, CalendarClock, UserCheck, ShieldPlus } from "lucide-react";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const features = [
  {
    icon: BadgeCheck,
    title: "No Hidden Charges",
    description: "100% transparent pricing.",
    iconBg: GOLD,
  },
  {
    icon: CalendarClock,
    title: "Flexible Booking",
    description: "Easy rescheduling, no penalties.",
    iconBg: NAVY,
  },
  {
    icon: UserCheck,
    title: "Certified Guides",
    description: "Experienced local experts.",
    iconBg: GOLD,
  },
  {
    icon: ShieldPlus,
    title: "Travel Insurance",
    description: "Comprehensive trip coverage.",
    iconBg: NAVY,
  },
];

export default function FeaturesStrip() {
  return (
    <section 
      className="w-full bg-white pt-2 pb-8 md:pb-12 px-6 md:px-16 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Grid: 1 col on mobile, 2 on tablet, 4 on laptop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="flex items-center lg:items-start gap-4 p-2 transition-all duration-300 hover:translate-y-[-2px]"
              >
                {/* Icon Box */}
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                  style={{ background: f.iconBg }}
                >
                  <Icon size={18} color="#fff" />
                </div>
                
                <div>
                  <h3
                    className="text-[13px] md:text-sm font-bold mb-0.5 uppercase tracking-tight"
                    style={{ color: NAVY }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-[11px] md:text-xs text-gray-400 font-medium leading-tight">
                    {f.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}