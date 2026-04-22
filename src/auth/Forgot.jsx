import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { forgotPassword } from "../services/auth.service";

const GOLD = "#BFA13B";
const DARK = "#8e7421";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await forgotPassword({ email });

      setMsg(res.msg || "Proceed to reset password");

      // ✅ still navigate to reset page
      setTimeout(() => {
        navigate("/reset", { state: { email } });
      }, 1200);

    } catch (err) {
      setMsg(err.msg || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-stone-50 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-52 h-52 rounded-full blur-[60px] opacity-[0.07] pointer-events-none" style={{ background: GOLD }} />

      <div className="w-full max-w-90 bg-white rounded-[1.25rem] relative z-10 overflow-hidden shadow-2xl" style={{ border: `1px solid ${GOLD}10`, fontFamily: "'DM Sans', sans-serif" }}>
        <div className="h-1 w-full" style={{ background: `linear-gradient(to right, ${GOLD}, ${DARK})` }} />

        <div className="p-6 flex flex-col">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-3 shadow-sm" style={{ background: `linear-gradient(135deg, ${GOLD}, ${DARK})` }}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-stone-800" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Recover Password
            </h2>

            <p className="text-stone-400 text-[11px] tracking-wide uppercase">
              Enter your email to reset password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-stone-400 ml-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-xl border border-stone-100 bg-stone-50 focus:bg-white focus:border-[#BFA13B] outline-none transition-all text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-bold text-[11px] tracking-[0.2em] shadow-lg transition-all active:scale-[0.98] flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${GOLD} 0%, ${DARK} 100%)` }}
            >
              {loading ? "PROCESSING..." : "CONTINUE"}
            </button>
          </form>

          {msg && (
            <div
              className={`mt-4 p-2 rounded-lg text-center text-[10px] font-bold uppercase tracking-wider ${
                msg.toLowerCase().includes("fail")
                  ? "bg-red-50 text-red-600"
                  : "bg-green-50 text-green-600"
              }`}
            >
              {msg}
            </div>
          )}
        </div>

        <div className="py-4 bg-stone-50 border-t border-stone-100 text-center">
          <Link
            to="/login"
            className="text-stone-400 text-[10px] font-bold uppercase tracking-widest hover:text-stone-800 transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>

      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@400;700&display=swap" rel="stylesheet" />
    </div>
  );
};

export default Forgot;