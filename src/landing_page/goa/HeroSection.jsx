import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import BookingModal from "../../components/queryForm/Bookingmodal ";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1600&auto=format&fit=crop",
      alt: "Goa Beaches"
    },
    {
      url: "https://images.unsplash.com/photo-1549880181-4208a04b1bea?q=80&w=1600&auto=format&fit=crop",
      alt: "Goa Resorts"
    },
    {
      url: "https://images.unsplash.com/photo-1506462945848-ac8ea2f609e2?q=80&w=1600&auto=format&fit=crop",
      alt: "Tropical Goan Sunrise"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <HelmetProvider>
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#0a0a0a] font-sans">
        <Helmet>
          <title>Goa Tour Packages at Best Price | The Trip Trails Tour & Travels</title>
          <meta name="description" content="Book Goa Tour Packages at best price with The Trip Trails Tour & Travels. Enjoy beach stays, water sports & hassle-free travel. Limited time deals available!" />
          <link rel="canonical" href="https://thetriptrails.com/Goa-Tour-Packages" />
        </Helmet>

        <div className="absolute inset-0 z-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-60' : 'opacity-0'
              }`}
            >
              <img 
                src={slide.url} 
                alt={slide.alt} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 py-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Left Side: Booking Form Card */}
            <div className="w-full lg:w-5/12">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-yellow-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                
                <div className="relative bg-white p-8 lg:p-10 rounded-xl shadow-2xl text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Book Your Tour</h3>
                  <p className="text-sm text-gray-500 mb-8">
                    Get a personalized itinerary and unforgettable travel experience.
                  </p>
                  
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-[#D4AF37] hover:bg-black text-white px-8 py-4 rounded-lg font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-[0_10px_20px_rgba(212,175,55,0.3)]"
                  >
                    Send Enquiry Now
                  </button>

                  <ul className="mt-8 space-y-3 text-left">
                    <li className="flex items-center text-[12px] text-gray-600 font-medium">
                      <span className="text-[#D4AF37] mr-2">✔</span> Personalized Travel Plans
                    </li>
                    <li className="flex items-center text-[12px] text-gray-600 font-medium">
                      <span className="text-[#D4AF37] mr-2">✔</span> Comfortable Accommodations
                    </li>
                    <li className="flex items-center text-[12px] text-gray-600 font-medium">
                      <span className="text-[#D4AF37] mr-2">✔</span> 24/7 Reliable Support
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Side: Content Area */}
            <div className="w-full lg:w-7/12 text-white">
              <div className="inline-block px-4 py-1.5 border border-[#D4AF37] mb-6 bg-[#D4AF37]/5">
                <p className="text-[#D4AF37] uppercase tracking-[0.25em] text-[11px] font-bold">
                  Perfect Beach Vacation
                </p>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-serif font-semibold mb-6 leading-tight">
                <span className="text-[#D4AF37]">Goa Tour Packages</span>
              </h1>
              
              <div className="space-y-4 max-w-xl">
                <p className="text-sm md:text-lg text-gray-300 leading-relaxed">
                  Planning a perfect beach vacation? Goa Tour Packages by The Trip Trails Tour & Travels are designed to give you an unforgettable travel experience with the perfect mix of relaxation, adventure, and nightlife.
                </p>
                <p className="text-sm md:text-lg text-gray-300 leading-relaxed italic border-l-2 border-[#D4AF37] pl-4">
                  Whether you are looking for affordable Goa Tour Packages, luxury beach stays, or fully customized Goa holiday packages, we offer everything to match your travel style and budget.
                </p>
              </div>

              <div className="flex gap-10 mt-8 border-t border-white/10 pt-6">
                <div>
                  <p className="text-[#D4AF37] font-bold text-2xl">100%</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">Customized Trips</p>
                </div>
                <div>
                  <p className="text-[#D4AF37] font-bold text-2xl">Comfort</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">& Convenience</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <BookingModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
        
        <div className="absolute bottom-6 left-1/4 flex gap-2 z-20">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 transition-all ${i === currentSlide ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/30'}`}
            />
          ))}
        </div>
      </section>
    </HelmetProvider>
  );
};

export default HeroSection;
