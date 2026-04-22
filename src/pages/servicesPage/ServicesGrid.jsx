import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllServices } from "../../services/services.service";
import { MapPin, Users } from "lucide-react";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

export default function ServicesGrid() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await getAllServices();
        const servicesData = res?.services || res?.data || res || [];
        setServices(Array.isArray(servicesData) ? servicesData : []);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="w-full pt-2 pb-12 px-4 md:px-10 bg-white"> {/* Top spacing removed (pt-2) & Bg white */}
      <div className="max-w-6xl mx-auto">

        {/* Header - Reduced margin bottom */}
        <div className="text-center mb-8">
          <h2
            className="text-2xl md:text-4xl font-medium"
            style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
          >
            Our <span style={{ color: GOLD }}>Services</span>
          </h2>
          <div className="w-10 h-0.5 mt-2 mx-auto rounded-full" style={{ background: GOLD }} />
        </div>

        {/* States */}
        {loading ? (
          <p className="text-center text-gray-400 animate-pulse text-sm">Loading services...</p>
        ) : services.length === 0 ? (
          <p className="text-center text-gray-400 text-sm">No services available right now.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => {
              const imageUrl =
                typeof s.image === "string"
                  ? s.image.startsWith("http") ? s.image : `http://localhost:5000/${s.image}`
                  : s.image?.url || "https://via.placeholder.com/400x200?text=No+Image";

              return (
                <div
                  key={s._id}
                  className="bg-white rounded-xl overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-lg"
                  style={{ border: "1px solid #f0ece2" }}
                >
                  {/* Image */}
                  <div className="relative w-full h-44 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1"
                      style={{ background: `linear-gradient(90deg, ${GOLD}, #e8c872, ${GOLD})` }}
                    />
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-5">
                    {s.category && (
                      <p
                        className="text-[9px] font-bold uppercase tracking-[0.15em] mb-1"
                        style={{ color: GOLD }}
                      >
                        {s.category}
                      </p>
                    )}

                    <h3
                      className="text-base font-semibold mb-1"
                      style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
                    >
                      {s.title}
                    </h3>

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#FBF5E8] text-[9px] font-bold text-[#9a7530] uppercase">
                        <MapPin size={10} />
                        <span>{s.city || "Various"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-gray-50 text-[9px] font-bold text-gray-500 uppercase">
                        <Users size={10} />
                        <span>{s.noOfPerson || 1}+ People</span>
                      </div>
                    </div>

                    <p className="text-[12px] text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-2">
                      {s.description}
                    </p>

                    {/* Footer - Tightened spacing */}
                    <div
                      className="flex items-center justify-between pt-3"
                      style={{ borderTop: "1px solid #f8f5f0" }}
                    >
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-gray-400 font-medium">
                          {s.price === "Custom" ? "Price" : "From"}
                        </p>
                        <p
                          className="text-sm font-bold"
                          style={{ color: s.price === "Custom" ? NAVY : GOLD }}
                        >
                          {s.price === "Custom" ? "Custom" : `₹${s.price}`}
                        </p>
                      </div>

                      <button
                        onClick={() => navigate("/contact")}
                        className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-all duration-300 shadow-sm"
                        style={{ background: NAVY, color: GOLD }}
                        onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = NAVY; e.currentTarget.style.color = GOLD; }}
                      >
                        Send Enquiry
                        <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}