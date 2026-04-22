import React, { useEffect, useState } from 'react';
import { getAllTestimonials } from '../services/testimonial.service';

const GOLD = "linear-gradient(135deg, #C9A84C 0%, #8B6E2A 100%)";
const BORDER_GOLD = "rgba(201, 168, 76, 0.3)";
const DARK_TEXT = "#1A1A1A";

export default function HomeTestimonials() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await getAllTestimonials();
        setReviews(res.data);
      } catch (error) {
        console.error("Failed to load testimonials", error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="relative w-full py-8 overflow-hidden bg-[#FAF9F6]">
      {/* Decorative background "aura" */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] bg-[#C9A84C20]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] bg-[#C9A84C15]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-4xl md:text-5xl font-light text-center leading-tight">
            Trusted by <span className="font-serif italic text-[#C9A84C]">Elite</span> Travelers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <div
              key={r._id || r.name}
              className="group relative p-1 rounded-3xl transition-all duration-500 hover:scale-[1.02]"
              style={{ background: `linear-gradient(180deg, ${BORDER_GOLD}, transparent)` }}
            >
              <div className="h-full bg-white rounded-[23px] p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
                {/* Gold Quote Mark */}
                <div className="mb-6">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M10 8L4 18H10V24H4V18L7 8H10ZM22 8L16 18H22V24H16V18L19 8H22Z" fill="#C9A84C" fillOpacity="0.4" />
                  </svg>
                </div>

                <p className="text-lg leading-relaxed text-[#4A4A4A] mb-8 font-serif">
                  "{r.quote}"
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <div className="relative">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                      style={{ background: GOLD }}
                    >
                      {r.initials}
                    </div>

                    {/* Verified badge */}
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#C9A84C">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-bold tracking-tight text-[#1A1A1A]">{r.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-gray-400 font-medium">{r.location}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>

                      <div className="flex">
                        {[...Array(r.stars || 5)].map((_, i) => (
                          <span key={i} className="text-[10px]" style={{ color: '#C9A84C' }}>★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}