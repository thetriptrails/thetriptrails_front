import React from 'react';
import { Clock, Map, ShieldCheck, Settings, Users, MapPin } from 'lucide-react';

const CombinedChooseSection = () => {
  const benefits = [
    {
      title: "Well-Planned Itineraries",
      desc: "Carefully planned routes to cover major attractions without feeling rushed.",
      icon: <Clock size={20} />
    },
    {
      title: "Customized Travel",
      desc: "Flexible options to match your budget, duration, and personal preferences.",
      icon: <Map size={20} />
    },
    {
      title: "Premium Stays",
      desc: "Verified and comfortable accommodations ensuring a relaxing stay every day.",
      icon: <ShieldCheck size={20} />
    },
    {
      title: "Complete Management",
      desc: "From transport to sightseeing, we handle every detail for a hassle-free journey.",
      icon: <Settings size={20} />
    },
    {
      title: "Ideal for All",
      desc: "Perfect for families, couples, and groups looking for safe, enjoyable trips.",
      icon: <Users size={20} />
    },
    {
      title: "Top Destinations",
      desc: "Explore Munnar, Alleppey, Ooty, and Coorg with our expert-designed packages.",
      icon: <MapPin size={20} />
    }
  ];

  const stats = [
    { label: "Happy Travelers", value: "10k+" },
    { label: "Verified Hotels", value: "500+" },
    { label: "Years Experience", value: "15+" }
  ];

  return (
    <section className="py-10 bg-[#fcfcfc] font-sans">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Compact Header */}
        <div className="mb-8 border-l-4 border-[#D4AF37] pl-5">
          <h2 className="text-3xl font-bold text-gray-900 leading-tight">
            Why Choose <span className="text-[#D4AF37]">The Trip Trails</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1 max-w-2xl leading-snug">
            Premium South India tour packages designed for comfort and convenience. 
          </p>
        </div>

        {/* Tight 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {benefits.map((item, index) => (
            <div 
              key={index} 
              className="group p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-[#D4AF37]/30 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-amber-50 text-[#D4AF37] rounded-lg group-hover:bg-[#D4AF37] group-hover:text-white transition-colors shadow-inner">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-sm tracking-tight">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-500 text-[11px] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 3D Dynamic Stats Bar - Gold & White */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="relative group bg-white rounded-2xl p-[1px] shadow-[6px_6px_12px_#e5e5e5,-6px_-6px_12px_#ffffff] hover:shadow-[8px_8px_16px_#d1d1d1,-8px_-8px_16px_#ffffff] transition-all"
            >
              {/* Golden Border Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37] via-transparent to-[#D4AF37] opacity-10 group-hover:opacity-30 rounded-2xl transition-opacity"></div>
              
              <div className="relative bg-white rounded-2xl py-5 flex flex-col items-center justify-center overflow-hidden">
                {/* 3D Glass Gloss Effect */}
                <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent z-10"></div>
                
                <span className="text-3xl font-black bg-gradient-to-b from-[#D4AF37] to-[#B8962E] bg-clip-text text-transparent drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)]">
                  {stat.value}
                </span>
                <span className="text-[#D4AF37] text-[9px] font-bold uppercase tracking-[0.2em] mt-1">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CombinedChooseSection;