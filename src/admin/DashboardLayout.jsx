import { useState, useMemo } from "react";
import { useNavigate, useLocation, Outlet, Link } from "react-router-dom";
import {
  FiHome, FiLayers, FiBriefcase, FiFileText,
  FiUser, FiLogOut, FiMenu, FiX, FiSearch, FiBell, FiMapPin, FiMessageSquare
} from "react-icons/fi";

import { logoutUser } from "../services/auth.service";

// Configuration
const COLORS = {
  GOLD: "#BFA13B",
  DARK: "#8e7421",
};

const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = useMemo(() => [
    { icon: <FiHome />, label: "Dashboard", path: "/admin" },
    { icon: <FiMapPin />, label: "Destinations", path: "/admin/destinations" },
    { icon: <FiLayers />, label: "Packages", path: "/admin/packages" },
    { icon: <FiBriefcase />, label: "Services", path: "/admin/services" },
    { icon: <FiFileText />, label: "Blogs", path: "/admin/posts" },
    { icon: <FiMessageSquare />, label: "Testimonials", path: "/admin/testimonials" },
    { icon: <FiUser />, label: "Profile", path: "/admin/profile" },
  ], []);

  const activeLabel = menuItems.find(item => item.path === location.pathname)?.label || "Dashboard";

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      await logoutUser();
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex font-sans text-stone-800">
      
      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-stone-200
        transition-all duration-300 ease-in-out group shadow-2xl md:shadow-none
        ${isMobileOpen ? "w-72 translate-x-0" : "w-0 -translate-x-full md:w-20 md:translate-x-0 md:hover:w-64"}`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          
          {/* Logo Section */}
          <div className="h-20 flex items-center px-5 border-b border-stone-50">
            <div
              className="min-w-[40px] h-10 rounded-xl flex items-center justify-center text-white shadow-md flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${COLORS.GOLD}, ${COLORS.DARK})` }}
            >
              <span className="font-bold text-lg">G</span>
            </div>
            <span className={`font-bold text-lg tracking-tight ml-4 transition-opacity duration-300 whitespace-nowrap
              ${isMobileOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
              Gold Standard
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto custom-scrollbar">
            {menuItems.map((item) => (
              <NavItem
                key={item.path}
                item={item}
                isActive={location.pathname === item.path}
                isExpanded={isMobileOpen}
                onClick={() => setIsMobileOpen(false)}
              />
            ))}
          </nav>

          {/* Logout Section */}
          <div className="p-4 border-t border-stone-50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center p-3 rounded-xl text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors group/btn"
            >
              <FiLogOut className="text-xl min-w-[24px]" />
              <span className={`ml-6 font-medium text-sm transition-opacity duration-300 
                ${isMobileOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                Logout
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className={`flex-1 flex flex-col transition-all duration-300 ${isMobileOpen ? "md:pl-72" : "md:pl-20"}`}>
        
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-stone-200 flex items-center justify-between px-6 md:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden text-xl p-2 hover:bg-stone-100 rounded-lg transition-colors"
            >
              {isMobileOpen ? <FiX /> : <FiMenu />}
            </button>
            <h1 className="hidden md:block font-semibold text-stone-500 uppercase tracking-widest text-xs">
              {activeLabel}
            </h1>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden sm:flex items-center bg-stone-100/50 px-4 py-2 rounded-full border border-stone-200 focus-within:border-[#BFA13B] transition-all">
              <FiSearch className="text-stone-400" />
              <input className="ml-2 bg-transparent outline-none text-sm w-40 lg:w-60" placeholder="Search anything..." />
            </div>
            
            <button className="p-2 text-stone-400 hover:text-stone-600 relative">
                <FiBell className="text-xl" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <Link to="/admin/profile" className="flex items-center gap-2 group">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-[#BFA13B] transition-all"
              />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
          <Outlet /> 
        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-stone-900/20 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </div>
  );
};

/* Sub-component for Cleaner Navigation */
const NavItem = ({ item, isActive, isExpanded, onClick }) => {
  return (
    <Link
      to={item.path}
      onClick={onClick}
      className={`flex items-center p-3 rounded-xl transition-all relative group/item
      ${isActive 
        ? "bg-stone-900 text-white shadow-lg shadow-stone-200" 
        : "text-stone-500 hover:bg-stone-100 hover:text-stone-900"}`}
    >
      <div className={`text-xl min-w-[24px] flex justify-center ${isActive ? "text-[#BFA13B]" : ""}`}>
        {item.icon}
      </div>
      <span className={`ml-6 font-medium text-sm whitespace-nowrap transition-opacity duration-300
        ${isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
        {item.label}
      </span>
      
      {/* Tooltip for collapsed state (Desktop) */}
      {!isExpanded && (
        <div className="absolute left-16 scale-0 group-hover/item:scale-100 transition-all origin-left bg-stone-800 text-white text-xs py-1 px-2 rounded md:block hidden pointer-events-none">
          {item.label}
        </div>
      )}
    </Link>
  );
};

export default DashboardLayout;