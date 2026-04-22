import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const posts = [
  {
    category: "Pilgrimage",
    catBg: GOLD,
    catColor: "#fff",
    imgBg: NAVY,
    title: "Complete Guide to Char Dham Yatra 2025",
    author: "Rahul Sharma",
    date: "June 15, 2025",
  },
  {
    category: "Adventure",
    catBg: NAVY,
    catColor: GOLD,
    imgBg: GOLD,
    title: "Top 5 Treks in Uttarakhand You Must Try",
    author: "Amit Rawat",
    date: "May 20, 2025",
  },
  {
    category: "Tips & Guides",
    catBg: GOLD,
    catColor: "#fff",
    imgBg: NAVY,
    title: "Best Season to Visit Nainital & Mussoorie",
    author: "Priya Negi",
    date: "Apr 10, 2025",
  },
];

export default function HomeBlogPreview() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-[#FAFAF7] px-4 sm:px-8 md:px-16 lg:px-24 py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs tracking-[3px] uppercase font-medium block mb-2" style={{ color: GOLD }}>
              Latest Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold" style={{ color: NAVY, fontFamily: "'Georgia', serif" }}>
              From Our <span style={{ color: GOLD }}>Blog</span>
            </h2>
          </div>
          <button
            onClick={() => navigate("/blog")}
            className="text-sm font-medium px-5 py-2.5 rounded self-start transition-colors hover:bg-amber-50 flex-shrink-0"
            style={{ border: `1.5px solid ${GOLD}`, color: GOLD }}
          >
            All Posts →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <div
              key={post.title}
              className="bg-white rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
              style={{ border: "0.5px solid #E5E0D5" }}
              onClick={() => navigate("/blog")}
            >
              <div
                className="w-full h-36 flex items-center justify-center"
                style={{ background: post.imgBg }}
              >
                <span
                  className="text-xs"
                  style={{ color: post.imgBg === GOLD ? "#F5E6C0" : "#aab5cc" }}
                >
                  Blog Image
                </span>
              </div>
              <div className="p-4">
                <span
                  className="text-[9px] font-medium px-2 py-0.5 rounded inline-block mb-3"
                  style={{ background: post.catBg, color: post.catColor }}
                >
                  {post.category}
                </span>
                <h3 className="text-sm font-semibold leading-snug mb-3" style={{ color: NAVY }}>
                  {post.title}
                </h3>
                <div className="w-full mb-3" style={{ height: "0.5px", background: "#E5E0D5" }} />
                <p className="text-[10px] text-gray-400">
                  {post.author} · {post.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}