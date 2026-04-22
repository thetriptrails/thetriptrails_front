import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDestinations } from "../services/destination.service";
import { XCircle, RefreshCw, ArrowRight, MapPin, Search, Star } from "lucide-react";

const GOLD = "#C9A84C";
const ITEMS_PER_PAGE = 6;

export default function DestinationGrid({ searchQuery, setSearchQuery }) {
  const navigate = useNavigate();
  const [allDestinations, setAllDestinations] = useState([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);

  const fetchDestinations = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllDestinations();
      const fetchedData = res?.destinations || res?.data?.destinations || res?.data || [];
      setAllDestinations(Array.isArray(fetchedData) ? fetchedData : []);
    } catch (err) {
      console.error("Fetch Error:", err);
      setAllDestinations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  const filteredDestinations = useMemo(() => {
    if (!searchQuery?.trim()) return allDestinations;
    const query = searchQuery.toLowerCase().trim();
    return allDestinations.filter((d) => 
      d.name?.toLowerCase().includes(query) || 
      d.description?.toLowerCase().includes(query) ||
      d.category?.toLowerCase().includes(query) ||
      d.region?.toLowerCase().includes(query)
    );
  }, [searchQuery, allDestinations]);

  const handleReset = () => {
    setSearchQuery("");
    setVisibleCount(ITEMS_PER_PAGE);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white">
        <div className="w-8 h-8 border-2 border-[#C9A84C]/20 border-t-[#C9A84C] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="w-full bg-white px-6 md:px-12 py-12 md:py-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Search Results Summary */}
        {searchQuery && filteredDestinations.length > 0 && (
          <div className="mb-12 flex items-center justify-between border-b border-gray-100 pb-8">
            <h2 className="text-xl md:text-2xl font-serif text-gray-900">
              Sanctuaries for "{searchQuery}"
            </h2>
            <button onClick={handleReset} className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C] hover:underline">
              Clear Filter
            </button>
          </div>
        )}

        {filteredDestinations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Search size={48} className="text-gray-100 mb-6" />
            <h3 className="text-2xl font-serif text-gray-400 italic mb-8">No sanctuaries match your quest</h3>
            <button onClick={handleReset} className="px-10 py-4 bg-[#C9A84C] text-white rounded-full text-[10px] font-bold uppercase tracking-[2px]">
              Discover All Destinations
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {filteredDestinations.slice(0, visibleCount).map((d) => (
                <div 
                  key={d._id} 
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
                  onClick={() => navigate(`/destinations/${d._id}`)}
                >
                  <div className="relative h-48 md:h-60 overflow-hidden">
                    <img 
                      src={d.image?.url || "https://images.unsplash.com/photo-1590050752117-23a9d7f0b943?q=80&w=800"} 
                      alt={d.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-[#C9A84C]/20 text-[10px] font-bold text-gray-900">
                      <Star size={10} fill={GOLD} color={GOLD} />
                      {d.rating || "5.0"}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col items-center text-center">
                    <span className="text-[9px] uppercase font-bold tracking-[3px] text-[#C9A84C] mb-2">
                      {d.category}
                    </span>
                    <h3 className="text-2xl font-serif text-gray-900 mb-2 group-hover:text-[#C9A84C] transition-colors leading-tight line-clamp-1">
                      {d.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs font-sans tracking-wide">
                      <MapPin size={12} className="text-[#C9A84C]" />
                      {d.city ? `${d.city}, ${d.state}` : d.region || "Uttarakhand"}
                    </div>
                    
                    <div className="w-full h-px bg-gray-50 my-6" />
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[2px] text-[#C9A84C] group-hover:gap-4 transition-all uppercase">
                      Explore Sanctuary <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < filteredDestinations.length && (
              <div className="mt-20 text-center">
                <button
                  onClick={() => setVisibleCount(v => v + ITEMS_PER_PAGE)}
                  className="px-12 py-4 rounded-full border border-[#C9A84C] text-[#C9A84C] text-[10px] font-bold uppercase tracking-[3px] hover:bg-[#C9A84C] hover:text-white transition-all shadow-md active:scale-95"
                >
                  Discover More Sanctuaries
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}