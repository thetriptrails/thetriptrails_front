import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Calendar, Hash, LogOut, Edit3, ShieldCheck, Activity } from "lucide-react";
import { getMe, logoutUser } from "../../services/auth.service";

const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  return new Intl.DateTimeFormat("en-GB").format(new Date(dateStr));
};

const StatCard = ({ label, value, icon: Icon, valueClassName = "" }) => (
  <div className="bg-amber-50/40 border border-amber-100/60 rounded-xl p-3 transition-all duration-150 hover:bg-white hover:border-amber-200 hover:shadow-sm cursor-default">
    <div className="flex items-center gap-1.5 mb-1.5">
      {Icon && <Icon size={9} className="text-amber-400" />}
      <p className="text-[8px] uppercase tracking-widest text-amber-500/80 font-bold">{label}</p>
    </div>
    <p className={`text-[11px] font-bold truncate ${valueClassName || "text-slate-700"}`}>
      {value}
    </p>
  </div>
);

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      try {
        const res = await getMe();
        if (isMounted) setUser(res.user || res);
      } catch (err) {
        navigate("/login");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchUser();
    return () => { isMounted = false; };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (loading) return <ProfileSkeleton />;

  const isActive = user?.isActive !== false;

  return (
    <div className="min-h-screen bg-[#f7f7f5] flex justify-center items-center p-4 font-sans">
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-amber-900/5 w-full max-w-75 overflow-hidden">

        {/* Banner */}
        <div className="h-20 bg-linear-to-br from-amber-300 via-yellow-400 to-orange-400 relative">
          {/* dot grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.25) 1px, transparent 1px)",
              backgroundSize: "14px 14px",
            }}
          />
          {/* logout top-right */}
          <button
            onClick={handleLogout}
            title="Logout"
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-all active:scale-95"
          >
            <LogOut size={13} strokeWidth={2.5} />
          </button>
        </div>

        <div className="px-5 pb-6">
          {/* Circle Avatar */}
          <div className="flex flex-col items-center -mt-10 mb-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-3xl font-black text-white uppercase ring-4 ring-white shadow-lg">
                {user?.name?.charAt(0) || "U"}
              </div>
              {/* verified dot */}
              {user?.isVerified && (
                <span className="absolute bottom-0.5 right-0.5 w-5 h-5 bg-amber-500 rounded-full border-2 border-white flex items-center justify-center">
                  <ShieldCheck size={10} className="text-white" strokeWidth={3} />
                </span>
              )}
              {/* active pulse */}
              {isActive && (
                <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                </span>
              )}
            </div>

            <div className="mt-3 text-center">
              <h2 className="text-[15px] font-black text-slate-800 capitalize tracking-tight">
                {user?.name}
              </h2>
              <div className="flex items-center gap-1 justify-center text-slate-400 mt-0.5">
                <Mail size={10} />
                <span className="text-[10px] font-medium">{user?.email}</span>
              </div>
              <span className={`mt-2 inline-block px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                isActive
                  ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                  : "bg-rose-50 text-rose-500 border-rose-100"
              }`}>
                {isActive ? "Active" : "Suspended"}
              </span>
            </div>
          </div>

          {/* Gradient divider */}
          <div className="h-px bg-linear-to-r from-transparent via-amber-100 to-transparent mb-4" />

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            <StatCard label="Joined" value={formatDate(user?.createdAt)} icon={Calendar} />
            <StatCard
              label="Security"
              value={user?.isVerified ? "Verified" : "Pending"}
              icon={ShieldCheck}
              valueClassName={user?.isVerified ? "text-amber-500" : "text-slate-400"}
            />
            <StatCard
              label="OTP Limit"
              value={`${user?.otpAttempts ?? 0} / 5`}
              icon={Activity}
              valueClassName={
                (user?.otpAttempts ?? 0) >= 4
                  ? "text-rose-500"
                  : (user?.otpAttempts ?? 0) >= 2
                  ? "text-amber-500"
                  : "text-slate-700"
              }
            />
            <StatCard
              label="User ID"
              value={user?._id?.slice(-6).toUpperCase() ?? "N/A"}
              icon={Hash}
              valueClassName="font-mono tracking-wide text-slate-500"
            />
          </div>

          {/* Edit button */}
          <button className="w-full bg-linear-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 active:scale-[0.97] text-white py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-md shadow-amber-200/60 tracking-wide uppercase">
            <Edit3 size={12} strokeWidth={3} />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileSkeleton = () => (
  <div className="min-h-screen bg-[#f7f7f5] flex justify-center items-center p-4">
    <div className="bg-white border border-slate-100 rounded-2xl shadow-lg w-full max-w-75 overflow-hidden animate-pulse">
      <div className="h-20 bg-amber-100" />
      <div className="px-5 pb-6">
        <div className="flex flex-col items-center -mt-10 mb-4">
          <div className="w-20 h-20 rounded-full bg-amber-100 ring-4 ring-white" />
          <div className="h-3.5 w-28 bg-slate-100 rounded-lg mt-4 mb-1.5" />
          <div className="h-2.5 w-40 bg-slate-100 rounded-lg" />
          <div className="h-4 w-14 bg-slate-100 rounded-full mt-2" />
        </div>
        <div className="h-px bg-slate-100 mb-4" />
        <div className="grid grid-cols-2 gap-2 mb-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 bg-amber-50 rounded-xl" />
          ))}
        </div>
        <div className="h-9 bg-amber-100 rounded-xl" />
      </div>
    </div>
  </div>
);

export default Profile;