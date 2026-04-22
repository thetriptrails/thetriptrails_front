import React from "react";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

export default function DestinationMap() {
  return (
    /* py-0 removes top and bottom padding from the section */
    <section className="w-full bg-[#FCFBFA] px-4 py-0 overflow-hidden">
      <div className="max-w-7xl mx-auto py-10 md:py-12"> 
        {/* Adjusted py above to keep content safe but compact */}
        
        <div className="text-center mb-8 md:mb-12">
          <h2
            className="text-3xl md:text-5xl font-light tracking-tight"
            style={{ color: NAVY, fontFamily: "'Playfair Display', serif" }}
          >
            India <span className="italic font-normal" style={{ color: GOLD }}>Travel Map</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#C9A84C] mx-auto mt-4"></div>
        </div>

        {/* Static Map Container */}
        <div className="relative group overflow-hidden rounded-2xl md:rounded-[40px] shadow-2xl bg-white border border-gray-100">
          <div className="aspect-[4/5] md:aspect-[21/9] w-full relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2070&auto=format&fit=crop"
              alt="Map of India"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl flex items-center gap-3">
                  <span className="animate-pulse w-2 h-2 rounded-full bg-red-500"></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B2B4B]">
                    Interactive Map Coming Soon
                  </span>
               </div>
            </div>
          </div>

          {/* Map Footer Information */}
          <div className="p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-lg font-bold text-[#1B2B4B] mb-1">Explore 28 States</p>
              <p className="text-xs text-gray-400 max-w-xs">
                From the peaks of the Himalayas to the backwaters of Kerala, discover the diverse soul of India.
              </p>
            </div>
            
            <button 
              className="w-full md:w-auto px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-lg transition-all active:scale-95"
              style={{ background: `linear-gradient(135deg, ${GOLD}, #B8962E)` }}
            >
              Open Live Navigator
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        `}
      </style>
    </section>
  );
}