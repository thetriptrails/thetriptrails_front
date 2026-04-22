import { LayoutGrid, List } from "lucide-react";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const categories = [
  { label: "All", count: 12 },
  { label: "Pilgrimage", count: 4 },
  { label: "Adventure", count: 3 },
  { label: "Hill Stations", count: 3 },
  { label: "Wildlife", count: 2 },
];

const sortOptions = [
  "Popular",
  "Rating: High to Low",
  "A to Z",
  "Best Season",
];

export default function DestinationFilters({
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  totalResults,
}) {
  return (
    <div
      className="bg-white rounded-xl px-4 sm:px-5 py-4 mb-6"
      style={{ border: "0.5px solid #E5E0D5" }}
    >
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2 flex-1">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className="text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-200"
              style={
                activeCategory === cat.label
                  ? { background: GOLD, color: "#fff" }
                  : {
                      border: `1px solid ${GOLD}`,
                      color: GOLD,
                      background: "transparent",
                    }
              }
            >
              {cat.label}{" "}
              <span className="opacity-70">({cat.count})</span>
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs px-3 py-2 rounded-lg outline-none cursor-pointer"
            style={{
              border: "0.5px solid #E5E0D5",
              color: "#888",
              background: "#fff",
              fontFamily: "sans-serif",
            }}
          >
            {sortOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          {/* View toggle */}
          <div
            className="flex rounded-lg overflow-hidden"
            style={{ border: "0.5px solid #E5E0D5" }}
          >
            <button
              onClick={() => setViewMode("grid")}
              className="p-2 transition-colors"
              style={{
                background: viewMode === "grid" ? GOLD : "#fff",
              }}
            >
              <LayoutGrid
                size={13}
                color={viewMode === "grid" ? "#fff" : "#888"}
              />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className="p-2 transition-colors"
              style={{
                background: viewMode === "list" ? GOLD : "#fff",
              }}
            >
              <List
                size={13}
                color={viewMode === "list" ? "#fff" : "#888"}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs mt-3" style={{ color: "#888" }}>
        Showing{" "}
        <span className="font-semibold" style={{ color: NAVY }}>
          {totalResults} destinations
        </span>{" "}
        in Uttarakhand
      </p>
    </div>
  );
}
