import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom"; 
import { getAllPosts } from "../../services/post.service";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const categoryColors = {
  Adventure: { bg: NAVY, color: GOLD },
  "Tips & Guides": { bg: GOLD, color: "#fff" },
  Pilgrimage: { bg: NAVY, color: GOLD },
  "Hill Stations": { bg: GOLD, color: "#fff" },
};

const BlogGrid = ({ activeFilter }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts({ page: 1, limit: 12 });
        setPosts(data.posts || data);
      } catch (err) {
        setError(err.msg || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Filter Logic: Filter posts based on the activeFilter prop
  const filteredPosts = useMemo(() => {
    if (!activeFilter || activeFilter === "All") return posts;
    return posts.filter((post) => post.category === activeFilter);
  }, [posts, activeFilter]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="animate-pulse text-gray-400 font-medium tracking-widest uppercase text-[10px]">
          Loading stories...
        </div>
      </div>
    );
  }

  if (error) return <div className="p-8 text-center text-red-500 text-sm">{error}</div>;

  return (
    <section className="w-full bg-[#FAFAF7] px-4 py-16">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3" style={{ color: NAVY }}>
            {activeFilter === "All" ? "Latest Stories" : `${activeFilter} Collection`}
          </h2>
          <div className="w-12 h-1 mx-auto" style={{ backgroundColor: GOLD }}></div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 italic">No stories found in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => {
              const catStyle = categoryColors[post.category] || { bg: NAVY, color: GOLD };
              
              return (
                <Link
                  key={post._id}
                  to={`/blog/${post.slug}`}
                  className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    <img
                      src={post.image?.url || "https://via.placeholder.com/400"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span
                      className="absolute top-4 left-4 text-[9px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-tighter"
                      style={{ background: catStyle.bg, color: catStyle.color }}
                    >
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col grow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        {post.readTime || "6m read"}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold leading-tight mb-3 group-hover:text-[#C9A84C] transition-colors line-clamp-2" style={{ color: NAVY }}>
                      {post.title}
                    </h3>

                    <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                        By {post.author || "Admin"}
                      </span>
                      <span className="text-[11px] font-black group-hover:translate-x-1 transition-transform" style={{ color: GOLD }}>
                        READ STORY →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogGrid;