import React, { useState, useEffect } from 'react';
import { getAllTestimonials } from "../../services/testimonial.service";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await getAllTestimonials({ limit: 3 });
        let data = res?.testimonials || res?.data || res || [];
        if (!Array.isArray(data)) data = [];
        setTestimonials(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="py-10 bg-white font-sans">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            What Our <span className="text-[#D4AF37]">Clients Say</span>
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg italic">
            Real Experiences from Happy Travelers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={t._id || i} className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
              <div className="flex gap-1 mb-4">
                {[...Array(Number(t.stars) || 5)].map((_, idx) => (
                  <span key={idx} className="text-[#D4AF37] text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-600 text-sm italic mb-6 leading-relaxed">
                "{t.quote || "Excellent trip experience."}"
              </p>
              <div className="border-t border-gray-200 pt-4 mt-auto">
                <p className="font-bold text-gray-900">— {t.name || "Happy Traveler"} {t.location ? `· ${t.location}` : ""}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
