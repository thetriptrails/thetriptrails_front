import React from 'react';
import { User, Phone, Mail, Calendar, MessageSquare, Send } from 'lucide-react';

const ContactForm = () => {
  return (
    <div className="relative overflow-hidden bg-white p-6 sm:p-10 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
      
      {/* Background Accent for Mobile Decor */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#C69E3D]/10 rounded-full blur-2xl opacity-50" />

      <form className="relative z-10 space-y-6 md:space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8">
          <InputField label="Full Name" placeholder="Your Name" Icon={User} />
          <InputField label="Phone" placeholder="+91 00000 00000" Icon={Phone} />
          <InputField label="Email" placeholder="mail@example.com" Icon={Mail} type="email" />
          <InputField label="Subject" placeholder="Trip Details" Icon={Calendar} />
        </div>

        <div className="space-y-2 md:space-y-3">
          <label className="text-[10px] md:text-xs font-black text-[#0B1D48] uppercase tracking-[0.2em] ml-2">Message</label>
          <div className="relative">
            <MessageSquare className="absolute left-5 top-5 text-gray-300 w-5 h-5" />
            <textarea 
              rows="4"
              placeholder="Tell us about your dream trip..."
              className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-[1.5rem] md:rounded-3xl focus:ring-2 focus:ring-[#C69E3D]/20 focus:bg-white transition-all outline-none resize-none shadow-inner text-sm md:text-base"
            />
          </div>
        </div>

        <button className="group relative w-full py-4 md:py-5 bg-[#0B1D48] text-white font-bold rounded-2xl overflow-hidden transition-all active:scale-95 shadow-lg">
          <div className="absolute inset-0 bg-[#C69E3D] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <span className="relative flex items-center justify-center gap-3 tracking-widest uppercase text-xs md:text-sm">
            <Send className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            Send Enquiry
          </span>
        </button>
      </form>
    </div>
  );
};

const InputField = ({ label, placeholder, Icon, type = "text" }) => (
  <div className="space-y-2 md:space-y-3">
    <label className="text-[10px] md:text-xs font-black text-[#0B1D48] uppercase tracking-[0.2em] ml-2">{label}</label>
    <div className="relative group/input">
      <Icon className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/input:text-[#C69E3D] transition-colors w-5 h-5" />
      <input 
        type={type} 
        placeholder={placeholder}
        className="w-full pl-14 pr-6 py-3.5 md:py-4 bg-gray-50 border-none rounded-xl md:rounded-2xl focus:ring-2 focus:ring-[#C69E3D]/20 focus:bg-white transition-all outline-none shadow-inner text-sm md:text-base"
      />
    </div>
  </div>
);

export default ContactForm;