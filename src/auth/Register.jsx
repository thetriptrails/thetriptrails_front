import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.service";

const GOLD = "#BFA13B";
const DARK = "#8e7421";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= HANDLE REGISTRATION ================= */
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await registerUser(form);

      setMsg(res.msg || "Registration successful 🎉");

      // ⬇️ Auto redirect after short delay (nice UX)
      setTimeout(() => {
        navigate("/admin");
      }, 1000);

    } catch (err) {
      setMsg(err.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-stone-50 relative overflow-hidden font-sans">
      {/* Ambient Background Circles */}
      <div
        className="absolute top-[-10%] left-[-10%] w-64 h-64 rounded-full blur-[80px] opacity-[0.08] pointer-events-none"
        style={{ background: GOLD }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-64 h-64 rounded-full blur-[80px] opacity-[0.08] pointer-events-none"
        style={{ background: DARK }}
      />

      <div
        className="w-full max-w-md bg-white rounded-3xl relative z-10 overflow-hidden shadow-2xl"
        style={{ border: `1px solid ${GOLD}15` }}
      >
        {/* Top Bar */}
        <div
          className="h-1.5 w-full"
          style={{
            background: `linear-gradient(to right, ${GOLD}, ${DARK})`,
          }}
        />

        <div className="p-8 flex flex-col">
          <div className="text-center mb-8">
            <h2
              className="text-3xl font-bold text-stone-800"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Create Account
            </h2>
            <p className="text-stone-400 text-[10px] tracking-[0.2em] uppercase mt-2">
              Join the exclusive circle
            </p>
          </div>

          {/* ONLY ONE STEP NOW */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* NAME */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 ml-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-stone-100 bg-stone-50 focus:bg-white focus:border-[#BFA13B] focus:ring-2 focus:ring-[#BFA13B]10 outline-none text-sm transition-all"
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 ml-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="email@domain.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-stone-100 bg-stone-50 focus:bg-white focus:border-[#BFA13B] focus:ring-2 focus:ring-[#BFA13B]10 outline-none text-sm transition-all"
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 ml-1">
                Secure Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-100 bg-stone-50 focus:bg-white focus:border-[#BFA13B] focus:ring-2 focus:ring-[#BFA13B]10 outline-none text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-[10px] font-bold uppercase"
                >
                  {showPassword ? "SECURE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl text-white font-bold text-[11px] tracking-[0.2em] shadow-lg transition-all active:scale-[0.98] mt-4"
              style={{
                background: `linear-gradient(135deg, ${GOLD} 0%, ${DARK} 100%)`,
              }}
            >
              {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </button>
          </form>

          {/* MESSAGE */}
          {msg && (
            <div
              className={`mt-6 p-3 rounded-xl text-center text-[10px] font-bold uppercase tracking-wider ${
                msg.toLowerCase().includes("failed")
                  ? "bg-red-50 text-red-600 border border-red-100"
                  : "bg-green-50 text-green-600 border border-green-100"
              }`}
            >
              {msg}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="py-6 bg-stone-50 border-t border-stone-100 text-center">
          <p className="text-stone-400 text-[10px] font-medium uppercase tracking-widest">
            Member already?{" "}
            <Link
              to="/login"
              className="font-bold ml-1 hover:text-stone-800"
              style={{ color: GOLD }}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;