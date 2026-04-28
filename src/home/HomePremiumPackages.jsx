import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPackages } from "../services/package.service"; 
import BookingModal from "../components/queryForm/Bookingmodal "; 

const GOLD = "#C9A84C";
const TEXT_DARK = "#2D2D2D";
const OFF_WHITE = "#FCFBFA";

export default function HomePremiumPackages() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedPackage, setSelectedPackage] = useState(null);
  const calculateDuration = (from, to) => {
    if (!from || !to) return "Flexible";
    const start = new Date(from);
    const end = new Date(to);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays + 1} Days / ${diffDays} Nights`;
  };
  
  // State for API data
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getAllPackages("?limit=3&sort=createdAt");
        
        if (response.success && Array.isArray(response.data)) {
          setPackages(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEnquire = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  // Optional: Loading skeleton or spinner
  if (isLoading) {
    return <div className="w-full py-20 text-center text-gray-500">Loading Premium Experiences...</div>;
  }

  return (
    <section className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-16 md:py-20" style={{ background: OFF_WHITE }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs tracking-[3px] uppercase font-medium block mb-2" style={{ color: GOLD }}>
              Exclusive Selection
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold" style={{ color: TEXT_DARK, fontFamily: "'Georgia', serif" }}>
              Premium <span style={{ color: GOLD }}>Packages</span>
            </h2>
          </div>
          <button
            onClick={() => navigate("/packages")}
            className="text-sm font-medium px-5 py-2.5 rounded self-start sm:self-auto transition-all hover:opacity-80 shrink-0"
            style={{ border: `1.5px solid ${GOLD}`, color: GOLD }}
          >
            View All →
          </button>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg._id} // Using MongoDB _id instead of title
              className="bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              style={{ border: "0.5px solid #E5E0D5" }}
            >
              {/* Card Top: Gold Banner */}
              <div className="px-5 py-5" style={{ background: GOLD }}>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[10px] font-bold text-white/90 tracking-wider">
                    ★ {pkg.rating} RATING
                  </p>
                  <p className="text-[10px] font-bold text-white/90 tracking-wider">
                    {calculateDuration(pkg.fromDate, pkg.toDate)}
                  </p>
                </div>
                <h3 className="text-lg font-semibold text-white leading-tight">{pkg.title}</h3>
                <p className="text-[10px] text-white/80 mt-1 uppercase tracking-widest">
                  {pkg.city}, {pkg.state}, {pkg.country}
                </p>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>
                  What's Included
                </p>
                <div className="grid grid-cols-2 gap-y-2 mb-5">
                  {pkg.includes && pkg.includes.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="text-[10px]" style={{ color: GOLD }}>✔</span> {item}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-4 p-2 rounded bg-gray-50" style={{ color: TEXT_DARK }}>
                   <span style={{ color: GOLD }}>👥</span> Capacity: {pkg.noOfPerson || pkg.travellers || 0} People
                </div>
                
                <div className="w-full mb-5" style={{ height: "1px", background: "#F0EBE3" }} />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-medium">Starts from</p>
                    <p className="text-xl font-bold" style={{ color: TEXT_DARK }}>
                      ₹{Number(pkg.price || 0).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleEnquire(pkg)}
                    className="text-xs font-bold px-5 py-2.5 rounded text-white transition-transform active:scale-95 shadow-md"
                    style={{ 
                      background: GOLD,
                      boxShadow: `0 4px 10px -2px ${GOLD}66` 
                    }}
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        packageData={selectedPackage}
        title="Custom Package Inquiry"
        submitLabel="Request Details"
      />
    </section>
  );
}