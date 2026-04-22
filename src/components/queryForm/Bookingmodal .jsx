import { useState, useEffect } from "react";
import { submitEnquiry } from "../../services/form.service";

const GOLD = "#BFA13B";
const DARK = "#8e7421";

const EMPTY = { 
  name: "", 
  email: "", 
  phone: "", 
  departCity: "", 
  location: "", 
  passengers: "", 
  date: "", 
  days: "", 
  message: "",
  agreed: false 
};

/* ─── UI Helpers ─── */
const GradBtn = ({ children, loading, disabled, ...p }) => (
  <button
    className="w-full py-2.5 rounded-lg text-white font-bold uppercase tracking-[0.15em] text-[11px] relative overflow-hidden transition-all active:scale-[0.98] shadow-md mt-1 disabled:opacity-50"
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
      <label className="text-[10px] font-semibold uppercase tracking-wider text-stone-600">
        {label}
      </label>
      {error && <span className="text-[9px] text-red-500 font-medium italic">Required</span>}
    </div>
    {children}
  </div>
);

const inputCls =
  "w-full px-3 py-1.5 rounded border border-stone-200 bg-white " +
  "focus:border-[#BFA13B] focus:ring-0 outline-none transition-all " +
  "text-[13px] text-stone-800 placeholder:text-stone-300";

export default function BookingModal({
  isOpen,
  onClose,
  title = "Travel Inquiry Form",
  subtitle = "Get a customized travel plan",
  submitLabel = "Submit Inquiry",
}) {
  const [form, setForm] = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    
    // Updated required fields to match your new Model strictness
    const required = ["name", "email", "phone", "location", "date"];
    required.forEach(field => { 
      if (!form[field]?.toString().trim()) errs[field] = true; 
    });
    
    if (!form.agreed) errs.agreed = true;

    if (Object.keys(errs).length) { 
      setErrors(errs); 
      return; 
    }

    setLoading(true);
    try {
      // Logic: Service now sends the full object to /enquiries/submit
      await submitEnquiry(form);
      setSubmitted(true);
      setTimeout(() => { 
        onClose(); 
        setSubmitted(false); 
        setForm(EMPTY); 
      }, 3000);
    } catch (err) { 
      // Displays the specifically joined error messages from our updated service
      setErrors({ submit: err.message || "Error" }); 
      alert(err.message || "Something went wrong. Please try again.");
    } finally { 
      setLoading(false); 
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-[1px] animate-in fade-in duration-200">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
      `}</style>

      <div className="w-full max-w-lg bg-white rounded-lg shadow-xl relative overflow-hidden flex flex-col border border-stone-100" 
           style={{ fontFamily: "'Poppins', sans-serif" }}>
        
        {/* Header - Height Reduced */}
        <div className="px-6 py-5 bg-stone-50 border-b border-stone-100 text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-700">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <h2 className="text-xl font-bold text-stone-800">{title}</h2>
          <p className="text-stone-500 text-[11px] font-medium">{subtitle}</p>
        </div>

        <div className="px-6 py-5 overflow-y-auto">
          {submitted ? (
            <div className="py-8 text-center animate-in zoom-in duration-300">
               <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">✓</div>
               <h3 className="text-stone-800 font-bold text-sm">Thank You!</h3>
               <p className="text-stone-500 text-[11px] mt-1">Our team will contact you shortly with travel details.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                <Field label="Full Name" error={errors.name}>
                  <input type="text" name="name" placeholder="Enter name" value={form.name} onChange={change} className={inputCls} />
                </Field>
                <Field label="Email ID" error={errors.email}>
                  <input type="email" name="email" placeholder="example@mail.com" value={form.email} onChange={change} className={inputCls} />
                </Field>

                <Field label="Mobile Number" error={errors.phone}>
                  <input type="tel" name="phone" placeholder="98765 43210" value={form.phone} onChange={change} className={inputCls} />
                </Field>
                <Field label="Departure City" error={errors.departCity}>
                  <input type="text" name="departCity" placeholder="City name" value={form.departCity} onChange={change} className={inputCls} />
                </Field>

                <Field label="Destination" error={errors.location}>
                  <input type="text" name="location" placeholder="Where do you want to go?" value={form.location} onChange={change} className={inputCls} />
                </Field>
                <Field label="Travel Date" error={errors.date}>
                  <input type="date" name="date" value={form.date} onChange={change} className={inputCls} />
                </Field>

                <Field label="Number of Persons">
                  <input type="number" name="passengers" placeholder="Ex: 4" value={form.passengers} onChange={change} className={inputCls} />
                </Field>
                <Field label="Number of Days">
                  <input type="number" name="days" placeholder="Ex: 5" value={form.days} onChange={change} className={inputCls} />
                </Field>
              </div>

              <Field label="Message (Optional)">
                <textarea name="message" rows="1" placeholder="Any specific requirements..." value={form.message} onChange={change} className={`${inputCls} resize-none min-h-[40px]`} />
              </Field>

              <div className="pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    name="agreed" 
                    checked={form.agreed} 
                    onChange={change}
                    className="w-4 h-4 rounded border-stone-300 text-[#BFA13B] focus:ring-0"
                  />
                  <span className="text-[10px] text-stone-500">
                    I have read and agree to the <span className="text-stone-800 underline underline-offset-2">User Agreement</span> and <span className="text-stone-800 underline underline-offset-2">Privacy Policy</span>.
                  </span>
                </label>
                {errors.agreed && <p className="text-[9px] text-red-500 mt-0.5 font-bold uppercase tracking-tight">Required</p>}
              </div>

              <GradBtn type="submit" loading={loading}>
                {submitLabel}
              </GradBtn>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}