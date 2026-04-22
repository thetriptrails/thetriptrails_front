import { useState, useEffect } from "react";
import { Check, Upload, Hash } from "lucide-react";
import { createPost, updatePost } from "../../services/post.service";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";
const CATEGORIES = ["Adventure", "Pilgrimage", "Tips & Guides", "Hill Stations", "Business"];

const inputStyle = {
  width: "100%",
  background: "#FAFAF7",
  border: "1px solid #e8e2d0",
  borderRadius: "10px",
  padding: "10px 12px",
  fontSize: "13px",
  outline: "none"
};

const labelStyle = {
  display: "block",
  fontSize: "9px",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontWeight: "700",
  color: "#aaa",
  marginBottom: "5px"
};

export default function PostForm({ initialData, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    isPublished: true,
    tags: "",
    image: null
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(", ") : "",
        image: null
      });
      setPreview(initialData.image?.url);
    }
  }, [initialData]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === "image" && !formData[key]) return;
        data.append(key, formData[key]);
      });

      if (initialData?._id) await updatePost(initialData._id, data);
      else await createPost(data);
      
      onSuccess();
    } catch (err) {
      alert(err.msg || "Error saving post");
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label style={labelStyle}>Headline</label>
        <input
          style={inputStyle}
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Category</label>
          <select style={inputStyle} value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Status</label>
          <select style={inputStyle} value={formData.isPublished} onChange={(e) => setFormData({...formData, isPublished: e.target.value === "true"})}>
            <option value="true">Published</option>
            <option value="false">Draft</option>
          </select>
        </div>
      </div>

      <div>
        <label style={labelStyle}>Excerpt (Short Summary)</label>
        <textarea
          style={{ ...inputStyle, height: "60px", resize: "none" }}
          value={formData.excerpt}
          onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
        />
      </div>

      <div>
        <label style={labelStyle}>Content</label>
        <textarea
          style={{ ...inputStyle, height: "150px" }}
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Tags (comma separated)</label>
        <div className="relative">
           <Hash size={14} className="absolute left-3 top-3 text-gray-300" />
           <input
             style={{ ...inputStyle, paddingLeft: "35px" }}
             placeholder="react, luxury, travel"
             value={formData.tags}
             onChange={(e) => setFormData({...formData, tags: e.target.value})}
           />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Feature Image</label>
        <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-[#e8e2d0] rounded-xl cursor-pointer bg-[#FAFAF7] hover:bg-[#F5F5F0] transition-colors">
          {preview ? (
            <img src={preview} alt="Preview" className="h-full w-full object-cover rounded-xl" />
          ) : (
            <>
              <Upload size={20} className="text-gray-400 mb-2" />
              <span className="text-[10px] text-gray-400 font-bold uppercase">Upload Image</span>
            </>
          )}
          <input type="file" className="hidden" onChange={handleImage} accept="image/*" />
        </label>
      </div>

      <button
        disabled={loading}
        className="w-full py-4 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all border-none cursor-pointer"
        style={{ background: NAVY, color: GOLD }}
      >
        {loading ? "Saving Article..." : <span className="flex items-center justify-center gap-2"><Check size={16}/> Save Article</span>}
      </button>
    </form>
  );
}