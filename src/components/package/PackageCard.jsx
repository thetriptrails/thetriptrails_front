import React from 'react';
import { Star, Clock, CheckCircle2, Send, ChevronRight } from 'lucide-react';

const PackageCard = ({ title, duration, rating, highlights, price }) => {
  return (
    <div className="group relative bg-white rounded-[2.5rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100 flex flex-col transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(196,160,54,0.2)]">
      
      {/* Sleek Compact Header */}
      <div className="bg-[#C4A036] p-5 text-white relative">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold">
            <Star size={10} className="fill-yellow-300 text-yellow-300" /> {rating}
          </div>
          <Clock size={16} className="text-white/40" />
        </div>
        <h3 className="text-xl md:text-2xl font-serif font-bold leading-tight mb-2 truncate">{title}</h3>
        <p className="text-[11px] font-bold tracking-widest opacity-80 uppercase">{duration}</p>
      </div>

      {/* Highlights Section - Compact 2-Col Layout */}
      <div className="p-5 flex-grow">
        <h4 className="text-[#0B1D48] font-black text-[9px] uppercase tracking-[0.2em] mb-4 opacity-40">What's Included</h4>
        <ul className="grid grid-cols-2 gap-x-2 gap-y-3">
          {highlights.map((item, index) => (
            <li key={index} className="flex items-center gap-1.5 text-gray-500 text-[11px] font-semibold leading-tight">
              <CheckCircle2 size={12} className="text-[#C4A036] shrink-0" />
              <span className="truncate">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pricing & Premium Button */}
      <div className="px-5 pb-5">
        <div className="flex justify-between items-end mb-5 bg-gray-50 p-4 rounded-3xl border border-gray-100/50">
          <div>
            <span className="text-[8px] text-gray-400 uppercase font-black tracking-[0.2em]">Package Starts</span>
            <p className="text-2xl font-black text-[#0B1D48]">
              <span className="text-[#C4A036] text-xs mr-0.5">₹</span>{price.toLocaleString()}
            </p>
          </div>
          <p className="text-[9px] font-bold text-gray-300 uppercase italic mb-1">per guest</p>
        </div>
        
        <button className="relative w-full group/btn bg-[#0B1D48] text-white font-bold py-4 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg active:scale-95 text-[11px] tracking-[0.2em] uppercase">
          <div className="absolute inset-0 bg-[#C4A036] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
          <span className="relative flex items-center justify-center gap-2">
            Send Enquiry <Send size={12} className="group-hover/btn:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default PackageCard;