import React from 'react';

const ServicesSection = () => {
  const services = [
    {
      title: "No Hidden Charges",
      desc: "Clear pricing with no extra or hidden costs. What you see is exactly what you pay.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Flexible Booking",
      desc: "Easy booking with options to change your travel plans. We adapt to your schedule.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      )
    },
    {
      title: "Certified Guides",
      desc: "Trained and experienced guides for a better travel experience. Local experts at your side.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      )
    },
    {
      title: "Travel Insurance",
      desc: "Travel with safety and basic insurance support included. We prioritize your well-being.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0112 2.714z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-10 bg-white text-gray-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          
          {/* Content Column */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-8 text-gray-900">
              Our Travel Services for a <span className="text-[#D4AF37]">Hassle-Free Journey</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6 border-l-4 border-[#D4AF37] pl-6">
              At The Trip Trails, we provide complete travel solutions to make your Uttarakhand trip smooth, safe, and enjoyable. From planning to execution, our services are designed to give you comfort, transparency, and peace of mind throughout your journey.
            </p>
          </div>

          {/* Services Grid Column */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="p-8 bg-white border border-gray-100 rounded-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:border-[#D4AF37]/40 transition-all duration-500 group"
              >
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#D4AF37] mb-6 group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-500">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-gray-900">
                  <span className="text-[#D4AF37]">✔️</span> {service.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesSection;