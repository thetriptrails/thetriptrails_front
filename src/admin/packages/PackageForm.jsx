import { useState, useEffect, useRef } from "react";
import { Upload, X, Check } from "lucide-react";
import { createPackage, updatePackage } from "../../services/package.service";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";
const TRIP_TYPES = ["Adventure", "Hill Station", "Pilgrimage", "Wildlife", "Custom"];

const inputStyle = {
  width: "100%",
  background: "#fff",
  border: "0.5px solid #e8e2d0",
  borderRadius: "9999px",
  padding: "10px 18px",
  fontSize: 13,
  color: NAVY,
  outline: "none",
  transition: "all 0.2s",
};

const labelStyle = {
  display: "block",
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontWeight: 700,
  color: "#9ca3af",
  marginBottom: 6,
  marginLeft: 4,
};

export default function PackageForm({ initialData, onSuccess }) {
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    tripType: "Adventure",
    price: "",
    includes: "",
    image: null,
    country: "",
    state: "",
    city: "",
    fromDate: "",
    toDate: "",
    noOfPerson: 1,
    rating: 0,
    isActive: true,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= SYNC EDIT DATA ================= */
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        tripType: initialData.tripType || "Adventure",
        price: initialData.price || "",
        includes: Array.isArray(initialData.includes) ? initialData.includes.join(", ") : "",
        image: initialData.image || null,
        country: initialData.country || "",
        state: initialData.state || "",
        city: initialData.city || "",
        fromDate: initialData.fromDate ? initialData.fromDate.split("T")[0] : "",
        toDate: initialData.toDate ? initialData.toDate.split("T")[0] : "",
        noOfPerson: initialData.noOfPerson || 1,
        rating: initialData.rating || 0,
        isActive: initialData.isActive !== undefined ? initialData.isActive : true,
      });
      setPreview(initialData.image);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file) {
        setForm((prev) => ({ ...prev, image: file }));
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setPreview(null);
    setForm((prev) => ({ ...prev, image: null })); 
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ================= SUBMIT LOGIC (FIXED) ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Prepare payload
      const payload = {
        ...form,
        // Convert comma string to array
        includes: form.includes.split(",").map((i) => i.trim()).filter(Boolean),
        // Ensure noOfPerson is a number
        noOfPerson: Number(form.noOfPerson) || 1,
      };

      /**
       * CRITICAL FIX FOR UPDATE:
       * If 'image' is a string (the old URL), we don't want to re-upload it.
       * Your service layer (package.service.js) should handle logic:
       * - If File: upload.
       * - If null: remove.
       * - If string: skip (backend keeps old URL).
       */

      if (initialData?._id) {
        await updatePackage(initialData._id, payload);
      } else {
        await createPackage(payload);
      }

      onSuccess();
    } catch (err) {
      alert(err.message || "Failed to save package");
      console.error("Submission Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper to ensure image displays correctly
  const getFullPreviewUrl = (url) => {
    if (!url) return null;
    if (typeof url !== "string") return URL.createObjectURL(url); // Handle case where file isn't blobbed yet
    return url; // Cloudinary URLs or Blobs
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-1">
      <div>
        <label style={labelStyle}>Package Title</label>
        <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Himalayan Adventure" required style={inputStyle} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label style={labelStyle}>City</label>
          <input name="city" value={form.city} onChange={handleChange} placeholder="e.g. Manali" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>State</label>
          <input name="state" value={form.state} onChange={handleChange} placeholder="e.g. Himachal" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Country</label>
          <input name="country" value={form.country} onChange={handleChange} placeholder="e.g. India" style={inputStyle} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Trip Type</label>
          <input name="tripType" value={form.tripType} onChange={handleChange} placeholder="e.g. Adventure" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Capacity (People)</label>
          <input name="noOfPerson" type="number" min="1" value={form.noOfPerson} onChange={handleChange} style={inputStyle} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>From Date</label>
          <input type="date" name="fromDate" value={form.fromDate} onChange={handleChange} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>To Date</label>
          <input type="date" name="toDate" value={form.toDate} onChange={handleChange} style={inputStyle} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Price (₹)</label>
          <input name="price" value={form.price} onChange={handleChange} placeholder="Amount (e.g. 5000)" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Initial Rating (0-5)</label>
          <input name="rating" type="number" step="0.1" min="0" max="5" value={form.rating} onChange={handleChange} style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Includes (Comma Separated)</label>
        <textarea name="includes" value={form.includes} onChange={handleChange} placeholder="Hotel, Meals, Guide..." className="w-full px-5 py-3 rounded-2xl outline-none min-h-20 resize-none border border-[#e8e2d0] focus:border-[#C9A84C]" style={{ fontSize: 13 }} />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 0" }}>
        <input 
          type="checkbox" 
          name="isActive"
          id="isActivePkg"
          checked={form.isActive}
          onChange={(e) => setForm(p => ({ ...p, isActive: e.target.checked }))}
          style={{ width: 16, height: 16, cursor: "pointer", accentColor: GOLD }}
        />
        <label htmlFor="isActivePkg" style={{ fontSize: 11, fontWeight: 600, color: NAVY, cursor: "pointer" }}>
          Package is Active
        </label>
      </div>

      <div>
        <label style={labelStyle}>Cover Image</label>
        <div onClick={() => fileInputRef.current.click()} className="group relative h-44 w-full cursor-pointer overflow-hidden rounded-2xl border border-dashed border-[#d4c9a8] bg-[#FAFAF7] hover:bg-white transition-all">
          {preview ? (
            <div className="h-full w-full">
              <img src={preview.startsWith?.('blob') ? preview : preview} alt="Preview" className="h-full w-full object-cover" />
              <button type="button" onClick={handleRemoveImage} className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 text-red-600 shadow-md hover:scale-110">
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center space-y-2">
              <Upload size={18} style={{ color: GOLD }} />
              <p className="text-xs font-medium" style={{ color: NAVY }}>Upload Image</p>
            </div>
          )}
        </div>
        <input ref={fileInputRef} type="file" name="image" accept="image/*" onChange={handleChange} className="hidden" />
      </div>

      <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-3 rounded-full py-3.5 text-[11px] font-bold uppercase tracking-widest shadow-lg" style={{ background: loading ? "#cbd5e1" : NAVY, color: GOLD }}>
        {loading ? "Processing..." : <><Check size={16} />{initialData ? "Save Changes" : "Create Package"}</>}
      </button>
    </form>
  );
}