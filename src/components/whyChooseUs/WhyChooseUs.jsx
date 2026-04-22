import React from 'react';
import { ShieldCheck, MapPin, Settings2, Headphones } from 'lucide-react';

// Reusable Stat Component - Updated for better mobile scaling
const StatCount = ({ number, label }) => (
  <div className="text-center px-2 py-4 md:py-0 transition-transform active:scale-95">
    <div className="text-3xl md:text-5xl font-black text-white leading-none drop-shadow-md">
      {number}
    </div>
    <p className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mt-2 leading-tight">
      {label}
    </p>
  </div>
);

// Child component for each feature card
const FeatureCard = ({ Icon, title, description, animationDelay }) => {
  return (
    <div 
      className="relative group w-full opacity-0 animate-[fadeUp_0.8s_ease-out_forwards]"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      {/* Glow Effect (Desktop Only or very subtle mobile) */}
      <div className="absolute -inset-4 bg-[#C69E3D]/10 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-700 blur-2xl"></div>
      
      {/* Main Card Container */}
      <div className="relative h-full flex flex-col p-8 md:p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-3 group-hover:shadow-[0_30px_60px_-15px_rgba(198,158,61,0.2)] overflow-hidden">
        
        {/* Border Beam Animation Layer */}
        <div className="absolute inset-0 z-0 bg-linear-to-r from-transparent via-[#C69E3D]/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[slide_3s_linear_infinite] -translate-x-full" />

        <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 mb-6 md:mb-8 flex items-center justify-center">
            {/* Pulsing Ring for Mobile Premium feel */}
            <div className="absolute inset-0 rounded-2xl bg-[#C69E3D]/10 animate-pulse"></div>
            
            <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#C69E3D] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_10px_25px_rgba(198,158,61,0.4)]">
                {Icon}
            </div>
        </div>

        <div className="relative z-10">
          <h4 className="text-xl md:text-2xl font-serif font-black text-[#0B1D48] tracking-tight mb-3">
            {title}
          </h4>
          <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const WhyChooseUs = () => {
  const chooseData = [
    {
      Icon: <ShieldCheck className="w-7 h-7 md:w-8 md:h-8 text-white" />,
      title: "Trusted Travel Partner",
      description: "Over 15 years of excellence in creating memorable journeys across Uttarakhand.",
      animationDelay: 0.1
    },
    {
      Icon: <MapPin className="w-7 h-7 md:w-8 md:h-8 text-white" />,
      title: "Expert Local Guides",
      description: "Experienced and certified guides who know every trail and temple intimately.",
      animationDelay: 0.3
    },
    {
      Icon: <Settings2 className="w-7 h-7 md:w-8 md:h-8 text-white" />,
      title: "Customized Itineraries",
      description: "Tailor-made tours designed to match your preferences and travel style.",
      animationDelay: 0.5
    },
    {
      Icon: <Headphones className="w-7 h-7 md:w-8 md:h-8 text-white" />,
      title: "24/7 Priority Support",
      description: "Round-the-clock assistance from a dedicated team to ensure a seamless experience.",
      animationDelay: 0.7
    }
  ];

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 md:px-10 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-50 rounded-full blur-[120px] opacity-60"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-[#C69E3D] font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-4 block opacity-80">
            EXPERIENCE EXCELLENCE
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-black text-[#0B1D48] leading-[1.1]">
            Why Choose <span className="text-[#C69E3D] relative inline-block italic">
              Us
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#C69E3D]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
              </svg>
            </span>
          </h2>
          <p className="text-gray-400 text-sm md:text-xl max-w-2xl mx-auto mt-8 font-medium italic">
            "Your perfect travel companion for unforgettable Uttarakhand experiences"
          </p>
        </div>

        {/* Top Cards Grid - 1 Col on mobile, 4 on large */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          {chooseData.map((item, index) => (
            <FeatureCard key={index} {...item} />
          ))}
        </div>

        {/* Bottom Gold Stats Bar - UPDATED FOR MOBILE */}
        <div className="mt-20 md:mt-32 relative">
           {/* Mobile: Squared glass, Desktop: Pill bar */}
           <div className="relative grid grid-cols-2 md:flex md:items-center md:justify-around gap-2 md:gap-0 p-4 md:py-10 md:px-16 w-full max-w-5xl mx-auto bg-linear-to-br from-[#A6883F] to-[#C69E3D] rounded-[2.5rem] md:rounded-full shadow-2xl overflow-hidden">
              
              {/* Background light streak */}
              <div className="absolute top-0 left-0 w-full h-full bg-white/10 skew-x-[-20deg] -translate-x-full animate-[slide_5s_infinite]" />

              <StatCount number="15+" label="Years Exp." />
              <div className="h-12 w-px bg-white/20 hidden md:block" />
              <StatCount number="10K+" label="Travelers" />
              <div className="h-12 w-px bg-white/20 hidden md:block" />
              <StatCount number="50+" label="Destinations" />
              <div className="h-12 w-px bg-white/20 hidden md:block" />
              <StatCount number="100%" label="Satisfaction" />
           </div>
        </div>

      </div>

      <style jsx="true" global="true">{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide {
          from { transform: translateX(-150%) skewX(-20deg); }
          to { transform: translateX(150%) skewX(-20deg); }
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;