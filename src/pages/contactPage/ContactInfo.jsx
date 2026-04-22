import { Phone, Mail, MapPin, Instagram, Youtube, Facebook, Twitter } from "lucide-react";

const GOLD = "#C9A84C";
const GOLD_GRADIENT = "linear-gradient(135deg, #C9A84C 0%, #E5D296 50%, #B8962E 100%)";
const TEXT_DARK = "#1A1A1A";

// A clean, high-end satellite/map view of the Dehradun region
const MAP_URL = "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop";

const infoCards = [
  {
    icon: Phone,
    title: "Phone",
    primary: "+91 98765 43210",
    secondary: "Mon–Sat, 9am – 7pm IST",
  },
  {
    icon: Mail,
    title: "Email",
    primary: "info@uttaravista.com",
    secondary: "We reply within 2 hours",
  },
  {
    icon: MapPin,
    title: "Office Address",
    primary: "12, Rajpur Road, Dehradun",
    secondary: "Uttarakhand — 248001, India",
  },
];

const socials = [
  { icon: Instagram },
  { icon: Facebook },
  { icon: Youtube },
  { icon: Twitter },
];

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-5">
      {/* Info cards */}
      {infoCards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="group bg-white rounded-2xl p-5 flex items-start gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            style={{ border: "1px solid #F0EAD6" }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:rotate-12 shadow-md"
              style={{ background: GOLD_GRADIENT }}
            >
              <Icon size={18} color="#fff" strokeWidth={2.5} />
            </div>
            <div>
              <p
                className="text-[10px] uppercase tracking-[3px] font-black mb-1"
                style={{ color: GOLD }}
              >
                {card.title}
              </p>
              <p
                className="text-sm font-bold tracking-tight"
                style={{ color: TEXT_DARK }}
              >
                {card.primary}
              </p>
              <p className="text-[11px] text-gray-400 mt-1 font-medium">
                {card.secondary}
              </p>
            </div>
          </div>
        );
      })}

      {/* Social links */}
      <div
        className="bg-white rounded-2xl p-6"
        style={{ border: "1px solid #F0EAD6" }}
      >
        <p
          className="text-[10px] uppercase tracking-[3px] font-black mb-4"
          style={{ color: GOLD }}
        >
          Follow Our Journey
        </p>
        <div className="flex gap-3">
          {socials.map(({ icon: Icon }, i) => (
            <button
              key={i}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-sm border border-gray-100 hover:shadow-lg"
              style={{ background: "#FFF" }}
            >
              <Icon size={16} style={{ color: GOLD }} />
            </button>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <div
        className="relative group rounded-2xl overflow-hidden h-40 shadow-inner"
        style={{ border: "1px solid #F0EAD6" }}
      >
        <img 
          src={MAP_URL} 
          alt="Dehradun Map" 
          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent pointer-events-none"></div>
        
        {/* Floating Marker Badge */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl backdrop-blur-sm border border-white/20"
          style={{ background: "rgba(255,255,255,0.9)" }}
        >
          <MapPin size={12} style={{ color: GOLD }} />
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: TEXT_DARK }}>View Location</span>
        </div>
      </div>
    </div>
  );
}