import React, { useState, useEffect } from 'react';
import { Clock, Users, ArrowRight } from 'lucide-react';
import { getAllPackages } from "../../services/package.service";

const ServicesSection = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await getAllPackages("?limit=3");
        let data = res?.packages || res?.data || res || [];
        if (!Array.isArray(data)) data = [];
        setPackages(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  return (
    <section className="py-10 bg-white font-sans">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Popular <span className="text-[#D4AF37]">South India</span> Tour Packages
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our Best-Selling Tour Packages
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div key={pkg._id || index} className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={pkg.image?.url || pkg.image || "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=800&auto=format&fit=crop"} 
                  alt={pkg.title || pkg.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-md">
                  <p className="text-[#D4AF37] font-bold text-sm">Best Seller</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#D4AF37] transition-colors">
                  {pkg.title || pkg.name}
                </h3>
                
                <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock size={16} className="text-[#D4AF37]" /> {pkg.duration || "5 Nights / 6 Days"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={16} className="text-[#D4AF37]" /> Group Tour
                  </span>
                </div>

                <div className="flex items-end justify-between border-t border-gray-100 pt-5">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Starts at</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{pkg.price || "Contact Us"}<span className="text-sm font-normal text-gray-500"> /Person</span>
                    </p>
                  </div>
                  <button className="bg-[#D4AF37] hover:bg-black text-white p-3 rounded-lg transition-colors shadow-lg">
                    <ArrowRight size={20} />
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <button className="w-full py-3 border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-lg hover:bg-[#D4AF37] hover:text-white transition-all uppercase text-xs tracking-widest">
                    Book Now
                  </button>
                  <p className="mt-3 text-[10px] text-gray-400 italic">
                    “This price is applicable only for a group of four persons.”
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;