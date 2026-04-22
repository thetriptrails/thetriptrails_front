import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Mountain, Calendar, ArrowRight, Wallet, Users, Compass } from 'lucide-react';
import { getAllDestinations } from "../../services/destination.service";

const GOLD = "#C9A84C";

const ExploreDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        // Step 1: Fetch larger set for correlation
        const res = await getAllDestinations({ limit: 50 });
        let allData = res?.destinations || res?.data || res || [];
        if (!Array.isArray(allData)) allData = [];

        // Step 2: Define North East correlation
        const northEastStates = ["sikkim", "arunachal pradesh", "assam", "manipur", "meghalaya", "mizoram", "nagaland", "tripura"];

        // Step 3: Filter by state
        const filtered = allData.filter(dest => {
          const destState = dest.state?.toLowerCase() || "";
          return northEastStates.some(state => destState.includes(state));
        });

        console.log("Filtered North East Destinations:", filtered);
        setDestinations(filtered.slice(0, 3));
      } catch (error) {
        console.error("Error fetching destinations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  return (
    <section className="py-8 md:py-12 bg-[#FDFDFB] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Responsive Header */}
        <div className="text-left mb-8 md:mb-12 border-l-4 border-[#C9A84C] pl-4 md:pl-6">
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight md:leading-none">
            Discover Your Perfect <span className="text-[#C9A84C] italic">North East Journey</span>
          </h2>
        </div>

        {/* Responsive Grid System */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="h-[350px] md:h-[400px] bg-gray-100 animate-pulse rounded-xl" />
            ))
          ) : destinations.map((dest) => (
            <div
              key={dest._id || Math.random()}
              onClick={() => navigate(`/destinations/${dest._id}`)}
              className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-[#C9A84C]/30 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col h-full"
            >
              {/* Image Section */}
              <div className="relative h-40 sm:h-44 overflow-hidden">
                <img
                  src={dest.image?.url}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Floating Tags */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <span className="bg-[#C9A84C] text-white text-[8px] px-2 py-1 rounded font-black uppercase tracking-tighter">
                    {dest.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                  <div className="flex items-center gap-1.5 text-white">
                    <MapPin size={12} className="text-[#C9A84C]" />
                    <span className="text-[10px] font-bold tracking-wide">{dest.city}, {dest.state}</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 px-2 py-1 rounded-md flex items-center gap-1">
                    <Star size={10} fill={GOLD} color={GOLD} />
                    <span className="text-white text-[10px] font-bold">{dest.rating}</span>
                    <span className="text-white/60 text-[9px]">({dest.numReviews})</span>
                  </div>
                </div>
              </div>

              {/* Detailed Content Section */}
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#C9A84C] transition-colors leading-tight">
                    {dest.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Compass size={12} className="text-gray-300" />
                  <span className="text-[10px] font-bold text-[#C9A84C] uppercase italic">{dest.experience}</span>
                </div>

                <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed mb-4">
                  {dest.description}
                </p>

                {/* Data Matrix */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-4 border-t border-gray-50 mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gray-50 rounded-lg">
                      <Mountain size={12} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-[8px] text-gray-400 uppercase font-bold">Altitude</p>
                      <p className="text-[10px] font-bold text-gray-800">{dest.altitude}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gray-50 rounded-lg">
                      <Calendar size={12} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-[8px] text-gray-400 uppercase font-bold">Best Time</p>
                      <p className="text-[10px] font-bold text-gray-800">{dest.bestTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gray-50 rounded-lg">
                      <Users size={12} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-[8px] text-gray-400 uppercase font-bold">Group Size</p>
                      <p className="text-[10px] font-bold text-gray-800">{dest.noOfPerson} Persons</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-[#C9A84C]/10 rounded-lg">
                      <Wallet size={12} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="text-[8px] text-[#C9A84C] uppercase font-bold">Starting Price</p>
                      <p className="text-[11px] font-black text-gray-900">₹{dest.budget?.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Micro Action */}
                <div className="mt-5 flex items-center justify-between text-[10px] font-black tracking-widest text-gray-900">
                  <span className="group-hover:translate-x-1 transition-transform">PLAN THIS TRIP</span>
                  <div className="h-[1px] flex-grow mx-2 md:mx-4 bg-gray-100 group-hover:bg-[#C9A84C]/30 transition-colors" />
                  <ArrowRight size={14} className="text-[#C9A84C]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreDestinations;
