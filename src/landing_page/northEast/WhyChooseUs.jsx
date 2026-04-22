import React from 'react';
import { ShieldCheck, Clock, MapPin, Wallet, Settings, Headphones } from 'lucide-react';

const WhyChooseUs = () => {
  const advantages = [
    {
      icon: <Settings size={22} />,
      title: "Tailor-Made Itineraries",
      desc: "Your trip, your pace. We customize every package to fit your budget and travel style perfectly."
    },
    {
      icon: <Wallet size={22} />,
      title: "Competitive Pricing",
      desc: "Get the most competitive prices on tours without compromising on quality or comfort."
    },
    {
      icon: <MapPin size={22} />,
      title: "Complete Management",
      desc: "We handle everything—from luxury houseboat bookings to temple permits and transport."
    },
    {
      icon: <ShieldCheck size={22} />,
      title: "Trusted Local Expertise",
      desc: "With years of expertise, we ensure every tour is executed with deep local insight."
    },
    {
      icon: <Clock size={22} />,
      title: "Safe & Reliable Travel",
      desc: "Verified accommodations and professional drivers ensure a safe and smooth journey."
    },
    {
      icon: <Headphones size={22} />,
      title: "24/7 Concierge Support",
      desc: "Our dedicated team is always available to assist you before, during, and after your trip."
    }
  ];

  const stats = [
    { label: "Happy Travelers", value: "10k+" },
    { label: "Verified Hotels", value: "500+" },
    { label: "Years Experience", value: "15+" }
  ];

  return (
    <section className="py-12 bg-[#F8F9FA] font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Why Choose <span className="text-[#D4AF37]">The Trip Trails</span>
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-2xl">
            Premium South India tour packages designed for luxury and comfort.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {advantages.map((item, index) => (
            <div 
              key={index} 
              className="group p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.3)] transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="mb-4 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#D4AF37] to-[#B8962E] text-white rounded-xl shadow-lg shadow-amber-200 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 3D Dynamic Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="relative group overflow-hidden bg-white rounded-2xl p-[1px] shadow-[10px_10px_20px_#d1d1d1,-10px_-10px_20px_#ffffff]"
            >
              {/* Golden Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] opacity-20 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-black bg-gradient-to-b from-[#D4AF37] to-[#B8962E] bg-clip-text text-transparent drop-shadow-sm">
                  {stat.value}
                </span>
                <span className="mt-1 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em]">
                  {stat.label}
                </span>
                
                {/* 3D Glass Reflection */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;