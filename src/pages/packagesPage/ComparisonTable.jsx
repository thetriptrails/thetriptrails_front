const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const rows = [
  { feature: "Hotel Category", basic: "3 Star", premium: "4 Star", luxury: "5 Star" },
  { feature: "Meals Included", basic: "Breakfast", premium: "All Meals", luxury: "All + Fine Dining" },
  { feature: "Private Guide", basic: "—", premium: "✓", luxury: "✓" },
  { feature: "24/7 Support", basic: "—", premium: "✓", luxury: "✓" },
  { feature: "Travel Insurance", basic: "Basic", premium: "Comprehensive", luxury: "Premium" },
  { feature: "Starting Price", basic: "₹8,000", premium: "₹25,000", luxury: "₹55,000", isPrice: true },
];

export default function ComparisonTable() {
  return (
    <section className="w-full bg-white px-4 sm:px-8 md:px-16 lg:px-24 py-0">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
          >
            Package <span style={{ color: GOLD }}>Comparison</span>
          </h2>
        </div>

        {/* Mobile View (Cards) - Visible only on small screens */}
        <div className="block md:hidden space-y-4 pb-8">
          {rows.map((row, i) => (
            <div 
              key={i} 
              className="rounded-xl p-4 border" 
              style={{ borderColor: "#E5E0D5", background: i % 2 === 0 ? "#FAFAF7" : "#fff" }}
            >
              <p className="text-[10px] uppercase tracking-wider mb-3 font-bold" style={{ color: GOLD }}>{row.feature}</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-[9px] text-gray-400 uppercase">Basic</p>
                  <p className="text-sm" style={{ color: row.basic === "—" ? "#ccc" : NAVY }}>{row.basic}</p>
                </div>
                <div className="border-x border-gray-100">
                  <p className="text-[9px] text-gray-400 uppercase">Premium</p>
                  <p className="text-sm font-bold" style={{ color: GOLD }}>{row.premium}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-400 uppercase">Luxury</p>
                  <p className="text-sm" style={{ color: NAVY }}>{row.luxury}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View (Table) - Hidden on mobile */}
        <div className="hidden md:block overflow-hidden rounded-xl mb-12" style={{ border: "0.5px solid #E5E0D5" }}>
          <table className="w-full" style={{ tableLayout: "fixed" }}>
            <thead>
              <tr style={{ background: NAVY }}>
                <th className="text-left px-6 py-4 text-xs font-medium w-1/4" style={{ color: GOLD }}>
                  Feature
                </th>
                <th className="text-center px-6 py-4 text-xs font-medium" style={{ color: GOLD }}>
                  Basic
                </th>
                <th className="text-center px-6 py-4 text-xs font-medium" style={{ color: GOLD, background: "#24365a" }}>
                  Premium
                </th>
                <th className="text-center px-6 py-4 text-xs font-medium" style={{ color: GOLD }}>
                  Luxury
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  style={{ background: i % 2 === 0 ? "#FAFAF7" : "#fff", borderBottom: "0.5px solid #E5E0D5" }}
                >
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">{row.feature}</td>
                  <td className="px-6 py-4 text-sm text-center text-gray-500">{row.basic}</td>
                  <td
                    className="px-6 py-4 text-sm text-center font-bold"
                    style={{ 
                      color: GOLD,
                      background: i % 2 === 0 ? "#fff" : "#FAFAF7" 
                    }}
                  >
                    {row.premium}
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-500">{row.luxury}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}