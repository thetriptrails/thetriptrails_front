import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth.service";

const GOLD = "#BFA13B";
const DARK = "#8e7421";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await loginUser(form);

      // ✅ Token already stored in service
      setMsg(res.msg || "Login successful! Redirecting...");

      setTimeout(() => {
        navigate("/admin");
      }, 1000);

    } catch (err) {
      setMsg(err.msg || "Login failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-stone-50 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-52 h-52 rounded-full blur-[60px] opacity-[0.07] pointer-events-none" style={{ background: GOLD }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-52 h-52 rounded-full blur-[60px] opacity-[0.07] pointer-events-none" style={{ background: DARK }} />

      <div className="w-full max-w-sm bg-white rounded-[1.25rem] relative z-10 overflow-hidden shadow-2xl" style={{ border: `1px solid ${GOLD}10` }}>
        <div className="h-1.5 w-full" style={{ background: `linear-gradient(to right, ${GOLD}, ${DARK})` }} />

        <div className="p-8 flex flex-col">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 shadow-sm" style={{ background: `linear-gradient(135deg, ${GOLD}, ${DARK})` }}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-stone-800" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Welcome Back
            </h2>
            <p className="text-stone-400 text-[10px] tracking-widest uppercase mt-1">
              Authorized Access Only
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* EMAIL */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 ml-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-[#BFA13B] outline-none text-sm"
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
                  Password
                </label>
                <Link
                  to="/forgot"
                  className="text-[10px] font-bold hover:underline"
                  style={{ color: GOLD }}
                >
                  Forgot?
                </Link>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-[#BFA13B] outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-[10px] font-bold"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-white font-bold text-[11px] tracking-[0.2em] shadow-lg mt-4 flex items-center justify-center disabled:opacity-70"
              style={{
                background: `linear-gradient(135deg, ${GOLD} 0%, ${DARK} 100%)`,
              }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "SIGN IN"
              )}
            </button>
          </form>

          {/* MESSAGE */}
          {msg && (
            <div
              className={`mt-6 p-3 rounded-xl text-center text-[10px] font-bold uppercase ${
                msg.toLowerCase().includes("failed")
                  ? "bg-red-50 text-red-600"
                  : "bg-green-50 text-green-600"
              }`}
            >
              {msg}
            </div>
          )}
        </div>


      </div>
    </div>
  );
};

export default Login;