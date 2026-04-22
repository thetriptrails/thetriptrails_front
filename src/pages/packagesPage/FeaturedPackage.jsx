import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllPackages } from "../../services/package.service";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

export default function FeaturedPackage() {
  const navigate = useNavigate();

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  const calculateDuration = (from, to) => {
    if (!from || !to) return "Flexible";
    const start = new Date(from);
    const end = new Date(to);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays + 1} Days / ${diffDays} Nights`;
  };

  /* ================= FETCH LATEST PACKAGE ================= */
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await getAllPackages();

        if (res?.data?.length) {
          // sort latest first
          const sorted = [...res.data].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          setPkg(sorted[0]); // latest package
        }
      } catch (err) {
        console.error("Failed to load featured package", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
  }, []);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">
        Loading featured package...
      </div>
    );
  }

  /* ================= EMPTY ================= */
  if (!pkg) {
    return null;
  }

  return (
    <section className="w-full bg-[#FAFAF7] px-4 sm:px-8 md:px-16 lg:px-24 pt-12 pb-12">
      <div className="max-w-7xl mx-auto">
        <span
          className="text-xs tracking-[3px] uppercase font-medium block mb-4"
          style={{ color: GOLD }}
        >
          Featured Package
        </span>

        <div
          className="rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 group shadow-xl"
          style={{ border: "0.5px solid #E5E0D5", background: "#fff" }}
        >
          {/* Image */}
          <div className="relative min-h-75 md:min-h-100 overflow-hidden">
            <img
              src={pkg.image}
              alt={pkg.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-linear-to-r from-black/40 to-transparent md:hidden" />

            <div
              className="absolute top-6 left-6 px-4 py-2 rounded backdrop-blur-md border border-white/20"
              style={{ background: "rgba(27, 43, 75, 0.8)" }}
            >
              <span className="text-xs font-bold text-white uppercase">
                Latest Package
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            {/* Badges */}
            <div className="flex gap-2 mb-4 flex-wrap">
              <span
                className="text-[10px] font-bold px-3 py-1 rounded-full"
                style={{ background: GOLD, color: "#fff" }}
              >
                ★ {pkg.rating || 4.5}
              </span>

              <span
                className="text-[10px] font-bold px-3 py-1 rounded-full"
                style={{
                  background: "#F5F5F0",
                  color: NAVY,
                  border: `1px solid ${NAVY}`,
                }}
              >
                {calculateDuration(pkg.fromDate, pkg.toDate)}
              </span>
              
              <span
                className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter"
                style={{
                  background: GOLD,
                  color: "#fff",
                }}
              >
                👥 Max {pkg.noOfPerson || pkg.travellers || 0} People
              </span>
            </div>

            <h2
              className="text-2xl md:text-4xl font-semibold mb-2"
              style={{ color: NAVY }}
            >
              {pkg.title}
            </h2>
            
            <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: GOLD }}>
               📍 {pkg.city}, {pkg.state}, {pkg.country}
            </p>

            <p className="text-sm text-gray-400 mb-6 italic">
              {pkg.category} Experience
            </p>

            <div
              className="w-full mb-6"
              style={{ height: "1px", background: "#E5E0D5" }}
            />

            {/* Includes */}
            <p className="text-[10px] uppercase font-bold text-gray-500 mb-4">
              Includes
            </p>

            <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-8">
              {(pkg.includes || []).slice(0, 6).map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs text-gray-600"
                >
                  <span
                    className="w-4 h-4 flex items-center justify-center rounded-full text-[10px]"
                    style={{ background: `${GOLD}20`, color: GOLD }}
                  >
                    ✓
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <div
              className="w-full mb-6"
              style={{ height: "1px", background: "#E5E0D5" }}
            />

            {/* Price */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-[10px] uppercase text-gray-400">
                  Starting From
                </p>
                <p className="text-3xl font-bold" style={{ color: NAVY }}>
                  ₹{Number(pkg.price || 0).toLocaleString('en-IN')}
                  <span className="text-xs text-gray-400"> / person</span>
                </p>
              </div>

              <button
                onClick={() => navigate("/contact")}
                className="px-8 py-3.5 rounded-lg text-sm font-bold text-white hover:shadow-lg"
                style={{ background: GOLD }}
              >
                Send Enquiry →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}