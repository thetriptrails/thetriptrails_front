import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, Mountain, Landmark, Hotel, Map, Users, Car, AlertTriangle
} from "lucide-react";
import { getAllServices, deleteService } from "../../services/services.service";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";


export default function ServiceList({ refresh, onEdit, onRefresh }) {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await getAllServices();
      const data = res?.services || res?.data || res || [];
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when the 'refresh' prop changes
  useEffect(() => { fetchServices(); }, [refresh]);

  const handleDelete = async () => {
    if (!deleteModal) return;
    try {
      setDeleting(true);
      await deleteService(deleteModal._id);
      setServices((prev) => prev.filter((s) => s._id !== deleteModal._id));
      setDeleteModal(null);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(false);
    }
  };

  const filtered = services.filter((s) =>
    s.title?.toLowerCase().includes(search.toLowerCase()) ||
    s.category?.toLowerCase().includes(search.toLowerCase())
  );

  const getImageUrl = (image) => {
    if (typeof image === "string")
      return image.startsWith("http") ? image : `http://localhost:5000/${image}`;
    return image?.url || null;
  };

  return (
    <div style={{ color: NAVY }}>
      {/* ── Search ── */}
      <div className="relative mb-6 max-w-sm">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#aaa" }} />
        <input
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-full outline-none"
          style={{ background: "#fff", border: "0.5px solid #e8e2d0", color: NAVY, fontSize: 13 }}
        />
      </div>

      {/* ── Loading ── */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-9 h-9 rounded-full border-2 border-gray-200 animate-spin" style={{ borderTopColor: GOLD }} />
        </div>
      )}

      {/* ── Empty ── */}
      {!loading && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "#FBF5E8" }}>
            <Search size={22} style={{ color: GOLD }} />
          </div>
          <p className="text-sm font-medium">No services found</p>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <>
          {/* Mobile View */}
          <div className="flex flex-col gap-3 sm:hidden">
            {filtered.map((s) => {
              const imageUrl = getImageUrl(s.image);
              return (
                <div key={s._id} className="bg-white rounded-2xl overflow-hidden" style={{ border: "0.5px solid #e8e2d0" }}>
                  <div className="flex items-center gap-3 p-4">
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0" style={{ background: "#FBF5E8" }}>
                      {imageUrl ? <img src={imageUrl} alt={s.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center font-bold text-[8px]" style={{ color: GOLD }}>NO IMG</div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{s.title}</p>
                      <p className="text-[10px] uppercase font-semibold" style={{ color: GOLD }}>{s.category || "—"}</p>
                      <p className="text-[9px] text-gray-400 italic">{s.city ? `${s.city}, ${s.state}` : "Location not set"}</p>
                    </div>
                  </div>
                  <div className="flex" style={{ borderTop: "0.5px solid #f0ece2" }}>
                    <button onClick={() => onEdit(s)} className="flex-1 py-3 text-xs font-semibold" style={{ color: GOLD, borderRight: "0.5px solid #f0ece2" }}>Edit</button>
                    <button onClick={() => setDeleteModal(s)} className="flex-1 py-3 text-xs font-semibold text-red-600">Delete</button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block bg-white rounded-2xl overflow-hidden" style={{ border: "0.5px solid #e8e2d0" }}>
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ borderBottom: "0.5px solid #ede8da", background: "#FAFAF7" }}>
                  {["Service", "Category", "Location", "Rating", "Status", "Price", "Actions"].map((h) => (
                    <th key={h} className="text-left px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, idx) => {
                  const imageUrl = getImageUrl(s.image);
                  return (
                    <tr key={s._id} className="hover:bg-[#FAFAF7] transition-colors" style={{ borderBottom: idx < filtered.length - 1 ? "0.5px solid #f0ece2" : "none" }}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0" style={{ background: "#FBF5E8" }}>
                            {imageUrl ? <img src={imageUrl} alt={s.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center font-bold text-[7px]" style={{ color: GOLD }}>NO IMG</div>}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{s.title}</p>
                            <p className="text-xs text-gray-400 truncate max-w-45">{s.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-[10px] font-bold uppercase px-3 py-1 rounded-full" style={{ background: "#FBF5E8", color: "#9a7530" }}>{s.category || "—"}</span>
                      </td>
                      <td className="px-5 py-4 text-[10px] text-gray-500 italic">
                        {s.city ? `${s.city}, ${s.state}, ${s.country}` : "Global"}
                      </td>
                      <td className="px-5 py-4 text-[10px] font-bold uppercase">
                         <span style={{ color: GOLD }}>★ {s.ratings || 0}</span>
                         <span className="ml-1 text-gray-400 font-normal">({s.numReviews || 0})</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-[9px] font-bold uppercase px-2 py-1 rounded ${s.isActive ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-400"}`}>
                          {s.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-semibold text-sm">
                        ₹{Number(s.price || 0).toLocaleString("en-IN")}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {/* Edit Button */}
                          <button 
                            onClick={() => onEdit(s)} 
                            className="px-3 py-1.5 rounded-full text-xs font-medium" 
                            style={{ background: "#FBF5E8", color: "#9a7530", border: "0.5px solid #e8d9a0" }}
                          >
                            Edit
                          </button>

                          {/* Delete Button */}
                          <button 
                            onClick={() => setDeleteModal(s)} 
                            className="px-3 py-1.5 rounded-full text-xs font-medium" 
                            style={{ background: "#FEF2F2", color: "#c0392b", border: "0.5px solid #fecaca" }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(27,43,75,0.4)" }}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm" style={{ border: "0.5px solid #e8e2d0" }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#FEF2F2" }}><AlertTriangle size={22} style={{ color: "#c0392b" }} /></div>
            <h3 className="text-center font-medium mb-2" style={{ fontFamily: "Georgia, serif" }}>Delete Service</h3>
            <p className="text-center text-sm text-gray-400 mb-6">Are you sure you want to delete "{deleteModal.title}"?</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteModal(null)} className="flex-1 py-2.5 rounded-full text-sm font-medium border" style={{ borderColor: "#e8e2d0" }}>Cancel</button>
              <button onClick={handleDelete} disabled={deleting} className="flex-1 py-2.5 rounded-full text-sm font-medium text-white" style={{ background: "#c0392b" }}>{deleting ? "Deleting..." : "Yes, Delete"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}