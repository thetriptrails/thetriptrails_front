import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const GOLD = "#C9A84C";
const tripTypes = ["All Types", "Adventure", "Pilgrimage", "Wildlife", "Hill Station", "Custom"];

export default function PackagesFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  /* ================= STATE ================= */
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [startDate, setStartDate] = useState(searchParams.get("fromDate") || "");
  const [endDate, setEndDate] = useState(searchParams.get("toDate") || "");
  const [tripType, setTripType] = useState(searchParams.get("tripType") || "All Types");
  const [noOfPerson, setNoOfPerson] = useState(searchParams.get("noOfPerson") || 1);

  /* ================= SYNC WITH URL CHANGES ================= */
  // If user navigates from Home to Filter, we need to update local state
  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
    setStartDate(searchParams.get("fromDate") || "");
    setEndDate(searchParams.get("toDate") || "");
    setTripType(searchParams.get("tripType") || "All Types");
    setNoOfPerson(searchParams.get("noOfPerson") || 1);
  }, [searchParams]);

  /* ================= ACTIONS ================= */
  const applyFilters = () => {
    const params = {
      search: searchTerm,
      fromDate: startDate,
      toDate: endDate,
      tripType: tripType === "All Types" ? "" : tripType,
      noOfPerson: noOfPerson,
    };
    
    // Remove empty values to keep URL clean
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== "" && v !== null)
    );
    
    setSearchParams(cleanParams);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setTripType("All Types");
    setNoOfPerson(1);
    setSearchParams({});
  };

  /* ================= STYLES ================= */
  const inputClass = 
    "w-full bg-[#FAFAF7] rounded-md px-3 py-2.5 text-xs text-gray-700 border-[0.5px] border-[#E5E0D5] outline-none focus:border-[#C9A84C] transition-all";
  
  const labelClass = 
    "text-[10px] uppercase font-bold text-gray-400 mb-1 block tracking-wider";

  return (
    <section className="w-full bg-[#FAFAF7] px-4 pb-6 pt-6">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl p-6 shadow-sm border border-[#E5E0D5]">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
          
          {/* Destination */}
          <div>
            <label className={labelClass}>Destination</label>
            <input 
              type="text" 
              placeholder="e.g. Manali"
              className={inputClass} 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>

          {/* From Date */}
          <div>
            <label className={labelClass}>From</label>
            <input 
              type="date" 
              className={inputClass} 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
            />
          </div>

          {/* To Date */}
          <div>
            <label className={labelClass}>To</label>
            <input 
              type="date" 
              className={inputClass} 
              value={endDate} 
              min={startDate} 
              onChange={(e) => setEndDate(e.target.value)} 
            />
          </div>

          {/* Travellers */}
          <div>
            <label className={labelClass}>Travellers</label>
            <select 
              className={inputClass} 
              value={noOfPerson} 
              onChange={(e) => setNoOfPerson(e.target.value)}
            >
               {[1, 2, 3, 4, 5, 6, "7+"].map(n => (
                 <option key={n} value={n}>{n} {n === 1 ? "Person" : "People"}</option>
               ))}
            </select>
          </div>

          {/* Trip Type */}
          <div>
            <label className={labelClass}>Trip Type</label>
            <select 
              className={inputClass} 
              value={tripType} 
              onChange={(e) => setTripType(e.target.value)}
            >
              {tripTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button 
              onClick={applyFilters} 
              className="flex-1 py-2.5 text-[11px] font-bold text-white rounded-md transition-all active:scale-95 shadow-sm" 
              style={{ background: GOLD }}
            >
              APPLY
            </button>
            <button 
              onClick={resetFilters} 
              className="flex-1 py-2.5 text-[11px] font-bold rounded-md border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-all active:scale-95"
            >
              RESET
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}