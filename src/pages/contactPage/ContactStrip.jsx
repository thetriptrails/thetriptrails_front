import { Phone, Mail, MapPin } from "lucide-react";

const GOLD = "#C9A84C";
const TEXT_DARK = "#1A1A1A";

const items = [
  {
    icon: Phone,
    label: "Speak with us",
    value: "+91 95822 15091",
  },
  {
    icon: Mail,
    label: "General Inquiry",
    value: "info@thetriptrails.com",
  },
  {
    icon: MapPin,
    label: "Local Office",
    value: "Ramnagar, Uttarakhand",
  },
];

export default function ContactStrip() {
  return (
    <section className="w-full bg-[#FAFAF9] py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Subtle Shadow & Thin Border */}
        <div className="bg-white rounded-3xl md:rounded-full border border-black/5 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="group relative flex items-center gap-5 px-8 py-8 md:py-10 transition-all duration-300 hover:bg-white"
                >
                  {/* Minimalist Icon Circle */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] border border-[#C9A84C]/20 group-hover:border-[#C9A84C]"
                    style={{ background: 'transparent' }}
                  >
                    <Icon size={18} color={GOLD} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                  </div>

                  <div className="flex flex-col">
                    <span
                      className="text-[9px] uppercase tracking-[0.3em] font-bold mb-1 transition-colors text-gray-400 group-hover:text-[#C9A84C]"
                    >
                      {item.label}
                    </span>
                    <span
                      className="text-sm md:text-base font-medium tracking-tight text-[#1A1A1A]"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {item.value}
                    </span>
                  </div>

                  {/* Hidden Hover Detail: Subtle Gold Bar at Bottom */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#C9A84C] transition-all duration-500 group-hover:w-full"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}