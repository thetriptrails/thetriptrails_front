import { useState } from "react";
import { submitForm } from "../../services/form.service";

const GOLD = "#BFA13B";
const DARK = "#8e7421";
const LIGHT = "#fdf8ec";

const EMPTY = { name: "", email: "", phone: "", place: "", date: "", passengers: "1", message: "" };
const PASSENGER_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

/* ─── UI Helpers ─── */
const GradBtn = ({ children, className = "", loading, ...p }) => (
  <button
    className={`relative overflow-hidden group disabled:opacity-70 transition-all active:scale-[0.98] ${className}`}
    style={{ background: `linear-gradient(135deg, ${GOLD} 0%, ${DARK} 100%)` }}
    disabled={loading}
    {...p}
  >
    <span className="relative z-10 flex items-center justify-center gap-2">
      {loading ? (
        <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full" />
      ) : children}
    </span>
  </button>
);

const Field = ({ label, icon, error, children }) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-stone-400 ml-0.5">
        <span className="text-stone-500 opacity-70 text-[12px]">{icon}</span>
        {label}
      </label>
    )}
    {children}
    {error && <p className="text-[10px] text-red-500 ml-1 font-sans font-medium">{error}</p>}
  </div>
);

const inputCls =
  "w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-stone-200 bg-white/70 " +
  "focus:border-[#BFA13B] focus:ring-4 focus:ring-[#BFA13B]/10 focus:bg-white " +
  "outline-none transition-all duration-300 text-sm text-stone-800 placeholder:text-stone-300 " +
  "hover:border-stone-300 font-sans";

export default function EnquiryForm({
  title = "Plan Your Journey",
  subtitle = "Tell us where you dream of going.",
  submitLabel = "Send Inquiry",
  onSubmit,
}) {
  const [form, setForm] = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const change = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.phone.trim()) errs.phone = "Required";
    if (!form.place.trim()) errs.place = "Required";

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      onSubmit ? await onSubmit(form) : await submitForm(form);
      setSubmitted(true);
      setForm(EMPTY);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setErrors({ submit: "Submission failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  const Ornament = () => (
    <svg width="80" height="8" viewBox="0 0 120 12" fill="none" className="mx-auto opacity-30 mt-1">
      <line x1="0" y1="6" x2="45" y2="6" stroke={GOLD} strokeWidth="1" />
      <circle cx="60" cy="6" r="4" fill={GOLD} />
      <circle cx="60" cy="6" r="2" fill="white" />
      <line x1="75" y1="6" x2="120" y2="6" stroke={GOLD} strokeWidth="1" />
    </svg>
  );

  return (
    <section className="w-full max-w-2xl mx-auto py-8 px-4">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

      <div
        className="bg-white flex flex-col w-full rounded-4xl relative overflow-hidden shadow-xl border border-stone-100"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        <div className="h-1.5 w-full z-10" style={{ background: `linear-gradient(to right, ${GOLD}, ${DARK}, ${GOLD})` }} />

        {/* Header */}
        <div className="px-6 pt-10 pb-4 text-center relative z-10" style={{ background: `linear-gradient(160deg, ${LIGHT} 0%, white 100%)` }}>
          <h2 className="text-3xl font-bold text-stone-800 tracking-tight">{title}</h2>
          <Ornament />
          <p className="text-stone-500 text-sm mt-3 font-sans max-w-sm mx-auto">{subtitle}</p>
        </div>

        {/* Form Body */}
        <div className="px-6 sm:px-12 pb-12 pt-6 z-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg text-2xl mb-4" style={{ background: `linear-gradient(135deg, ${GOLD}, ${DARK})` }}>✓</div>
              <h3 className="text-xl font-bold text-stone-800 italic">Inquiry Sent</h3>
              <p className="text-stone-500 text-sm mt-2">We will get back to you shortly.</p>
              <button onClick={() => setSubmitted(false)} className="mt-6 text-xs uppercase tracking-widest text-[#BFA13B] font-bold border-b border-[#BFA13B]">Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Full Name" icon="👤" error={errors.name}>
                  <input type="text" name="name" placeholder="John Doe" value={form.name} onChange={change} className={inputCls} />
                </Field>
                <Field label="Phone" icon="📞" error={errors.phone}>
                  <input type="tel" name="phone" placeholder="+1..." value={form.phone} onChange={change} className={inputCls} />
                </Field>
              </div>

              <Field label="Email Address" icon="✉️">
                <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={change} className={inputCls} />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Destination" icon="📍" error={errors.place}>
                  <input type="text" name="place" placeholder="Where to?" value={form.place} onChange={change} className={inputCls} />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Date" icon="📅">
                    <input type="date" name="date" value={form.date} onChange={change} className={inputCls} />
                  </Field>
                  <Field label="Guests" icon="👥">
                    <select name="passengers" value={form.passengers} onChange={change} className={inputCls}>
                      {PASSENGER_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </Field>
                </div>
              </div>

              <Field label="Special Requests" icon="💬">
                <textarea 
                  name="message" 
                  rows="3" 
                  placeholder="Tell us more about your preferences..." 
                  value={form.message} 
                  onChange={change} 
                  className={`${inputCls} resize-none`} 
                />
              </Field>

              {errors.submit && <p className="text-center text-red-500 text-xs font-bold">{errors.submit}</p>}

              <GradBtn type="submit" loading={loading} className="w-full py-4 rounded-xl text-white font-bold uppercase tracking-widest text-sm shadow-lg mt-2">
                {submitLabel}
              </GradBtn>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}