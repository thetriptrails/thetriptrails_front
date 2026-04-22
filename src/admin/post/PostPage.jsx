import { useState } from "react";
import { Plus, X } from "lucide-react";
import PostList from "./PostList";
import PostForm from "./PostForm";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

export default function PostPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (post) => {
    setEditingPost(post);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingPost(null);
  };

  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div className="min-h-screen px-4 sm:px-8 py-8" style={{ background: "#FAFAF7", color: NAVY }}>
      
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: GOLD }}>Content Creator</p>
          <h1 className="text-2xl font-medium" style={{ fontFamily: "Georgia, serif" }}>Article Management</h1>
          <p className="text-xs text-gray-400 mt-1">Draft, edit, and publish your latest stories</p>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-semibold uppercase tracking-widest border-none cursor-pointer"
          style={{ background: NAVY, letterSpacing: "0.08em" }}
        >
          <Plus size={15} /> Write New Post
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        <PostList refresh={refresh} onEdit={handleEdit} onRefresh={triggerRefresh} />
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(27,43,75,0.45)" }}>
          <div className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "0.5px solid #ede8da", background: "#FAFAF7" }}>
              <h3 className="text-base font-medium" style={{ fontFamily: "Georgia, serif" }}>
                {editingPost ? "Edit Article" : "Compose New Post"}
              </h3>
              <button onClick={handleCloseForm} className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F0EDE6] border-none cursor-pointer">
                <X size={15} style={{ color: NAVY }} />
              </button>
            </div>

            <div className="px-6 py-5 overflow-y-auto" style={{ maxHeight: "85vh" }}>
              <PostForm
                initialData={editingPost}
                onSuccess={() => {
                  triggerRefresh();
                  handleCloseForm();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}