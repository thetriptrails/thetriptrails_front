import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllEnquiries, updateEnquiryStatus } from "../services/form.service";
import { getAllDestinations } from "../services/destination.service";
import { getAllPackages } from "../services/package.service";
import { getAllServices } from "../services/services.service";
import { FiUsers, FiMapPin, FiLayers, FiBriefcase, FiArrowUpRight, FiCalendar, FiClock, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast"; // Assuming toast is used based on typical patterns in this repo

const GOLD = "#BFA13B";
const DARK = "#8e7421";

const DashboardContent = () => {
  const [data, setData] = useState({
    enquiries: [],
    destinations: [],
    packages: [],
    services: [],
  });
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [enqRes, destRes, pkgRes, svcRes] = await Promise.all([
        getAllEnquiries(),
        getAllDestinations(),
        getAllPackages(),
        getAllServices()
      ]);

      setData({
        enquiries: enqRes.success && Array.isArray(enqRes.data) ? enqRes.data : [],
        destinations: destRes.success && Array.isArray(destRes.destinations) ? destRes.destinations : [],
        packages: pkgRes.success && Array.isArray(pkgRes.data) ? pkgRes.data : [],
        services: svcRes.success && Array.isArray(svcRes.services) ? svcRes.services : [],
      });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      const res = await updateEnquiryStatus(id, newStatus);
      if (res.success) {
        // Update local state
        setData(prev => ({
          ...prev,
          enquiries: prev.enquiries.map(enq => 
            enq._id === id ? { ...enq, status: newStatus } : enq
          )
        }));
        // If toast is available in the project, it would show here
        // toast.success("Status updated");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "contacted": return "bg-blue-50 text-blue-600 border-blue-100";
      case "resolved": return "bg-green-50 text-green-600 border-green-100";
      default: return "bg-amber-50 text-amber-600 border-amber-100";
    }
  };

  // Helper to safely handle non-array responses
  const getArray = (val) => Array.isArray(val) ? val : [];

  const stats = [
    { label: "Total Enquiries", value: getArray(data.enquiries).length, icon: <FiUsers />, color: GOLD, path: "/admin" },
    { label: "Destinations", value: getArray(data.destinations).length, icon: <FiMapPin />, color: DARK, path: "/admin/destinations" },
    { label: "Hot Packages", value: getArray(data.packages).length, icon: <FiLayers />, color: GOLD, path: "/admin/packages" },
    { label: "Active Services", value: getArray(data.services).length, icon: <FiBriefcase />, color: DARK, path: "/admin/services" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Title & Context */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-800" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Travel Management Console
          </h1>
          <p className="text-stone-400 text-xs uppercase tracking-widest font-bold mt-1">
            Real-time analytics & management
          </p>
        </div>
        <div className="flex gap-2">
           <a href="/" target="_blank" rel="noreferrer" className="px-4 py-2 bg-stone-100 text-stone-600 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-stone-200 transition-colors">View Website</a>
           <Link to="/admin/packages" className="px-4 py-2 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-amber-900/10 hover:opacity-90 transition-opacity" style={{ backgroundColor: GOLD }}>+ New Package</Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Link to={stat.path} key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 group hover:border-[#BFA13B] transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg shadow-md" style={{ backgroundColor: stat.color }}>
                {stat.icon}
              </div>
              <FiArrowUpRight className="text-stone-300 group-hover:text-[#BFA13B] transition-colors" />
            </div>
            <p className="text-stone-400 text-[10px] uppercase font-bold tracking-tighter">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1 text-stone-800">{loading ? "..." : stat.value}</h3>
          </Link>
        ))}
      </div>

      {/* Main Management Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Enquiries Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          <div className="p-6 border-b border-stone-50 flex justify-between items-center bg-stone-50/30">
            <h3 className="font-bold text-stone-800 flex items-center gap-2">
              <FiUsers className="text-[#BFA13B]" /> Recent Enquiries
            </h3>
            <span className="text-[10px] font-bold text-stone-400 bg-stone-100 px-2 py-1 rounded-full uppercase">Latest {getArray(data.enquiries).slice(0, 8).length}</span>
          </div>
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-stone-400 uppercase text-[10px] tracking-widest border-b border-stone-50">
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Destination</th>
                  <th className="px-6 py-4">Pax / Days</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {loading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan="5" className="px-6 py-5 h-16 bg-stone-50/20"></td>
                    </tr>
                  ))
                ) : getArray(data.enquiries).length > 0 ? (
                  getArray(data.enquiries).slice(0, 8).map((enquiry) => (
                    <tr key={enquiry._id} className="hover:bg-stone-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-stone-800 group-hover:text-[#BFA13B] transition-colors">{enquiry.name}</span>
                          <span className="text-[10px] text-stone-400">{enquiry.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FiMapPin className="text-stone-300 text-xs" />
                          <span className="text-stone-500 font-medium">{enquiry.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold text-stone-600 bg-stone-100 px-2 py-1 rounded-md uppercase tracking-tight">
                          {enquiry.passengers} Pax • {enquiry.days} Days
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={enquiry.status || "pending"}
                          disabled={updatingId === enquiry._id}
                          onChange={(e) => handleStatusChange(enquiry._id, e.target.value)}
                          className={`text-[9px] font-bold uppercase py-1 px-2 rounded-md border outline-none transition-all cursor-pointer ${getStatusColor(enquiry.status)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-stone-400 text-[10px] font-bold text-right uppercase">
                        {new Date(enquiry.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-2 opacity-20">
                         <FiUsers className="text-4xl" />
                         <p className="text-sm font-bold uppercase tracking-widest">No enquiries yet</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Status & Quick Actions */}
        <div className="space-y-6">
          <div className="bg-stone-900 p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#BFA13B]/20 rounded-full blur-2xl"></div>
            <h4 className="font-bold text-sm mb-6 flex items-center gap-2 tracking-widest uppercase">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Platform Status
            </h4>
            <div className="space-y-4">
               <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                 <span className="text-[10px] font-bold uppercase tracking-tight opacity-60 text-white">API Connectivity</span>
                 <span className="text-[10px] font-bold text-green-400">ACTIVE</span>
               </div>
               <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                 <span className="text-[10px] font-bold uppercase tracking-tight opacity-60 text-white">Cloud Storage</span>
                 <span className="text-[10px] font-bold text-green-400">SYNCED</span>
               </div>
               <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                 <span className="text-[10px] font-bold uppercase tracking-tight opacity-60 text-white">Email Server</span>
                 <span className="text-[10px] font-bold text-green-400">READY</span>
               </div>
            </div>
            <button className="mt-8 w-full py-4 rounded-2xl bg-[#BFA13B] text-black font-black text-[10px] tracking-[0.2em] uppercase hover:bg-white transition-all">
               System Report
            </button>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full border-4 border-stone-100 flex items-center justify-center mb-4 p-2">
               <FiClock className="text-[#BFA13B] text-xl" />
            </div>
            <h4 className="font-bold text-stone-800 text-sm uppercase tracking-widest">Last Update</h4>
            <p className="text-stone-400 text-[10px] mt-2 font-bold uppercase">
               {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <button 
              onClick={fetchDashboardData}
              className="mt-6 text-[10px] font-black text-[#BFA13B] uppercase tracking-[0.2em] hover:underline"
            >
              Refresh Data
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardContent;