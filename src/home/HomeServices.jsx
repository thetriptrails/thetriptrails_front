import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllServices } from "../services/services.service";
import { MapPin, Users } from "lucide-react";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

export default function HomeServices() {
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
    <section className="w-full py-12 px-4 md:px-10" style={{ background: "#FAFAF7" }}>
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2
            className="text-2xl md:text-4xl font-medium"
            style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
          >
            Our <span style={{ color: GOLD }}>Services</span>
          </h2>
          <div className="w-10 h-0.5 mt-3 mx-auto rounded-full" style={{ background: GOLD }} />
        </div>

        {/* States */}
        {loading ? (
          <p className="text-center text-gray-400 animate-pulse text-sm">Loading services...</p>
        ) : services.length === 0 ? (
          <p className="text-center text-gray-400 text-sm">No services available right now.</p>
        ) : (
          <>
            {/* Grid - Mobile First (1 column), Tablet (2), Desktop (3) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.slice(0, 3).map((s) => {
                const imageUrl =
                  typeof s.image === "string"
                    ? s.image.startsWith("http")
                      ? s.image
                      : `http://localhost:5000/${s.image}`
                    : s.image?.url || "https://via.placeholder.com/400x200?text=No+Image";

                return (
                  <div
                    key={s._id}
                    className="bg-white rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-lg"
                    style={{ border: "0.5px solid #e8e2d0" }}
                  >
                    {/* Image - Fixed Height for consistency */}
                    <div className="relative w-full h-48 md:h-52 overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={s.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div
                        className="absolute bottom-0 left-0 right-0 h-1"
                        style={{ background: GOLD }}
                      />
                    </div>

                    {/* Body */}
                    <div className="flex flex-col flex-1 p-5">
                      {s.category && (
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: GOLD }}>
                          {s.category}
                        </p>
                      )}

                      <h3 className="text-base font-medium mb-2" style={{ color: NAVY, fontFamily: "'Georgia', serif" }}>
                        {s.title}
                      </h3>

                      {/* Location & Capacity Info */}
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1 text-[10px] text-gray-500">
                          <MapPin size={10} color={GOLD} />
                          <span>{s.city ? `${s.city}, ${s.state}` : "Global Service"}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-gray-500">
                          <Users size={10} color={GOLD} />
                          <span>{s.noOfPerson || 2}+ People</span>
                        </div>
                      </div>

                      <p className="text-[13px] text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-2">
                        {s.description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4" style={{ borderTop: "0.5px solid #f0ece2" }}>
                        <div>
                          <p className="text-[9px] uppercase tracking-widest text-gray-400 font-medium">
                            {s.price === "Custom" ? "Price" : "From"}
                          </p>
                          <p className="text-base font-semibold" style={{ color: NAVY }}>
                            {s.price === "Custom" ? "Custom" : `₹${s.price}`}
                          </p>
                        </div>

                        <button
                          onClick={() => navigate("/contact")}
                          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
                          style={{ background: NAVY, color: GOLD }}
                          onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = "#fff"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = NAVY; e.currentTarget.style.color = GOLD; }}
                        >
                          Send Enquiry
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M3 8h10M9 4l4 4-4 4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Explore Services Button - Refined & Clear */}
            <div className="mt-12 text-center">
              <button
                onClick={() => navigate("/services")}
                className="inline-flex items-center gap-2 px-10 py-3.5 rounded-full transition-all duration-300 font-bold uppercase tracking-widest text-[11px] shadow-lg hover:shadow-2xl active:scale-95 border-2 border-transparent hover:border-[#C9A84C20]"
                style={{
                  background: GOLD,
                  color: "#FFFFFF",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = "brightness(1.05)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = "brightness(1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                View More Services
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}