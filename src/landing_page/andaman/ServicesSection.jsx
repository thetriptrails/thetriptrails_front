import React, { useState, useEffect } from 'react';
import BookingModal from "../../components/queryForm/Bookingmodal ";
import { Clock, Users, ArrowRight } from 'lucide-react';
import { getAllPackages } from "../../services/package.service";

const ServicesSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState("");
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await getAllPackages("?limit=9");
        let data = res?.packages || res?.data || res || [];
        if (!Array.isArray(data)) data = [];
        setPackages(data.slice(0, 9));
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  const handleBookNow = (pkgName) => {
    setSelectedPkg(pkgName);
    setIsModalOpen(true);
  };

  return (
    <section className="py-10 bg-white font-sans">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Best <span className="text-[#D4AF37]">Andaman & Lakshadweep</span> Tour Packages
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Experience the magic of the islands with our top-rated itineraries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div key={pkg._id || index} className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={pkg.image?.url || pkg.image || "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=800&auto=format&fit=crop"} 
                  alt={pkg.title || pkg.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-[#D4AF37] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  Tour Special
                </div>
              </div>

              <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-[#D4AF37] transition-colors">
                  {pkg.title || pkg.name}
                </h3>
                
                <div className="flex items-center gap-3 mb-4 text-[12px] text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock size={14} className="text-[#D4AF37]" /> {pkg.duration || "4N / 5D"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={14} className="text-[#D4AF37]" /> Group
                  </span>
                </div>

                <div className="mt-auto border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Starts at</p>
                  <p className="text-xl font-bold text-gray-900 mb-4">
                    ₹{pkg.price || "Contact Us"}<span className="text-[12px] font-normal text-gray-500 ml-1">/ Person</span>
                  </p>

                  <button onClick={() => handleBookNow(pkg.title || pkg.name)} className="w-full py-2.5 bg-white border border-[#D4AF37] text-[#D4AF37] font-bold rounded-lg hover:bg-[#D4AF37] hover:text-white transition-all uppercase text-[11px] tracking-widest shadow-sm">
                    Book Now
                  </button>
                  <p className="mt-2 text-center text-[9px] text-gray-400 italic">
                    “This price is applicable only for a group of four persons.”
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Book Tour Package"
        subtitle={`Inquiry for: ${selectedPkg}`}
      />
    </section>
  );
};

export default ServicesSection;
