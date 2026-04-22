import { useEffect, useState } from "react";
import { Search, FileText, Trash2, Edit3, Eye, AlertCircle } from "lucide-react";
import { getAllPosts, deletePost } from "../../services/post.service";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

export default function PostList({ refresh, onEdit, onRefresh }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getAllPosts();
      setPosts(data?.posts || data || []);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPosts(); }, [refresh]);

  const handleDelete = async () => {
    try {
      await deletePost(deleteId);
      setDeleteId(null);
      onRefresh();
    } catch (err) { alert("Delete failed"); }
  };

  const filtered = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ color: NAVY }}>
      <div className="relative mb-6 max-w-sm">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#aaa" }} />
        <input
          type="text"
          placeholder="Search articles..."
          className="w-full pl-10 pr-4 py-2.5 rounded-full outline-none border"
          style={{ background: "#fff", borderColor: "#e8e2d0", fontSize: 13 }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-400 text-xs uppercase tracking-widest">Loading Catalog...</div>
      ) : (
        <div className="bg-white rounded-2xl overflow-hidden border" style={{ borderColor: "#e8e2d0" }}>
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ background: "#FAFAF7", borderBottom: "0.5px solid #ede8da" }}>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Article</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Category</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</th>
                <th className="text-right px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post) => (
                <tr key={post._id} className="hover:bg-[#FAFAF7] transition-colors border-b last:border-0" style={{ borderColor: "#f0ece2" }}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={post.image?.url} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="text-sm font-medium">{post.title}</p>
                        <p className="text-[10px] text-gray-400">/{post.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-md" style={{ background: "#FBF5E8", color: GOLD }}>
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                       <div className="w-1.5 h-1.5 rounded-full" style={{ background: post.isPublished ? "#27a85a" : "#aaa" }} />
                       <span className="text-xs">{post.isPublished ? "Published" : "Draft"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => onEdit(post)} className="p-2 hover:bg-[#FBF5E8] rounded-full transition-colors border-none cursor-pointer" style={{ color: GOLD }}><Edit3 size={16} /></button>
                      <button onClick={() => setDeleteId(post._id)} className="p-2 hover:bg-red-50 rounded-full transition-colors border-none cursor-pointer text-red-500"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mini Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl max-w-xs w-full text-center shadow-xl">
             <AlertCircle size={40} className="mx-auto mb-4 text-red-500" />
             <h4 className="mb-2 font-medium">Remove Post?</h4>
             <p className="text-xs text-gray-400 mb-6">This action cannot be undone.</p>
             <div className="flex gap-2">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-2 text-xs font-semibold rounded-full border border-gray-200">Cancel</button>
                <button onClick={handleDelete} className="flex-1 py-2 text-xs font-semibold rounded-full bg-red-500 text-white border-none">Delete</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}