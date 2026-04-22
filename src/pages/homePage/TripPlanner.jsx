import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const destinations = [
  "Kedarnath", "Nainital", "Rishikesh", "Mussoorie",
  "Valley of Flowers", "Jim Corbett", "Badrinath",
  "Gangotri", "Auli", "Almora",
];

const tripTypes = [
  "Pilgrimage", "Adventure Trek", "Hill Station",
  "Wildlife Safari", "Yoga Retreat", "Custom",
];

const selectClass =
  "w-full bg-[#FAFAF7] rounded-md px-3 py-2.5 text-xs text-gray-600 outline-none cursor-pointer";
const inputClass =
  "w-full bg-[#FAFAF7] rounded-md px-3 py-2.5 text-xs text-gray-600 outline-none placeholder:text-gray-400";

export default function TripPlanner() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    destination: "",
    date: "",
    type: "",
    travelers: "",
  });

  const handle = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSearch = () => navigate("/packages");

  return (
    <section className="w-full bg-[#FAFAF7] px-4 sm:px-8 md:px-16 lg:px-24 py-12">
      <div className="max-w-7xl mx-auto">
        <div
          className="bg-white rounded-2xl px-6 md:px-8 py-8"
          style={{ border: "0.5px solid #E5E0D5" }}
        >
          {/* Header */}
          <div className="text-center mb-7">
            <span
              className="text-xs tracking-[3px] uppercase font-medium block mb-2"
              style={{ color: GOLD }}
            >
              Plan Your Trip
            </span>
            <h2
              className="text-2xl md:text-3xl font-semibold"
              style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
            >
              Find Your Perfect{" "}
              <span style={{ color: GOLD }}>Journey</span>
            </h2>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div className="lg:col-span-1">
              <label className="text-[10px] text-gray-400 block mb-1.5">
                Destination
              </label>
              <select
                name="destination"
                value={form.destination}
                onChange={handle}
                className={selectClass}
                style={{ border: "0.5px solid #E5E0D5" }}
              >
                <option value="">Select destination</option>
                {destinations.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-1">
              <label className="text-[10px] text-gray-400 block mb-1.5">
                Travel Date
              </label>
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handle}
                className={inputClass}
                style={{ border: "0.5px solid #E5E0D5" }}
              />
            </div>

            <div className="lg:col-span-1">
              <label className="text-[10px] text-gray-400 block mb-1.5">
                Trip Type
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handle}
                className={selectClass}
                style={{ border: "0.5px solid #E5E0D5" }}
              >
                <option value="">Pilgrimage / Trek...</option>
                {tripTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-1">
              <label className="text-[10px] text-gray-400 block mb-1.5">
                Travelers
              </label>
              <select
                name="travelers"
                value={form.travelers}
                onChange={handle}
                className={selectClass}
                style={{ border: "0.5px solid #E5E0D5" }}
              >
                <option value="">Select</option>
                {["1 Adult", "2 Adults", "Family (3–4)", "Group (5+)"].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSearch}
              className="w-full py-2.5 rounded-md text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: GOLD }}
            >
              Search →
            </button>
          </div>

          {/* Quick tags */}
          <div className="flex flex-wrap gap-2 mt-5 items-center">
            <span
              className="text-[10px]"
              style={{ color: "#888", fontFamily: "sans-serif" }}
            >
              Popular:
            </span>
            {["Char Dham", "Rishikesh Rafting", "Nainital Trip", "Valley of Flowers"].map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() => navigate("/packages")}
                  className="text-[10px] px-3 py-1 rounded-full transition-colors hover:bg-amber-50"
                  style={{
                    border: `0.5px solid ${GOLD}`,
                    color: GOLD,
                    fontFamily: "sans-serif",
                  }}
                >
                  {tag}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}