import { useState, useEffect } from "react";
import { submitEnquiry } from "../../services/form.service";

const GOLD = "#BFA13B";
const DARK = "#8e7421";

const EMPTY = { 
  name: "", email: "", phone: "", departCity: "", location: "", passengers: "", date: "", days: "", message: "", agreed: false 
};

/* ─── UI Helpers ─── */
const GradBtn = ({ children, loading, disabled, ...p }) => (
  <button
    className="w-full py-2 rounded-lg text-white font-bold uppercase tracking-widest text-[10px] relative overflow-hidden transition-all active:scale-[0.98] shadow-md mt-1 disabled:opacity-50"
    style={{ background: `linear-gradient(135deg, ${GOLD} 0%, ${DARK} 100%)` }}
    disabled={loading || disabled}
    {...p}
  >
    <span className="relative z-10 flex items-center justify-center gap-2">
      {loading ? <div className="animate-spin h-3 w-3 border-2 border-white/30 border-t-white rounded-full" /> : children}
    </span>
  </button>
);

const Field = ({ label, error, children, className = "" }) => (
  <div className={`flex flex-col gap-0.5 ${className}`}>
    <div className="flex items-center justify-between px-0.5">
      <label className="text-[9px] font-bold uppercase tracking-wider text-stone-500">{label}</label>
      {error && <span className="text-[8px] text-red-500 font-bold italic">REQ</span>}
    </div>
    {children}
  </div>
);

const inputCls =
  "w-full px-2 py-1.5 rounded border border-stone-200 bg-white " +
  "focus:border-[#BFA13B] focus:ring-0 outline-none transition-all " +
  "text-[12px] text-stone-800 placeholder:text-stone-300";

export default function BookingModal({
  isOpen, onClose, title = "Travel Inquiry", subtitle = "Plan your perfect trip", submitLabel = "Submit Inquiry",
}) {
  const [form, setForm] = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    const required = ["name", "email", "phone", "location", "date"];
    required.forEach(field => { if (!form[field]?.toString().trim()) errs[field] = true; });
    if (!form.agreed) errs.agreed = true;
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await submitEnquiry(form);
      setSubmitted(true);
      setTimeout(() => { onClose(); setSubmitted(false); setForm(EMPTY); }, 3000);
    } catch (err) { alert("Something went wrong. Please try again."); } finally { setLoading(false); }
  };

  if (!isOpen) return null;

  return (
    /* Changed z-9999 to z-[9999] for standard Tailwind arbitrary value parsing */
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/50 backdrop-blur-[2px] overflow-y-auto">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl flex flex-col my-auto" onClick={(e) => e.stopPropagation()}>
        
        {/* Header - Compact */}
        <div className="px-4 py-3 bg-stone-50 border-b border-stone-100 text-center shrink-0 relative">
          <button onClick={onClose} className="absolute top-3 right-3 text-stone-400 hover:text-stone-600 p-1">✕</button>
          <h2 className="text-base font-bold text-stone-800">{title}</h2>
          <p className="text-stone-400 text-[10px]">{subtitle}</p>
        </div>

        <div className="p-4">
          {submitted ? (
            <div className="py-6 text-center">✓ <p className="text-sm font-bold mt-2">Inquiry Sent!</p></div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 gap-2">
                <Field label="Name" error={errors.name}><input type="text" name="name" value={form.name} onChange={change} className={inputCls} placeholder="Name" /></Field>
                <div className="grid grid-cols-2 gap-2">
                    <Field label="Email" error={errors.email}><input type="email" name="email" value={form.email} onChange={change} className={inputCls} placeholder="Email" /></Field>
                    <Field label="Mobile" error={errors.phone}><input type="tel" name="phone" value={form.phone} onChange={change} className={inputCls} placeholder="Number" /></Field>
                </div>
                <Field label="Departure City" error={errors.departCity}><input type="text" name="departCity" value={form.departCity} onChange={change} className={inputCls} /></Field>
                <Field label="Destination" error={errors.location}><input type="text" name="location" value={form.location} onChange={change} className={inputCls} /></Field>
                <div className="grid grid-cols-3 gap-2">
                    <Field label="Date" error={errors.date} className="col-span-2"><input type="date" name="date" value={form.date} onChange={change} className={inputCls} /></Field>
                    <Field label="Guests"><input type="number" name="passengers" value={form.passengers} onChange={change} className={inputCls} /></Field>
                </div>
              </div>

              <Field label="Message"><textarea name="message" rows="2" value={form.message} onChange={change} className={`${inputCls} resize-none`} /></Field>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="agreed" checked={form.agreed} onChange={change} className="w-3 h-3 text-[#BFA13B]" />
                <span className="text-[9px] text-stone-500">I agree to the privacy policy.</span>
              </label>

              <GradBtn type="submit" loading={loading}>{submitLabel}</GradBtn>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}