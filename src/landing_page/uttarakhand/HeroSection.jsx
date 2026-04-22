import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import BookingModal from "../../components/queryForm/Bookingmodal ";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <HelmetProvider>
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#0a0a0a] font-sans">
        {/* SEO Meta Data */}
        <Helmet>
          <title>Book Uttarakhand Tour Packages Online - The Trip Trails</title>
          <meta name="description" content="Plan your perfect Uttarakhand trip with trusted experts. Custom tours, great prices, and full support by The Trip Trails." />
          <link rel="canonical" href="https://thetriptrails.com/uttarakhand-tour-packages" />
        </Helmet>

        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2000&auto=format&fit=crop" 
            alt="Uttarakhand Tour Packages" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 py-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Left Side: Text Content */}
            <div className="w-full lg:w-7/12 text-white">
              {/* Tagline Box */}
              <div className="inline-block px-4 py-1.5 border border-[#D4AF37] mb-6 bg-[#D4AF37]/5">
                <p className="text-[#D4AF37] uppercase tracking-[0.25em] text-[11px] font-bold">
                  Explore Uttarakhand with The Trip Trails
                </p>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-serif font-semibold mb-6 leading-tight">
                Premium <span className="text-[#D4AF37]">Uttarakhand Tour Packages</span> <br /> 
                Crafted for Every Traveler
              </h1>
              
              <p className="text-sm md:text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
                Unlock the beauty of the Himalayas with our expertly designed itineraries. 
                Whether you seek spiritual solace in Kedarnath, adventure in Auli, or a 
                serene escape to Nainital, our packages offer seamless travel, 
                premium stays, and authentic local experiences at the best prices.
              </p>

              <div className="flex gap-10 border-l-2 border-[#D4AF37] pl-6 py-2">
                <div>
                  <p className="text-[#D4AF37] font-bold text-2xl">50+</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">Custom Itineraries</p>
                </div>
                <div>
                  <p className="text-[#D4AF37] font-bold text-2xl">4.9/5</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">Guest Ratings</p>
                </div>
              </div>
            </div>

            {/* Right Side: Glowing Form Card */}
            <div className="w-full lg:w-5/12">
              <div className="relative group">
                {/* The Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-yellow-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                
                <div className="relative bg-white p-8 lg:p-10 rounded-xl shadow-2xl text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Book Your Trip</h3>
                  <p className="text-sm text-gray-500 mb-8">
                    Get a free quote and expert consultation for your Uttarakhand journey.
                  </p>
                  
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-[#D4AF37] hover:bg-black text-white px-8 py-4 rounded-lg font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-[0_10px_20px_rgba(212,175,55,0.3)]"
                  >
                    Send Enquiry Now
                  </button>

                  <ul className="mt-8 space-y-3 text-left">
                    <li className="flex items-center text-[12px] text-gray-600">
                      <span className="text-[#D4AF37] mr-2">✔</span> Lowest Price Guaranteed
                    </li>
                    <li className="flex items-center text-[12px] text-gray-600">
                      <span className="text-[#D4AF37] mr-2">✔</span> 24/7 On-Trip Assistance
                    </li>
                    <li className="flex items-center text-[12px] text-gray-600">
                      <span className="text-[#D4AF37] mr-2">✔</span> Personal Travel Expert
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
      </section>
    </HelmetProvider>
  );
};

export default HeroSection;