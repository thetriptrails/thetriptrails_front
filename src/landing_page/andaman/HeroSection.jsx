import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import BookingModal from "../../components/queryForm/Bookingmodal ";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      url: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1600&auto=format&fit=crop",
      alt: "Andaman Beaches"
    },
    {
      url: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=1600&auto=format&fit=crop",
      alt: "Scuba Diving Andaman"
    },
    {
      url: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1600&auto=format&fit=crop",
      alt: "Tropical Islands"
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
          <title>Andaman Tour Packages – Book Dream Island Trip at Best Prices</title>
          <meta name="description" content="Explore Andaman Tour Packages with premium stays, scenic beaches, and thrilling water activities. Perfect for a relaxing and adventurous island getaway." />
          <link rel="canonical" href="https://thetriptrails.com/Andaman-Tour-Packages" />
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
          <div className="flex flex-col lg:flex-row items-center gap-8">
            
            <div className="w-full lg:w-7/12 text-white">
              <div className="inline-block px-4 py-1.5 border border-[#D4AF37] mb-6 bg-[#D4AF37]/5">
                <p className="text-[#D4AF37] uppercase tracking-[0.25em] text-[11px] font-bold">
                  Create memories on stunning island beaches
                </p>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-serif font-semibold mb-6 leading-tight">
                Andaman Tour Packages That Bring Your <span className="text-[#D4AF37]">Dream Vacation</span> to Life
              </h1>
              
              <div className="space-y-4 max-w-xl">
                <p className="text-sm md:text-lg text-gray-300 leading-relaxed">
                  Experience the beauty of tropical islands with premium Andaman Tour Packages designed for every traveler. From crystal-clear beaches to thrilling water activities, Andaman offers the perfect mix of relaxation and adventure.
                </p>
                <p className="text-sm md:text-lg text-gray-300 leading-relaxed italic border-l-2 border-[#D4AF37] pl-4">
                  The Trip Trails Tour & Travels brings you customized Andaman and Nicobar Tour Packages with well-planned itineraries, comfortable stays, and seamless travel arrangements. Whether you are planning a honeymoon, family vacation, or group trip, our packages ensure a memorable journey. For travelers exploring more island destinations, we also provide exclusive Lakshadweep Tour Packages tailored to your preferences and budget.
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
