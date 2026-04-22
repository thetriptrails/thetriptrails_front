import React from "react";

const GOLD = "#BFA13B";
const DARK = "#8e7421";

const DashboardContent = () => {
  // Updated Stats to reflect your travel project data
  const stats = [
    { label: "Active Destinations", value: "42", growth: "+4 new", color: GOLD },
    { label: "Total Packages", value: "128", growth: "+12%", color: DARK },
    { label: "Service Categories", value: "8", growth: "Stable", color: GOLD },
    { label: "Pending Reviews", value: "15", growth: "-3", color: DARK },
  ];

  // Updated Recent Activity for Destinations/Packages
  const recentUpdates = [
    { id: "DEST-102", title: "Bali Tropical Escape", type: "Package", status: "Published", date: "Apr 12" },
    { id: "BLOG-405", title: "Top 10 Trekking Tips", type: "Blog", status: "Draft", date: "Apr 11" },
    { id: "TEST-009", title: "John Doe - Safari", type: "Testimonial", status: "Active", date: "Apr 10" },
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
            Managing Destinations, Packages & Content
          </p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-stone-100 text-stone-600 rounded-lg text-[10px] font-bold uppercase tracking-widest">View Website</button>
           <button className="px-4 py-2 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest" style={{ backgroundColor: GOLD }}>+ New Entry</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
            <p className="text-stone-400 text-[10px] uppercase font-bold tracking-tighter">{stat.label}</p>
            <div className="flex items-baseline justify-between mt-2">
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <span className="text-[10px] font-bold text-green-500">{stat.growth}</span>
            </div>
            <div className="h-1.5 w-full bg-stone-50 rounded-full mt-4 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: '65%', backgroundColor: stat.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Management Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Content Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          <div className="p-6 border-b border-stone-50 flex justify-between items-center">
            <h3 className="font-bold text-stone-800">Recent Content Updates</h3>
            <div className="flex gap-4">
                <button className="text-[10px] font-bold text-[#BFA13B] uppercase tracking-widest">Destinations</button>
                <button className="text-[10px] font-bold text-stone-300 uppercase tracking-widest">Blogs</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-stone-400 uppercase text-[10px] tracking-widest border-b border-stone-50">
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {recentUpdates.map((item, i) => (
                  <tr key={i} className="hover:bg-stone-50 transition-colors cursor-pointer">
                    <td className="px-6 py-4 font-bold text-stone-800">{item.title}</td>
                    <td className="px-6 py-4 text-stone-500 font-medium">{item.type}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase ${item.status === 'Published' || item.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-stone-400 text-xs">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Management Shortcuts */}
        <div className="space-y-4">
          <div className="bg-stone-900 p-6 rounded-2xl shadow-xl text-white">
            <h4 className="font-bold text-sm mb-4">Quick Navigation</h4>
            <div className="grid grid-cols-2 gap-2">
              {['Destinations', 'Packages', 'Services', 'Blogs', 'Testimonials', 'Gallery'].map((item) => (
                <button key={item} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-bold uppercase tracking-tight transition-all">
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full border-4 border-stone-50 flex items-center justify-center mb-4" 
                 style={{ borderTopColor: GOLD }}>
              <span className="text-sm font-bold text-stone-800">72%</span>
            </div>
            <h4 className="font-bold text-stone-800 text-sm">SEO Health</h4>
            <p className="text-stone-400 text-[10px] mt-2 leading-relaxed">
              4 destinations are missing meta descriptions.
            </p>
            <button className="mt-4 w-full py-2 rounded-lg text-white font-bold text-[9px] tracking-widest"
              style={{ background: `linear-gradient(135deg, ${GOLD}, ${DARK})` }}>
              FIX SEO ISSUES
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardContent;