import React from 'react';
import { Quote, Star } from 'lucide-react';

const TestimonialCard = ({ name, location, image, rating, text }) => {
  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col relative transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
      {/* Decorative Quote Icon */}
      <div className="absolute top-8 right-8 text-gray-100 group-hover:text-[#C69E3D]/20 transition-colors">
        <Quote size={48} />
      </div>

      {/* User Info Header */}
      <div className="flex items-center gap-4 mb-6 relative z-10">
        <img 
          src={image} 
          alt={name} 
          className="w-14 h-14 rounded-full object-cover border-2 border-[#C69E3D]/20"
        />
        <div>
          <h4 className="text-lg font-serif font-bold text-[#0B1D48] leading-tight">{name}</h4>
          <p className="text-gray-400 text-sm">{location}</p>
        </div>
      </div>

      {/* Star Rating */}
      <div className="flex gap-1 mb-6">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={16} fill="#C69E3D" stroke="#C69E3D" />
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-500 text-[15px] italic leading-relaxed font-medium">
        {text}
      </p>

      {/* Bottom Border Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#C69E3D] rounded-full group-hover:w-1/2 transition-all duration-500" />
    </div>
  );
};

export default TestimonialCard;