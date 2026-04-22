import { useEffect, useRef, useState } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";

const GOLD = "#C9A84C";

export default function DestinationHero({ searchQuery, setSearchQuery }) {
  const dropdownRef = useRef(null);
  const [inputVal, setInputVal] = useState(searchQuery || "");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setInputVal(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (inputVal?.length > 2) {
        setIsLoading(true);
        try {
          const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            inputVal
          )}&countrycodes=in&limit=6&addressdetails=1`;
          
          const response = await fetch(url);
          const data = await response.json();
          setSuggestions(data);
          setShowDropdown(true);
        } catch (error) {
          console.error("Geocoding error:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [inputVal]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setSearchQuery(inputVal);
    setShowDropdown(false);
  };

  return (
    <section className="relative w-full min-h-[70vh] flex items-center justify-center px-4 py-12 overflow-visible bg-[#050505]">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-40 scale-110"
          alt="India Background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-black/80"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-20 w-full text-center">
        <h1
          className="text-4xl sm:text-6xl md:text-8xl font-light leading-[1.1] mb-6 sm:mb-10 text-white tracking-tight px-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Discover <span className="italic font-normal text-[#D4AF37]">India</span>
          <br className="hidden sm:block" /> like never before.
        </h1>

        {/* Search Wrapper */}
        <div className="relative max-w-2xl mx-auto w-full px-2" ref={dropdownRef}>
          <form
            onSubmit={handleSearch}
            className="group relative z-30 flex flex-col sm:flex-row items-center gap-3 bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-full p-2 border border-white/20 transition-all focus-within:border-[#D4AF37]/50"
          >
            <div className="flex items-center flex-1 w-full">
              <div className="pl-4">
                {isLoading ? (
                  <Loader2 size={20} className="text-[#D4AF37] animate-spin" />
                ) : (
                  <MapPin size={20} className="text-[#D4AF37]" />
                )}
              </div>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onFocus={() => inputVal.length > 2 && setShowDropdown(true)}
                placeholder="Search City, State or Landmark..."
                className="flex-1 text-base outline-none bg-transparent placeholder:text-white/40 text-white py-4 px-3 font-light custom-input"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-xl sm:rounded-full text-xs font-bold uppercase tracking-widest text-white transition-all active:scale-95 flex items-center justify-center gap-2"
              style={{ background: `linear-gradient(135deg, ${GOLD}, #B8962E)` }}
            >
              Search <Search size={16} />
            </button>
          </form>

          {/* Fixed Suggestions Dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute top-[calc(100%+12px)] left-0 right-0 bg-[#141414] border border-white/10 rounded-3xl overflow-hidden z-[999] shadow-[0_30px_60px_rgba(0,0,0,0.7)] animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                {suggestions.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setInputVal(item.display_name);
                      setSearchQuery(item.display_name);
                      setShowDropdown(false);
                    }}
                    className="w-full px-6 py-5 flex items-start gap-4 text-left hover:bg-white/5 transition-all border-b border-white/5 last:border-0 group/item"
                  >
                    <div className="mt-1 flex-shrink-0">
                      <MapPin size={18} className="text-[#D4AF37] group-hover/item:scale-110 transition-transform" />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0 flex-1">
                      <span className="text-white font-semibold text-base sm:text-lg leading-tight truncate">
                        {item.address.city || item.address.town || item.address.state || "Location Found"}
                      </span>
                      <span className="text-white/50 text-xs sm:text-sm leading-normal whitespace-normal break-words">
                        {item.display_name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&display=swap');
          
          .custom-input:-webkit-autofill {
            -webkit-text-fill-color: white !important;
            -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
            transition: background-color 5000s ease-in-out 0s;
          }

          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(212, 175, 55, 0.2);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(212, 175, 55, 0.4);
          }
        `}
      </style>
    </section>
  );
}