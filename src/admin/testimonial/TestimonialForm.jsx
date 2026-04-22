import { useState, useEffect } from "react";
import { Star, Check } from "lucide-react";
import { createTestimonial, updateTestimonial } from "../../services/testimonial.service";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

export default function TestimonialForm({ initialData, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    quote: "",
    stars: 5,
    isFeatured: true
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Auto-initials if not provided
      const initials = formData.name.split(" ").map(n => n[0]).join("").toUpperCase();
      const finalData = { ...formData, initials: initials.substring(0, 2) };

      if (initialData?._id) {
        await updateTestimonial(initialData._id, finalData);
      } else {
        await createTestimonial(finalData);
      }
      onSuccess();
    } catch (err) {
      alert(err.msg || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: "100%", background: "#FAFAF7", border: "0.5px solid #e8e2d0", borderRadius: 10, padding: "10px 12px", fontSize: 13, color: NAVY, outline: "none" };
  const labelStyle = { display: "block", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, color: "#aaa", marginBottom: 5 };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label style={labelStyle}>Client Name</label>
        <input style={inputStyle} type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Location</label>
          <input style={inputStyle} type="text" required placeholder="City, Country" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
        </div>
        <div>
          <label style={labelStyle}>Rating</label>
          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4, 5].map(s => (
              <Star 
                key={s} size={18} className="cursor-pointer" 
                fill={s <= formData.stars ? GOLD : "none"} 
                color={s <= formData.stars ? GOLD : "#e8e2d0"} 
                onClick={() => setFormData({...formData, stars: s})}
              />
            ))}
          </div>
        </div>
      </div>

      <div>
        <label style={labelStyle}>The Review</label>
        <textarea style={{ ...inputStyle, height: 80, resize: "none" }} required value={formData.quote} onChange={(e) => setFormData({...formData, quote: e.target.value})} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-xl border-none text-white text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer mt-2"
        style={{ background: NAVY, color: GOLD, opacity: loading ? 0.7 : 1 }}
      >
        <Check size={16} /> {initialData ? "Update Review" : "Publish Review"}
      </button>
    </form>
  );
}