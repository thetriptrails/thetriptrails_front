import { useState, useEffect, useRef } from "react";
import { Upload, Check, MapPin, Thermometer, Calendar, Star, Info } from "lucide-react";
import { createDestination, updateDestination } from "../../services/destination.service";

// UI Theme Constants
const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const CATEGORIES = ["Adventure", "Pilgrimage", "Wildlife", "Hill Stations", "Custom"];

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

export default function DestinationForm({ initialData, onSuccess }) {
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    category: "",
    experience: "",
    country: "",
    state: "",
    city: "",
    noOfPerson: 0,
    region: "",
    rating: 0,
    altitude: "",
    bestTime: "",
    numReviews: 0,
    description: "",
    travelDate: "",
    budget: "",
    featured: false,
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
        name: initialData.name || "",
        tagline: initialData.tagline || "",
        category: initialData.category || "",
        experience: initialData.experience || "",
        country: initialData.country || "",
        state: initialData.state || "",
        city: initialData.city || "",
        noOfPerson: initialData.noOfPerson || 0,
        region: initialData.region || "",
        rating: initialData.rating || 0,
        altitude: initialData.altitude || "",
        bestTime: initialData.bestTime || "",
        numReviews: initialData.numReviews || 0,
        description: initialData.description || "",
        travelDate: initialData.travelDate || "",
        budget: initialData.budget || "",
        featured: initialData.featured || false,
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
      name: "", tagline: "", category: "", experience: "", country: "", state: "", city: "", noOfPerson: 0,
      region: "", rating: 0, altitude: "",
      bestTime: "", numReviews: 0, description: "", travelDate: "", budget: "",
      featured: false, 
      isActive: true,
      image: null,
    });
    setPreview(null);
    setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return setError("Image must be less than 5MB");

    setError("");
    set("image", file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.name || !formData.category || !formData.budget) {
      return setError("Please fill all required fields");
    }

    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) data.append(key, formData[key]);
      });

      if (initialData?._id) {
        await updateDestination(initialData._id, data);
      } else {
        await createDestination(data);
      }

      resetForm();
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to save destination");
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = (e) => { e.target.style.borderColor = GOLD; e.target.style.background = "#fff"; };
  const handleBlur = (e) => { e.target.style.borderColor = "#e8e2d0"; e.target.style.background = "#FAFAF7"; };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      
      <div>
        <label style={labelStyle}>Destination Name</label>
        <input
          style={inputStyle}
          type="text"
          placeholder="e.g. Kedarnath Temple"
          value={formData.name}
          onChange={(e) => set("name", e.target.value)}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Tagline / Short Hook</label>
        <input
          style={inputStyle}
          type="text"
          placeholder="e.g. A hidden sanctuary where nature and luxury converge"
          value={formData.tagline}
          onChange={(e) => set("tagline", e.target.value)}
        />
      </div>

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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
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
        <div>
          <label style={labelStyle}>Experience Type</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="e.g. Spiritual"
            value={formData.experience}
            onChange={(e) => set("experience", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label style={labelStyle}>Capacity (People)</label>
          <input type="number" min="0" style={inputStyle} value={formData.noOfPerson} onChange={(e) => set("noOfPerson", e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Altitude</label>
          <input style={inputStyle} placeholder="e.g. 3583m" value={formData.altitude} onChange={(e) => set("altitude", e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Best Time</label>
          <input style={inputStyle} placeholder="e.g. May-Jun" value={formData.bestTime} onChange={(e) => set("bestTime", e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Review Count</label>
          <input name="numReviews" type="number" min="0" value={formData.numReviews} onChange={(e) => set("numReviews", e.target.value)} style={inputStyle} />
        </div>
      </div>

      {/* Budget + Travel Date */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={labelStyle}>Budget (₹)</label>
          <input
            style={inputStyle}
            type="number"
            value={formData.budget}
            onChange={(e) => set("budget", e.target.value)}
            onFocus={handleFocus} onBlur={handleBlur}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Travel Date</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="dd-mm-yyyy"
            value={formData.travelDate}
            onChange={(e) => set("travelDate", e.target.value)}
            onFocus={handleFocus} onBlur={handleBlur}
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label style={labelStyle}>Description (Max 500 chars)</label>
        <textarea
          style={{ ...inputStyle, height: 80, resize: "none", lineHeight: 1.5 }}
          placeholder="Describe the majesty of this location..."
          value={formData.description}
          onChange={(e) => set("description", e.target.value)}
          maxLength={500}
          onFocus={handleFocus} onBlur={handleBlur}
        />
      </div>

      {/* Image Upload Area */}
      <div>
        <label style={labelStyle}>Destination Cover</label>
        <div
          onClick={() => fileInputRef.current.click()}
          style={{
            border: "0.5px dashed #d4c9a8", borderRadius: 12, background: "#FAFAF7",
            minHeight: 120, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", cursor: "pointer",
            overflow: "hidden", position: "relative",
          }}
        >
          {preview ? (
            <div style={{ width: "100%", position: "relative" }}>
              <img src={preview} alt="Preview" style={{ width: "100%", height: 120, objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>Click to Change Image</span>
              </div>
            </div>
          ) : (
            <>
              <Upload size={20} color={GOLD} style={{ marginBottom: 4 }} />
              <p style={{ fontSize: 11, color: "#888", margin: 0 }}>Upload Destination Image</p>
            </>
          )}
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleImageChange} />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, padding: "5px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input 
            type="checkbox" 
            id="featured"
            checked={formData.featured}
            onChange={(e) => set("featured", e.target.checked)}
            style={{ width: 16, height: 16, cursor: "pointer", accentColor: GOLD }}
          />
          <label htmlFor="featured" style={{ fontSize: 11, fontWeight: 600, color: NAVY, cursor: "pointer" }}>
            Feature on Homepage
          </label>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input 
            type="checkbox" 
            id="isActive"
            checked={formData.isActive}
            onChange={(e) => set("isActive", e.target.checked)}
            style={{ width: 16, height: 16, cursor: "pointer", accentColor: GOLD }}
          />
          <label htmlFor="isActive" style={{ fontSize: 11, fontWeight: 600, color: NAVY, cursor: "pointer" }}>
            Destination is Active
          </label>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div style={{ background: "#FEF2F2", color: "#c0392b", padding: "10px", borderRadius: 8, fontSize: 11, fontWeight: 500, border: "0.5px solid #fecaca" }}>
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%", padding: "14px", borderRadius: 12, border: "none",
          background: loading ? "#d4cfc6" : NAVY, color: loading ? "#999" : GOLD,
          fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
          cursor: loading ? "not-allowed" : "pointer", display: "flex",
          alignItems: "center", justifyContent: "center", gap: 10,
        }}
      >
        {loading ? (
          <div className="spinner" />
        ) : (
          <>
            <Check size={16} />
            {initialData ? "Update Destination" : "Publish Destination"}
          </>
        )}
      </button>

      <style>{`
        .spinner {
          width: 14px; height: 14px; border: 2px solid rgba(201, 168, 76, 0.3);
          border-top-color: ${GOLD}; border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </form>
  );
}