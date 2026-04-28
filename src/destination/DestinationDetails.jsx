import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDestinationById } from "../services/destination.service";
import { 
  ArrowLeft, MapPin, Star, Mountain, Calendar, 
  Users, Check, Shield, Search, ChevronRight, 
  Phone, MessageCircle, Info, Camera, Share2, Compass
} from "lucide-react";

const GOLD = "#C9A84C";

export default function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dest, setDest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await getDestinationById(id);
        const data = res?.destination || res?.data || res;
        setDest(data);
      } catch (err) {
        console.error("Failed to fetch destination:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetail();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#C9A84C]/20 border-t-[#C9A84C] rounded-full animate-spin" />
    </div>
  );

  if (!dest) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-serif text-gray-900 mb-4">Sanctuary Not Found</h2>
      <button onClick={() => navigate("/destinations")} className="text-sm font-bold text-[#C9A84C] uppercase tracking-widest border-b border-[#C9A84C]">Back to Exploration</button>
    </div>
  );

  return (
    <div className="bg-white min-h-screen pb-24 md:pb-12 font-sans overflow-x-hidden">
      
      {/* --- MOBILE/DESKTOP HERO --- */}
      <div className="relative w-full h-[50vh] md:h-[75vh]">
        <img 
          src={dest.image?.url || "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200"} 
          alt={dest.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30" />
        
        {/* Floating Actions */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
          <button 
            onClick={() => navigate(-1)}
            className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg text-gray-900 border border-gray-100"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex gap-3">
             <button className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg text-gray-900 border border-gray-100">
               <Share2 size={18} />
             </button>
          </div>
        </div>

        {/* Hero Title Overlay */}
        <div className="absolute bottom-8 left-6 right-6 md:left-24">
           <div className="flex items-center gap-2 mb-2">
              <div className="h-px w-6 bg-[#C9A84C]" />
              <span className="text-[9px] uppercase font-bold tracking-[3px] text-[#C9A84C]">
                Premier {dest.category}
              </span>
           </div>
           <h1 className="text-4xl md:text-7xl font-serif text-gray-900 leading-tight">
             {dest.name}
           </h1>
           <div className="flex items-center gap-2 text-gray-600 font-sans text-xs tracking-wide font-medium">
              <MapPin size={14} className="text-[#C9A84C]" />
              {dest.city ? `${dest.city}, ${dest.state}, India` : dest.region}
           </div>
        </div>
      </div>

      {/* --- CONTENT LAYOUT --- */}
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-20 flex flex-col lg:flex-row gap-12">
        
        {/* Left Column: Information */}
        <div className="flex-1 space-y-12">
           
           {/* Mobile Stats Box */}
           <div className="bg-[#FDFCF0] rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 border border-[#C9A84C]/10">
              {[
                { label: "Altitude", val: dest.altitude || "High", icon: Mountain },
                { label: "Best Visit", val: dest.bestTime || "Oct-Mar", icon: Calendar },
                { label: "Group Size", val: `${dest.noOfPerson || 12} Pax`, icon: Users },
                { label: "Guest Rating", val: `${dest.rating || 4.9}/5`, icon: Star }
              ].map((spec, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                   <div className="w-9 h-9 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3">
                      <spec.icon size={16} className="text-[#C9A84C]" />
                   </div>
                   <span className="text-[8px] uppercase font-black tracking-widest text-[#C9A84C]/60 mb-1">{spec.label}</span>
                   <span className="text-xs font-bold text-gray-900 uppercase tracking-tighter">{spec.val}</span>
                </div>
              ))}
           </div>

            {/* Single Stream Details */}
            <div className="space-y-16">
               {/* Overview Section */}
               <section className="animate-fadeIn">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-[20px] w-1 bg-[#C9A84C] rounded-full" />
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900">Overview</h2>
                  </div>
                  <div className="space-y-6">
                     <p className="text-xl md:text-2xl font-serif text-gray-800 leading-relaxed italic">
                       "{dest.tagline || 'A hidden sanctuary where nature and luxury converge.'}"
                     </p>
                     <div className="text-gray-500 font-sans leading-relaxed text-sm space-y-4">
                        {dest.description?.split('\n').map((p, i) => <p key={i}>{p}</p>) || (
                          <p>Discover the untouched beauty of this magnificent location, carefully curated for the discerning traveler seeking peace, heritage, and luxury.</p>
                        )}
                     </div>
                  </div>
               </section>

               {/* Highlights Section */}
               <section className="animate-fadeIn">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-[20px] w-1 bg-[#C9A84C] rounded-full" />
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900">Experience Highlights</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {["Pristine Landscapes", "Cultural Heritage", "Bespoke Services", "Luxury Accommodation"].map((h, i) => (
                       <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
                          <Check size={16} className="text-[#C9A84C]" />
                          <span className="text-sm font-medium text-gray-700">{h}</span>
                       </div>
                     ))}
                  </div>
               </section>

               {/* FAQ section */}
               <section className="animate-fadeIn">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-[20px] w-1 bg-[#C9A84C] rounded-full" />
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900">Good to Know</h2>
                  </div>
                  <div className="p-8 rounded-3xl bg-gray-50/50 border border-gray-100">
                     <div className="flex items-start gap-4">
                        <Info size={20} className="text-[#C9A84C] shrink-0 mt-1" />
                        <div>
                           <p className="text-sm font-bold text-gray-900 mb-2">Advance Booking Recommended</p>
                           <p className="text-xs text-gray-500 leading-relaxed">Due to the exclusive nature of this sanctuary, we recommend booking at least 4-6 weeks in advance during peak season.</p>
                        </div>
                     </div>
                  </div>
               </section>
            </div>
        </div>

        {/* Right Column: Pricing & Quick Contact (Desktop Sticky) */}
        <div className="w-full lg:w-[400px]">
           <div className="sticky top-12 space-y-6">
              <div className="bg-white rounded-[2.5rem] p-10 border border-[#C9A84C]/20 shadow-2xl relative">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Compass size={120} />
                  </div>
                  
                  <div className="relative z-10 text-center">
                     <p className="text-[10px] uppercase font-bold tracking-[3px] text-[#C9A84C] mb-4">Exceptional Value</p>
                     <div className="flex items-baseline justify-center gap-2 mb-8">
                        <span className="text-xs text-gray-400 uppercase font-bold tracking-widest">Est.</span>
                        <span className="text-5xl font-serif text-gray-900">₹{Number(dest.budget || 15000).toLocaleString('en-IN')}</span>
                        <span className="text-gray-400 text-xs">/pax</span>
                     </div>

                     <div className="space-y-4 mb-10 w-full">
                        <div className="flex justify-between items-center py-3 border-b border-gray-50">
                           <span className="text-[10px] font-bold text-gray-400 uppercase">Availability</span>
                           <span className="text-xs font-bold text-green-600">Now Requestable</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-50">
                           <span className="text-[10px] font-bold text-gray-400 uppercase">Secure Booking</span>
                           <Shield size={14} className="text-[#C9A84C]" />
                        </div>
                     </div>

                     <button 
                        onClick={() => navigate("/contact", { state: { source: dest.name } })}
                        className="w-full py-4 rounded-2xl bg-[#C9A84C] text-white text-[11px] font-bold uppercase tracking-[2px] transition-all shadow-xl hover:-translate-y-1 active:scale-95"
                     >
                       Request Availability
                     </button>
                     <p className="text-[9px] text-gray-400 mt-6 font-sans">Official quotes provided within 24 hours.</p>
                  </div>
              </div>

              {/* Direct Reach Card */}
              <div className="bg-gray-50 rounded-[2rem] p-8 flex flex-col items-center">
                 <p className="text-xs font-bold text-gray-900 mb-6 uppercase tracking-widest">Speak to our Specialists</p>
                 <div className="flex gap-4 w-full">
                    <a href="tel:+919582215091" className="flex-1 p-4 rounded-2xl bg-white flex flex-col items-center gap-2 shadow-sm border border-gray-100 hover:border-[#C9A84C]/30 transition-colors">
                       <Phone size={18} className="text-[#C9A84C]" />
                       <span className="text-[9px] font-bold uppercase text-gray-500 tracking-tighter">Call Now</span>
                    </a>
                    <a href="https://wa.me/919582215091" target="_blank" rel="noreferrer" className="flex-1 p-4 rounded-2xl bg-white flex flex-col items-center gap-2 shadow-sm border border-gray-100 hover:border-[#C9A84C]/30 transition-colors">
                       <MessageCircle size={18} className="text-[#C9A84C]" />
                       <span className="text-[9px] font-bold uppercase text-gray-500 tracking-tighter">WhatsApp</span>
                    </a>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* --- MOBILE STICKY FOOTER --- */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[100] animate-slideInUp">
         <div className="bg-white/90 backdrop-blur-xl border border-[#C9A84C]/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2rem] p-4 flex justify-between items-center px-8">
            <div className="flex flex-col">
               <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest italic">Starting At</span>
               <span className="text-xl font-bold font-serif text-gray-900">₹{Number(dest.budget || 15000).toLocaleString()}</span>
            </div>
            <button 
              onClick={() => navigate("/contact", { state: { source: dest.name } })}
              className="bg-[#C9A84C] text-white px-8 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-all"
            >
              Enquire Now
            </button>
         </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translate(0, 100%); }
          to { opacity: 1; transform: translate(0, 0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease forwards; }
        .animate-slideInUp { animation: slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

    </div>
  );
}