import { useEffect, useState } from "react";
import { Search, Star, Quote, AlertTriangle, Edit2, Trash2 } from "lucide-react";
import { getAllTestimonials, deleteTestimonial } from "../../services/testimonial.service";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

export default function TestimonialList({ refresh, onEdit, onRefresh }) {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await getAllTestimonials();
      const data = res?.testimonials || res?.data || res || [];
      setTestimonials(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTestimonials(); }, [refresh]);

  const handleDelete = async () => {
    if (!deleteModal) return;
    try {
      setDeleting(true);
      await deleteTestimonial(deleteModal._id);
      setDeleteModal(null);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const filtered = testimonials.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ color: NAVY }}>
      <div className="relative mb-6 max-w-sm">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or location..."
          className="w-full pl-10 pr-4 py-2.5 rounded-full outline-none"
          style={{ background: "#fff", border: "0.5px solid #e8e2d0", fontSize: 13 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 rounded-full border-2 border-gray-200 animate-spin" style={{ borderTopColor: GOLD }} /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t) => (
            <div key={t._id} className="bg-white rounded-2xl p-6 relative flex flex-col" style={{ border: "0.5px solid #e8e2d0" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "#FBF5E8", color: GOLD }}>
                  {t.initials || t.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-semibold">{t.name}</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">{t.location}</p>
                </div>
              </div>

              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill={i < t.stars ? GOLD : "none"} color={i < t.stars ? GOLD : "#e8e2d0"} />
                ))}
              </div>

              <p className="text-xs leading-relaxed text-gray-600 italic flex-1 mb-4">
                <Quote size={12} className="inline mr-1 mb-1" style={{ color: GOLD }} />
                {t.quote}
              </p>

              <div className="flex gap-2 pt-4" style={{ borderTop: "0.5px solid #f0ece2" }}>
                <button onClick={() => onEdit(t)} className="flex-1 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors hover:bg-[#FBF5E8]" style={{ color: GOLD, border: "0.5px solid #e8d9a0" }}>Edit</button>
                <button onClick={() => setDeleteModal(t)} className="flex-1 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider text-red-500 border border-red-100 hover:bg-red-50">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(27,43,75,0.4)" }}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#FEF2F2" }}><AlertTriangle size={22} style={{ color: "#c0392b" }} /></div>
            <h3 className="text-center font-medium mb-2">Delete Testimonial</h3>
            <p className="text-center text-xs text-gray-400 mb-6">Are you sure you want to remove feedback from {deleteModal.name}?</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteModal(null)} className="flex-1 py-2.5 rounded-full text-xs font-bold border border-gray-200">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-2.5 rounded-full text-xs font-bold text-white" style={{ background: "#c0392b" }}>{deleting ? "Removing..." : "Delete"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}