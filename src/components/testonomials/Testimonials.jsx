import React from 'react';
import TestimonialCard from './TestimonialCard';
import { testimonials } from './TestimonialData';
import { Star } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className="py-24 px-6 md:px-10 bg-[#FCFBF7]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1D48] mb-4">
            What Our <span className="text-[#C69E3D]">Travelers Say</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-lg max-w-2xl mx-auto font-medium">
            Real experiences from real travelers who explored Uttarakhand with us
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} {...item} />
          ))}
        </div>

        {/* Global Rating Bar */}
        <div className="flex justify-center">
          <div className="bg-[#C69E3D] py-4 px-8 md:px-12 rounded-full shadow-lg flex flex-wrap items-center justify-center gap-4 md:gap-8 text-white">
            <div className="flex items-center gap-2">
              <Star size={24} fill="white" stroke="white" />
              <span className="text-xl md:text-2xl font-bold">4.9/5.0 Average Rating</span>
            </div>
            <div className="hidden md:block h-6 w-[1px] bg-white/30" />
            <span className="text-sm md:text-base font-medium opacity-90 uppercase tracking-widest">
              Based on 1000+ Reviews
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;