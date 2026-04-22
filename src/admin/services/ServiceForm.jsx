import { useState, useEffect, useRef } from "react";
import {
  Mountain, Landmark, Hotel, Map, Users, Car, Upload, Check
} from "lucide-react";
import { createService, updateService } from "../../services/services.service";

// UI Theme Constants
const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";


const CATEGORIES = [
  "Adventure", "Cultural", "Hospitality",
  "Transport", "Guided Tour", "Custom",
];

const inputStyle = {
  width: "100%",
  background: "#FAFAF7",
  border: "0.5px solid #e8e2d0",
  borderRadius: 10,
  padding: "10px 12px",
  fontSize: 13,
  color: NAVY,
  outline: "none",
  fontFamily: "sans-serif",
  transition: "border-color 0.2s, background 0.2s",
};

const labelStyle = {
  display: "block",
  fontSize: 9,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontWeight: 700,
  color: "#aaa",
  marginBottom: 5,
};

export default function ServiceForm({ initialData, onSuccess }) {
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    country: "",
    state: "",
    city: "",
    noOfPerson: 0,
    ratings: 0,
    numReviews: 0,
    isActive: true,
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Sync with initialData (Edit Mode)
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        price: initialData.price || "",
        category: initialData.category || "",
        country: initialData.country || "",
        state: initialData.state || "",
        city: initialData.city || "",
        noOfPerson: initialData.noOfPerson || 0,
        ratings: initialData.ratings || 0,
        numReviews: initialData.numReviews || 0,
        isActive: initialData.isActive !== undefined ? initialData.isActive : true,
        image: null,
      });
      const img = initialData.image;
      setPreview(typeof img === "string" ? img : img?.url || null);
    } else {
      resetForm();
    }
  }, [initialData]);

  const set = (key, val) => setFormData((p) => ({ ...p, [key]: val }));

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      category: "",
      country: "",
      state: "",
      city: "",
      noOfPerson: 0,
      ratings: 0,
      numReviews: 0,
      isActive: true,
      image: null,
    });
    setPreview(null);
    setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB");
      return;
    }

    setError("");
    set("image", file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!formData.title || !formData.price || !formData.category) {
      return setError("Please fill all required fields");
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("country", formData.country);
      data.append("state", formData.state);
      data.append("city", formData.city);
      data.append("noOfPerson", formData.noOfPerson);
      data.append("ratings", formData.ratings);
      data.append("numReviews", formData.numReviews);
      data.append("isActive", formData.isActive);
      if (formData.image) data.append("image", formData.image);

      if (initialData?._id) {
        await updateService(initialData._id, data);
      } else {
        await createService(data);
      }

      resetForm();
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("SUBMIT_ERROR:", err);
      setError(err?.response?.data?.error || err?.msg || "Failed to save service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      
      {/* Title */}
      <div>
        <label style={labelStyle}>Service Title</label>
        <input
          style={inputStyle}
          type="text"
          placeholder="e.g. Luxury Desert Safari"
          value={formData.title}
          onChange={(e) => set("title", e.target.value)}
          required
          onFocus={(e) => { e.target.style.borderColor = GOLD; e.target.style.background = "#fff"; }}
          onBlur={(e) => { e.target.style.borderColor = "#e8e2d0"; e.target.style.background = "#FAFAF7"; }}
        />
      </div>

      {/* Price + Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Price (₹)</label>
          <input
            style={inputStyle}
            type="number"
            placeholder="0"
            value={formData.price}
            onChange={(e) => set("price", e.target.value)}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Category</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="e.g. Adventure"
            value={formData.category}
            onChange={(e) => set("category", e.target.value)}
            required
          />
        </div>
      </div>

      {/* Location Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label style={labelStyle}>City</label>
          <input name="city" value={formData.city} onChange={(e) => set("city", e.target.value)} placeholder="e.g. Manali" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>State</label>
          <input name="state" value={formData.state} onChange={(e) => set("state", e.target.value)} placeholder="e.g. Himachal" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Country</label>
          <input name="country" value={formData.country} onChange={(e) => set("country", e.target.value)} placeholder="e.g. India" style={inputStyle} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label style={labelStyle}>Capacity (People)</label>
          <input name="noOfPerson" type="number" min="0" value={formData.noOfPerson} onChange={(e) => set("noOfPerson", e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Initial Rating (0-5)</label>
          <input name="ratings" type="number" step="0.1" min="0" max="5" value={formData.ratings} onChange={(e) => set("ratings", e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Review Count</label>
          <input name="numReviews" type="number" min="0" value={formData.numReviews} onChange={(e) => set("numReviews", e.target.value)} style={inputStyle} />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 0" }}>
        <input 
          type="checkbox" 
          id="isActive"
          checked={formData.isActive}
          onChange={(e) => set("isActive", e.target.checked)}
          style={{ width: 16, height: 16, cursor: "pointer", accentColor: GOLD }}
        />
        <label htmlFor="isActive" style={{ fontSize: 11, fontWeight: 600, color: NAVY, cursor: "pointer" }}>
          Service is Active
        </label>
      </div>

      {/* Description */}
      <div>
        <label style={labelStyle}>Description</label>
        <textarea
          style={{ ...inputStyle, height: 80, resize: "none", lineHeight: 1.5 }}
          placeholder="What's included in this service?"
          value={formData.description}
          onChange={(e) => set("description", e.target.value)}
          required
          onFocus={(e) => { e.target.style.borderColor = GOLD; e.target.style.background = "#fff"; }}
          onBlur={(e) => { e.target.style.borderColor = "#e8e2d0"; e.target.style.background = "#FAFAF7"; }}
        />
      </div>


      {/* Image Upload Area */}
      <div>
        <label style={labelStyle}>Cover Image</label>
        <div
          onClick={() => fileInputRef.current.click()}
          style={{
            border: "0.5px dashed #d4c9a8",
            borderRadius: 12,
            background: "#FAFAF7",
            minHeight: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {preview ? (
            <div style={{ width: "100%", position: "relative" }}>
              <img src={preview} alt="Preview" style={{ width: "100%", height: 120, objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>Click to Change</span>
              </div>
            </div>
          ) : (
            <>
              <Upload size={20} color={GOLD} style={{ marginBottom: 4 }} />
              <p style={{ fontSize: 11, color: "#888", margin: 0 }}>Upload Image</p>
            </>
          )}
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleImageChange} />
      </div>

      {/* Error Alert */}
      {error && (
        <div style={{ background: "#FEF2F2", color: "#c0392b", padding: "10px", borderRadius: 8, fontSize: 12, fontWeight: 500, border: "0.5px solid #fecaca" }}>
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: 12,
          border: "none",
          background: loading ? "#d4cfc6" : NAVY,
          color: loading ? "#999" : GOLD,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          cursor: loading ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        {loading ? (
          <>
            <div className="spinner" />
            Processing...
          </>
        ) : (
          <>
            <Check size={16} />
            {initialData ? "Update Service" : "Publish Service"}
          </>
        )}
      </button>

      <style>{`
        .spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(201, 168, 76, 0.3);
          border-top-color: ${GOLD};
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </form>
  );
}