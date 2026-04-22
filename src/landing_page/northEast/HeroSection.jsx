import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import BookingModal from "../../components/queryForm/Bookingmodal ";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYsGor1_xTFPdNWzASFugEp1_TyZOWAooG3g&s",
      alt: "Sikkim Mountains"
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1m8k2jGI84xeut5zJOeFrV5Gg27aS1Vm1LA&s",
      alt: "Assam Tea Gardens"
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi5fenHhD82NdDl0dCwZAa-l5ubH_QHBj4kw&s",
      alt: "Meghalaya Roots Bridge"
    }
  ];

  // Auto-change background every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <HelmetProvider>
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#0a0a0a] font-sans">
        {/* SEO Meta Data */}
        <Helmet>
          <title>North East India Tour Packages at Best Price - Book Now</title>
          <meta name="description" content="Get best deals on north east india tour packages. Travel to Sikkim, Assam & Meghalaya with comfortable stays and expert planning by The Trip Trails Tour & Travels." />
          <link rel="canonical" href="https://thetriptrails.com/north-east-india-tour-packages" />
        </Helmet>

        {/* Dynamic Background Slider */}
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
          <div className="flex flex-col lg:flex-row items-center gap-8">
            
            {/* Left Side: Content Area */}
            <div className="w-full lg:w-7/12 text-white">
              <div className="inline-block px-4 py-1.5 border border-[#D4AF37] mb-6 bg-[#D4AF37]/5">
                <p className="text-[#D4AF37] uppercase tracking-[0.25em] text-[11px] font-bold">
                  Explore North East with The Trip Trails
                </p>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-serif font-semibold mb-6 leading-tight">
                Explore <span className="text-[#D4AF37]">North East India</span> with <br /> 
                Premium Tour Packages
              </h1>
              
              <div className="space-y-4 max-w-xl">
                <p className="text-sm md:text-lg text-gray-300 leading-relaxed">
                  Experience unforgettable journeys with The Trip Trails Tour & Travels through our expertly crafted north east india tour packages. 
                </p>
                <p className="text-sm md:text-lg text-gray-300 leading-relaxed italic border-l-2 border-[#D4AF37] pl-4">
                  From misty mountains to lush valleys, discover the untouched beauty of India’s most scenic destinations with comfort and affordability. We provide personalized travel plans to suit every need and budget.
                </p>
              </div>

              <div className="flex gap-10 mt-8 border-t border-white/10 pt-6">
                <div>
                  <p className="text-[#D4AF37] font-bold text-2xl">100%</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">Custom Itineraries</p>
                </div>
                <div>
                  <p className="text-[#D4AF37] font-bold text-2xl">Expert</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">Local Planning</p>
                </div>
              </div>
            </div>

            {/* Right Side: Glowing Booking Card */}
            <div className="w-full lg:w-5/12">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-yellow-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                
                <div className="relative bg-white p-8 lg:p-10 rounded-xl shadow-2xl text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Book Your Tour</h3>
                  <p className="text-sm text-gray-500 mb-8">
                    Get best deals on North East India tour packages today.
                  </p>
                  
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-[#D4AF37] hover:bg-black text-white px-8 py-4 rounded-lg font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-[0_10px_20px_rgba(212,175,55,0.3)]"
                  >
                    Send Enquiry Now
                  </button>

                  <ul className="mt-8 space-y-3 text-left">
                    <li className="flex items-center text-[12px] text-gray-600 font-medium">
                      <span className="text-[#D4AF37] mr-2">✔</span> Comfortable Stays
                    </li>
                    <li className="flex items-center text-[12px] text-gray-600 font-medium">
                      <span className="text-[#D4AF37] mr-2">✔</span> Expert Trip Planning
                    </li>
                    <li className="flex items-center text-[12px] text-gray-600 font-medium">
                      <span className="text-[#D4AF37] mr-2">✔</span> 24/7 Support Team
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Component */}
        <BookingModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
        
        {/* Slide Indicators */}
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