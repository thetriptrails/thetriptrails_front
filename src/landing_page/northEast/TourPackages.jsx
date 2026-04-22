import React, { useState, useEffect } from 'react';
import { Star, MapPin, Calendar, Users, ArrowRight, Hotel, UtensilsCrossed, Bus, Compass } from 'lucide-react';
import BookingModal from "../../components/queryForm/Bookingmodal ";
import { getAllPackages } from "../../services/package.service";

const GOLD = "#C9A84C";

const TourPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState("");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        // Step 1: Fetch larger batch for correlation
        const res = await getAllPackages("limit=50");
        let allData = res?.packages || res?.data || res || [];
        if (!Array.isArray(allData)) allData = [];

        // Step 2: Define North East correlation (States)
        const northEastStates = ["sikkim", "arunachal pradesh", "assam", "manipur", "meghalaya", "mizoram", "nagaland", "tripura"];
        
        // Step 3: Filter by state
        const filtered = allData.filter(pkg => {
          const pkgState = pkg.state?.toLowerCase() || "";
          return northEastStates.some(state => pkgState.includes(state));
        });

        console.log("Filtered North East Packages:", filtered);
        setPackages(filtered.slice(0, 3));
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const openForm = (pkgName) => {
    setSelectedPkg(pkgName);
    setIsOpen(true);
  };

  const getIcon = (item) => {
    const lower = item.toLowerCase();
    if (lower.includes('hotel') || lower.includes('stay')) return <Hotel size={10} />;
    if (lower.includes('breakfast') || lower.includes('dinner') || lower.includes('meal')) return <UtensilsCrossed size={10} />;
    if (lower.includes('transfer') || lower.includes('sightseeing')) return <Bus size={10} />;
    return <Compass size={10} />;
  };

  return (
    <section className="py-4 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mt-3">
            Discover Your Perfect <span className="text-[#D4AF37]">North East Journey</span>
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-6"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            [1, 2, 3].map(i => <div key={i} className="h-64 bg-gray-50 animate-pulse rounded-xl" />)
          ) : packages.map((pkg) => {
            const startDate = pkg.fromDate ? new Date(pkg.fromDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : "Dec 20";

            return (
              <div key={pkg._id || Math.random()} className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-[#C9A84C]/40 hover:shadow-lg transition-all duration-300 flex flex-col h-full">

                {/* Image Section - Ultra Compact */}
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={pkg.image?.url || pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Floating Badges */}
                  <div className="absolute top-2 left-2 flex gap-1">
                    <span className="bg-[#C9A84C] text-white text-[8px] px-1.5 py-0.5 rounded font-bold uppercase">
                      {pkg.tripType || "Tour"}
                    </span>
                  </div>

                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-1.5 py-0.5 rounded flex items-center gap-1">
                    <Star size={8} fill={GOLD} color={GOLD} />
                    <span className="text-[9px] font-bold text-gray-900">{pkg.rating}</span>
                  </div>

                  <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white">
                    <MapPin size={10} className="text-[#C9A84C]" />
                    <span className="text-[9px] font-medium">{pkg.city}, {pkg.state}</span>
                  </div>
                </div>

                {/* Content Section - Tight Spacing */}
                <div className="p-3 flex flex-col flex-grow">
                  <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-[#C9A84C] transition-colors">
                    {pkg.title}
                  </h3>

                  {/* Horizontal Amenities Strip */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {pkg.includes?.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100" title={item}>
                        <span className="text-[#C9A84C]">{getIcon(item)}</span>
                        <span className="text-[8px] font-medium text-gray-500 whitespace-nowrap">{item.split(' ')[0]}</span>
                      </div>
                    ))}
                  </div>

                  {/* Date & Capacity Row */}
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-50">
                    <div className="flex items-center gap-1">
                      <Calendar size={10} className="text-gray-400" />
                      <span className="text-[9px] font-bold text-gray-700">{startDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={10} className="text-gray-400" />
                      <span className="text-[9px] font-bold text-gray-700">{pkg.noOfPerson} Persons</span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <p className="text-[7px] text-gray-400 font-bold uppercase tracking-tighter">Total Price</p>
                      <span className="text-base font-black text-gray-900">₹{pkg.price?.toLocaleString()}</span>
                    </div>

                    <button
                      onClick={() => openForm(pkg.title)}
                      className="bg-gray-900 hover:bg-[#C9A84C] text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all active:scale-95 shadow-md"
                    >
                      <span className="text-[9px] font-bold uppercase tracking-wider">Book</span>
                      <ArrowRight size={10} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BookingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Package Inquiry"
        subtitle={selectedPkg}
      />
    </section>
  );
};

export default TourPackages;
