import React from "react";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, ChevronRight } from "lucide-react";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "destinations" },
  { label: "Tour Packages", href: "packages" },
  { label: "About Us", href: "about" },
  { label: "Gallery", href: "gallery" },
  { label: "Contact Us", href: "contact", active: true },
];

const DESTINATIONS = [
  { label: "Kedarnath", href: "/" },
  { label: "Badrinath", href: "/" },
  { label: "Nainital", href: "/" },
  { label: "Rishikesh", href: "/" },
  { label: "Mussoorie", href: "/" },
  { label: "Jim Corbett", href: "/" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const brandGold = "#BFA13B";
  const brandDark = "#8e7421";

  return (
    <footer
      className="w-full border-t border-white/10 font-sans relative overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Top Gold Line */}
      <div
        className="h-0.5 w-full opacity-80"
        style={{ background: `linear-gradient(to right, transparent, ${brandGold}, ${brandDark}, ${brandGold}, transparent)` }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">

          {/* Column 1: Brand Info - Logo Increased */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-8">
            <div className="flex flex-col gap-6">
              <img
                src="/Logo.svg"
                alt="Logo"
                /* Mobile: h-24, Desktop: h-20 - Big and Clear */
                className="h-24 md:h-20 w-auto object-contain self-start drop-shadow-[0_0_15px_rgba(191,161,59,0.3)]"
              />
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Your premium travel partner for exploring the incredible diversity of India.
                From the Himalayas to the backwaters, we create unforgettable journeys since 2009.
              </p>
            </div>

            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white transition-all hover:scale-110 shadow-lg border border-white/10 hover:border-[#BFA13B]/50"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  <Icon size={20} style={{ color: brandGold }} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-span-1">
            <h4 className="text-white font-bold text-base md:text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full" style={{ backgroundColor: brandGold }} />
              Quick Links
            </h4>
            <ul className="space-y-4">
              {QUICK_LINKS.map((link) => (
                <li key={link.label} className="group">
                  <a
                    href={link.href}
                    className={`text-[13px] font-medium transition-all flex items-center gap-2 ${link.active ? 'text-[#BFA13B]' : 'text-gray-400 hover:text-white'}`}
                  >
                    {link.active ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#BFA13B]" />
                    ) : (
                      <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#BFA13B]" />
                    )}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Destinations */}
          <div className="col-span-1">
            <h4 className="text-white font-bold text-base md:text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full" style={{ backgroundColor: brandGold }} />
              Destinations
            </h4>
            <ul className="space-y-4">
              {DESTINATIONS.map((link) => (
                <li key={link.label} className="group">
                  <a href={link.href} className="text-gray-400 hover:text-white flex items-center gap-1 text-[13px] font-medium transition-all">
                    <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#BFA13B]" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 pt-4 lg:pt-0 border-t border-white/5 lg:border-none">
            <h4 className="text-white font-bold text-base md:text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full" style={{ backgroundColor: brandGold }} />
              Contact Us
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="shrink-0 mt-1" size={20} style={{ color: brandGold }} />
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-white text-[12px] font-bold mb-0.5">Uttarakhand Office:</p>
                    <span className="text-gray-400 text-[13px] leading-relaxed">
                      Himmatpur Block, Near Sai Mandir, Jim Corbett, Ramnagar, 244715
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-[12px] font-bold mb-0.5">Gurugram Office:</p>
                    <span className="text-gray-400 text-[13px] leading-relaxed">
                      Mistily No - 45, Killa No 6/2, Begampur Khatola, 122001
                    </span>
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="shrink-0" size={20} style={{ color: brandGold }} />
                <a href="tel:+919582215091" className="text-gray-400 text-[13px] hover:text-white transition-colors">
                  +91 95822 15091
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="shrink-0" size={20} style={{ color: brandGold }} />
                <a href="mailto:info@thetriptrails.com" className="text-gray-400 text-[13px] hover:text-white transition-colors truncate">
                  info@thetriptrails.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* COPYRIGHT BAR */}
      <div className="border-t border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[11px] text-gray-500 text-center md:text-left font-medium uppercase tracking-wider">
              © {currentYear} <span className="text-white font-bold">Incredible India Journeys</span>.
              All Rights Reserved.
            </p>
            <div className="flex gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
              <a href="/privacy-policy" className="hover:text-[#BFA13B] transition-colors">Privacy Policy</a>
              <a href="/terms-and-conditions" className="hover:text-[#BFA13B] transition-colors">Terms and Conditions</a>
              <a href="/cancellation-policy" className="hover:text-[#BFA13B] transition-colors">Cancellation Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}