import React from 'react';

const ContactCard = ({ icon: Icon, title, info }) => (
  <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-50 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
    <div className="w-14 h-14 bg-[#C69E3D] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-[#C69E3D]/20">
      {/* Render as a component with props */}
      <Icon className="text-white w-6 h-6" /> 
    </div>
    <h4 className="text-lg font-serif font-bold text-[#0B1D48] mb-1">{title}</h4>
    <p className="text-gray-500 font-medium">{info}</p>
  </div>
);

export default ContactCard;