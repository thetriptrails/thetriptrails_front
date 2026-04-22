import React from 'react';

const WhyChooseUs = () => {
  const features = [
    {
      title: "Trusted Partner",
      desc: "Over 15 years of excellence creating memorable and safe Uttarakhand journeys for thousands of travelers.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      )
    },
    {
      title: "Expert Local Guides",
      desc: "Certified guides who know every trail, temple, and hidden gem intimately — your safety is always first.",
      // Map Pin Icon
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      )
    },
    {
      title: "Custom Itineraries",
      desc: "Tailor-made tours designed entirely around your preferences, budget, and travel style.",
      // Adjustment/Sparkle Icon
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.456-2.454L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      )
    },
    {
      title: "24/7 Support",
      desc: "Round-the-clock dedicated assistance to ensure a seamless and stress-free experience.",
      // Phone/Support Icon
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-10 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          
          {/* Left Side: Enhanced Card Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 order-2 lg:order-1">
            {features.map((item, index) => (
              <div 
                key={index} 
                className="group relative p-8 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(212,175,55,0.1)] hover:border-[#D4AF37]/30 transition-all duration-500"
              >
                {/* Gold Icon Container */}
                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-6 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-500 transform group-hover:rotate-[360deg]">
                  {item.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  {item.desc}
                </p>
                
                {/* Subtle bottom accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#D4AF37] group-hover:w-full transition-all duration-500 rounded-b-2xl"></div>
              </div>
            ))}
          </div>

          {/* Right Side: Content remains exactly as you requested */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight mb-8">
                Why Choose The Trip Trails for Your <span className="text-[#D4AF37]">Uttarakhand Journey?</span>
              </h2>
              
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed text-lg italic border-l-4 border-[#D4AF37] pl-6">
                  "The Trip Trails Tour & Travels Agency - we go beyond just travel planning, we create memorable experiences."
                </p>
                <p className="text-gray-500 leading-relaxed">
                  With our local expertise, affordable packages, and 24/7 support, we ensure every trip is smooth, safe, and perfectly tailored to your needs. Whether it’s adventure, relaxation, or a spiritual journey, you can trust us to make your Uttarakhand trip truly special.
                </p>
              </div>

              <div className="mt-10">
                <a 
                  href="/about" 
                  className="inline-flex items-center justify-center px-10 py-4 bg-gray-900 text-white text-xs font-black uppercase tracking-[0.2em] rounded-full hover:bg-[#D4AF37] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  Learn More About Us
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;