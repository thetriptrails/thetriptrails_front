import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/auth.service";

const GOLD = "#BFA13B";
const DARK = "#8e7421";

const Reset = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: state?.email || "",
    newPassword: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await resetPassword(form);

      setMsg(res.msg || "Password reset successful!");

      setTimeout(() => navigate("/login"), 1500);

    } catch (err) {
      setMsg(err.msg || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-stone-50 relative overflow-hidden">
      <div
        className="absolute bottom-[-10%] right-[-10%] w-52 h-52 rounded-full blur-[60px] opacity-[0.07] pointer-events-none"
        style={{ background: DARK }}
      />

      <div
        className="w-full max-w-90 bg-white rounded-[1.25rem] relative z-10 shadow-2xl border"
        style={{ borderColor: `${GOLD}10`, fontFamily: "'DM Sans', sans-serif" }}
      >
        <div
          className="h-1 w-full"
          style={{ background: `linear-gradient(to right, ${GOLD}, ${DARK})` }}
        />

        <div className="p-6">
          <div className="text-center mb-6">
            <h2
              className="text-xl font-bold text-stone-800"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Set New Password
            </h2>

            <p className="text-stone-400 text-[10px] tracking-wide uppercase">
              Email: {form.email}
            </p>
          </div>

          <form onSubmit={handleReset} className="space-y-4">

            {/* NEW PASSWORD */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-stone-400 ml-1">
                New Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="••••••••"
                  value={form.newPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-xl border border-stone-100 bg-stone-50 focus:bg-white focus:border-[#BFA13B] outline-none text-sm"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-500 text-[10px] font-bold"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-bold text-[11px] tracking-[0.2em] shadow-lg transition-all active:scale-[0.98]"
              style={{
                background: `linear-gradient(135deg, ${GOLD} 0%, ${DARK} 100%)`,
              }}
            >
              {loading ? "UPDATING..." : "UPDATE PASSWORD"}
            </button>
          </form>

          {/* MESSAGE */}
          {msg && (
            <div
              className={`mt-4 p-2 rounded-lg text-center text-[10px] font-bold uppercase ${
                msg.toLowerCase().includes("fail")
                  ? "bg-red-50 text-red-600"
                  : "bg-green-50 text-green-600"
              }`}
            >
              {msg}
            </div>
          )}
        </div>
      </div>

      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@400;700&display=swap" rel="stylesheet" />
    </div>
  );
};

export default Reset;