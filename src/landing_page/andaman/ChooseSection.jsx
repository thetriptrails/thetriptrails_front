import React from 'react';
import { Clock, Map, ShieldCheck, Settings, Users, MapPin } from 'lucide-react';

const CombinedChooseSection = () => {
  const benefits = [
    {
      title: "Handpicked Itineraries",
      desc: "Carefully curated routes to cover the best of Andaman's islands and beaches.",
      icon: <Clock size={20} />
    },
    {
      title: "Crystal Clear Quality",
      desc: "Flexible options to match your budget for diving, snorkeling, and relaxation.",
      icon: <Map size={20} />
    },
    {
      title: "Premium Beach Stays",
      desc: "Verified beachfront resorts and cozy stays for a relaxing island experience.",
      icon: <ShieldCheck size={20} />
    },
    {
      title: "End-to-End Logistics",
      desc: "From ferry bookings to airport transfers, we handle every island-hopping detail.",
      icon: <Settings size={20} />
    },
    {
      title: "Safe Island Travel",
      desc: "Perfect for families and couples looking for secure and enjoyable water adventures.",
      icon: <Users size={20} />
    },
    {
      title: "Signature Islands",
      desc: "Explore Havelock, Neil, and Port Blair with our expert-designed tour packages.",
      icon: <MapPin size={20} />
    }
  ];

  const stats = [
    { label: "Happy Travelers", value: "12k+" },
    { label: "Island Partners", value: "300+" },
    { label: "Years Experience", value: "10+" }
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
            Premium Andaman tour packages designed for luxury, comfort, and coastal bliss.
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
