import React from 'react';

const FeatureCard = ({ Icon, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-4xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
      {/* Icon Box */}
      <div className="w-16 h-16 bg-[#C69E3D] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#C69E3D]/20">
        {Icon}
      </div>

      {/* Title */}
      <h4 className="text-xl font-serif font-bold text-[#0B1D48] mb-4">
        {title}
      </h4>

      {/* Description */}
      <p className="text-gray-500 text-sm leading-relaxed font-medium">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;