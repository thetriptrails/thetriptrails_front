import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getAllDestinations } from "../services/destination.service";
import { Filter, X, MapPin, IndianRupee } from "lucide-react";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔥 1. Sync Fetch with URL Params
  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        setLoading(true);
        
        // Convert URLSearchParams to a plain object for the API
        const params = Object.fromEntries([...searchParams]);
        
        // Call backend (your controller handles minBudget, maxBudget, etc.)
        const res = await getAllDestinations(params);
        
        const data = res.destinations || res.data?.destinations || [];
        setDestinations(data);
      } catch (err) {
        console.error("Filter Error:", err);
        setError("Failed to fetch matching destinations.");
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredData();
  }, [searchParams]); // Re-runs whenever the URL changes

  // 2. Helper to remove a filter tag
  const removeFilter = (key) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    if (key === "minBudget") newParams.delete("maxBudget");
    setSearchParams(newParams);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF7]">
      <div className="animate-pulse text-gray-400 font-medium tracking-widest uppercase text-xs">Refining Results...</div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#FAFAF7] pt-28 pb-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        {/* ── Header Section ── */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>
            Search <span style={{ color: GOLD }}>Results</span>
          </h1>
          
          {/* Active Filter Tags */}
          <div className="flex flex-wrap gap-2">
            {searchParams.get("search") && (
              <FilterTag label={`"${searchParams.get("search")}"`} onClear={() => removeFilter("search")} />
            )}
            {searchParams.get("experience") && (
              <FilterTag label={searchParams.get("experience")} onClear={() => removeFilter("experience")} />
            )}
            {searchParams.get("maxBudget") && (
              <FilterTag label={`Under ₹${Number(searchParams.get("maxBudget")).toLocaleString()}`} onClear={() => removeFilter("minBudget")} />
            )}
            {searchParams.size > 0 && (
              <button onClick={() => setSearchParams({})} className="text-[10px] font-bold uppercase text-red-400 ml-2 hover:text-red-600">
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* ── Grid Section ── */}
        {destinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {destinations.map((d) => (
              <div 
                key={d._id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group cursor-pointer"
                onClick={() => navigate(`/destinations/${d._id}`)}
              >
                <div className="relative h-60 overflow-hidden">
                  <img src={d.image?.url} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest text-white" style={{ background: GOLD }}>
                    {d.category}
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold" style={{ color: NAVY }}>{d.name}</h3>
                    <div className="flex items-center gap-1 text-sm font-bold" style={{ color: GOLD }}>
                      ★ <span>{d.rating || "4.5"}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                    <MapPin size={12} /> {d.region}
                  </div>
                  
                  <p className="text-gray-500 text-sm line-clamp-2 italic mb-6">"{d.description}"</p>
                  
                  <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                    <div>
                      <p className="text-[9px] uppercase text-gray-400 font-bold">Starting from</p>
                      <p className="text-lg font-bold" style={{ color: NAVY }}>₹{d.budget?.toLocaleString()}</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: GOLD }}>View Detail →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-dashed border-gray-200">
            <Filter size={40} className="text-gray-200 mb-4" />
            <p className="text-gray-400 text-lg italic">No destinations matched your criteria.</p>
            <button 
              onClick={() => navigate("/")} 
              className="mt-6 px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest text-white transition-transform active:scale-95"
              style={{ background: NAVY }}
            >
              Back to Trip Planner
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

function FilterTag({ label, onClear }) {
  return (
    <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-sm">
      <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">{label}</span>
      <button onClick={onClear} className="text-gray-400 hover:text-red-500 transition-colors">
        <X size={12} />
      </button>
    </div>
  );
}