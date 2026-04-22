import { useEffect, useState } from "react";
import { Search, MapPin, AlertTriangle, Star } from "lucide-react";
import { getAllDestinations, deleteDestination } from "../../services/destination.service";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

export default function DestinationList({ refresh, onEdit, onRefresh }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await getAllDestinations();
      const data = res?.destinations || res?.data || res || [];
      setItems(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, [refresh]);

  const handleDelete = async () => {
    try {
      await deleteDestination(deleteModal._id);
      setItems(prev => prev.filter(i => i._id !== deleteModal._id));
      setDeleteModal(null);
      if (onRefresh) onRefresh();
    } catch (err) { console.error(err); }
  };

  const filtered = items.filter(i => 
    i.name?.toLowerCase().includes(search.toLowerCase()) || 
    i.city?.toLowerCase().includes(search.toLowerCase()) ||
    i.state?.toLowerCase().includes(search.toLowerCase()) ||
    i.country?.toLowerCase().includes(search.toLowerCase()) ||
    i.region?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="relative mb-6 max-w-sm">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search destinations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-full outline-none border border-[#e8e2d0] text-sm"
        />
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-400">Loading sanctuary data...</div>
      ) : (
        <div className="bg-white rounded-2xl overflow-hidden border border-[#e8e2d0]">
          <table className="w-full border-collapse hidden sm:table">
            <thead className="bg-[#FAFAF7] border-b border-[#ede8da]">
                <tr className="bg-[#FAFAF7] border-b border-[#ede8da]">
                  {["Location", "Full Address", "Rating", "Budget", "Status", "Actions"].map(h => (
                    <th key={h} className="text-left px-5 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">{h}</th>
                  ))}
                </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d._id} className="border-b border-[#f0ece2] hover:bg-[#FAFAF7] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={d.image?.url} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <p className="text-sm font-medium">{d.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[10px] text-gray-400 italic">
                    {d.city ? `${d.city}, ${d.state}, ${d.country}` : (d.region || "Global")}
                  </td>
                  <td className="px-5 py-4 font-bold text-xs" style={{ color: GOLD }}>★ {d.rating}</td>
                  <td className="px-5 py-4 text-xs">₹{d.budget?.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className={`text-[9px] font-bold uppercase px-2 py-1 rounded ${d.isActive ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-400"}`}>
                      {d.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => onEdit(d)} className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-tighter" style={{ background: "#FBF5E8", color: "#9a7530" }}>Edit</button>
                      <button onClick={() => setDeleteModal(d)} className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-tighter" style={{ background: "#FEF2F2", color: "#c0392b" }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Modal - Mirroring Service Style */}
      {deleteModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center px-4 bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm border border-[#e8e2d0]">
            <AlertTriangle className="mx-auto mb-4 text-red-500" size={30} />
            <p className="text-center text-sm mb-6">Remove <b>{deleteModal.name}</b> from records?</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteModal(null)} className="flex-1 py-2 rounded-full border text-xs font-bold uppercase">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-2 rounded-full bg-red-600 text-white text-xs font-bold uppercase">Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}