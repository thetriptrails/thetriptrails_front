import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllPackages } from "../../services/package.service";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

export default function PackagesGrid({ activeFilter }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await getAllPackages();
        setPackages(res.data || []);
      } catch (err) {
        console.error("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const filtered = packages.filter((pkg) => {
    const matchesActiveFilter = activeFilter === "All" || pkg.tripType === activeFilter || pkg.category === activeFilter;
    const destParam = searchParams.get("search")?.toLowerCase();
    const travelersParam = searchParams.get("noOfPerson");
    
    const matchesDest = !destParam || 
      pkg.city?.toLowerCase().includes(destParam) ||
      pkg.state?.toLowerCase().includes(destParam) ||
      pkg.country?.toLowerCase().includes(destParam) ||
      pkg.title?.toLowerCase().includes(destParam);
      
    const matchesTravellers = !travelersParam || (pkg.noOfPerson) >= parseInt(travelersParam);

    return matchesActiveFilter && matchesDest && matchesTravellers;
  });

  if (loading) return <div className="py-40 text-center uppercase tracking-widest text-xs" style={{ color: GOLD }}>Loading...</div>;

  return (
    <section className="w-full bg-white px-4 md:px-16 py-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Compact Header */}
        <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
          <button onClick={() => navigate("/")} className="text-[10px] font-bold tracking-widest uppercase" style={{ color: GOLD }}>
            ← Home
          </button>
          {searchParams.toString() && (
            <button onClick={() => navigate("/packages")} className="text-[10px] font-bold uppercase underline" style={{ color: GOLD }}>
              Reset Filters
            </button>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((pkg) => (
              <div
                key={pkg._id}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-40" />
                  <span className="absolute top-3 left-3 bg-white/90 text-[8px] font-bold tracking-tighter uppercase px-2 py-1 rounded shadow-sm">
                    {pkg.tripType}
                  </span>
                </div>

                <div className="p-5 flex flex-col grow">
                  <div className="mb-1">
                    <h3 className="text-lg font-serif font-bold text-gray-900 leading-tight">
                      {pkg.title}
                    </h3>
                    <p className="text-[10px] font-medium mt-1 uppercase" style={{ color: GOLD }}>
                      {pkg.city}, {pkg.state}, {pkg.country}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
                    {pkg.includes?.slice(0, 3).map((inc, i) => (
                      <span key={i} className="text-[9px] bg-gray-50 px-2 py-0.5 rounded text-gray-500 border border-gray-100">
                        {inc}
                      </span>
                    ))}
                    <span className="text-[9px] bg-gold/10 px-2 py-0.5 rounded text-[#C9A84C] border border-[#C9A84C]/20 font-bold">
                      👥 {pkg.noOfPerson || pkg.travellers || 0} MAX
                    </span>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div>
                      <p className="text-[8px] font-bold text-gray-400 uppercase">Per Person</p>
                      <p className="text-xl font-bold" style={{ color: NAVY }}>
                        ₹{Number(pkg.price || 0).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <button
                      onClick={() => navigate("/contact")}
                      className="px-4 py-2 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all shadow-sm"
                      style={{ background: GOLD, color: "white" }}
                    >
                      View →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-sm font-serif italic text-gray-400 mb-2">No packages match your search</p>
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: NAVY }}>Sorry, no data found.</h2>
            <button 
              onClick={() => navigate("/packages")}
              className="mt-6 text-[10px] font-bold tracking-widest uppercase border-b-2 pb-1"
              style={{ color: GOLD, borderColor: GOLD }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}