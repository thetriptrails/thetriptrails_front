import React from 'react';
import ContactForm from './ContactForm';
import { contactDetails } from './ContactData.jsx';

const ContactSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-white overflow-hidden relative">
      {/* Decorative Blob for visual appeal on mobile */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-50 rounded-full blur-[100px] opacity-60" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Header & Small Cards */}
          <div className="lg:col-span-5 space-y-10 md:space-y-12 text-center lg:text-left">
            <div>
              <span className="text-[#C69E3D] font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Get In Touch</span>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-black text-[#0B1D48] leading-[1.1] mb-6">
                Start Your <br className="hidden md:block" />
                <span className="text-[#C69E3D]">Himalayan</span> <br className="hidden md:block" />
                Journey.
              </h2>
              <p className="text-gray-400 text-sm md:text-lg font-medium max-w-sm mx-auto lg:mx-0">
                Our local experts are ready to craft a story you'll tell for a lifetime.
              </p>
            </div>

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
              {contactDetails.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 md:gap-6 p-4 md:p-5 rounded-[2rem] bg-gray-50/50 hover:bg-white border border-transparent hover:border-gray-100 transition-all group shadow-sm hover:shadow-md">
                  <div className={`shrink-0 w-12 h-12 md:w-14 md:h-14 ${item.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-[10deg] transition-transform`}>
                    <item.icon className="text-white w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{item.title}</h4>
                    <p className="text-[#0B1D48] font-bold text-sm md:text-lg truncate">{item.info}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 w-full">
            <ContactForm />
          </div>
        </div>
      </div>

      <div className="mt-12 md:mt-16 text-center">
         <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2">
           <span className="w-1.5 h-1.5 bg-[#C69E3D] rounded-full animate-ping" />
           Reply guaranteed within 24 hours
         </p>
      </div>
    </section>
  );
};

export default ContactSection;