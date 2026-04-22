import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { getAllDestinations } from "../services/destination.service";

const GOLD = "#C9A84C";

export default function HomeLatestDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await getAllDestinations({ limit: 3, sort: "createdAt" });
        const data = res?.destinations || res?.data || res || [];
        setDestinations(Array.isArray(data) ? data.slice(0, 3) : []);
      } catch (err) {
        console.error("Failed to fetch home destinations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  if (loading || destinations.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Simplified Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight">
              Latest <span className="italic text-[#C9A84C]">Curated</span> Destinations
            </h2>
          </div>
          <button 
            onClick={() => navigate("/destinations")}
            className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[2px] text-[#C9A84C] border border-[#C9A84C]/20 px-5 py-2 rounded-full hover:bg-[#C9A84C] hover:text-white transition-all mx-auto md:mx-0"
          >
            Explore More <ArrowRight size={14} />
          </button>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {destinations.map((dest, i) => (
            <div 
              key={dest._id || i}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
              onClick={() => navigate(`/destinations/${dest._id}`)}
            >
              <div className="relative h-48 md:h-60 overflow-hidden">
                <img 
                  src={dest.image?.url || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800"} 
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-[#C9A84C]/20 text-[10px] font-bold text-gray-900">
                  <Star size={10} fill={GOLD} color={GOLD} />
                  {dest.rating || "5.0"}
                </div>
              </div>
              
              <div className="p-6 flex flex-col items-center text-center">
                  <span className="text-[9px] uppercase font-bold tracking-[3px] text-[#C9A84C] mb-2">
                    {dest.category}
                  </span>
                  <h3 className="text-2xl font-serif text-gray-900 mb-2 group-hover:text-[#C9A84C] transition-colors line-clamp-1">{dest.name}</h3>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs font-sans tracking-wide">
                    <MapPin size={12} className="text-[#C9A84C]" />
                    {dest.city ? `${dest.city}, ${dest.state}` : dest.region}
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
